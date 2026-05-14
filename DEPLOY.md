# Deployment Guide

## Server Info
| | |
|---|---|
| **Host** | `192.168.88.170` |
| **User** | `ruby168` |
| **App directory** | `/var/www/video.rubyshop.co.th` |
| **Domain** | `https://video.rubyshop.co.th` |
| **Cloudflare tunnel** | Active → nginx:80 → Docker:8080 |

---

## Architecture (Production)

```
Internet → Cloudflare → nginx:80 → proxy → Docker app:8080
                                              ├── PHP-FPM (Laravel)
                                              ├── nginx (internal)
                                              ├── Redis (internal)
                                              └── Supervisor (process manager)

Docker MySQL (video_mysql) — no host port exposed, internal network only
nodejs-worker — runs via PM2 on the HOST (port 3112), NOT inside Docker
```

---

## One-Command Deploy

After pushing your code to GitHub:
```bash
./deploy.sh
```

This script:
1. `git push origin main`
2. SSH into server → `git pull`
3. `docker compose -f docker-compose.prod.yml build --no-cache`
4. `docker compose -f docker-compose.prod.yml up -d`
5. `php artisan migrate --force`
6. `php artisan config:cache && route:cache && view:cache`

---

## Manual Deploy Steps

```bash
# 1. Push code
git add .
git commit -m "your message"
git push origin main

# 2. SSH into server
ssh ruby168@192.168.88.170

# 3. Pull latest code
cd /var/www/video.rubyshop.co.th
git pull origin main

# 4. Rebuild Docker image
docker compose -f docker-compose.prod.yml build --no-cache

# 5. Restart containers
docker compose -f docker-compose.prod.yml up -d

# 6. Run migrations
docker exec video_app php artisan migrate --force

# 7. Clear and rebuild caches
docker exec video_app php artisan config:cache
docker exec video_app php artisan route:cache
docker exec video_app php artisan view:cache
```

---

## Server Docker Setup (initial — already done)

```bash
# On the server (ruby168@192.168.88.170)
cd /var/www/video.rubyshop.co.th

# Set up .env (copy from docker.env then edit)
cp docker.env .env
# Edit .env: DB_HOST=mysql, DB credentials, Google OAuth keys, etc.

# Export existing MySQL data (first time only)
mysqldump -uroot -p rubyshop_video > /tmp/rubyshop_video_backup.sql

# Build and start
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d

# Import DB into Docker MySQL (first time only)
docker exec -i video_mysql mysql -uroot -p<password> rubyshop_video < /tmp/rubyshop_video_backup.sql
```

---

## Server .env Key Values

```env
APP_URL=https://video.rubyshop.co.th
APP_ENV=production
APP_DEBUG=false

DB_HOST=mysql           # Docker container name
DB_DATABASE=rubyshop_video
DB_USERNAME=root
DB_PASSWORD=<password>

REDIS_HOST=127.0.0.1   # Redis inside the app container

VIDEO_PROCESSOR_URL=http://localhost:3112   # nodejs-worker on host

GOOGLE_STATUS=true
GOOGLE_CLIENT_ID=387070054462-...
GOOGLE_SECRET=GOCSPX-...
GOOGLE_REDIRECT_URI=https://video.rubyshop.co.th/auth/google/callback
```

---

## nginx Config (Host)

Config file: `/etc/nginx/sites-available/video-docker.conf`

```nginx
server {
    listen 80;
    server_name video.rubyshop.co.th;

    client_max_body_size 2048M;
    client_body_timeout 300s;

    proxy_buffer_size 128k;
    proxy_buffers 8 128k;
    proxy_busy_buffers_size 256k;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300s;
    }
}
```

After editing nginx config:
```bash
sudo nginx -t && sudo systemctl reload nginx
```

---

## Containers on Server

```bash
# Check status
docker compose -f docker-compose.prod.yml ps

# View logs
docker compose -f docker-compose.prod.yml logs -f app

# Restart single container
docker compose -f docker-compose.prod.yml restart app

# Shell into app container
docker exec -it video_app bash
```

---

## nodejs-worker (HLS Video Processor)

The nodejs-worker runs on the **HOST** (not inside Docker) via PM2.

```bash
# Check status
pm2 status

# Restart worker
pm2 restart nodejs-worker-for-lms

# View logs
pm2 logs nodejs-worker-for-lms

# Start manually (if not in PM2)
cd /var/www/video.rubyshop.co.th/nodejs-worker
node nodejs-worker-for-lms.js
```

Worker listens on port `3112`. The Laravel app calls it via `VIDEO_PROCESSOR_URL=http://localhost:3112`.

---

## GitHub Repository

```
https://github.com/rubydeveloper168-creator/video-rubyshop
```

### What's in git
- All PHP source code (`app/`, `Modules/`, `routes/`, `database/`)
- All React/TypeScript source (`resources/js/`)
- Docker configs (`docker/`, `Dockerfile`, `Dockerfile.dev`)
- `docker-compose.yml` (local), `docker-compose.prod.yml` (production)
- `deploy.sh`, `.env.docker.local` (local env template)

### What's NOT in git (gitignored)
| Ignored | Reason |
|---------|--------|
| `vendor/` | Composer install inside container |
| `node_modules/` | npm install inside container |
| `public/hls/` | 1.6GB HLS video segments |
| `storage/app/public/` | Uploaded videos/images |
| `public/build/` | Built by `npm run build` inside container |
| `.env` | Contains secrets — never commit |
| `*.zip`, `*.mp4` | Large binary files |

---

## Rollback

```bash
# On the server — roll back to previous commit
cd /var/www/video.rubyshop.co.th
git log --oneline -5          # find the commit to roll back to
git checkout <commit-hash>    # or: git reset --hard <commit-hash>
docker compose -f docker-compose.prod.yml build --no-cache
docker compose -f docker-compose.prod.yml up -d
```

---

## Troubleshooting

### Container won't start
```bash
docker compose -f docker-compose.prod.yml logs app
```

### 502 Bad Gateway from nginx
- Check app container is running: `docker compose ps`
- Check nginx proxy buffer size — the `Link` header from Laravel is large
- Config fix: add `proxy_buffer_size 128k; proxy_buffers 8 128k;` to nginx server block

### Vite manifest not found
```bash
docker exec video_app bash -c "cd /var/www/html && npm run build"
```

### Database connection refused
- Check `DB_HOST=mysql` in `.env` (not `localhost`)
- Check mysql container is healthy: `docker compose ps`

### Storage permissions error
```bash
docker exec video_app bash -c "chmod -R 777 /var/www/html/storage /var/www/html/bootstrap/cache"
```
