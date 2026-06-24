# Development Sync Notes

The production server at `/var/www/video.rubyshop.co.th` is treated as the source of truth for this project.

Local development is prepared to run with:

- Laravel app: `http://127.0.0.1:8080`
- Vite assets: `http://127.0.0.1:5173`
- Local MySQL database: `video_lms`

Before deploying changes, verify the local working tree is clean and compare against `origin/main`.
