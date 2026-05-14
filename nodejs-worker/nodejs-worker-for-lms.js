const express = require('express');
const cors = require('cors');
const ffmpeg = require('fluent-ffmpeg');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3112;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration
const config = {
    ffmpegPath: process.env.FFMPEG_PATH || 'ffmpeg', // Path to FFmpeg binary
    outputDir: process.env.OUTPUT_DIR || '../public/hls', // Output directory for HLS files
    laravel: {
        baseUrl: process.env.LARAVEL_BASE_URL || 'https://video.rubyshop.co.th',
        callbackEndpoint: '/api/short-videos/processing-callback'
    }
};

// Set FFmpeg path
ffmpeg.setFfmpegPath(config.ffmpegPath);

// Logging utility
const log = {
    info: (message, data = null) => {
        console.log(`[INFO] ${new Date().toISOString()} - ${message}`, data || '');
    },
    error: (message, error = null) => {
        console.error(`[ERROR] ${new Date().toISOString()} - ${message}`, error || '');
    },
    warn: (message, data = null) => {
        console.warn(`[WARN] ${new Date().toISOString()} - ${message}`, data || '');
    }
};

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

// Main video processing endpoint
app.post('/process-video', async (req, res) => {
    const { video_id, video_path, callback_url } = req.body;
    
    console.log('='.repeat(80));
    console.log('🎬 NEW VIDEO PROCESSING REQUEST');
    console.log('='.repeat(80));
    console.log('📋 Request Details:');
    console.log('   - Video ID:', video_id);
    console.log('   - Video Path:', video_path);
    console.log('   - Callback URL:', callback_url);
    console.log('   - Timestamp:', new Date().toISOString());
    console.log('-'.repeat(80));
    
    log.info('Received video processing request', { video_id, video_path });
    
    // Validate request
    if (!video_id || !video_path) {
        console.log('❌ VALIDATION FAILED: Missing required parameters');
        return res.status(400).json({
            success: false,
            message: 'Missing required parameters: video_id and video_path'
        });
    }
    
    // Check if video file exists
    try {
        await fs.access(video_path);
        console.log('✅ Video file found:', video_path);
    } catch (error) {
        console.log('❌ VIDEO FILE NOT FOUND:', video_path);
        log.error('Video file not found', { video_path, error: error.message });
        return res.status(404).json({
            success: false,
            message: 'Video file not found'
        });
    }
    
    // Respond immediately and process asynchronously
    console.log('✅ Request accepted - Processing will start asynchronously');
    console.log('='.repeat(80));
    console.log('');
    
    res.json({
        success: true,
        message: 'Video processing started',
        video_id
    });
    
    // Process video asynchronously
    processVideo(video_id, video_path, callback_url);
});

// Main video processing function
async function processVideo(videoId, videoPath, callbackUrl) {
    console.log('');
    console.log('🎯 STARTING VIDEO PROCESSING');
    console.log('='.repeat(80));
    console.log('Video ID:', videoId);
    console.log('Video Path:', videoPath);
    console.log('Started at:', new Date().toISOString());
    console.log('='.repeat(80));
    
    const startTime = Date.now();
    
    log.info('Starting video processing', { videoId, videoPath });
    
    try {
        // Create output directory
        const outputDir = path.join(__dirname, config.outputDir, videoId.toString());
        console.log('📁 Creating output directory:', outputDir);
        await ensureDirectoryExists(outputDir);
        console.log('✅ Output directory ready');
        
        // Get video metadata
        console.log('');
        console.log('📊 EXTRACTING VIDEO METADATA');
        console.log('-'.repeat(80));
        const metadata = await getVideoMetadata(videoPath);
        console.log('✅ Metadata extracted:');
        console.log('   - Duration:', metadata.duration, 'seconds');
        console.log('   - Resolution:', metadata.width + 'x' + metadata.height);
        console.log('   - Codec:', metadata.codec_name);
        console.log('   - Bitrate:', metadata.bit_rate);
        console.log('   - Size:', (metadata.size / 1024 / 1024).toFixed(2), 'MB');
        log.info('Video metadata extracted', { videoId, metadata });
        
        // Generate thumbnail
        console.log('');
        console.log('🖼️  GENERATING THUMBNAIL');
        console.log('-'.repeat(80));
        const thumbnailPath = await generateThumbnail(videoPath, outputDir, videoId);
        console.log('✅ Thumbnail generated:', thumbnailPath);
        log.info('Thumbnail generated', { videoId, thumbnailPath });
        
        // Convert to HLS
        console.log('');
        console.log('📹 CONVERTING TO HLS FORMAT');
        console.log('-'.repeat(80));
        console.log('This may take a few minutes depending on video size...');
        const hlsPath = await convertToHLS(videoPath, outputDir, videoId);
        console.log('✅ HLS conversion completed:', hlsPath);
        log.info('HLS conversion completed', { videoId, hlsPath });
        
        const processingTime = Date.now() - startTime;
        const segmentsCount = await countHLSSegments(outputDir);
        
        console.log('');
        console.log('📊 PROCESSING SUMMARY');
        console.log('='.repeat(80));
        console.log('Video ID:', videoId);
        console.log('Processing Time:', (processingTime / 1000).toFixed(2), 'seconds');
        console.log('HLS Segments Created:', segmentsCount);
        console.log('Output Directory:', outputDir);
        console.log('Completed at:', new Date().toISOString());
        console.log('='.repeat(80));
        
        // Prepare callback data
        const callbackData = {
            video_id: videoId,
            status: 'completed',
            hls_path: `hls/${videoId}/playlist.m3u8`,
            thumbnail_path: `hls/${videoId}/thumbnail.jpg`,
            duration: Math.round(metadata.duration),
            resolution: `${metadata.width}x${metadata.height}`,
            processing_info: {
                original_codec: metadata.codec_name,
                original_bitrate: metadata.bit_rate,
                processed_at: new Date().toISOString(),
                processing_time: processingTime,
                segments_created: segmentsCount
            }
        };
        
        // Send callback to Laravel
        console.log('');
        console.log('📤 SENDING CALLBACK TO LARAVEL');
        console.log('-'.repeat(80));
        console.log('Callback URL:', callbackUrl || config.laravel.callbackEndpoint);
        await sendCallback(callbackUrl || config.laravel.callbackEndpoint, callbackData);
        console.log('✅ Callback sent successfully');
        
        console.log('');
        console.log('🎉 VIDEO PROCESSING COMPLETED SUCCESSFULLY');
        console.log('='.repeat(80));
        console.log('');
        
        log.info('Video processing completed successfully', { videoId });
        
    } catch (error) {
        const processingTime = Date.now() - startTime;
        
        console.log('');
        console.log('❌ VIDEO PROCESSING FAILED');
        console.log('='.repeat(80));
        console.log('Video ID:', videoId);
        console.log('Error:', error.message);
        console.log('Failed at:', new Date().toISOString());
        console.log('Processing time before failure:', (processingTime / 1000).toFixed(2), 'seconds');
        console.log('='.repeat(80));
        console.log('');
        
        log.error('Video processing failed', { videoId, error: error.message });
        
        // Send failure callback
        const failureData = {
            video_id: videoId,
            status: 'failed',
            processing_info: {
                error: error.message,
                failed_at: new Date().toISOString()
            }
        };
        
        try {
            console.log('📤 Sending failure callback to Laravel');
            await sendCallback(callbackUrl || config.laravel.callbackEndpoint, failureData);
            console.log('✅ Failure callback sent');
        } catch (callbackError) {
            console.log('❌ Failed to send failure callback:', callbackError.message);
            log.error('Failed to send failure callback', { videoId, error: callbackError.message });
        }
    }
}

// Get video metadata using FFprobe
function getVideoMetadata(videoPath) {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(videoPath, (err, metadata) => {
            if (err) {
                reject(err);
                return;
            }
            
            const videoStream = metadata.streams.find(stream => stream.codec_type === 'video');
            if (!videoStream) {
                reject(new Error('No video stream found'));
                return;
            }
            
            resolve({
                duration: metadata.format.duration,
                width: videoStream.width,
                height: videoStream.height,
                codec_name: videoStream.codec_name,
                bit_rate: metadata.format.bit_rate,
                size: metadata.format.size
            });
        });
    });
}

// Generate thumbnail from video
function generateThumbnail(videoPath, outputDir, videoId) {
    return new Promise((resolve, reject) => {
        const thumbnailPath = path.join(outputDir, 'thumbnail.jpg');
        
        ffmpeg(videoPath)
            .screenshot({
                timestamps: ['10%'], // Take screenshot at 10% of video duration
                filename: 'thumbnail.jpg',
                folder: outputDir,
                size: '360x640' // Portrait orientation for short videos
            })
            .on('end', () => {
                resolve(thumbnailPath);
            })
            .on('error', (err) => {
                log.error('Thumbnail generation failed', { videoId, error: err.message });
                reject(err);
            });
    });
}

// Convert video to HLS format
function convertToHLS(videoPath, outputDir, videoId) {
    return new Promise((resolve, reject) => {
        const playlistPath = path.join(outputDir, 'playlist.m3u8');
        
        ffmpeg(videoPath)
            .outputOptions([
                '-c:v libx264', // Video codec
                '-c:a aac', // Audio codec
                '-profile:v high', // H.264 high profile for better quality
                '-level 4.0',
                '-crf 23', // Constant Rate Factor (18-28, lower = better quality)
                '-preset fast', // Encoding speed preset
                '-maxrate 5000k', // Maximum bitrate
                '-bufsize 10000k', // Buffer size
                '-pix_fmt yuv420p', // Pixel format for compatibility
                '-movflags +faststart', // Enable fast start for web
                '-g 48', // GOP size (keyframe interval)
                '-sc_threshold 0', // Scene change threshold
                '-hls_time 6', // 6-second segments (optimal for streaming)
                '-hls_playlist_type vod', // VOD playlist type
                '-hls_list_size 0', // Keep all segments in playlist
                '-hls_segment_type mpegts', // MPEG-TS segment type
                '-hls_flags independent_segments', // Independent segments for better seeking
                '-hls_segment_filename', path.join(outputDir, 'segment_%03d.ts'),
                '-f hls'
            ])
            .output(playlistPath)
            .on('start', (commandLine) => {
                console.log('▶️  FFmpeg process started');
                console.log('Command:', commandLine);
                log.info('FFmpeg process started', { videoId, command: commandLine });
            })
            .on('progress', (progress) => {
                const percent = Math.round(progress.percent || 0);
                const bar = '█'.repeat(Math.floor(percent / 2)) + '░'.repeat(50 - Math.floor(percent / 2));
                console.log(`Progress: [${bar}] ${percent}% | Frames: ${progress.frames || 0} | FPS: ${Math.round(progress.currentFps || 0)} | Speed: ${progress.currentKbps || 0}kbps`);
                
                log.info('Processing progress', { 
                    videoId, 
                    percent: Math.round(progress.percent || 0),
                    frames: progress.frames,
                    fps: progress.currentFps,
                    bitrate: progress.currentKbps
                });
            })
            .on('end', () => {
                console.log('✅ HLS conversion finished');
                log.info('HLS conversion completed', { videoId, playlistPath });
                resolve(playlistPath);
            })
            .on('error', (err) => {
                console.log('❌ HLS conversion error:', err.message);
                log.error('HLS conversion failed', { videoId, error: err.message });
                reject(err);
            })
            .run();
    });
}

// Count HLS segments created
async function countHLSSegments(outputDir) {
    try {
        const files = await fs.readdir(outputDir);
        return files.filter(file => file.endsWith('.ts')).length;
    } catch (error) {
        log.warn('Failed to count HLS segments', { error: error.message });
        return 0;
    }
}

// Ensure directory exists
async function ensureDirectoryExists(dirPath) {
    try {
        await fs.access(dirPath);
    } catch (error) {
        await fs.mkdir(dirPath, { recursive: true });
        log.info('Created directory', { dirPath });
    }
}

// Send callback to Laravel
async function sendCallback(callbackUrl, data) {
    try {
        const fullUrl = callbackUrl.startsWith('http') 
            ? callbackUrl 
            : config.laravel.baseUrl + callbackUrl;
            
        log.info('Sending callback to Laravel', { url: fullUrl, videoId: data.video_id });
        
        const response = await axios.post(fullUrl, data, {
            timeout: 30000,
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'VideoProcessorWorker/1.0'
            }
        });
        
        log.info('Callback sent successfully', { 
            videoId: data.video_id, 
            status: response.status 
        });
        
    } catch (error) {
        log.error('Failed to send callback', { 
            videoId: data.video_id, 
            error: error.message,
            url: callbackUrl
        });
        throw error;
    }
}

// Error handling middleware
app.use((error, req, res, next) => {
    log.error('Unhandled error', { error: error.message, stack: error.stack });
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Start server
app.listen(PORT, () => {
    log.info(`Video processor worker started on port ${PORT}`);
    log.info('Configuration', {
        ffmpegPath: config.ffmpegPath,
        outputDir: config.outputDir,
        laravelBaseUrl: config.laravel.baseUrl
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    log.info('Received SIGTERM, shutting down gracefully');
    process.exit(0);
});

process.on('SIGINT', () => {
    log.info('Received SIGINT, shutting down gracefully');
    process.exit(0);
});

module.exports = app;
