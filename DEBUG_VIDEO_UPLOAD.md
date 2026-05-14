# DEBUG: Why You're Not Seeing Logs

## 🔍 Problem Analysis
You uploaded a video at `http://127.0.0.1:8000/dashboard/courses/1/edit?tab=curriculum` but see **no logs** in:
- ❌ Laravel logs (storage/logs/laravel.log)
- ❌ Node.js worker console
- ❌ Frontend console

## 🚨 Most Likely Issues

### Issue #1: Node.js Worker Not Running
**Symptoms:** No HLS processing happens at all
**Fix:**
```bash
cd /Applications/MAMP/htdocs/learnig/nodejs-worker
node server.js
```
**Expected Output:**
```
[INFO] 2025-10-22T... - Video processor worker started on port 3111
```

### Issue #2: Database Migration Not Run
**Symptoms:** Laravel errors about missing columns
**Fix:**
```bash
cd /Applications/MAMP/htdocs/learnig
php artisan migrate
```

### Issue #3: .env Configuration Missing
**Symptoms:** VideoProcessingService never triggers
**Check:** Open `.env` file and verify:
```env
VIDEO_PROCESSOR_URL=http://localhost:3111
VIDEO_PROCESSOR_ENABLED=true
```

### Issue #4: Laravel Encryption Key Error
**Symptoms:** You saw this in logs: `RuntimeException: No application encryption key has been specified`
**Fix:**
```bash
php artisan key:generate
```

## ✅ Step-by-Step Verification

### Step 1: Fix Encryption Key (if needed)
```bash
cd /Applications/MAMP/htdocs/learnig
php artisan key:generate
```

### Step 2: Run Database Migration
```bash
php artisan migrate
```
**Expected Output:**
```
Running migrations.
  2025_10_22_000001_add_hls_support_to_section_lessons_table . DONE
```

### Step 3: Verify .env Configuration
```bash
cat .env | grep VIDEO_PROCESSOR
```
**Expected Output:**
```
VIDEO_PROCESSOR_URL=http://localhost:3111
VIDEO_PROCESSOR_ENABLED=true
```

If nothing appears, add these lines to `.env`:
```bash
echo "" >> .env
echo "# Video Processing Configuration" >> .env
echo "VIDEO_PROCESSOR_URL=http://localhost:3111" >> .env
echo "VIDEO_PROCESSOR_ENABLED=true" >> .env
```

### Step 4: Clear Laravel Cache
```bash
php artisan config:clear
php artisan cache:clear
```

### Step 5: Start Node.js Worker
```bash
cd nodejs-worker
node server.js
```
**Keep this terminal open!** You should see:
```
[INFO] 2025-10-22T12:34:56.789Z - Video processor worker started on port 3111
[INFO] Configuration { ffmpegPath: 'ffmpeg', outputDir: '../public/hls', laravelBaseUrl: 'http://localhost:8000' }
```

### Step 6: Start Laravel Log Monitor (New Terminal)
```bash
cd /Applications/MAMP/htdocs/learnig
tail -f storage/logs/laravel.log
```

### Step 7: Upload a Video
1. Go to: http://127.0.0.1:8000/dashboard/courses/1/edit?tab=curriculum
2. Click "Add Section" (if no section exists)
3. Click "Add Lesson"
4. Select "Video File" as lesson type
5. Click "Next" or "Continue" (depends on your UI)
6. Fill in lesson title
7. Select a video file (preferably small, like 5-10MB for testing)
8. Click upload/submit

## 📊 What You Should See

### Terminal 1 (Node.js Worker):
```
================================================================================
🎬 NEW VIDEO PROCESSING REQUEST
================================================================================
📋 Request Details:
   - Video ID: 123
   - Video Path: /Applications/MAMP/htdocs/learnig/public/uploads/videos/test.mp4
   - Callback URL: http://localhost:8000/api/video-processing/callback
   - Timestamp: 2025-10-22T12:35:00.000Z
--------------------------------------------------------------------------------
✅ Video file found: /Applications/MAMP/htdocs/learnig/public/uploads/videos/test.mp4
✅ Request accepted - Processing will start asynchronously
================================================================================

🎯 STARTING VIDEO PROCESSING
================================================================================
Video ID: 123
Video Path: /Applications/MAMP/htdocs/learnig/public/uploads/videos/test.mp4
Started at: 2025-10-22T12:35:00.100Z
================================================================================
📁 Creating output directory: /Applications/MAMP/htdocs/learnig/nodejs-worker/../public/hls/123
✅ Output directory ready
```

### Terminal 2 (Laravel Logs):
```
[2025-10-22 12:35:00] local.INFO: 🎬 Starting lesson handler {"lesson_type":"video","has_video_file":true} 
[2025-10-22 12:35:00] local.INFO: 📹 Queuing video for HLS processing {"lesson_id":123,"video_path":"uploads/videos/test.mp4"} 
[2025-10-22 12:35:00] local.INFO: 📤 Sending request to video processor {"url":"http://localhost:3111/process-video"} 
[2025-10-22 12:35:00] local.INFO: ✅ Video successfully queued for HLS processing
```

## 🐛 If You Still See Nothing

### Check #1: Is Node.js Worker Reachable?
```bash
curl http://localhost:3111/health
```
**Expected Response:**
```json
{"status":"healthy","timestamp":"2025-10-22T...","version":"1.0.0"}
```

### Check #2: Test Video Processing Directly
```bash
curl -X POST http://localhost:3111/process-video \
  -H "Content-Type: application/json" \
  -d '{
    "video_id": 999,
    "video_path": "/Applications/MAMP/htdocs/learnig/public/uploads/videos/test.mp4",
    "callback_url": "http://localhost:8000/api/video-processing/callback"
  }'
```

### Check #3: Verify Routes Exist
```bash
php artisan route:list | grep video-processing
```
**Expected:**
```
POST   api/video-processing/callback
GET    api/video-processing/status/{lessonId}
```

### Check #4: Check PHP Error Logs
```bash
tail -f /Applications/MAMP/logs/php_error.log
```

### Check #5: Enable Debug Mode
Edit `.env`:
```env
APP_DEBUG=true
LOG_LEVEL=debug
```
Then:
```bash
php artisan config:clear
```

## 📝 Common Mistakes

1. **❌ Forgot to start Node.js worker** - Most common issue!
2. **❌ Wrong port** - Node.js worker runs on port 3111, not 3000
3. **❌ File path issues** - Make sure video uploads to correct directory
4. **❌ Permissions** - public/hls directory must be writable
5. **❌ FFmpeg not installed** - Run `ffmpeg -version` to check

## 🎯 Quick Test Command

Run this all-in-one test:
```bash
cd /Applications/MAMP/htdocs/learnig

echo "1️⃣ Checking .env configuration..."
grep VIDEO_PROCESSOR .env || echo "❌ VIDEO_PROCESSOR not configured!"

echo ""
echo "2️⃣ Checking if Node.js worker is running..."
curl -s http://localhost:3111/health || echo "❌ Node.js worker not running!"

echo ""
echo "3️⃣ Checking FFmpeg installation..."
ffmpeg -version 2>&1 | head -1 || echo "❌ FFmpeg not installed!"

echo ""
echo "4️⃣ Checking migrations..."
php artisan migrate:status | grep "add_hls_support" || echo "⚠️ Migration not run!"

echo ""
echo "5️⃣ Checking HLS directory..."
ls -la public/hls 2>/dev/null || echo "📁 HLS directory doesn't exist yet (will be created)"
```

## 💡 Next Steps After Fixing

Once you see logs appearing:
1. ✅ Upload a small test video (5-10MB)
2. ✅ Watch the Node.js worker process it with progress bars
3. ✅ Check `public/hls/{lesson_id}/` for generated files
4. ✅ Verify playlist.m3u8 and segment_*.ts files exist
5. ✅ Test playback in frontend

## 🆘 Still Stuck?

Share these details:
1. Output of `curl http://localhost:3111/health`
2. Output of `grep VIDEO_PROCESSOR .env`
3. Last 50 lines of `storage/logs/laravel.log`
4. Output of `ps aux | grep node` (to see if worker is running)
5. Output of `php artisan migrate:status | grep hls`
