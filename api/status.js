const providers = [
  ["groq", "Groq", ["GROQ_API_KEY"]],
  ["huggingface", "Hugging Face", ["HF_TOKEN"]],
  ["openrouter", "OpenRouter", ["OPENROUTER_API_KEY"]],
  ["gigachat", "GigaChat", ["GIGACHAT_AUTH_KEY"]],
  ["yandex", "YandexGPT", ["YANDEX_API_KEY", "YANDEX_FOLDER_ID"]]
];

module.exports = async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    ok: true,
    providers: providers.map(([id, name, keys]) => ({
      id,
      name,
      ready: keys.every((key) => Boolean(process.env[key])),
      required: keys
    }))
  });
};
