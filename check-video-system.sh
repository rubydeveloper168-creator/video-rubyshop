#!/bin/bash

# Video Upload System Diagnostic Script
# This checks all components needed for HLS video processing

echo "🔍 VIDEO UPLOAD SYSTEM DIAGNOSTICS"
echo "=================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Check Laravel .env configuration
echo "1️⃣ Checking Laravel .env configuration..."
if grep -q "VIDEO_PROCESSOR_URL" .env; then
    VIDEO_URL=$(grep "VIDEO_PROCESSOR_URL" .env | cut -d '=' -f2)
    VIDEO_ENABLED=$(grep "VIDEO_PROCESSOR_ENABLED" .env | cut -d '=' -f2)
    echo -e "${GREEN}✅ Found:${NC}"
    echo "   VIDEO_PROCESSOR_URL=${VIDEO_URL}"
    echo "   VIDEO_PROCESSOR_ENABLED=${VIDEO_ENABLED}"
else
    echo -e "${RED}❌ VIDEO_PROCESSOR configuration NOT found in .env${NC}"
    echo "   Run: echo 'VIDEO_PROCESSOR_URL=http://localhost:3111' >> .env"
    echo "   Run: echo 'VIDEO_PROCESSOR_ENABLED=true' >> .env"
fi
echo ""

# 2. Check if Node.js worker is running
echo "2️⃣ Checking Node.js worker status..."
if curl -s http://localhost:3111/health > /dev/null 2>&1; then
    HEALTH=$(curl -s http://localhost:3111/health)
    echo -e "${GREEN}✅ Node.js worker is running!${NC}"
    echo "   Response: ${HEALTH}"
else
    echo -e "${RED}❌ Node.js worker is NOT running${NC}"
    echo "   To start: cd nodejs-worker && node server.js"
fi
echo ""

# 3. Check FFmpeg installation
echo "3️⃣ Checking FFmpeg installation..."
if command -v ffmpeg &> /dev/null; then
    FFMPEG_VERSION=$(ffmpeg -version 2>&1 | head -1)
    echo -e "${GREEN}✅ FFmpeg is installed${NC}"
    echo "   ${FFMPEG_VERSION}"
else
    echo -e "${RED}❌ FFmpeg is NOT installed${NC}"
    echo "   Install: brew install ffmpeg"
fi
echo ""

# 4. Check database migration
echo "4️⃣ Checking HLS database migration..."
if php artisan migrate:status 2>&1 | grep -q "add_hls_support"; then
    MIGRATION_STATUS=$(php artisan migrate:status 2>&1 | grep "add_hls_support")
    if echo "$MIGRATION_STATUS" | grep -q "Ran"; then
        echo -e "${GREEN}✅ HLS migration has been run${NC}"
        echo "   ${MIGRATION_STATUS}"
    else
        echo -e "${YELLOW}⚠️  HLS migration exists but not run${NC}"
        echo "   Run: php artisan migrate"
    fi
else
    echo -e "${RED}❌ HLS migration NOT found${NC}"
    echo "   Migration file should exist at: database/migrations/*_add_hls_support_to_section_lessons_table.php"
fi
echo ""

# 5. Check API routes
echo "5️⃣ Checking video processing API routes..."
if php artisan route:list 2>&1 | grep -q "video-processing/callback"; then
    echo -e "${GREEN}✅ Video processing routes exist${NC}"
    php artisan route:list 2>&1 | grep "video-processing"
else
    echo -e "${RED}❌ Video processing routes NOT found${NC}"
    echo "   Check: routes/api.php should have video processing routes"
fi
echo ""

# 6. Check HLS output directory
echo "6️⃣ Checking HLS output directory..."
if [ -d "public/hls" ]; then
    FILE_COUNT=$(find public/hls -type f 2>/dev/null | wc -l | tr -d ' ')
    echo -e "${GREEN}✅ HLS directory exists${NC}"
    echo "   Path: public/hls"
    echo "   Files: ${FILE_COUNT} files"
    
    # Check permissions
    if [ -w "public/hls" ]; then
        echo -e "${GREEN}✅ Directory is writable${NC}"
    else
        echo -e "${RED}❌ Directory is NOT writable${NC}"
        echo "   Run: chmod -R 755 public/hls"
    fi
else
    echo -e "${YELLOW}⚠️  HLS directory doesn't exist yet${NC}"
    echo "   Will be created automatically on first upload"
fi
echo ""

# 7. Check VideoProcessingService exists
echo "7️⃣ Checking VideoProcessingService..."
if [ -f "app/Services/VideoProcessingService.php" ]; then
    echo -e "${GREEN}✅ VideoProcessingService exists${NC}"
else
    echo -e "${RED}❌ VideoProcessingService NOT found${NC}"
fi
echo ""

# 8. Check CourseSectionService integration
echo "8️⃣ Checking CourseSectionService integration..."
if grep -q "VideoProcessingService" app/Services/Course/CourseSectionService.php; then
    echo -e "${GREEN}✅ CourseSectionService has VideoProcessingService integration${NC}"
    if grep -q "queueForProcessing" app/Services/Course/CourseSectionService.php; then
        echo -e "${GREEN}✅ queueForProcessing method is called${NC}"
    else
        echo -e "${RED}❌ queueForProcessing method NOT called${NC}"
    fi
else
    echo -e "${RED}❌ VideoProcessingService NOT integrated in CourseSectionService${NC}"
fi
echo ""

# 9. Check Node.js dependencies
echo "9️⃣ Checking Node.js worker dependencies..."
if [ -d "nodejs-worker/node_modules" ]; then
    echo -e "${GREEN}✅ Node modules installed${NC}"
    
    # Check for required packages
    if [ -d "nodejs-worker/node_modules/fluent-ffmpeg" ]; then
        echo -e "${GREEN}✅ fluent-ffmpeg installed${NC}"
    else
        echo -e "${RED}❌ fluent-ffmpeg NOT installed${NC}"
        echo "   Run: cd nodejs-worker && npm install"
    fi
else
    echo -e "${RED}❌ Node modules NOT installed${NC}"
    echo "   Run: cd nodejs-worker && npm install"
fi
echo ""

# 10. Summary
echo "=================================="
echo "📊 SUMMARY"
echo "=================================="
echo ""

ERRORS=0
WARNINGS=0

# Count issues
if ! grep -q "VIDEO_PROCESSOR_URL" .env; then ((ERRORS++)); fi
if ! curl -s http://localhost:3111/health > /dev/null 2>&1; then ((ERRORS++)); fi
if ! command -v ffmpeg &> /dev/null; then ((ERRORS++)); fi
if ! php artisan migrate:status 2>&1 | grep "add_hls_support" | grep -q "Ran"; then ((WARNINGS++)); fi

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}🎉 All systems are ready!${NC}"
    echo ""
    echo "📝 Next steps:"
    echo "   1. Make sure Node.js worker is running: cd nodejs-worker && node server.js"
    echo "   2. Go to: http://127.0.0.1:8000/dashboard/courses/1/edit?tab=curriculum"
    echo "   3. Upload a video and watch the logs!"
    echo ""
    echo "🔍 To monitor logs:"
    echo "   Terminal 1: cd nodejs-worker && node server.js"
    echo "   Terminal 2: tail -f storage/logs/laravel.log | grep '🎬\|📹\|✅\|❌'"
else
    echo -e "${RED}❌ Found ${ERRORS} critical error(s) and ${WARNINGS} warning(s)${NC}"
    echo ""
    echo "Please fix the issues above before uploading videos."
fi

echo ""
