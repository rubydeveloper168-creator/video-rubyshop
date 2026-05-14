#!/bin/bash

# Quick start script for video processing system
# Opens monitoring in current terminal

echo "🎬 Starting Video Processing Monitor"
echo "====================================="
echo ""
echo "📋 Instructions:"
echo "   1. Open a NEW terminal and run: cd /Applications/MAMP/htdocs/learnig/nodejs-worker && node server.js"
echo "   2. Then come back here to see Laravel logs"
echo "   3. Open browser: http://127.0.0.1:8000/dashboard/courses/1/edit?tab=curriculum"
echo "   4. Upload a video!"
echo ""
echo "Press Enter when Node.js worker is running..."
read

echo ""
echo "✅ Now monitoring Laravel logs (showing only video processing logs)..."
echo "📊 Logs will appear here when you upload a video"
echo ""
echo "To stop: Press Ctrl+C"
echo "========================================"
echo ""

tail -f storage/logs/laravel.log | grep --line-buffered '🎬\|📹\|✅\|❌\|📨'
