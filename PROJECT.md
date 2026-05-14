# Video Rubyshop — Project Overview

## Stack
- **Backend**: Laravel (PHP 8.3), Inertia.js
- **Frontend**: React + TypeScript, Vite, TailwindCSS v4
- **Database**: MySQL 8.0
- **Cache/Queue**: Redis
- **Video Processing**: Node.js worker (`nodejs-worker/`) + FFmpeg → HLS
- **Auth**: Laravel Sanctum + Google OAuth
- **Server**: nginx + PHP-FPM via Supervisor inside Docker

## Repository
```
https://github.com/rubydeveloper168-creator/video-rubyshop.git
```

---

## Local Development (Docker)

### First-time setup
```bash
# 1. Clone
git clone https://github.com/rubydeveloper168-creator/video-rubyshop.git
cd video-rubyshop

# 2. Copy env
cp .env.docker.local .env
# Fill in APP_KEY (copy from server .env) and any API keys

# 3. Start containers
docker compose up -d --build

# 4. Install PHP dependencies
docker exec video_app bash -c "cd /var/www/html && composer install"

# 5. Fix permissions
docker exec video_app bash -c "
  mkdir -p /var/www/html/bootstrap/cache /var/www/html/storage/framework/{cache,sessions,views} /var/www/html/storage/logs
  chmod -R 777 /var/www/html/bootstrap/cache /var/www/html/storage
"

# 6. Run migrations
docker exec video_app bash -c "cd /var/www/html && php artisan migrate --force"

# 7. Build frontend assets
docker exec video_app bash -c "cd /var/www/html && npm install && npm run build"
```

### Daily usage
```bash
docker compose up -d          # start all containers
docker compose down           # stop all containers
docker compose restart app    # restart only the app
```

### Containers

| Container     | Purpose                        | Port (host)               |
|---------------|--------------------------------|---------------------------|
| `video_app`   | Laravel + nginx + PHP-FPM      | http://localhost:8080      |
| `video_mysql` | MySQL 8.0                      | localhost:3307             |
| `video_redis` | Redis 7                        | localhost:6380             |
| `video_mailhog` | Email testing UI             | http://localhost:8025      |

### Useful commands
```bash
# Artisan
docker exec video_app bash -c "cd /var/www/html && php artisan <command>"

# Clear all caches
docker exec video_app bash -c "cd /var/www/html && php artisan config:clear && php artisan cache:clear && php artisan view:clear"

# View logs
docker compose logs -f app
tail -f storage/logs/laravel.log

# MySQL shell
docker exec -it video_mysql mysql -uvideo_user -pvideo_pass video_lms
```

---

## Environment Variables (local)

Key vars in `.env` for local dev:

```env
APP_URL=http://localhost:8080
DB_HOST=mysql          # Docker service name
REDIS_HOST=redis        # Docker service name
MAIL_HOST=mailhog       # MailHog for local email

# Google OAuth — must also add localhost:8080 callback in Google Console
GOOGLE_STATUS=true
GOOGLE_CLIENT_ID=387070054462-...
GOOGLE_REDIRECT_URI=http://localhost:8080/auth/google/callback

# HLS video processor (nodejs-worker must be running)
VIDEO_PROCESSOR_URL=http://localhost:3112
```

---

## Video Upload Flow (HLS)

1. User uploads MP4 via **Curriculum → Lesson** (NOT the course create page)
2. PHP stores the raw video in `storage/app/public/lessons/`
3. PHP calls `VIDEO_PROCESSOR_URL/process-video` (the nodejs-worker)
4. nodejs-worker runs FFmpeg → converts to HLS segments in `public/hls/{video_id}/`
5. Callback sent to Laravel when processing is done

### Running the nodejs-worker locally
```bash
cd nodejs-worker
npm install
node nodejs-worker-for-lms.js
# Runs on port 3112, requires FFmpeg installed on host
```

Install FFmpeg on Mac:
```bash
brew install ffmpeg
```

---

## Known Issues & Fixes Applied

### 1. `*.ts` in .gitignore blocked TypeScript source files
- **Problem**: All `.ts`/`.tsx` source files were excluded from git
- **Fix**: Narrowed to `public/hls/**/*.ts` and `storage/**/*.ts` only
- **Affected files recovered**: `vite.config.ts`, `resources/js/**/*.ts`, `tsconfig.json`

### 2. Course create — 500 on form submit
- **Root cause**: `course_category_child_id` and `instructor_id` sent as empty string `""` to NOT NULL integer columns in MySQL
- **Fix**: `CourseService::createCourse()` — coerce empty strings to `null`, fall back to `Auth::user()->instructor_id`
- **File**: `app/Services/Course/CourseService.php`

### 3. Thumbnail field accepted video files
- **Fix**: Added `accept="image/jpeg,image/png,image/webp,image/gif"` to thumbnail `<input>`
- **File**: `resources/js/pages/dashboard/courses/create.tsx`

### 4. `expiry_duration` Date object not serializing in FormData
- **Problem**: Inertia's `useForm.post()` with a `Date` object in state caused silent failure
- **Fix**: Use `router.post()` with a manually constructed `FormData`, converting `Date → toISOString()`
- **File**: `resources/js/pages/dashboard/courses/create.tsx`

### 5. Vite manifest not found after container restart
- **Cause**: `public/build/` is gitignored — must be rebuilt inside container
- **Fix**: `docker exec video_app bash -c "cd /var/www/html && npm run build"`

---

## Project Structure (key directories)

```
/
├── app/
│   ├── Http/Controllers/Course/   # Course, Curriculum, Player controllers
│   ├── Services/Course/           # Business logic (CourseService, etc.)
│   └── Enums/                     # CoursePricingType, ExpiryLimitType, etc.
├── Modules/                       # Laravel modules (Blog, Installer, etc.)
├── nodejs-worker/                 # HLS video processor (Node.js + FFmpeg)
│   └── nodejs-worker-for-lms.js  # Main worker file (port 3112)
├── resources/js/
│   ├── pages/dashboard/courses/  # Course create/edit React pages
│   └── types/                    # TypeScript type definitions
├── docker/                       # nginx, php-fpm, supervisor configs
├── docker-compose.yml            # Local dev
├── docker-compose.prod.yml       # Production
├── Dockerfile.dev                # Local dev image
├── Dockerfile                    # Production image
└── deploy.sh                     # One-command deploy script
```
