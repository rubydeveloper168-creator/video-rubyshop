# 🎬 READY TO TEST - Video Upload System

## ✅ System Status: ALL GREEN!

Your HLS video processing system is fully configured and ready to use!

## 🚀 Start Testing Now

### Step 1: Open 2 Terminal Windows

**Terminal 1 - Node.js Worker (Keep Running):**
```bash
cd /Applications/MAMP/htdocs/learnig/nodejs-worker
node server.js
```

**Terminal 2 - Laravel Logs Monitor:**
```bash
cd /Applications/MAMP/htdocs/learnig
tail -f storage/logs/laravel.log | grep --line-buffered '🎬\|📹\|✅\|❌\|📨'
```

### Step 2: Upload a Video

1. **Open your browser:** http://127.0.0.1:8000/dashboard/courses/1/edit?tab=curriculum

2. **Click "Add Lesson"** (or if no section exists, first click "Add Section")

3. **Select "Video File"** as the lesson type

4. **Click "Next"** to proceed to the form

5. **Fill in the lesson title** (e.g., "Test Video")

6. **Select a video file** - Use a small test video (5-20MB recommended for first test)

7. **Click Submit/Upload**

### Step 3: Watch the Magic! ✨

**In Terminal 1 (Node.js Worker), you'll see:**
```
================================================================================
🎬 NEW VIDEO PROCESSING REQUEST
================================================================================
📋 Request Details:
   - Video ID: 123
   - Video Path: /Applications/MAMP/htdocs/learnig/public/uploads/videos/test.mp4
   - Callback URL: http://localhost:8000/api/video/processing-callback
   - Timestamp: 2025-10-22T12:00:00.000Z
--------------------------------------------------------------------------------
✅ Video file found
✅ Request accepted - Processing will start asynchronously
================================================================================

🎯 STARTING VIDEO PROCESSING
================================================================================
📁 Creating output directory
✅ Output directory ready

📊 EXTRACTING VIDEO METADATA
--------------------------------------------------------------------------------
✅ Metadata extracted:
   - Duration: 30 seconds
   - Resolution: 1920x1080
   - Codec: h264
   - Size: 15.50 MB

🖼️  GENERATING THUMBNAIL
--------------------------------------------------------------------------------
✅ Thumbnail generated

📹 CONVERTING TO HLS FORMAT
--------------------------------------------------------------------------------
This may take a few minutes depending on video size...
▶️  FFmpeg process started
Progress: [████████░░░░░░░░░░░░] 20% | Frames: 600 | FPS: 30 | Speed: 5000kbps
Progress: [████████████████░░░░] 40% | Frames: 1200 | FPS: 30 | Speed: 5000kbps
Progress: [████████████████████] 60% | Frames: 1800 | FPS: 30 | Speed: 5000kbps
Progress: [████████████████████] 80% | Frames: 2400 | FPS: 30 | Speed: 5000kbps
Progress: [████████████████████] 100% | Frames: 3000 | FPS: 30 | Speed: 5000kbps
✅ HLS conversion completed

📊 PROCESSING SUMMARY
================================================================================
Video ID: 123
Processing Time: 45.23 seconds
HLS Segments Created: 5
Completed at: 2025-10-22T12:01:00.000Z
================================================================================

📤 SENDING CALLBACK TO LARAVEL
--------------------------------------------------------------------------------
Callback URL: http://localhost:8000/api/video/processing-callback
✅ Callback sent successfully

🎉 VIDEO PROCESSING COMPLETED SUCCESSFULLY
================================================================================
```

**In Terminal 2 (Laravel Logs), you'll see:**
```
[2025-10-22 12:00:00] local.INFO: 🎬 Starting lesson handler {"lesson_type":"video","has_video_file":true}
[2025-10-22 12:00:00] local.INFO: 📹 Queuing video for HLS processing {"lesson_id":123,"video_path":"uploads/videos/test.mp4"}
[2025-10-22 12:00:00] local.INFO: 📤 Sending request to video processor {"url":"http://localhost:3111/process-video"}
[2025-10-22 12:00:00] local.INFO: ✅ Video successfully queued for HLS processing
[2025-10-22 12:01:00] local.INFO: 📨 Received processing callback {"video_id":123,"status":"completed"}
[2025-10-22 12:01:00] local.INFO: ✅ Video processing completed successfully {"lesson_id":123}
```

### Step 4: Verify Output Files

Check that HLS files were created:
```bash
cd /Applications/MAMP/htdocs/learnig
ls -lh public/hls/123/
```

You should see:
```
playlist.m3u8         # Master playlist
segment_000.ts        # Video segment 1
segment_001.ts        # Video segment 2
segment_002.ts        # Video segment 3
...
thumbnail.jpg         # Video thumbnail
```

### Step 5: Check Database

Your lesson record should now have HLS data:
```bash
php artisan tinker
```
Then in tinker:
```php
$lesson = App\Models\Course\SectionLesson::find(123);
$lesson->hls_playlist_path;    // "hls/123/playlist.m3u8"
$lesson->processing_status;     // "completed"
$lesson->isHLS();               // true
```

## 🎉 Success Indicators

✅ **Node.js worker shows:** "🎉 VIDEO PROCESSING COMPLETED SUCCESSFULLY"
✅ **Laravel logs show:** "✅ Video processing completed successfully"
✅ **Files exist in:** `public/hls/{lesson_id}/`
✅ **Database updated:** `processing_status = 'completed'`

## 🐛 Troubleshooting

### If you see NO logs at all:

1. **Check Node.js worker is running:**
   ```bash
   curl http://localhost:3111/health
   ```
   Should return: `{"status":"healthy",...}`

2. **Check Laravel can reach worker:**
   ```bash
   php artisan tinker
   ```
   ```php
   Http::get('http://localhost:3111/health');
   ```

3. **Check file upload succeeded:**
   - Look in `public/uploads/videos/` for your uploaded file
   - Check `chunked_uploads` table in database

### If processing starts but fails:

1. **Check FFmpeg errors in Node.js terminal**
2. **Verify video file is valid:**
   ```bash
   ffmpeg -i public/uploads/videos/your-video.mp4
   ```

3. **Check directory permissions:**
   ```bash
   chmod -R 755 public/hls
   ```

### If callback fails:

1. **Check routes are loaded:**
   ```bash
   php artisan route:list | grep video
   ```

2. **Check Laravel API routes are accessible:**
   ```bash
   curl -X POST http://127.0.0.1:8000/api/video/processing-callback \
     -H "Content-Type: application/json" \
     -d '{"video_id":999,"status":"test"}'
   ```

## 📊 What Happens Behind the Scenes

1. **User uploads video** → Chunked upload to Laravel
2. **Laravel saves video file** → `public/uploads/videos/`
3. **CourseSectionService.lessonHandler()** → Detects video type
4. **VideoProcessingService.queueForProcessing()** → Sends request to Node.js
5. **Node.js worker receives request** → Starts FFmpeg processing
6. **FFmpeg converts video** → Creates HLS playlist + segments
7. **Node.js sends callback** → Updates Laravel database
8. **Database updated** → `hls_playlist_path`, `processing_status = 'completed'`
9. **Frontend can play** → Using HLS.js player

## 🎯 Next Steps After Successful Test

1. ✅ Upload more videos to test with different file sizes
2. ✅ Test with different video formats (MP4, MOV, AVI)
3. ✅ Integrate HLSVideoPlayer component into your frontend
4. ✅ Set up production deployment with PM2 for Node.js worker
5. ✅ Configure Nginx timeouts for production (see DOCKER_README.md)

## 💡 Pro Tips

- **Use small videos first** (5-20MB) to test quickly
- **Keep Node.js terminal visible** to see progress bars in real-time
- **Use emoji grep** to filter Laravel logs: `grep '🎬\|📹\|✅\|❌'`
- **Check processing status** via API: `GET /api/video/status/{lessonId}`
- **Retry failed videos** via API: `POST /api/video/retry/{lessonId}`

## 🆘 Still Having Issues?

Run the diagnostic again:
```bash
./check-video-system.sh
```

Or share these details:
1. Last 50 lines of Laravel logs: `tail -50 storage/logs/laravel.log`
2. Node.js worker console output
3. Browser console errors (F12 → Console)
4. Output of: `ls -la public/uploads/videos/`

---

## 🎬 Ready? Let's Go!

**Open Terminal 1:**
```bash
cd nodejs-worker && node server.js
```

**Open Terminal 2:**
```bash
tail -f storage/logs/laravel.log | grep --line-buffered '🎬\|📹\|✅\|❌'
```

**Open Browser:**
```
http://127.0.0.1:8000/dashboard/courses/1/edit?tab=curriculum
```

**Upload a video and watch the beautiful logs flow! 🚀**
