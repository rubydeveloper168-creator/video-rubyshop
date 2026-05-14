# HLS Video System - Installation & Setup Guide

## Overview
This system converts uploaded videos to HLS (HTTP Live Streaming) format for optimized streaming performance. Videos are split into multiple segments and progressively loaded, providing faster initial playback and better bandwidth management.

## Prerequisites

### System Requirements
- PHP 8.3+ with BCMath extension
- Node.js 18+ and npm
- FFmpeg 4.3+ (with libx264 and aac codecs)
- MySQL/MariaDB
- Nginx or Apache web server

### Install FFmpeg on Debian
```bash
sudo apt update
sudo apt install -y ffmpeg

# Verify installation
ffmpeg -version
ffmpeg -codecs | grep h264
ffmpeg -codecs | grep aac
```

## Installation Steps

### 1. Install PHP Dependencies
```bash
cd /path/to/your/laravel/app
composer install
```

### 2. Install Node.js Dependencies
```bash
# Install frontend dependencies
npm install

# Install Node.js worker dependencies
cd nodejs-worker
npm install
cd ..
```

### 3. Run Database Migrations
```bash
php artisan migrate
```

This will add the following fields to `section_lessons` table:
- `hls_playlist_path` - Path to the HLS playlist file
- `original_video_path` - Original uploaded video path
- `processing_status` - Video processing status
- `processing_error` - Error message if processing fails
- `video_segments` - Number of HLS segments created
- `video_resolution` - Video resolution
- `processed_at` - Processing completion timestamp

### 4. Configure Environment Variables

Add to your `.env` file:
```env
VIDEO_PROCESSOR_URL=http://localhost:3111
VIDEO_PROCESSOR_ENABLED=true
```

For production with custom port:
```env
VIDEO_PROCESSOR_URL=http://your-server-ip:3111
VIDEO_PROCESSOR_ENABLED=true
```

### 5. Create Required Directories
```bash
# Create HLS output directory
mkdir -p public/hls
chmod 775 public/hls

# Create upload directory
mkdir -p storage/app/public/videos
chmod 775 storage/app/public/videos

# Link storage
php artisan storage:link
```

### 6. Start the Node.js Video Processor

#### Development Mode
```bash
cd nodejs-worker
node server.js
```

#### Production Mode with PM2
```bash
# Install PM2 globally
sudo npm install -g pm2

# Start the video processor
cd nodejs-worker
pm2 start server.js --name "video-processor"

# Save PM2 configuration
pm2 save

# Set PM2 to start on boot
pm2 startup
```

Check PM2 status:
```bash
pm2 status
pm2 logs video-processor
pm2 monit
```

## Usage

### Backend - Upload and Process Video

```php
use App\Models\Course\SectionLesson;
use App\Services\VideoProcessingService;

// In your controller
public function uploadVideo(Request $request)
{
    // Validate and store video
    $videoPath = $request->file('video')->store('videos', 'public');
    
    // Create lesson
    $lesson = SectionLesson::create([
        'title' => $request->title,
        'lesson_type' => 'video',
        'lesson_src' => $videoPath,
        'course_id' => $request->course_id,
        'course_section_id' => $request->section_id,
        // ... other fields
    ]);
    
    // Queue for HLS processing
    $videoProcessingService = new VideoProcessingService();
    $videoProcessingService->queueForProcessing($lesson, $videoPath);
    
    return response()->json([
        'success' => true,
        'lesson_id' => $lesson->id,
        'message' => 'Video uploaded and queued for processing'
    ]);
}
```

### Frontend - Display HLS Video

```tsx
import HLSVideoPlayer from '@/components/hls-video-player';

function VideoLesson({ lesson }) {
    return (
        <HLSVideoPlayer
            src={lesson.hls_playlist_path || lesson.lesson_src}
            poster={lesson.thumbnail}
            lessonId={lesson.id}
            autoplay={false}
            controls={true}
            onEnded={() => console.log('Video ended')}
            onTimeUpdate={(time) => console.log('Current time:', time)}
        />
    );
}
```

## API Endpoints

### 1. Processing Callback (Called by Node.js worker)
```
POST /api/video/processing-callback
```

Request body:
```json
{
    "video_id": 123,
    "status": "completed",
    "hls_path": "hls/123/playlist.m3u8",
    "thumbnail_path": "hls/123/thumbnail.jpg",
    "duration": 120,
    "resolution": "1920x1080",
    "processing_info": {
        "segments_created": 20
    }
}
```

### 2. Get Processing Status
```
GET /api/video/status/{lessonId}
```

Response:
```json
{
    "success": true,
    "data": {
        "status": "completed",
        "is_processing": false,
        "is_completed": true,
        "video_url": "/hls/123/playlist.m3u8",
        "thumbnail_url": "/hls/123/thumbnail.jpg",
        "segments": 20,
        "resolution": "1920x1080"
    }
}
```

### 3. Retry Failed Processing
```
POST /api/video/retry/{lessonId}
```

## Configuration Options

### Node.js Worker (.env in nodejs-worker/)
```env
PORT=3111
FFMPEG_PATH=ffmpeg
OUTPUT_DIR=../public/hls
LARAVEL_BASE_URL=http://localhost:8000
```

### FFmpeg Options
Adjust in `nodejs-worker/server.js`:

```javascript
'-crf 23', // Quality (18-28, lower = better)
'-preset fast', // Speed (ultrafast, superfast, veryfast, faster, fast, medium, slow, slower, veryslow)
'-maxrate 5000k', // Maximum bitrate
'-hls_time 6', // Segment duration (4-10 seconds recommended)
```

## Troubleshooting

### Video Processing Fails
```bash
# Check Node.js worker logs
pm2 logs video-processor

# Check FFmpeg installation
ffmpeg -version

# Test FFmpeg manually
ffmpeg -i input.mp4 -c:v libx264 -c:a aac -f hls output.m3u8
```

### Cannot Connect to Video Processor
```bash
# Check if worker is running
pm2 status

# Check port availability
sudo netstat -tlnp | grep 3111

# Test connection
curl http://localhost:3111/health
```

### HLS Files Not Accessible
```bash
# Check directory permissions
ls -la public/hls/

# Fix permissions
sudo chown -R www-data:www-data public/hls/
sudo chmod -R 775 public/hls/
```

### Large File Uploads Failing
Update `php.ini`:
```ini
upload_max_filesize = 500M
post_max_size = 500M
max_execution_time = 300
memory_limit = 512M
```

Update Nginx:
```nginx
client_max_body_size 500M;
client_body_timeout 300;
```

## Performance Optimization

### 1. Use CDN for HLS Files
Configure your CDN to serve files from `/public/hls/` directory.

### 2. Enable Gzip Compression
In Nginx:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript application/x-javascript text/xml application/xml application/xml+rss text/javascript application/vnd.apple.mpegurl;
```

### 3. Cache HLS Segments
In Nginx:
```nginx
location ~* \.(m3u8|ts)$ {
    expires 1h;
    add_header Cache-Control "public, no-transform";
}
```

### 4. Multiple Quality Levels (Advanced)
Modify convertToHLS in server.js to generate multiple bitrates:
- 1080p (5000k bitrate)
- 720p (3000k bitrate)
- 480p (1500k bitrate)

## Monitoring

### Check Processing Queue
```bash
# View all processing videos
php artisan tinker
>>> App\Models\Course\SectionLesson::where('processing_status', 'processing')->count();
```

### Monitor Worker Performance
```bash
pm2 monit video-processor
```

### Check Disk Space
```bash
df -h
du -sh public/hls/
```

## Security Considerations

1. **Validate File Types**: Only allow video formats
2. **Limit File Size**: Set reasonable upload limits
3. **Rate Limiting**: Prevent abuse of upload endpoint
4. **Authentication**: Protect processing endpoints
5. **Clean Up**: Remove old/unused HLS files periodically

## Cleanup Script

Create a scheduled task to remove old HLS files:

```php
// In app/Console/Kernel.php
protected function schedule(Schedule $schedule)
{
    // Delete HLS files older than 30 days for deleted lessons
    $schedule->call(function () {
        $oldFiles = Storage::disk('public')->directories('hls');
        foreach ($oldFiles as $dir) {
            $lessonId = basename($dir);
            if (!SectionLesson::find($lessonId)) {
                Storage::disk('public')->deleteDirectory($dir);
            }
        }
    })->daily();
}
```

## Support

For issues or questions:
1. Check logs: `storage/logs/laravel.log` and `pm2 logs video-processor`
2. Verify FFmpeg installation and codecs
3. Test Node.js worker health endpoint: `http://localhost:3111/health`
4. Review file permissions and disk space

## License
This HLS video system is part of the MentorLMS platform.
