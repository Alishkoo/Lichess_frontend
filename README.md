## Возможности

- Вход через Lichess (OAuth2, cookie-based)
- Просмотр профиля пользователя (аватар, рейтинги, даты)
- История партий с фильтрацией по типу игры
- Отображение способа завершения партии и контроля времени
- Мобильная адаптивность

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/Alishkoo/Lichess_frontend.git
cd Lichess_frontend
```

### Установите зависимости

```bash
npm install
```

### Настройте переменные окружения 

- Скопируйте файл `.env.example` в `.env` и при необходимости измените `VITE_API_BASE_URL` на адрес вашего backend:

```bash
cp .env.example .env
# затем отредактируйте .env при необходимости
```

- Убедитесь, что в backend (FastAPI) переменная окружения `FRONTEND_URL` указывает на адрес фронта (по умолчанию: `http://localhost:5173`)


```bash
npm run dev
```

- Откройте [http://localhost:5173](http://localhost:5173) в браузере


- Для работы авторизации backend и frontend должны быть запущены на одном домене или с настроенным CORS и cookie (credentials: 'include')
- После входа через Lichess происходит редирект обратно на главную страницу фронта

## Структура проекта

- `src/pages` — страницы (LoginPage, HomePage)
- `src/shared/api` — API-клиенты и сервисы
- `src/shared/hooks` — хуки для работы с API
- `src/shared/types` — типы данных
- `src/shared/ui` — переиспользуемые UI-компоненты
- `src/shared/config` — конфиги


