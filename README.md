# Gym Tracker

Приложение для записи тренировок, упражнений и подходов, разработанное на платформе **VK Mini Apps**.

## 🚀 Возможности

- Логирование упражнений, подходов и повторений
- Сохранение истории тренировок
- Поддержка пользовательских шаблонов
- Адаптивный UI под VK Mobile/Desktop
- Анимации и плавные переходы
- Интеграция с VK ID и VK Bridge API

## 🛠️ Технологии и стек

### Frontend

- **React 18**
- **Redux Toolkit** + Redux Persist
- **VKUI 7** — UI-компоненты от VK
- **VK Mini Apps Router**
- **React Router DOM 7**
- **Framer Motion**, **GSAP**, **react-motion**, **Lenis** — для анимаций
- **AOS** и **Rellax** — для скролл-анимаций
- **React Hook Form** — валидация форм
- **React Query** — асинхронное кэширование
- **Axios** — запросы к API

## 📁 Структура проекта

```bash
client/
├── public/                  # Публичные ассеты
│   ├── logo.svg
│   ├── templates.js
│   └── workouts.js
├── src/
│   ├── api/                 # Запросы к backend
│   ├── assets/              # Изображения, иконки и стили
│   ├── components/          # UI-компоненты
│   ├── helpers/             # Утилиты
│   ├── panels/              # VKUI панели
│   ├── views/               # Основные экраны
│   ├── store/               # Redux store
│   ├── routes.js            # Конфигурация маршрутов
│   ├── App.jsx              # Корневой компонент
│   └── main.js              # Точка входа
├── config.js                # Конфигурации
├── vite.config.js           # Vite конфигурация
├── vk-hosting-config.json   # Конфиг для деплоя в VK
└── package.json             # Зависимости и скрипты
```

> 🧩 с документацией серверной части можете ознакомиться [здесь](https://github.com/Segun228/gym_tracker_backend)

## ⚙️ Установка и запуск

```bash
# Установить зависимости
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build
```


## 🔐 Переменные окружения

Для корректной работы проекта требуется файл `.env` в корне проекта. Пример содержимого:

```env
# SECRET KEY
SECRET_KEY = [your django secret key]

# VK APP TOKEN
VK_APP_TOKEN = [your token]

DATABASE_URL = [your db url]
```

📌 **Важно:**  
- Все переменные должны начинаться с `REACT_APP_` — иначе они не попадут в сборку Create React App.  
- Файл `.env` **не должен попадать в репозиторий** — добавь его в `.gitignore`.

Если ты используешь `docker-compose`, можешь создать `.env.docker` и подключить его явно через:

```yaml
env_file:
  - .env.docker
```