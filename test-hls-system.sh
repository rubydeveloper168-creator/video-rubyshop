#!/bin/bash

echo "========================================"
echo "HLS Video System - Connection Test"
echo "========================================"
echo ""

# Check if Node.js worker is running
echo "1. Testing Node.js Worker Connection..."
echo "----------------------------------------"
HEALTH_CHECK=$(curl -s -w "\n%{http_code}" http://localhost:3111/health 2>/dev/null)
HTTP_CODE=$(echo "$HEALTH_CHECK" | tail -n 1)
RESPONSE=$(echo "$HEALTH_CHECK" | head -n -1)

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Node.js Worker is running"
    echo "Response: $RESPONSE"
else
    echo "❌ Node.js Worker is NOT running"
    echo "Please start it with: cd nodejs-worker && node server.js"
    exit 1
fi

echo ""
echo "2. Testing Laravel API Route..."
echo "----------------------------------------"
# Test Laravel API endpoint
LARAVEL_URL="http://localhost:8000/api/video/status/1"
LARAVEL_TEST=$(curl -s -w "\n%{http_code}" "$LARAVEL_URL" 2>/dev/null)
LARAVEL_CODE=$(echo "$LARAVEL_TEST" | tail -n 1)

if [ "$LARAVEL_CODE" = "200" ] || [ "$LARAVEL_CODE" = "404" ]; then
    echo "✅ Laravel API is accessible"
    echo "Status Code: $LARAVEL_CODE"
else
    echo "⚠️  Laravel API returned: $LARAVEL_CODE"
    echo "Make sure Laravel is running: php artisan serve"
fi

echo ""
echo "3. Checking Required Directories..."
echo "----------------------------------------"
if [ -d "public/hls" ]; then
    echo "✅ public/hls directory exists"
else
    echo "❌ public/hls directory NOT found"
    echo "Creating it now..."
    mkdir -p public/hls
    chmod 775 public/hls
    echo "✅ Created public/hls"
fi

if [ -d "storage/app/public/videos" ]; then
    echo "✅ storage/app/public/videos directory exists"
else
    echo "⚠️  storage/app/public/videos directory NOT found"
    mkdir -p storage/app/public/videos
    chmod 775 storage/app/public/videos
    echo "✅ Created storage/app/public/videos"
fi

echo ""
echo "4. Checking FFmpeg Installation..."
echo "----------------------------------------"
if command -v ffmpeg &> /dev/null; then
    echo "✅ FFmpeg is installed"
    ffmpeg -version | head -n 1
    
    # Check for required codecs
    if ffmpeg -codecs 2>/dev/null | grep -q "libx264"; then
        echo "✅ libx264 codec available"
    else
        echo "❌ libx264 codec NOT available"
    fi
    
    if ffmpeg -codecs 2>/dev/null | grep -q " aac "; then
        echo "✅ AAC audio codec available"
    else
        echo "❌ AAC audio codec NOT available"
    fi
else
    echo "❌ FFmpeg is NOT installed"
    echo "Install with: sudo apt install ffmpeg"
fi

echo ""
echo "5. Checking Laravel Logs..."
echo "----------------------------------------"
if [ -f "storage/logs/laravel.log" ]; then
    echo "Last 5 video processing related logs:"
    grep -i "video\|hls\|processing" storage/logs/laravel.log | tail -n 5
else
    echo "No Laravel logs found yet"
fi

echo ""
echo "========================================"
echo "System Check Complete!"
echo "========================================"
echo ""
echo "To monitor logs in real-time:"
echo "  - Laravel: tail -f storage/logs/laravel.log"
echo "  - Node.js: Check the terminal where server.js is running"
echo ""
echo "To test video upload:"
echo "  1. Upload a video through the lesson form"
echo "  2. Watch the Node.js terminal for processing logs"
echo "  3. Check Laravel logs: tail -f storage/logs/laravel.log | grep HLS"
echo ""
