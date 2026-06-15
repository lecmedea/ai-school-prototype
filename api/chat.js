const MAX_PROMPT_LENGTH = 6000;

const providerConfig = {
  auto: { label: "Авто" },
  groq: { label: "Groq" },
  huggingface: { label: "Hugging Face" },
  openrouter: { label: "OpenRouter" },
  gigachat: { label: "GigaChat" },
  yandex: { label: "YandexGPT" }
};

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.status(405).json({ ok: false, error: "Метод не поддерживается. Используйте POST." });
    return;
  }

  try {
    const body = await readJson(req);
    const prompt = String(body.prompt || "").trim().slice(0, MAX_PROMPT_LENGTH);
    const provider = String(body.provider || "auto").toLowerCase();

    if (!prompt) {
      res.status(400).json({ ok: false, error: "Напишите задачу в основном окне." });
      return;
    }

    const candidates = chooseProviders(provider);
    const system = [
      "Ты помощник платформы Prompta для пользователей 40+.",
      "Отвечай по-русски, спокойно, простыми словами.",
      "Давай короткие шаги, избегай профессионального жаргона.",
      "Не проси отправлять пароли, коды, паспортные данные и банковские реквизиты."
    ].join(" ");

    const { selected, result } = await callFirstAvailableProvider(candidates, system, prompt, provider === "auto");
    res.status(200).json({
      ok: true,
      provider: selected,
      providerLabel: providerConfig[selected]?.label || selected,
      answer: result
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: error.message || "Не удалось получить ответ нейросети."
    });
  }
};

function readJson(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 100_000) {
        reject(new Error("Запрос слишком большой."));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        reject(new Error("Не удалось прочитать запрос."));
      }
    });
    req.on("error", reject);
  });
}

function chooseProviders(requested) {
  if (requested && requested !== "auto") {
    if (!providerConfig[requested]) throw new Error("Такой провайдер пока не подключен.");
    assertProviderReady(requested);
    return [requested];
  }

  const order = ["groq", "openrouter", "huggingface", "gigachat", "yandex"];
  const selected = order.filter((provider) => isProviderReady(provider));
  if (!selected.length) {
    throw new Error("Ключи ещё не добавлены в Vercel. Добавьте переменные окружения из .env.example.");
  }
  return selected;
}

async function callFirstAvailableProvider(candidates, system, prompt, allowFallback) {
  const errors = [];
  for (const candidate of candidates) {
    try {
      const result = await callProvider(candidate, system, prompt);
      return { selected: candidate, result };
    } catch (error) {
      errors.push(`${providerConfig[candidate]?.label || candidate}: ${error.message || "ошибка"}`);
      if (!allowFallback) break;
    }
  }
  throw new Error(`Провайдеры не смогли ответить. ${errors.join(" | ")}`);
}

function isProviderReady(provider) {
  if (provider === "groq") return Boolean(process.env.GROQ_API_KEY);
  if (provider === "huggingface") return Boolean(process.env.HF_TOKEN);
  if (provider === "openrouter") return Boolean(process.env.OPENROUTER_API_KEY);
  if (provider === "gigachat") return Boolean(process.env.GIGACHAT_AUTH_KEY);
  if (provider === "yandex") return Boolean(process.env.YANDEX_API_KEY && process.env.YANDEX_FOLDER_ID);
  return false;
}

function assertProviderReady(provider) {
  if (!isProviderReady(provider)) {
    throw new Error(`Для ${providerConfig[provider]?.label || provider} ещё не добавлен API-ключ в Vercel.`);
  }
}

async function callProvider(provider, system, prompt) {
  if (provider === "groq") {
    return callOpenAICompatible({
      url: "https://api.groq.com/openai/v1/chat/completions",
      key: process.env.GROQ_API_KEY,
      model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
      system,
      prompt
    });
  }

  if (provider === "openrouter") {
    return callOpenAICompatible({
      url: "https://openrouter.ai/api/v1/chat/completions",
      key: process.env.OPENROUTER_API_KEY,
      model: process.env.OPENROUTER_MODEL || "qwen/qwen3-235b-a22b:free",
      system,
      prompt,
      extraHeaders: {
        "HTTP-Referer": "https://lecmedea.github.io/ai-school-prototype/",
        "X-Title": "Prompta"
      }
    });
  }

  if (provider === "huggingface") {
    return callOpenAICompatible({
      url: "https://router.huggingface.co/v1/chat/completions",
      key: process.env.HF_TOKEN,
      model: process.env.HF_MODEL || "meta-llama/Llama-3.1-8B-Instruct",
      system,
      prompt
    });
  }

  if (provider === "gigachat") {
    return callGigaChat(system, prompt);
  }

  if (provider === "yandex") {
    return callYandex(system, prompt);
  }

  throw new Error("Провайдер пока не поддерживается.");
}

async function callOpenAICompatible({ url, key, model, system, prompt, extraHeaders = {} }) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
      ...extraHeaders
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt }
      ],
      temperature: 0.4,
      max_tokens: 900
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error?.message || data.message || "Провайдер вернул ошибку.");
  }
  return data.choices?.[0]?.message?.content?.trim() || "Ответ пришёл пустым.";
}

async function callGigaChat(system, prompt) {
  const tokenResponse = await fetch("https://ngw.devices.sberbank.ru:9443/api/v2/oauth", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
      RqUID: crypto.randomUUID(),
      Authorization: `Basic ${process.env.GIGACHAT_AUTH_KEY}`
    },
    body: new URLSearchParams({ scope: process.env.GIGACHAT_SCOPE || "GIGACHAT_API_PERS" })
  });

  const tokenData = await tokenResponse.json().catch(() => ({}));
  if (!tokenResponse.ok || !tokenData.access_token) {
    throw new Error(tokenData.message || "GigaChat не выдал токен доступа.");
  }

  const response = await fetch("https://gigachat.devices.sberbank.ru/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${tokenData.access_token}`
    },
    body: JSON.stringify({
      model: process.env.GIGACHAT_MODEL || "GigaChat",
      messages: [
        { role: "system", content: system },
        { role: "user", content: prompt }
      ],
      temperature: 0.4,
      max_tokens: 900
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "GigaChat вернул ошибку.");
  }
  return data.choices?.[0]?.message?.content?.trim() || "Ответ пришёл пустым.";
}

async function callYandex(system, prompt) {
  const modelUri = `gpt://${process.env.YANDEX_FOLDER_ID}/${process.env.YANDEX_MODEL || "yandexgpt-lite"}`;
  const response = await fetch("https://llm.api.cloud.yandex.net/foundationModels/v1/completion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Api-Key ${process.env.YANDEX_API_KEY}`
    },
    body: JSON.stringify({
      modelUri,
      completionOptions: {
        stream: false,
        temperature: 0.4,
        maxTokens: "900"
      },
      messages: [
        { role: "system", text: system },
        { role: "user", text: prompt }
      ]
    })
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || "YandexGPT вернул ошибку.");
  }
  return data.result?.alternatives?.[0]?.message?.text?.trim() || "Ответ пришёл пустым.";
}
