# 🎬 HLS Video System - What to Run Now

## ✅ Step-by-Step: Get Your Logs Working

### STEP 1: Run Migration (30 seconds)
```bash
cd /Applications/MAMP/htdocs/learnig
php artisan migrate
```

**Expected Output:**
```
Migrating: 2025_10_22_000001_add_hls_support_to_section_lessons_table
Migrated:  2025_10_22_000001_add_hls_support_to_section_lessons_table (XX ms)
```

### STEP 2: Start Node.js Worker - Terminal 1 (Keep this running!)
```bash
cd /Applications/MAMP/htdocs/learnig/nodejs-worker
node server.js
```

**Expected Output:**
```
[INFO] 2025-10-22T... - Video processor worker started on port 3111
[INFO] 2025-10-22T... - Configuration { ffmpegPath: 'ffmpeg', outputDir: '../public/hls', laravelBaseUrl: 'http://localhost:8000' }
```

**✋ Keep this terminal open and visible - this is where you'll see all video processing logs!**

### STEP 3: Watch Laravel Logs - Terminal 2 (Optional but recommended)
Open a new terminal:
```bash
cd /Applications/MAMP/htdocs/learnig
tail -f storage/logs/laravel.log | grep --color=always "🎬\|📹\|✅\|❌\|📨\|🎉"
```

**This will show you colored logs for video processing in Laravel**

### STEP 4: Start Laravel - Terminal 3
Open another terminal:
```bash
cd /Applications/MAMP/htdocs/learnig
php artisan serve
```

### STEP 5: Test the System
Open another terminal:
```bash
cd /Applications/MAMP/htdocs/learnig
chmod +x test-hls-system.sh
./test-hls-system.sh
```

**Expected Output:**
```
========================================
HLS Video System - Connection Test
========================================

1. Testing Node.js Worker Connection...
----------------------------------------
✅ Node.js Worker is running
Response: {"status":"healthy","timestamp":"...","version":"1.0.0"}

2. Testing Laravel API Route...
----------------------------------------
✅ Laravel API is accessible
...
```

### STEP 6: Upload a Video

1. Go to: `http://localhost:8000` (or your Laravel URL)
2. Navigate to any course > Curriculum
3. Create/Edit a lesson
4. Choose "Video" type
5. Upload a video file
6. Click Save

### STEP 7: Watch the Magic! 🎉

**In Terminal 1 (Node.js Worker), you should see:**
```
================================================================================
🎬 NEW VIDEO PROCESSING REQUEST
================================================================================
📋 Request Details:
   - Video ID: 123
   - Video Path: /path/to/video.mp4
...

🎯 STARTING VIDEO PROCESSING
================================================================================
📁 Creating output directory...
✅ Output directory ready

📊 EXTRACTING VIDEO METADATA
--------------------------------------------------------------------------------
✅ Metadata extracted:
   - Duration: 120 seconds
   - Resolution: 1920x1080
...

📹 CONVERTING TO HLS FORMAT
--------------------------------------------------------------------------------
▶️  FFmpeg process started
Progress: [████████░░] 20% | Frames: 600 | FPS: 30 | Speed: 1500kbps
Progress: [████████████░] 40% | Frames: 1200 | FPS: 30 | Speed: 1500kbps
...
Progress: [██████████████████████████████████████████████████] 100%
✅ HLS conversion finished

🎉 VIDEO PROCESSING COMPLETED SUCCESSFULLY
================================================================================
```

**In Terminal 2 (Laravel Logs), you should see:**
```
[INFO] 🎬 New video uploaded for lesson
[INFO] 📹 Queuing video for HLS processing
[INFO] ✅ Video processing queued successfully
...
[INFO] 📨 Received processing callback from Node.js
[INFO] ✅ Video processing completed successfully
```

---

## 🚨 If You Don't See Logs:

### Problem 1: Nothing happens after upload

**Check:**
```bash
# Is Node.js worker running?
curl http://localhost:8000/health

# Check if VIDEO_PROCESSOR_ENABLED is true
grep VIDEO_PROCESSOR .env
```

**Fix:**
Add to `.env`:
```
VIDEO_PROCESSOR_ENABLED=true
VIDEO_PROCESSOR_URL=http://localhost:3111
```

### Problem 2: "Connection refused" error

**Fix:**
Make sure Node.js worker is running in Terminal 1:
```bash
cd nodejs-worker
node server.js
```

### Problem 3: No Laravel logs

**Check log file:**
```bash
cat storage/logs/laravel.log | grep "video\|HLS" | tail -20
```

**Check app environment:**
```bash
grep APP_ENV .env
# Should show: APP_ENV=local (not production)

grep APP_DEBUG .env  
# Should show: APP_DEBUG=true
```

---

## 📊 Complete Terminal Setup

Here's what your screen should look like:

```
┌─────────────────────────────────┐
│ Terminal 1: Node.js Worker      │
│ $ cd nodejs-worker              │
│ $ node server.js                │
│                                 │
│ [INFO] Worker started...       │
│ 🎬 NEW REQUEST...              │
│ Progress: [████████] 40%       │
│ ← WATCH THIS FOR PROCESSING    │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ Terminal 2: Laravel Logs        │
│ $ tail -f storage/logs/...     │
│                                 │
│ ✅ Video queued                │
│ 📨 Callback received           │
│ ← WATCH THIS FOR STATUS        │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ Terminal 3: Laravel Server      │
│ $ php artisan serve            │
│                                 │
│ Laravel development server...  │
└─────────────────────────────────┘
```

---

## ✅ Success Checklist

- [ ] Migration ran successfully
- [ ] Node.js worker shows "started on port 3111"
- [ ] Test script shows all ✅ green checks
- [ ] Laravel server is running
- [ ] Uploaded a test video
- [ ] Saw processing logs in Terminal 1
- [ ] Saw completion message with 🎉
- [ ] File exists: `public/hls/{lesson_id}/playlist.m3u8`

---

## 🎯 Quick Commands Reference

```bash
# Test health
curl http://localhost:3111/health

# Watch Laravel logs (with colors)
tail -f storage/logs/laravel.log | grep --color=always "🎬\|📹\|✅\|❌"

# Check latest lesson status
php artisan tinker
>>> App\Models\Course\SectionLesson::latest()->first()->processing_status

# Restart Node.js worker
# Ctrl+C in Terminal 1, then:
node server.js

# Clear Laravel cache
php artisan cache:clear
php artisan config:clear
```

---

## 🎉 You're Ready!

Your HLS system is now fully integrated and will show detailed logs at every step!

**Next time you upload a video:**
1. Terminal 1 will show FFmpeg progress bars in real-time ⚡
2. Terminal 2 will show Laravel processing status 📊
3. Your database will update automatically 💾
4. Frontend will display the HLS video 🎬

Happy streaming! 🚀
