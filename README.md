# Bilmont School — лендинг

Одностраничный сайт школы Bilmont (Бишкек, Кыргызстан). кремовый фон, тёплая минималистика, крупные скруглённые
карточки, типографика Playfair Display + Inter. Три языка — **KG · RU · EN**.

> Контент пока временный (школьная тема-заглушка) — тексты меняются через файлы
> в `src/locales/`, без правки компонентов.

## Стек

- **React 18** + **Vite**
- **Tailwind CSS v3**
- **i18next** + **react-i18next** (KG / RU / EN)
- Шрифты Playfair Display + Inter — self-hosted через `@fontsource-variable`
- Деплой — Netlify (`netlify.toml`)

## Запуск

```bash
npm install
npm run dev      # http://localhost:5173
```

Сборка продакшена:

```bash
npm run build
npm run preview
```

## Структура

```
bilmont-site/
├── public/
│   ├── favicon.svg
│   └── assets/images/        # сюда падают фото менторов и интерьера
├── src/
│   ├── components/
│   │   ├── layout/           # Header, Footer
│   │   ├── ui/               # Button, Logo, LangSwitcher
│   │   └── sections/         # Hero, CurvedShowcase, FeatureGrid, …
│   ├── data/mentors.js       # данные слайдера
│   ├── locales/              # ru.json · en.json · kg.json
│   ├── pages/Home.jsx
│   ├── styles/globals.css
│   ├── i18n.js
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Дизайн-токены (`tailwind.config.js`)

| Токен          | Значение  | Назначение            |
| -------------- | --------- | --------------------- |
| `cream`        | `#F5EFE0` | фон                   |
| `green`        | `#5A7A2A` | акцент / логотип      |
| `green.light`  | `#7A9E3A` | hover / акценты       |
| `green.dark`   | `#3D5A1A` | тёмный зелёный        |
| `navy`         | `#2A4A5A` | вторичный             |
| `dark`         | `#1A1A1A` | текст / тёмные кнопки  |
| `muted`        | `#6B6B6B` | приглушённый текст    |

## Фото

На сайте используются только сжатые WebP из `public/assets/images/`.
Оригиналы в полном размере лежат в `.image-originals/` (в git не попадают).

Чтобы заменить или добавить фото:

1. Положите оригинал в `.image-originals/` с тем же именем, что на сайте
   (например `d-3.jpg` или `kids/2.png`).
2. Запустите `npm run images` — скрипт пережмёт все фото в WebP нужного размера.

Размеры задаются в `scripts/optimize-images.mjs`: фото детей — 420px,
STEM и интерьер — 800px, директор — 900px.

## Локализация

Все тексты — в `src/locales/{ru,en,kg}.json`. Переключение языка — пилюлей
`KG · RU · EN` в шапке (выбор сохраняется в `localStorage`). Язык по умолчанию — `ru`.

