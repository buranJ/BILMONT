# Bilmont School — лендинг

Одностраничный сайт школы Bilmont (Бишкек, Кыргызстан). Структура повторяет
макет **Flowblox**: кремовый фон, тёплая минималистика, крупные скруглённые
карточки, типографика Playfair Display + Inter. Три языка — **KG · RU · EN**.

> Контент пока временный (школьная тема-заглушка) — тексты меняются через файлы
> в `src/locales/`, без правки компонентов.

## Стек

- **React 18** + **Vite**
- **Tailwind CSS v3**
- **React Router v6** (под будущие страницы)
- **i18next** + **react-i18next** (KG / RU / EN)
- Google Fonts: Playfair Display + Inter

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
│   │   └── sections/         # Hero, MentorSlider, FeatureGrid
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

Положите изображения в `public/assets/images/`:

- `mentor-1.jpg … mentor-6.jpg` — портреты для слайдера Hero;
- `feature-1.jpg`, `feature-2.jpg` — фото-плитки в сетке фич.

Пока файлов нет — слайдер и плитки показывают цветные заглушки, ничего не ломается.

## Локализация

Все тексты — в `src/locales/{ru,en,kg}.json`. Переключение языка — пилюлей
`KG · RU · EN` в шапке (выбор сохраняется в `localStorage`). Язык по умолчанию — `ru`.

## Дальше

- [ ] Реальные фото менторов и интерьера
- [ ] Финальные тексты и цифры школы
- [ ] Мобильная адаптация (сейчас desktop-first)
- [ ] Секции «Proven Results» и отзывы из макета
- [ ] Страницы admissions / model / contact (роутинг уже готов)

---

© Nawrec Edtech OÜ · admission@bilmont.kg · www.bilmont.kg

# BILMONT
