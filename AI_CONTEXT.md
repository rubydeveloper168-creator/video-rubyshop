# AI Context Handoff

This file is a practical handoff for another AI or engineer working in this repo.
It focuses on how the project is actually being used now, not just the nominal stack.

## Current State

- Project name: `video.rubyshop.co.th`
- Local workspace path: `/Applications/MAMP/htdocs/video`
- Git branch: `main`
- Latest deployed commit at time of writing: `679370b` (`Add audit tracking timeline`)
- Production server is treated as source of truth
- Production app path: `/var/www/video.rubyshop.co.th`
- Production host: `ruby168@192.168.88.170`

Recent commits:

- `679370b` Add audit tracking timeline
- `8acfc16` Debug quick course creation instructor selection
- `ec47ce6` Add development sync notes
- `4695212` Refine course QR poster layout
- `e4b0530` Fix video metadata blob cleanup

## Stack

- Backend: Laravel 12 style app on PHP 8.3
- Frontend: Inertia.js + React + TypeScript + Vite
- Styling: Tailwind CSS
- Database: MySQL
- Cache/session helpers: Redis
- Video processing: separate Node worker with FFmpeg and HLS output
- Production runtime: Docker Compose, nginx, PHP-FPM, Supervisor

## Important Working Assumptions

- The production server is the canonical environment. Local should be kept aligned to server behavior.
- Deploy flow is git-based, then Docker rebuild on the server.
- `public/build/` is generated during build and not committed.
- `nodejs-worker/` is not inside the production app container. It runs on the host via PM2.
- There are unrelated untracked `.d.ts` files in `nodejs-worker/node_modules/` on the server. Ignore them unless they directly affect the task.

## Local Development

Primary local URLs:

- Laravel app: `http://127.0.0.1:8080`
- Vite dev assets: `http://127.0.0.1:5173`

Local database:

- DB name: `video_lms`

Seeded local admin accounts from `database/seeders/AdminUserSeeder.php`:

- `admin@mentorlms.com` / `11223344`
- `superadmin@mentorlms.com` / `11223344`

## Production / Deploy

Main deploy command:

```bash
./deploy.sh
```

What it does:

1. `git push origin main`
2. SSH to `ruby168@192.168.88.170`
3. `git pull origin main` in `/var/www/video.rubyshop.co.th`
4. `docker compose -f docker-compose.prod.yml build --no-cache`
5. `docker compose -f docker-compose.prod.yml up -d`
6. `docker exec video_app php artisan migrate --force`
7. Rebuild Laravel caches

Production routing architecture:

```text
Cloudflare -> host nginx :80 -> Docker app :8080
```

## Project Structure

Top-level directories and purpose:

```text
app/             Laravel application code
bootstrap/       Laravel bootstrap and app wiring
config/          Laravel configuration
database/        Migrations, seeders, factories
docker/          nginx, php, supervisor container config
Modules/         Modular feature packages used by the app
nodejs-worker/   External video-processing worker
public/          Public web root, built assets, HLS output mount points
resources/       React, TypeScript, Blade-adjacent frontend resources
routes/          Laravel route files split by audience/role
storage/         Laravel runtime storage and uploaded files
tests/           Test suite
vendor/          Composer dependencies
```

Important files:

- `Dockerfile`
- `Dockerfile.dev`
- `docker-compose.yml`
- `docker-compose.prod.yml`
- `deploy.sh`
- `PROJECT.md`
- `DEV_SYNC.md`
- `DEPLOY.md`
- `vite.config.ts`
- `package.json`
- `composer.json`

## Route Organization

Routes are split by usage area:

- `routes/web.php`: public-facing routes, including course player/public pages
- `routes/auth.php`: authentication routes
- `routes/admin.php`: admin-only dashboard routes
- `routes/instructor.php`: instructor/dashboard course management routes
- `routes/student.php`: authenticated routes shared by student/instructor/admin flows

`bootstrap/app.php` wires these route groups with middleware and role constraints.

## Frontend Structure

Main frontend code lives in `resources/js/`.

Important areas:

- `resources/js/layouts/`
  - `main.tsx`: shared app shell
  - `dashboard/`: dashboard shell, sidebar, nav routes
- `resources/js/pages/`
  - `auth/`: login/reset/register
  - `dashboard/`: admin/instructor dashboard pages
  - `course-player/`: active lesson/player flow
- `resources/js/components/`
  - shared UI
  - player components
  - upload components
- `resources/js/types/`
  - shared TypeScript model declarations

Dashboard navigation is centrally managed in:

- `resources/js/layouts/dashboard/partials/routes.tsx`

## Backend Structure

Important backend areas:

- `app/Http/Controllers/`
  - auth, course, dashboard, audit
- `app/Services/`
  - business logic layer
- `app/Models/`
  - Eloquent models, including audit and course/player data
- `app/Http/Requests/`
  - request validation

The repo already follows a service-oriented style in parts of the codebase, especially around courses and player workflows.

## Video / HLS Processing

This project includes a dedicated video pipeline.

Flow:

1. User uploads a lesson video
2. Laravel stores the source file
3. Laravel calls the Node worker at `VIDEO_PROCESSOR_URL`
4. Node worker runs FFmpeg and produces HLS output
5. Laravel/player uses generated playlist and segments

Important docs:

- `HLS_QUICK_START.md`
- `HLS_SYSTEM_OVERVIEW.md`
- `HLS_VIDEO_SETUP.md`
- `DEBUG_VIDEO_UPLOAD.md`

Important code areas:

- `nodejs-worker/`
- `resources/js/components/video-player.tsx`
- `resources/js/pages/course-player/`

## Quick Create Course Flow

There is a streamlined course creation path in addition to the standard create page.

Primary route:

- `/dashboard/courses/quick-create`

Related flow:

1. Quick create course
2. Quick upload first video
3. Quick poster / QR page

Important files:

- `resources/js/pages/dashboard/courses/quick-create.tsx`
- `resources/js/pages/dashboard/courses/quick-upload.tsx`
- `resources/js/pages/dashboard/courses/quick-poster.tsx`
- `app/Http/Controllers/Course/CourseController.php`
- `app/Http/Requests/StoreQuickCourseRequest.php`

Recent bug fix:

- Debug logging was added to quick create submit flow
- Validation error discovered: `The selected instructor id is invalid.`
- A prior deploy included the debug patch commit `8acfc16`

## Audit / Tracking Feature

The latest major addition is user audit tracking.

Goal:

- Track login/logout
- Track visited pages
- Track time active/idle on site
- Track video play/pause/seek/end/heartbeat
- Show timeline UI in admin dashboard

New backend pieces:

- `app/Http/Controllers/AuditController.php`
- `app/Services/Audit/AuditService.php`
- `app/Models/Audit/`
- `database/migrations/2026_06_24_000001_create_audit_tables.php`

New audit tables:

- `user_audit_sessions`
- `user_page_visits`
- `user_video_events`
- `user_activity_events`

Frontend audit pieces:

- `resources/js/components/audit/audit-tracker.tsx`
- `resources/js/lib/audit.ts`
- `resources/js/pages/dashboard/audit/index.tsx`
- `resources/js/pages/dashboard/audit/show.tsx`

Where it hooks:

- Shared app shell in `resources/js/layouts/main.tsx`
- Video event capture in `resources/js/components/video-player.tsx`
- Course lesson player passes audit context from `resources/js/pages/course-player/partials/lesson-viewer.tsx`

Admin access:

- `GET /dashboard/audit`
- `GET /dashboard/audit/users/{user}`

Tracking endpoints:

- `POST /audit-track/page-enter`
- `POST /audit-track/page-leave`
- `POST /audit-track/heartbeat`
- `POST /audit-track/video-event`

Auth integration:

- Login/logout audit hooks were added in `app/Http/Controllers/Auth/AuthenticatedSessionController.php`

## Known Conventions In This Repo

- Dashboard pages usually use Inertia pages under `resources/js/pages/dashboard/...`
- Role-aware navigation is driven from route config objects rather than scattered menu markup
- Course/player logic is split between controllers, services, and reusable React components
- This repo contains several project docs; check them before re-deriving setup details

## Practical Commands

Local checks:

```bash
php artisan route:list --name=audit
php artisan migrate
npm run build
git status --short --branch
```

Server checks:

```bash
ssh ruby168@192.168.88.170
cd /var/www/video.rubyshop.co.th
git rev-parse --short HEAD
docker compose -f docker-compose.prod.yml ps
docker exec video_app php artisan migrate:status
curl -I http://localhost:8080/login
```

## What Another AI Should Read First

If picking up work on this project, read in this order:

1. `AI_CONTEXT.md`
2. `PROJECT.md`
3. `DEV_SYNC.md`
4. `DEPLOY.md`
5. The specific feature files related to the task

For current audit work, start with:

- `app/Http/Controllers/AuditController.php`
- `app/Services/Audit/AuditService.php`
- `resources/js/components/audit/audit-tracker.tsx`
- `resources/js/components/video-player.tsx`
- `resources/js/pages/dashboard/audit/`

For current course creation/player work, start with:

- `app/Http/Controllers/Course/CourseController.php`
- `app/Services/Course/`
- `resources/js/pages/dashboard/courses/`
- `resources/js/pages/course-player/`

## Current Risks / Notes

- Production deploys are heavy because the Docker image rebuild is done with `--no-cache`
- `public/build/` is rebuilt in deploy, so mismatches can happen if local assumptions depend on old assets
- Server repo can show unrelated untracked files under `nodejs-worker/node_modules/`; do not treat that as app drift
- Some old docs may lag behind the newest feature work, especially audit tracking

## Suggested Usage

When handing this repo to another AI, pair this file with the current task statement and the latest commit hash.
