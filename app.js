const root = document.documentElement;
const transparentPixel = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
const surveyUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdUu3UJhadGg0RhgjeJwOiPFABn2hnbUCYSqdb7O34ftx3aGg/viewform";

const currentPage = location.pathname.split("/").pop() || "index.html";
const isWorkspacePage = currentPage === "index.html";

const navItems = [
  { href: "index.html", label: "Рабочее окно", icon: "chat" },
  { href: "profile.html", label: "Мой профиль", icon: "user" },
  { href: "academy.html", label: "Обучение", icon: "route" },
  { href: "catalog.html", label: "ИИ Каталог", icon: "grid" },
  { href: "telegram-bot.html", label: "Telegram бот", icon: "send" },
  { href: "max-bot.html", label: "MAX бот", icon: "message" },
  { href: "prompts.html", label: "Библиотеки", icon: "library" },
  { href: "terminology.html", label: "ИИ-терминология", icon: "book" },
  { href: "payment.html", label: "Оплата", icon: "wallet" },
  { href: "settings.html", label: "Настройки", icon: "settings" },
  { href: surveyUrl, label: "Опрос", icon: "survey", survey: true, external: true },
  { href: "roadmap.html", label: "Roadmap", icon: "flag", roadmap: true }
];

const icons = {
  chat: '<svg viewBox="0 0 24 24"><path d="M4 5.5h16v10H8l-4 3v-13Z"/><path d="M8 9h8M8 12h5"/></svg>',
  user: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 20c1.5-4 12.5-4 14 0"/></svg>',
  library: '<svg viewBox="0 0 24 24"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3-3V4Z"/><path d="M8 8h7M8 11h7M8 14h5"/></svg>',
  book: '<svg viewBox="0 0 24 24"><path d="M4 5a3 3 0 0 1 3-2h13v16H7a3 3 0 0 0-3 2V5Z"/><path d="M8 7h8M8 11h8"/></svg>',
  grid: '<svg viewBox="0 0 24 24"><path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"/></svg>',
  route: '<svg viewBox="0 0 24 24"><path d="M6 18c3-8 9 0 12-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="10" r="2"/></svg>',
  send: '<svg viewBox="0 0 24 24"><path d="M21 4 3 11l7 3 3 7 8-17Z"/><path d="m10 14 4-4"/></svg>',
  message: '<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4V5Z"/><path d="M8 9h8M8 12h6"/></svg>',
  layers: '<svg viewBox="0 0 24 24"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></svg>',
  wallet: '<svg viewBox="0 0 24 24"><path d="M4 7h15a2 2 0 0 1 2 2v9H5a2 2 0 0 1-2-2V6a2 2 0 0 0 2 2"/><path d="M16 13h3M6 7l9-3 1 3"/></svg>',
  settings: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M19.1 4.9l-2.8 2.8M7.7 16.3l-2.8 2.8"/></svg>',
  survey: '<svg viewBox="0 0 24 24"><path d="M6 3h12v18H6V3Z"/><path d="M9 8h6M9 12h6M9 16h3"/><path d="M8 3.5h8"/></svg>',
  flag: '<svg viewBox="0 0 24 24"><path d="M5 21V4h11l1 4h-9v7h11l-1-4"/><path d="M5 4h3"/></svg>'
};

const tips = [
  "Alt+Tab на Windows или Command+Tab на Mac быстро переключает между открытыми окнами.",
  "Ctrl+C или Command+C копирует выделенный текст, а Ctrl+V или Command+V вставляет его.",
  "Ctrl+Z или Command+Z отменяет последнее действие. Это полезно, когда нажали не туда.",
  "Ctrl+F или Command+F ищет слово на странице, в документе или в большом ответе нейросети.",
  "Если ответ слишком сложный, напишите: объясни проще и приведи бытовой пример.",
  "Не отправляйте нейросети коды из SMS, пароли и данные банковской карты.",
  "Хороший запрос начинается с цели: что именно вы хотите получить в конце.",
  "Просите нейросеть отвечать списком, если хотите быстро просмотреть результат.",
  "Если ответ длинный, попросите: сократи до 5 пунктов.",
  "Если страшно ошибиться, сначала попросите нейросеть сделать черновик.",
  "Для письма укажите адресата, тон и желаемую длину.",
  "Для картинки укажите объект, стиль, фон, настроение и формат.",
  "Для видео укажите длительность, движение камеры и главный объект.",
  "Для голоса укажите темп, эмоцию, возраст и язык речи.",
  "Не используйте личные документы в учебных примерах. Заменяйте реальные данные вымышленными.",
  "Если не знаете термин, выделите его и спросите: объясни это простыми словами.",
  "Просите нейросеть задавать уточняющие вопросы, если задача сложная.",
  "Сохраняйте удачные запросы в библиотеку промптов, чтобы не писать заново.",
  "Если результат плохой, не начинайте сначала. Напишите, что именно исправить.",
  "Для таблиц просите ответ в формате CSV или Markdown-таблицы.",
  "Перед оплатой любого ИИ-сервиса проверяйте официальный сайт и условия тарифа.",
  "Сначала тестируйте новую нейросеть на маленькой задаче, а не на важном проекте.",
  "Если текст получился сухим, попросите сделать его дружелюбнее.",
  "Если текст получился слишком рекламным, попросите сделать его спокойнее.",
  "При работе с картинками уточняйте, что должно быть на переднем плане.",
  "Для презентации просите структуру: заголовок, тезисы, иллюстрация, вывод.",
  "Если нужно объяснение для ребенка или новичка, прямо укажите это в запросе.",
  "Используйте слово 'пошагово', когда нужен понятный порядок действий.",
  "Используйте слово 'пример', когда теория звучит непонятно.",
  "Используйте слово 'проверь', когда хотите найти ошибки в тексте.",
  "Используйте слово 'сравни', когда выбираете между двумя инструментами.",
  "Если нейросеть уверенно ошиблась, попросите проверить факты и назвать сомнительные места.",
  "Для свежих цен, законов и расписаний просите ссылаться на актуальные источники.",
  "Если ответ на английском, попросите перевести и объяснить термины.",
  "Не вставляйте весь документ, если нужен только один фрагмент. Так проще контролировать результат.",
  "Длинные задачи разбивайте на маленькие: сначала план, потом первый раздел.",
  "Если забыли, где файл, используйте поиск в системе по названию или типу файла.",
  "На Mac Spotlight открывается Command+Пробел, на Windows поиск открывается клавишей Windows.",
  "Ctrl+S или Command+S сохраняет файл во многих программах.",
  "Ctrl+A или Command+A выделяет весь текст в поле.",
  "Esc часто закрывает всплывающее окно или отменяет текущий режим.",
  "Tab помогает переходить между полями без мыши.",
  "Shift+Tab возвращает фокус на предыдущее поле.",
  "Enter отправляет сообщение в чате, а Shift+Enter обычно переносит строку.",
  "Проверяйте, в каком поле стоит курсор, прежде чем печатать.",
  "Если страница выглядит странно, обновите ее клавишей F5 или Command+R.",
  "Если сайт завис, подождите несколько секунд перед повторным нажатием кнопки.",
  "Не нажимайте кнопку запуска много раз подряд, если задача уже отправлена.",
  "Если результат нужен для работы, попросите нейросеть сделать деловой тон.",
  "Если результат нужен для семьи, попросите теплый и простой тон.",
  "Для рецепта укажите продукты, которые уже есть дома.",
  "Для поездки укажите город, даты, бюджет и ограничения.",
  "Для здоровья используйте нейросеть только как справочник, а не замену врачу.",
  "Для юридических вопросов просите общий обзор и список вопросов к специалисту.",
  "Если нужно обучение, попросите план на 15 минут в день.",
  "Если трудно читать, включите крупный текст в интерфейсе.",
  "Если глаза устают, попробуйте темную тему вечером и светлую днем.",
  "Не бойтесь просить нейросеть повторить: она не устает.",
  "Плохой запрос можно улучшить: попросите нейросеть переписать его правильно.",
  "Для генерации изображений избегайте лишних деталей, которые конфликтуют друг с другом.",
  "Если нужна реалистичная картинка, прямо напишите: реалистичное фото.",
  "Если нужна схема, напишите: сделай простую схему с подписями.",
  "Для видео просите сначала сценарий, затем уже генерацию ролика.",
  "Для звука просите сначала текст озвучки и только потом голос.",
  "Если нейросеть предлагает много вариантов, попросите выбрать лучший и объяснить почему.",
  "Сложные слова из ответа можно перенести в раздел ИИ-терминологии.",
  "Проверяйте имя файла перед загрузкой, чтобы не отправить лишний документ.",
  "Файлы лучше называть понятно: договор_черновик, фото_аватар, список_идей.",
  "Если нужен приватный пример, замените имена на Иван, Мария, Компания А.",
  "Не публикуйте сгенерированное изображение человека как реальное фото события.",
  "Если нужна уникальность, попросите несколько версий и выберите основу.",
  "Если ответ похож на рекламу, попросите убрать преувеличения.",
  "Если ответ слишком общий, добавьте больше контекста: для кого, где, зачем.",
  "Просите нейросеть объяснить свои шаги, когда учитесь новому.",
  "Просите финальный вариант без объяснений, когда нужен чистый текст.",
  "Используйте избранное для инструментов, к которым возвращаетесь чаще всего.",
  "Перед важной отправкой письма попросите нейросеть проверить тон.",
  "Для Excel просите формулы отдельно от объяснений.",
  "Для больших таблиц просите сначала найти проблему, потом предложить исправление.",
  "Если работаете в браузере, откройте важные страницы в отдельных вкладках.",
  "Command+L или Ctrl+L выделяет адресную строку браузера.",
  "Ctrl+T или Command+T открывает новую вкладку.",
  "Ctrl+W или Command+W закрывает текущую вкладку.",
  "Ctrl+Shift+T или Command+Shift+T возвращает закрытую вкладку.",
  "Не скачивайте файлы с неизвестных сайтов, даже если их порекомендовала нейросеть.",
  "Если ссылка кажется подозрительной, сначала спросите помощника, как ее проверить.",
  "Записывайте повторяющиеся задачи: из них получится личный набор промптов.",
  "Если хотите учиться без спешки, проходите один модуль за раз.",
  "Зеленый модуль означает, что тест сдан. Красный значит, что можно спокойно повторить.",
  "Режим советчика можно менять в настройках под ваш уровень опыта.",
  "Новичкам полезны подробные подсказки при наведении на нейросети.",
  "Опытным пользователям можно выключить лишние пояснения, чтобы работать быстрее.",
  "Если что-то не получилось, спрашивайте правого помощника: что мне нажать дальше?",
  "Перед генерацией дорогого видео сделайте короткий тестовый вариант.",
  "При выборе модели смотрите не только качество, но и стоимость одной задачи.",
  "Для семейных задач лучше сохранять простые шаблоны, чтобы родственникам было легче повторить.",
  "Если не уверены, какая нейросеть нужна, начните с текстового помощника.",
  "Картинки, видео и звук часто требуют более точного описания, чем обычный текст.",
  "ИИ-агентам нужно давать границы: что можно делать, а что только предложить.",
  "Важные результаты сохраняйте отдельно, потому что история чатов может очищаться.",
  "Если интерфейс непонятен, ищите кнопку помощи справа: она объясняет текущий экран."
];

const tools = [
  ["ChatGPT", "США", "Текстовые", "Универсальный чат-помощник для текстов, обучения, документов и идей.", "Помогает писать, объяснять, переводить и разбирать задачи обычным языком."],
  ["Claude", "США", "Текстовые", "Сильный помощник для длинных документов, аккуратного анализа и спокойных объяснений.", "Удобен, когда нужно прочитать много текста и получить понятный вывод."],
  ["Gemini", "США", "Текстовые", "Мультимодальная система Google для текста, изображений и поиска.", "Подходит тем, кто часто работает с сервисами Google."],
  ["Grok", "США", "Текстовые", "Чат xAI с сильной связью с новостным и социальным контекстом.", "Может быть полезен для быстрых обсуждений актуальных тем."],
  ["Perplexity", "США", "Текстовые", "Поисковый ИИ-ответчик с источниками.", "Хорош для вопросов, где важно видеть ссылки и проверять факты."],
  ["Llama", "США", "Текстовые", "Семейство открытых моделей Meta.", "Полезно для будущих локальных или более гибких интеграций."],
  ["Command R", "США", "Текстовые", "Модели Cohere для корпоративного поиска и документов.", "Подходит для базы знаний, справочников и внутренних документов."],
  ["Mistral Le Chat", "Европа", "Текстовые", "Европейский ИИ-чат и модели.", "Хороший вариант для многоязычных задач и альтернативы американским сервисам."],
  ["DeepSeek", "Китай", "Текстовые", "Китайские модели для рассуждений, кода и анализа.", "Может давать сильные ответы в логических и технических задачах."],
  ["Qwen", "Китай", "Текстовые", "Модели Alibaba для текста, кода и мультимодальных задач.", "Один из важных китайских стеков для подключения в агрегатор."],
  ["ERNIE Bot", "Китай", "Текстовые", "ИИ-система Baidu.", "Подходит как крупный китайский провайдер для текста и поиска."],
  ["Hunyuan", "Китай", "Текстовые", "Модели Tencent.", "Важен для китайской экосистемы и будущих API-сценариев."],
  ["Kimi", "Китай", "Текстовые", "Ассистент Moonshot AI для длинного контекста.", "Удобен для больших документов и длинных обсуждений."],
  ["GLM / Z.ai", "Китай", "Текстовые", "Модели Zhipu AI.", "Подходит для текста, агентов и китайского рынка."],
  ["MiniMax", "Китай", "Текстовые", "Мультимодальная китайская ИИ-платформа.", "Интересна тем, что объединяет текст, голос и видео."],
  ["Doubao", "Китай", "Текстовые", "Ассистент ByteDance.", "Может стать важным пользовательским входом в китайской экосистеме."],
  ["Baichuan", "Китай", "Текстовые", "Китайские LLM-модели.", "Дополнительный поставщик текстовых моделей."],
  ["SenseNova", "Китай", "Текстовые", "ИИ-платформа SenseTime.", "Крупный китайский игрок с мультимодальными возможностями."],
  ["SparkDesk", "Китай", "Текстовые", "Ассистент iFlytek.", "Силен в речевых и языковых сценариях."],
  ["StepFun", "Китай", "Текстовые", "Китайские мультимодальные модели.", "Перспективный поставщик для текста и изображения."],
  ["Yi", "Китай", "Текстовые", "Модели 01.AI.", "Открытые модели, которые можно рассматривать для гибких интеграций."],
  ["InternLM", "Китай", "Текстовые", "Открытая модель Shanghai AI Lab.", "Подходит для экспериментов и локальных сценариев."],
  ["YandexGPT", "Россия", "Текстовые", "Текстовые модели Яндекса для чата, поиска, документов и бизнес-задач.", "Российская нейросеть, которая помогает писать, объяснять, обобщать и работать с русским языком."],
  ["GigaChat", "Россия", "Текстовые", "Мультимодальная модель Сбера для текста, кода, изображений и бизнес-сценариев.", "Российский ИИ-помощник для текста, диалогов, документов и будущих интеграций через API."],
  ["Нейро от Яндекса", "Россия", "Текстовые", "Пользовательский ИИ-помощник Яндекса для поиска, объяснений и быстрых задач.", "Помогает находить ответы и объяснять темы простыми словами внутри экосистемы Яндекса."],
  ["Aithoria", "Россия", "Текстовые", "Российская ИИ-платформа для генерации текстов, изображений и рабочих шаблонов.", "Подходит для пользовательских задач, когда нужен простой вход через готовые сценарии."],
  ["Gerwin AI", "Россия", "Текстовые", "Сервис для маркетинговых текстов, описаний, статей и контент-задач.", "Удобен для рекламы, постов, карточек товаров и быстрых текстовых шаблонов."],
  ["TurboText", "Россия", "Текстовые", "Платформа для генерации и проверки текстов.", "Помогает писать тексты, идеи, описания и варианты формулировок на русском."],

  ["DALL-E / OpenAI Images", "США", "Графические", "Генерация и редактирование изображений.", "Создает картинки по описанию и помогает быстро делать визуальные черновики."],
  ["Midjourney", "США", "Графические", "Популярная система для красивых изображений.", "Хороша для выразительных картинок, стилей и идей."],
  ["Adobe Firefly", "США", "Графические", "Генерация изображений для дизайна и коммерческих задач.", "Удобна тем, кто работает с рекламой, презентациями и макетами."],
  ["Google Imagen", "США", "Графические", "Модель Google для генерации изображений.", "Может создавать качественные изображения по текстовому описанию."],
  ["Meta Emu", "США", "Графические", "Мультимодальные инструменты Meta.", "Полезно отслеживать для соцсетей и визуального контента."],
  ["Leonardo AI", "США", "Графические", "Графика для игр, дизайна и иллюстраций.", "Удобна для аватаров, персонажей и визуальных концептов."],
  ["Ideogram", "США", "Графические", "Изображения с аккуратным текстом.", "Полезен, когда на картинке нужны надписи."],
  ["Recraft", "США", "Графические", "Дизайн-графика, векторы и бренд-материалы.", "Подходит для логотипов, иконок и аккуратного визуального стиля."],
  ["Higgsfield", "США", "Графические", "Креативные workflow для изображения и видео.", "Полезен для быстрых визуальных сценариев и социальных роликов."],
  ["Tongyi Wanxiang", "Китай", "Графические", "Графический ИИ Alibaba.", "Китайская альтернатива для генерации изображений."],
  ["Tencent Hunyuan Image", "Китай", "Графические", "Генерация изображений Tencent.", "Важный китайский провайдер визуальных моделей."],
  ["Baidu Wenxin Yige", "Китай", "Графические", "Графический сервис Baidu.", "Создает изображения по описанию."],
  ["Kling Image", "Китай", "Графические", "Визуальные инструменты Kuaishou.", "Полезен рядом с видео-инструментами Kling."],
  ["Kolors", "Китай", "Графические", "Модель изображений Kuaishou.", "Подходит для генерации картинок и стилей."],
  ["Jimeng AI", "Китай", "Графические", "Инструменты ByteDance для изображения.", "Может быть интересен для контента и соцсетей."],
  ["LiblibAI", "Китай", "Графические", "Платформа генерации изображений.", "Полезна как пользовательский визуальный инструмент."],
  ["SeaArt", "Китай", "Графические", "Генерация изображений и стили.", "Подходит для творческих картинок и персонажей."],
  ["Kandinsky", "Россия", "Графические", "Российская модель Сбера для генерации и редактирования изображений.", "Создает картинки по описанию и хорошо подходит для русскоязычных пользователей."],
  ["Шедеврум", "Россия", "Графические", "Приложение Яндекса для генерации изображений и короткого визуального контента.", "Простой способ сделать картинку по русскому описанию без сложных настроек."],
  ["Fusion Brain", "Россия", "Графические", "Платформа генерации изображений на базе Kandinsky.", "Подходит для быстрых визуальных экспериментов и API-интеграций."],
  ["ArtGeneration", "Россия", "Графические", "Российский сервис для ИИ-изображений и творческих задач.", "Можно использовать как дополнительный инструмент для генерации картинок."],
  ["ruDALL-E / Kandinsky legacy", "Россия", "Графические", "Российские open-source и исследовательские модели генерации изображений.", "Полезно как историческая и экспериментальная база для локальных решений."],

  ["Runway", "США", "Видео", "Генерация и редактирование видео.", "Подходит для роликов, рекламы и творческих видео-задач."],
  ["Pika", "США", "Видео", "Короткие ИИ-ролики по описанию.", "Удобна для простого входа в генерацию видео."],
  ["Luma Dream Machine", "США", "Видео", "Генерация видео и 3D-сцен.", "Полезна для движущихся сцен и визуальных экспериментов."],
  ["Adobe Firefly Video", "США", "Видео", "Видео-инструменты Adobe.", "Подходит для дизайнеров и коммерческого контента."],
  ["Google Veo", "США", "Видео", "Видео-модель Google.", "Перспективный провайдер качественного ИИ-видео."],
  ["Meta Movie Gen", "США", "Видео", "Видео и аудио от Meta.", "Важный бренд для будущих мультимодальных возможностей."],
  ["Higgsfield", "США", "Видео", "Создание динамичных роликов.", "Полезен для соцсетей, промо и визуальных эффектов."],
  ["Sora", "США", "Видео", "Бренд OpenAI для видео; статус API нужно проверять.", "Перед подключением важно проверить текущую доступность и условия."],
  ["Kling AI", "Китай", "Видео", "Видео от Kuaishou.", "Один из заметных китайских генераторов видео."],
  ["Hailuo AI", "Китай", "Видео", "Видео-инструменты MiniMax.", "Удобен для коротких роликов по тексту."],
  ["Vidu", "Китай", "Видео", "Китайская генерация видео.", "Полезен для альтернативных видео-сценариев."],
  ["PixVerse", "Китай", "Видео", "Создание коротких видео.", "Подходит для быстрых роликов и клипов."],
  ["Jimeng Video", "Китай", "Видео", "Видео от ByteDance.", "Интересен для контента и социальных форматов."],
  ["Tencent Hunyuan Video", "Китай", "Видео", "Видео-модели Tencent.", "Крупный китайский провайдер для видео-направления."],
  ["Baidu MuseSteamer", "Китай", "Видео", "Видео-инструменты Baidu.", "Стоит отслеживать для китайского рынка."],
  ["Шедеврум Видео", "Россия", "Видео", "Видео-направление Яндекса в рамках визуальных ИИ-инструментов.", "Подходит для простого входа в русскоязычный ИИ-видео контент, доступность API нужно проверять."],
  ["Kandinsky Video", "Россия", "Видео", "Видео-направление экосистемы Kandinsky/Сбер.", "Перспективный российский инструмент для генерации коротких видео, статус API нужно проверять."],
  ["Visper", "Россия", "Видео", "Российская платформа для видео с виртуальными ведущими.", "Полезна для обучающих роликов, презентаций и видеообращений."],
  ["Movavi AI", "Россия", "Видео", "ИИ-функции в видеоредакторе Movavi.", "Подходит для монтажа, улучшения видео и простых пользовательских сценариев."],

  ["OpenAI Audio", "США", "Звук", "Речь, озвучка и распознавание.", "Помогает переводить голос в текст и создавать речь."],
  ["ElevenLabs", "США", "Звук", "Реалистичные голоса и озвучка.", "Удобен для дикторов, аудиоуроков и роликов."],
  ["Suno", "США", "Звук", "Генерация музыки.", "Создает песни и музыкальные идеи по описанию."],
  ["Udio", "США", "Звук", "Генерация музыки.", "Подходит для музыкальных черновиков и песен."],
  ["Google MusicFX", "США", "Звук", "Музыкальные ИИ-инструменты Google.", "Полезен для экспериментов с музыкой."],
  ["Adobe Enhance Speech", "США", "Звук", "Очистка речи.", "Помогает улучшить запись голоса."],
  ["Meta AudioCraft", "США", "Звук", "Аудиомодели Meta.", "Интересен для генерации и исследования звука."],
  ["MiniMax Speech", "Китай", "Звук", "Голосовые модели MiniMax.", "Подходит для озвучки и речевых функций."],
  ["MiniMax Music", "Китай", "Звук", "Музыкальные модели MiniMax.", "Китайская альтернатива для музыки."],
  ["Qwen Audio", "Китай", "Звук", "Аудио-возможности Qwen.", "Может понимать и обрабатывать звук."],
  ["CosyVoice", "Китай", "Звук", "Голосовые технологии Alibaba.", "Полезны для озвучки и синтеза речи."],
  ["iFlytek Spark Speech", "Китай", "Звук", "Речевые технологии iFlytek.", "Крупный игрок в распознавании и синтезе речи."],
  ["ByteDance Seed Audio", "Китай", "Звук", "Аудио-модели ByteDance.", "Перспективно для голоса и музыки."],
  ["Tencent Hunyuan Voice", "Китай", "Звук", "Голосовые функции Tencent.", "Дополнительный китайский провайдер звука."],
  ["Yandex SpeechKit", "Россия", "Звук", "Распознавание и синтез речи от Яндекса.", "Помогает превращать голос в текст и озвучивать ответы на русском языке."],
  ["SaluteSpeech", "Россия", "Звук", "Речевые технологии Сбера для распознавания и синтеза речи.", "Подходит для голосовых ботов, дикторов и доступного интерфейса."],
  ["Звук AI", "Россия", "Звук", "ИИ-функции музыкальной экосистемы Звук.", "Перспективно для рекомендаций, музыки и аудио-сценариев, статус API нужно проверять."],
  ["Voximplant Kit AI", "Россия", "Звук", "Голосовые боты, распознавание речи и автоматизация звонков.", "Полезен для голосовых помощников и поддержки пользователей."],

  ["ChatGPT Agent", "США", "ИИ-агенты", "Помощник, который может планировать и выполнять действия.", "Полезен, когда задача состоит из нескольких шагов."],
  ["Claude Computer Use", "США", "ИИ-агенты", "Работа с экраном и интерфейсами.", "Может помогать выполнять действия в программах."],
  ["Gemini Gems", "США", "ИИ-агенты", "Персональные помощники Google.", "Удобны для повторяющихся задач и настроенных ролей."],
  ["Perplexity Labs", "США", "ИИ-агенты", "ИИ-исследование и выполнение задач.", "Полезно для сбора информации и подготовки материалов."],
  ["OpenAI Assistants", "США", "ИИ-агенты", "API для помощников и инструментов.", "База для создания собственных функций платформы."],
  ["LangGraph", "США", "ИИ-агенты", "Оркестрация агентных workflow.", "Помогает строить сложные цепочки действий."],
  ["CrewAI", "США", "ИИ-агенты", "Команды ИИ-агентов.", "Подходит для сценариев, где разные агенты выполняют роли."],
  ["AutoGPT", "США", "ИИ-агенты", "Автономные задачи.", "Исторически важный инструмент для агентного подхода."],
  ["Devin", "США", "ИИ-агенты", "ИИ-агент для разработки.", "Может выполнять задачи программиста."],
  ["Replit Agent", "США", "ИИ-агенты", "ИИ-разработка в Replit.", "Помогает создавать приложения и сайты."],
  ["Cursor Agent", "США", "ИИ-агенты", "ИИ-помощник в редакторе кода.", "Ускоряет разработку и исправление ошибок."],
  ["Coze", "Китай", "ИИ-агенты", "Платформа ботов ByteDance.", "Позволяет создавать ботов и сценарии без сложного кода."],
  ["Dify", "Китай", "ИИ-агенты", "Платформа workflow и ИИ-приложений.", "Полезна для быстрого прототипирования ИИ-сервисов."],
  ["Kimi Agent", "Китай", "ИИ-агенты", "Агентные возможности Moonshot.", "Подходит для длинных задач и документов."],
  ["Qwen Agent", "Китай", "ИИ-агенты", "Агентный стек Alibaba.", "Перспективен для китайской ИИ-экосистемы."],
  ["AutoGLM", "Китай", "ИИ-агенты", "Агенты Z.ai.", "Может выполнять действия и управлять сценариями."],
  ["Manus", "Китай", "ИИ-агенты", "Универсальный ИИ-агент.", "Полезен как ориентир для самостоятельных задач."],
  ["Baidu AgentBuilder", "Китай", "ИИ-агенты", "Создание агентов Baidu.", "Инструмент для агентных приложений в китайской экосистеме."],
  ["Tencent Yuanqi", "Китай", "ИИ-агенты", "Платформа агентов Tencent.", "Подходит для ботов и автоматизации."],
  ["MiniMax Agent", "Китай", "ИИ-агенты", "Агентные функции MiniMax.", "Дополняет текст, голос и видео в одной экосистеме."],
  ["Yandex Cloud AI Agents", "Россия", "ИИ-агенты", "Инструменты Яндекс Облака для ассистентов и сценариев с ИИ.", "Можно использовать как основу для помощников, которые работают с российской инфраструктурой."],
  ["GigaChat Assistants API", "Россия", "ИИ-агенты", "Ассистенты и агентные сценарии на базе GigaChat.", "Подходит для помощников, которые умеют работать с файлами, функциями и бизнес-логикой."],
  ["SaluteBot", "Россия", "ИИ-агенты", "Платформа Сбера для чат-ботов и ассистентов.", "Можно использовать для сценариев поддержки, обучения и автоматизации в мессенджерах."],
  ["Яндекс Диалоги / Алиса", "Россия", "ИИ-агенты", "Навыки и сценарии для голосового помощника Алиса.", "Подходит для голосовых сценариев и простых пользовательских помощников."],
  ["Aimylogic", "Россия", "ИИ-агенты", "Платформа для чат-ботов и голосовых ассистентов.", "Помогает строить диалоговых помощников без сложного программирования."]
];

function setupPrefs() {
  const savedTheme = localStorage.getItem("ai-school-theme");
  const savedLarge = localStorage.getItem("ai-school-large");
  const savedSimple = localStorage.getItem("ai-school-simple");
  const savedCompact = localStorage.getItem("ai-school-sidebar-compact");
  const savedHelperCollapsed = localStorage.getItem("ai-school-helper-collapsed");
  const advisor = localStorage.getItem("ai-school-advisor") || "beginner";
  if (savedTheme === "dark") root.classList.add("dark");
  if (savedLarge === "true") root.classList.add("large");
  if (savedSimple === "true") root.classList.add("simple");
  if (savedCompact === "true") root.classList.add("sidebar-compact");
  root.classList.remove("sidebar-hidden");
  if (isWorkspacePage && savedHelperCollapsed === "true") root.classList.add("helper-collapsed");
  root.dataset.advisor = advisor;
}

function renderSidebar() {
  const sidebar = document.querySelector("[data-sidebar]");
  if (!sidebar) return;
  sidebar.innerHTML = `
    <button class="mobile-menu-close" type="button" data-mobile-menu-close aria-label="Закрыть меню">×</button>
    <a class="brand" href="index.html">
      <img src="assets/promptalogoю.png" alt="ai school logo">
      <strong>ai school</strong>
      <span>Нейросети простым языком для 40+</span>
    </a>
    <nav class="nav" aria-label="Главное меню">
      ${navItems.map((item) => `
        <a class="${currentPage === item.href ? "active" : ""} ${item.roadmap ? "roadmap-link" : ""} ${item.survey ? "survey-link" : ""}" href="${item.href}" ${item.external ? 'target="_blank" rel="noopener"' : ""}>
          <span class="nav-left">${icons[item.icon]}<span>${item.label}</span></span>
        </a>
      `).join("")}
    </nav>
    <div class="sidebar-note"><strong>Совет</strong><span id="randomTip"></span></div>
  `;
  rotateTip();
}

function renderLayoutControls() {
  if (!document.querySelector("[data-sidebar-compact-toggle]")) {
    const compact = document.createElement("button");
    compact.className = "sidebar-round-toggle sidebar-compact-toggle";
    compact.type = "button";
    compact.setAttribute("data-sidebar-compact-toggle", "");
    compact.setAttribute("aria-label", "Свернуть меню до иконок");
    compact.innerHTML = '<span aria-hidden="true">‹</span>';
    document.body.append(compact);
  }
  updateSidebarToggleIcons();
  updateHelperToggleIcon();
}

function updateSidebarToggleIcons() {
  const compact = document.querySelector("[data-sidebar-compact-toggle]");
  if (compact) {
    compact.innerHTML = root.classList.contains("sidebar-compact") ? '<span aria-hidden="true">›</span>' : '<span aria-hidden="true">‹</span>';
  }
}

function updateHelperToggleIcon() {
  const helperToggle = document.querySelector("[data-helper-collapse]");
  if (!helperToggle) return;
  const collapsed = root.classList.contains("helper-collapsed");
  helperToggle.innerHTML = collapsed ? '<span aria-hidden="true">‹</span>' : '<span aria-hidden="true">›</span>';
  helperToggle.setAttribute("aria-label", collapsed ? "Развернуть помощника" : "Свернуть помощника");
  helperToggle.setAttribute("title", collapsed ? "Развернуть помощника" : "Свернуть помощника");
}

function resetLegacySidebarState() {
  if (localStorage.getItem("ai-school-sidebar-hidden") === "true") {
    localStorage.setItem("ai-school-sidebar-hidden", "false");
  }
}

function renderIntroModal() {
  if (sessionStorage.getItem("prompta-intro-closed") === "true") return;
  const modal = document.createElement("div");
  modal.className = "intro-modal";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.innerHTML = `
    <div class="intro-card">
      <p>Друзья, привет! 👋 Это Сергей Бежаев, создатель ИИ-агрегатора "Prompta". Я запускаю первые тесты SA-v.01/01 — будущей платформы, которая поможет людям проще знакомиться с нейросетями, основной наш уклон идёт на более старшую аудиторию 🤖 Пока это только прототип: функции ещё недоступны, но вы уже можете посмотреть интерфейс и подсказать, что улучшить, если пройдёте опрос по кнопке находящейся в меню слева ❤️</p>
      <button class="primary-btn" type="button" data-intro-close>Удачи Беж</button>
    </div>
  `;
  document.body.append(modal);
}

function renderMobileMenuButton() {
  if (document.querySelector("[data-mobile-menu-toggle]")) return;
  const button = document.createElement("button");
  button.className = "mobile-droid-menu";
  button.type = "button";
  button.setAttribute("data-mobile-menu-toggle", "");
  button.setAttribute("aria-label", "Открыть меню");
  button.innerHTML = `<img src="${transparentPixel}" alt="" data-mobile-droid><span>Меню</span>`;
  const overlay = document.createElement("button");
  overlay.className = "mobile-menu-overlay";
  overlay.type = "button";
  overlay.setAttribute("data-mobile-menu-close", "");
  overlay.setAttribute("aria-label", "Закрыть меню");
  document.body.append(button, overlay);
}

function rotateTip() {
  const tipNode = document.querySelector("#randomTip");
  if (!tipNode) return;
  const show = () => {
    const index = Math.floor(Math.random() * tips.length);
    tipNode.textContent = tips[index];
  };
  show();
  setInterval(show, 9000);
}

function bindControls() {
  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    const update = () => {
      const dark = root.classList.contains("dark");
      button.setAttribute("aria-label", dark ? "Включить светлую тему" : "Включить темную тему");
      button.innerHTML = dark ? moonIcon() : sunIcon();
    };
    button.addEventListener("click", () => {
      root.classList.toggle("dark");
      localStorage.setItem("ai-school-theme", root.classList.contains("dark") ? "dark" : "light");
      update();
    });
    update();
  });

  document.querySelectorAll("[data-large-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      root.classList.toggle("large");
      localStorage.setItem("ai-school-large", String(root.classList.contains("large")));
    });
  });

  document.querySelectorAll("[data-simple-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      root.classList.toggle("simple");
      localStorage.setItem("ai-school-simple", String(root.classList.contains("simple")));
    });
  });

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-insert]");
    if (!button) return;
      const target = document.querySelector(button.dataset.target || "#mainPrompt");
      if (!target) return;
      target.value = button.dataset.insert;
      target.focus();
      button.closest(".prompt-menu")?.removeAttribute("open");
  });

  document.querySelectorAll("[data-sidebar-compact-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      root.classList.toggle("sidebar-compact");
      localStorage.setItem("ai-school-sidebar-compact", String(root.classList.contains("sidebar-compact")));
      localStorage.setItem("ai-school-sidebar-hidden", "false");
      updateSidebarToggleIcons();
    });
  });

  document.querySelectorAll("[data-helper-collapse]").forEach((button) => {
    button.addEventListener("click", () => {
      root.classList.toggle("helper-collapsed");
      localStorage.setItem("ai-school-helper-collapsed", String(root.classList.contains("helper-collapsed")));
      updateHelperToggleIcon();
    });
  });

  document.querySelectorAll("[data-intro-close]").forEach((button) => {
    button.addEventListener("click", () => {
      sessionStorage.setItem("prompta-intro-closed", "true");
      button.closest(".intro-modal")?.remove();
    });
  });

  document.querySelectorAll("[data-learning-track]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.learningTrack;
      document.querySelectorAll("[data-learning-track]").forEach((node) => node.classList.toggle("active", node === button));
      document.querySelectorAll("[data-track-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.trackPanel === target));
    });
  });

  document.querySelectorAll("[data-mobile-menu-toggle]").forEach((button) => {
    button.addEventListener("click", () => root.classList.add("menu-open"));
  });

  document.querySelectorAll("[data-mobile-menu-close]").forEach((button) => {
    button.addEventListener("click", () => root.classList.remove("menu-open"));
  });

  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => root.classList.remove("menu-open"));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") root.classList.remove("menu-open");
  });

  document.querySelectorAll("[data-advisor-mode]").forEach((input) => {
    input.checked = input.value === root.dataset.advisor;
    input.addEventListener("change", () => {
      if (!input.checked) return;
      root.dataset.advisor = input.value;
      localStorage.setItem("ai-school-advisor", input.value);
    });
  });
}

function setupLearningTimer() {
  const totalKey = "ai-school-active-seconds";
  const lastKey = "ai-school-last-activity";
  const lastTickKey = "ai-school-last-tick";
  const idleLimit = 20 * 60 * 1000;
  const now = Date.now();
  if (!localStorage.getItem(lastKey)) localStorage.setItem(lastKey, String(now));
  if (!localStorage.getItem(lastTickKey)) localStorage.setItem(lastTickKey, String(now));

  const markActive = () => localStorage.setItem(lastKey, String(Date.now()));
  ["click", "keydown", "pointerdown", "input"].forEach((eventName) => {
    document.addEventListener(eventName, markActive, { passive: true });
  });

  const tick = () => {
    const current = Date.now();
    const lastActivity = Number(localStorage.getItem(lastKey) || current);
    const lastTick = Number(localStorage.getItem(lastTickKey) || current);
    if (current - lastActivity <= idleLimit) {
      const add = Math.max(0, Math.min(60, Math.round((current - lastTick) / 1000)));
      const total = Number(localStorage.getItem(totalKey) || 0) + add;
      localStorage.setItem(totalKey, String(total));
    }
    localStorage.setItem(lastTickKey, String(current));
    renderLearningStats();
  };

  tick();
  setInterval(tick, 60000);
}

function renderLearningStats() {
  const total = Number(localStorage.getItem("ai-school-active-seconds") || 0);
  const hours = Math.floor(total / 3600);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;
  const remainingHours = hours % 24;
  const values = {
    progress: "18%",
    score: "82%",
    weeks: `${weeks} нед.`,
    days: `${remainingDays} дн.`,
    hours: `${remainingHours} ч.`
  };
  document.querySelectorAll("[data-learning-stat]").forEach((node) => {
    node.textContent = values[node.dataset.learningStat] || "";
  });
}

function sunIcon() {
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M19.8 4.2l-2.1 2.1M6.3 17.7l-2.1 2.1"/></svg>';
}

function moonIcon() {
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 15.5A8 8 0 0 1 8.5 5a8.5 8.5 0 1 0 10.5 10.5Z"/></svg>';
}

function renderCatalog() {
  const container = document.querySelector("#catalog");
  if (!container) return;
  const queryInput = document.querySelector("#searchTools");
  const regionSelect = document.querySelector("#regionFilter");
  const categories = ["Текстовые", "Графические", "Видео", "Звук", "ИИ-агенты"];
  const categoryIcons = {
    "Текстовые": '<svg viewBox="0 0 24 24"><path d="M5 4h14v16H5V4Z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
    "Графические": '<svg viewBox="0 0 24 24"><path d="M4 5h16v14H4V5Z"/><path d="m7 16 4-4 3 3 2-2 3 3"/><circle cx="9" cy="9" r="1.5"/></svg>',
    "Видео": '<svg viewBox="0 0 24 24"><path d="M4 6h12v12H4V6Z"/><path d="m16 10 4-2v8l-4-2"/></svg>',
    "Звук": '<svg viewBox="0 0 24 24"><path d="M5 10v4h4l5 4V6l-5 4H5Z"/><path d="M17 9c1 1 1 5 0 6M20 7c2 3 2 7 0 10"/></svg>',
    "ИИ-агенты": '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/></svg>'
  };

  const draw = () => {
    const query = (queryInput?.value || "").trim().toLowerCase();
    const region = regionSelect?.value || "all";
    container.innerHTML = categories.map((cat) => {
      const list = tools.filter(([name, country, toolCat, note, beginner]) => {
        const haystack = `${name} ${country} ${toolCat} ${note} ${beginner}`.toLowerCase();
        return toolCat === cat && (region === "all" || country === region) && haystack.includes(query);
      });
      const items = list.map(([name, country, , note, beginner]) => {
        const countryClass = country === "США" ? "us" : country === "Китай" ? "cn" : country === "Россия" ? "ru" : "";
        return `<button class="tool-pill" type="button" data-beginner="${escapeAttr(beginner)}">
          <span class="tool-title">${renderToolLogo(name)}<strong>${name}</strong></span>
          <span>${note}</span>
          <span class="meta"><span class="tag ${countryClass}">${country}</span></span>
        </button>`;
      }).join("");
      return `<details class="category-block">
        <summary class="category-title">
          <span class="category-name"><span class="section-icon" aria-hidden="true">${categoryIcons[cat] || ""}</span><span><strong>${cat}</strong><small>${list.length} сервисов</small></span></span>
          <span class="arrow" aria-hidden="true">⌄</span>
        </summary>
        <div class="tool-list">${items}</div>
      </details>`;
    }).join("");
  };

  [queryInput, regionSelect].forEach((node) => node?.addEventListener("input", draw));
  draw();
}

function escapeAttr(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function renderToolLogo(name) {
  const domain = toolLogoDomain(name);
  const initials = getInitials(name);
  const image = domain
    ? `<img class="tool-logo-img" src="https://www.google.com/s2/favicons?domain=${escapeAttr(domain)}&sz=64" alt="" loading="lazy" onload="this.closest('.tool-logo').classList.add('has-image')" onerror="this.remove()">`
    : "";
  return `<span class="tool-logo" aria-hidden="true">${image}<span class="tool-initials">${escapeAttr(initials)}</span></span>`;
}

function getInitials(name) {
  return name
    .replaceAll("/", " ")
    .replaceAll("-", " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function toolLogoDomain(name) {
  const value = name.toLowerCase();
  const domains = [
    ["chatgpt", "openai.com"],
    ["openai", "openai.com"],
    ["sora", "openai.com"],
    ["dall", "openai.com"],
    ["claude", "anthropic.com"],
    ["gemini", "gemini.google.com"],
    ["google", "google.com"],
    ["imagen", "deepmind.google"],
    ["veo", "deepmind.google"],
    ["grok", "x.ai"],
    ["perplexity", "perplexity.ai"],
    ["llama", "ai.meta.com"],
    ["meta", "meta.com"],
    ["command r", "cohere.com"],
    ["mistral", "mistral.ai"],
    ["deepseek", "deepseek.com"],
    ["qwen", "qwen.ai"],
    ["ernie", "baidu.com"],
    ["baidu", "baidu.com"],
    ["hunyuan", "hunyuan.tencent.com"],
    ["tencent", "tencent.com"],
    ["kimi", "kimi.moonshot.cn"],
    ["moonshot", "moonshot.cn"],
    ["glm", "z.ai"],
    ["z.ai", "z.ai"],
    ["minimax", "minimax.io"],
    ["doubao", "doubao.com"],
    ["baichuan", "baichuan-ai.com"],
    ["sensenova", "sensetime.com"],
    ["sparkdesk", "xinghuo.xfyun.cn"],
    ["stepfun", "stepfun.com"],
    ["internlm", "internlm.org"],
    ["yandex", "yandex.ru"],
    ["яндекс", "yandex.ru"],
    ["giga", "developers.sber.ru"],
    ["sber", "sber.ru"],
    ["салют", "developers.sber.ru"],
    ["salute", "developers.sber.ru"],
    ["aithoria", "aithoria.ai"],
    ["gerwin", "gerwin.io"],
    ["turbotext", "turbotext.ru"],
    ["midjourney", "midjourney.com"],
    ["adobe", "adobe.com"],
    ["firefly", "firefly.adobe.com"],
    ["leonardo", "leonardo.ai"],
    ["ideogram", "ideogram.ai"],
    ["recraft", "recraft.ai"],
    ["higgsfield", "higgsfield.ai"],
    ["tongyi", "tongyi.aliyun.com"],
    ["alibaba", "alibabacloud.com"],
    ["kling", "klingai.com"],
    ["kolors", "kwai.com"],
    ["jimeng", "jimeng.jianying.com"],
    ["liblib", "liblib.art"],
    ["seaart", "seaart.ai"],
    ["kandinsky", "fusionbrain.ai"],
    ["шедеврум", "shedevrum.ai"],
    ["fusion brain", "fusionbrain.ai"],
    ["artgeneration", "artgeneration.me"],
    ["runway", "runwayml.com"],
    ["pika", "pika.art"],
    ["luma", "lumalabs.ai"],
    ["hailuo", "hailuoai.video"],
    ["vidu", "vidu.studio"],
    ["pixverse", "pixverse.ai"],
    ["visper", "visper.tech"],
    ["movavi", "movavi.com"],
    ["elevenlabs", "elevenlabs.io"],
    ["suno", "suno.com"],
    ["udio", "udio.com"],
    ["audiocraft", "ai.meta.com"],
    ["cosyvoice", "alibabacloud.com"],
    ["iflytek", "xfyun.cn"],
    ["bytedance", "bytedance.com"],
    ["seed audio", "bytedance.com"],
    ["speechkit", "cloud.yandex.ru"],
    ["звук", "zvuk.com"],
    ["voximplant", "voximplant.com"],
    ["langgraph", "langchain.com"],
    ["crewai", "crewai.com"],
    ["autogpt", "agpt.co"],
    ["devin", "cognition.ai"],
    ["replit", "replit.com"],
    ["cursor", "cursor.com"],
    ["coze", "coze.com"],
    ["dify", "dify.ai"],
    ["manus", "manus.im"],
    ["aimylogic", "aimylogic.com"],
    ["алиса", "alice.yandex.ru"]
  ];
  return domains.find(([key]) => value.includes(key))?.[1] || "";
}

function bindHelper() {
  const helperAnswers = {
    start: "Начните с одной простой фразы: что вы хотите получить и для кого. Например: 'Напиши понятное объявление для соседей о встрече во дворе'.",
    file: "Если нужно загрузить файл, сначала проверьте название файла и место, где он лежит. Хорошая подсказка: 'Прочитай этот документ и объясни простыми словами'.",
    prompt: "Хороший запрос состоит из 4 частей: задача, контекст, формат ответа и ограничение. Например: 'Объясни простыми словами, списком из 5 пунктов'.",
    safety: "Не отправляйте паспорт, коды из SMS, банковские данные и чужие личные сведения. Для обучения лучше использовать вымышленные примеры."
  };
  document.querySelectorAll("[data-helper]").forEach((button) => {
    button.addEventListener("click", () => {
      const box = document.querySelector("#helperAnswer");
      if (box) setOutput(box, helperAnswers[button.dataset.helper] || "");
    });
  });
}

function bindWorkspaceChat() {
  const runButton = document.querySelector("[data-run-main]");
  const promptBox = document.querySelector("#mainPrompt");
  const answerBox = document.querySelector("#mainAnswer");
  const providerSelect = document.querySelector("#providerSelect");
  if (!runButton || !promptBox || !answerBox) return;

  const sendPrompt = async () => {
    const prompt = promptBox.value.trim();
    if (!prompt) {
      setOutput(answerBox, "Напишите задачу в поле выше. Можно обычными словами, как человеку.");
      promptBox.focus();
      return;
    }

    runButton.disabled = true;
    runButton.textContent = "Думаю...";
    setOutput(answerBox, "Отправляю задачу на сервер. Сейчас ответ появится здесь.");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: providerSelect?.value || "auto",
          prompt
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Серверная часть пока не ответила.");
      }
      setOutput(answerBox, `${data.providerLabel || "ИИ-сервис"}:\n\n${data.answer}`);
    } catch (error) {
      setOutput(answerBox, [
        "Пока не получилось получить ответ.",
        "",
        "Что проверить:",
        "1. Сайт должен быть открыт на Vercel, потому что GitHub Pages не умеет запускать серверные API.",
        "2. В Vercel должны быть добавлены API-ключи из файла в Environment Variables.",
        "3. После добавления ключей нужно сделать новый деплой проекта.",
        "",
        `Техническая причина: ${error.message}`
      ].join("\n"));
    } finally {
      runButton.disabled = false;
      runButton.textContent = "Запустить";
    }
  };

  runButton.addEventListener("click", sendPrompt);

  promptBox.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" || event.shiftKey || event.isComposing) return;
    event.preventDefault();
    if (!runButton.disabled) sendPrompt();
  });
}

function setOutput(node, text) {
  node.textContent = "";
  const fragment = document.createDocumentFragment();
  String(text).split("\n").forEach((line, index) => {
    if (index) fragment.append(document.createElement("br"));
    fragment.append(...linkify(line));
  });
  node.append(fragment);
}

function linkify(text) {
  const parts = [];
  const pattern = /(https?:\/\/[^\s]+)/g;
  let lastIndex = 0;
  for (const match of text.matchAll(pattern)) {
    if (match.index > lastIndex) parts.push(document.createTextNode(text.slice(lastIndex, match.index)));
    const link = document.createElement("a");
    link.href = match[0];
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = match[0];
    parts.push(link);
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(document.createTextNode(text.slice(lastIndex)));
  return parts.length ? parts : [document.createTextNode(text)];
}

setupPrefs();
resetLegacySidebarState();
renderSidebar();
renderLayoutControls();
renderMobileMenuButton();
renderIntroModal();
bindControls();
renderCatalog();
bindHelper();
bindWorkspaceChat();
setupLearningTimer();
loadDroidFrames(setupDroid);

function loadDroidFrames(callback) {
  if (window.droidFrames?.length) {
    callback();
    return;
  }
  const script = document.createElement("script");
  script.src = "droid-frames.js";
  script.onload = callback;
  script.onerror = callback;
  document.head.appendChild(script);
}

function setupDroid() {
  const frames = window.droidFrames?.length ? window.droidFrames : ["assets/droid.png"];
  const images = document.querySelectorAll("[data-droid-face], [data-mobile-droid]");
  if (!images.length) return;
  let index = 0;
  images.forEach((image) => {
    image.src = frames[index];
  });
  const changeFrame = () => {
    index = (index + 1) % frames.length;
    images.forEach((image) => image.classList.add("is-blinking"));
    setTimeout(() => {
      images.forEach((image) => {
        image.src = frames[index];
        image.classList.remove("is-blinking");
      });
    }, 150);
  };
  setInterval(changeFrame, 2600);
}
