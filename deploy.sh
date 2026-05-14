#!/bin/bash
set -e

SERVER="ruby168@192.168.88.170"
APP_DIR="/var/www/video.rubyshop.co.th"

echo "==> Pushing to GitHub..."
git push origin main

echo "==> Deploying to server..."
ssh "$SERVER" "
  cd $APP_DIR
  echo '-- Pulling latest code --'
  git pull origin main

  echo '-- Building Docker image --'
  docker compose -f docker-compose.prod.yml build --no-cache

  echo '-- Restarting containers --'
  docker compose -f docker-compose.prod.yml up -d

  echo '-- Running migrations --'
  docker exec video_app php artisan migrate --force

  echo '-- Clearing cache --'
  docker exec video_app php artisan config:cache
  docker exec video_app php artisan route:cache
  docker exec video_app php artisan view:cache

  echo '-- Done! --'
"
