# HLS System Overview

## High-Level Flow

1. **Upload** → Laravel stores the original MP4 under `storage/app/public/lessons/`. The uploaded URL (e.g. `http://127.0.0.1:8000/storage/lessons/...mp4`) is normalised to a disk path before handing it to the worker.
2. **Queue** → `VideoProcessingService::queueForProcessing()` sends `video_id`, absolute path, and callback URL to the Node worker (`nodejs-worker/server.js`).
3. **Worker** → The worker probes metadata, generates a thumbnail, converts the video to HLS using FFmpeg, and writes outputs to `public/hls/{videoId}/` (`playlist.m3u8` + `segment_###.ts`).
4. **Callback** → When conversion finishes (or fails), the worker POSTs the status back to Laravel at `/api/video/processing-callback`. Laravel updates the lesson record with HLS paths and processing metadata.
5. **Playback** → The course player prefers the HLS playlist when `processing_status === 'completed'`. The MP4 remains as a fallback unless HLS-only mode is enabled.

## Back-End Details

| File | Purpose |
| --- | --- |
| `app/Services/VideoProcessingService.php` | Normalises uploaded URLs to disk paths, queues jobs, handles callbacks, and falls back gracefully if the named route is missing. |
| `routes/api.php` via `bootstrap/app.php` | Registers `/api/video/processing-callback` (plus status/retry endpoints). |
| `nodejs-worker/server.js` | Express server that runs FFmpeg via `fluent-ffmpeg`, reports progress, and delivers callback payloads. |
| `public/hls/{videoId}/` | Directory containing `playlist.m3u8`, `segment_###.ts`, and `thumbnail.jpg` per lesson. |

**Key worker behaviours**
- Logs every stage (metadata, thumbnail, conversion progress) to stdout.
- Uses `ffmpeg` options tuned for VOD: H.264 video, AAC audio, 6-second segments, independent GOPs.
- Sends detailed JSON to Laravel, including segment count, duration, resolution, and thumbnail paths.

## Front-End Playback

| File | Purpose |
| --- | --- |
| `resources/js/pages/course-player/partials/lesson-viewer.tsx` | Picks video sources; prefers HLS playlist when available. Adds logging so you can see which sources are active. Supports an `hlsOnly` query param to disable the MP4 fallback. |
| `resources/js/components/video-player.tsx` | Wraps Plyr + Hls.js. Waits for the Plyr media instance before wiring Hls.js, logs detailed lifecycle and segment events, and auto-falls back to MP4 unless forced to HLS-only. |
| `resources/js/types/course.d.ts` | Exposes HLS metadata (`hls_playlist_path`, `processing_status`, etc.) to TypeScript components. |

**Console logging highlights**
- `[LessonViewer]` group logs show lesson metadata and every source passed to the player.
- `[VideoPlayer:lesson-XX]` logs cover Plyr events, Hls.js lifecycle (manifest parsed, fragment loading/buffering), and the new `FRAG_CHANGED` hook prints the active `segment_###.ts` as it plays.
- When `?hlsOnly=1` is present, the player logs `Force HLS only true` and suppresses MP4 fallback.

## Testing & Diagnostics

1. Run the Node worker: `cd nodejs-worker && node server.js`.
2. Upload a lesson video in the admin UI; watch worker logs for FFmpeg progress.
3. Validate Laravel logs (`storage/logs/laravel-*.log`) for request/callback traces.
4. Play the lesson page and open DevTools console to confirm HLS logs. For fallback testing, load with and without `?hlsOnly=1`.
5. If callbacks fail, ensure `/api/video/processing-callback` route is present (`php artisan route:list | grep processing-callback`) and Laravel is reachable from the worker.

## Common Issues & Fixes

| Symptom | Likely Cause | Fix |
| --- | --- | --- |
| `Video file not found` in Laravel logs | Uploaded URL used as-is | Path normalisation now strips `http://.../storage/` and resolves to `storage/app/public/`. |
| Worker logs `Failed to send callback (404)` | API routes not loaded | `bootstrap/app.php` now registers API routes; run `php artisan route:clear`. |
| Player stays black with HLS-only toggle | Hls.js initialised before media ready | Player now waits for Plyr/media instances before attaching Hls.js. |
| No per-segment insight | Lack of logging | Added `FRAG_LOADING`, `FRAG_BUFFERED`, and `FRAG_CHANGED` logs printing `segment_###.ts`. |
| Fallback to MP4 when testing | HLS-only not activated | Append `?hlsOnly=1` (or `hls_only=1`) to the lesson URL. |

## Build & Dependencies

- Front-end uses Vite + React + TypeScript.
- `hls.js` added to `package.json`; run `npm install` after pulling changes.
- Build with `npm run build`; develop with `npm run dev`.
- Node worker depends on `fluent-ffmpeg`, `axios`, etc., and requires FFmpeg binary accessible via `$PATH` or `FFMPEG_PATH` env.

## Quick Reference Commands

```bash
# Start Laravel (e.g. via Sail, Valet, or php artisan serve)
php artisan serve

# Start Vite dev server (assets hot reload)
npm run dev

# Start Node worker
cd nodejs-worker
node server.js

# Test callback manually (example)
curl -X POST http://127.0.0.1:8000/api/video/processing-callback \
  -H "Content-Type: application/json" \
  -d '{"video_id":14,"status":"completed"}'
```

## Future Enhancements

- Add retries/backoff on worker callbacks if Laravel is temporarily offline.
- Surface HLS processing state in the UI (e.g. show “Processing… 3 segments done”).
- Implement adaptive bitrate ladders instead of a single rendition.
- Add automated tests for the callback handler and front-end HLS toggle.


