# 🎬 HLS Video System - Quick Start & Testing Guide

## 🚀 Quick Start (5 minutes)

### Step 1: Run Database Migration
```bash
php artisan migrate
```

### Step 2: Start Node.js Worker (Terminal 1)
```bash
cd nodejs-worker
node server.js
```

You should see:
```
[INFO] Video processor worker started on port 3111
```

### Step 3: Start Laravel (Terminal 2)
```bash
php artisan serve
```

### Step 4: Test the System
```bash
chmod +x test-hls-system.sh
./test-hls-system.sh
```

## 📊 Testing HLS System

### Method 1: Upload Through UI
1. Go to your course curriculum page
2. Create/Edit a lesson
3. Select "Video" as lesson type
4. Upload a video file
5. Save the lesson

**Watch the logs:**
- **Terminal 1 (Node.js)** - Will show detailed processing logs
- **Terminal 2 (Laravel)** - Run: `tail -f storage/logs/laravel.log | grep "🎬\|📹\|✅\|❌"`

### Method 2: Manual API Test
```bash
# Test Node.js worker health
curl http://localhost:3111/health

# Should return:
# {"status":"healthy","timestamp":"...","version":"1.0.0"}
```

### Method 3: Check Database
```bash
php artisan tinker
```

```php
// Check latest lesson
$lesson = App\Models\Course\SectionLesson::latest()->first();

// Check processing status
echo $lesson->processing_status;  // Should be: pending, processing, completed, or failed

// Check HLS path (if completed)
echo $lesson->hls_playlist_path;  // Should be: hls/{id}/playlist.m3u8

// Check video URL
echo $lesson->getVideoUrl();
```

## 📝 Expected Log Output

### Laravel Logs (storage/logs/laravel.log)

When uploading a video, you should see:
```
[INFO] 🎬 New video uploaded for lesson
[INFO] 📹 Queuing video for HLS processing
[INFO] 🎯 Starting queue process for video
[INFO] 📝 Updated lesson status to processing
[INFO] 📂 Resolved absolute video path
[INFO] 📤 Sending request to Node.js worker
[INFO] 📥 Received response from Node.js worker
[INFO] ✅ Video processing queued successfully
```

When processing completes:
```
[INFO] 📨 Received processing callback from Node.js
[INFO] 📖 Found lesson for callback
[INFO] ✅ Video processing completed successfully
```

### Node.js Logs (Terminal Output)

When processing starts:
```
================================================================================
🎬 NEW VIDEO PROCESSING REQUEST
================================================================================
📋 Request Details:
   - Video ID: 123
   - Video Path: /path/to/video.mp4
   - Callback URL: http://localhost:8000/api/video/processing-callback
   - Timestamp: 2025-10-22T...
--------------------------------------------------------------------------------
✅ Video file found: /path/to/video.mp4
✅ Request accepted - Processing will start asynchronously
================================================================================

🎯 STARTING VIDEO PROCESSING
================================================================================
Video ID: 123
Video Path: /path/to/video.mp4
Started at: 2025-10-22T...
================================================================================
📁 Creating output directory: /path/to/public/hls/123
✅ Output directory ready

📊 EXTRACTING VIDEO METADATA
--------------------------------------------------------------------------------
✅ Metadata extracted:
   - Duration: 120 seconds
   - Resolution: 1920x1080
   - Codec: h264
   - Bitrate: 5000000
   - Size: 15.50 MB

🖼️  GENERATING THUMBNAIL
--------------------------------------------------------------------------------
✅ Thumbnail generated: /path/to/public/hls/123/thumbnail.jpg

📹 CONVERTING TO HLS FORMAT
--------------------------------------------------------------------------------
This may take a few minutes depending on video size...
▶️  FFmpeg process started
Progress: [█████░░░░░] 10% | Frames: 300 | FPS: 30 | Speed: 1500kbps
Progress: [██████████░] 20% | Frames: 600 | FPS: 30 | Speed: 1500kbps
...
Progress: [██████████████████████████████████████████████████] 100% | Frames: 3600 | FPS: 30 | Speed: 1500kbps
✅ HLS conversion finished
✅ HLS conversion completed: /path/to/public/hls/123/playlist.m3u8

📊 PROCESSING SUMMARY
================================================================================
Video ID: 123
Processing Time: 45.23 seconds
HLS Segments Created: 20
Output Directory: /path/to/public/hls/123
Completed at: 2025-10-22T...
================================================================================

📤 SENDING CALLBACK TO LARAVEL
--------------------------------------------------------------------------------
Callback URL: http://localhost:8000/api/video/processing-callback
✅ Callback sent successfully

🎉 VIDEO PROCESSING COMPLETED SUCCESSFULLY
================================================================================
```

## 🔍 Troubleshooting

### ❌ No Logs Appear

**Check 1: Is Node.js worker running?**
```bash
curl http://localhost:3111/health
```

**Check 2: Is VIDEO_PROCESSOR_ENABLED=true in .env?**
```bash
grep VIDEO_PROCESSOR .env
```

**Check 3: Check Laravel logs**
```bash
tail -f storage/logs/laravel.log
```

### ❌ "Connection refused" Error

Node.js worker is not running. Start it:
```bash
cd nodejs-worker
node server.js
```

### ❌ "Video file not found" Error

Check file path in logs and verify:
```bash
# Check if file exists
ls -la storage/app/public/videos/

# Check permissions
ls -ld storage/app/public/videos/
```

### ❌ FFmpeg Errors

Check FFmpeg installation:
```bash
ffmpeg -version
ffmpeg -codecs | grep h264
ffmpeg -codecs | grep aac
```

## 🎯 Monitor Real-time

**Terminal 1: Node.js Worker**
```bash
cd nodejs-worker
node server.js
```

**Terminal 2: Laravel Logs**
```bash
tail -f storage/logs/laravel.log | grep "🎬\|📹\|✅\|❌\|📨\|🎉"
```

**Terminal 3: Laravel App**
```bash
php artisan serve
```

## ✅ Success Indicators

1. ✅ Node.js worker shows processing progress bars
2. ✅ Laravel logs show "✅ Video processing queued successfully"
3. ✅ After processing: Laravel logs show "✅ Video processing completed successfully"
4. ✅ File exists: `public/hls/{lesson_id}/playlist.m3u8`
5. ✅ Database: `processing_status = 'completed'`
6. ✅ Frontend: Video plays using HLS player

## 📂 File Structure After Processing

```
public/hls/
└── {lesson_id}/
    ├── playlist.m3u8         # HLS manifest file
    ├── thumbnail.jpg         # Video thumbnail
    ├── segment_000.ts        # Video segment 1
    ├── segment_001.ts        # Video segment 2
    ├── segment_002.ts        # Video segment 3
    └── ...                   # More segments
```

## 🔄 Retry Failed Processing

If a video fails:

```bash
php artisan tinker
```

```php
$lesson = App\Models\Course\SectionLesson::find(123);
$service = new App\Services\VideoProcessingService();
$service->retryProcessing($lesson);
```

Or via API:
```bash
curl -X POST http://localhost:8000/api/video/retry/123
```

## 📱 Frontend Display

The HLS player will automatically:
- Show "Processing Video..." while `processing_status` is `pending` or `processing`
- Play HLS video when `processing_status` is `completed`
- Show error with retry button if `processing_status` is `failed`

## 🎉 You're Done!

Your HLS video system is now working! Upload a video and watch the magic happen! 🚀
