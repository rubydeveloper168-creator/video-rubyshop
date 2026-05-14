import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Loader2, Play, Pause, Volume2, VolumeX, Maximize, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface HLSVideoPlayerProps {
   src: string;
   poster?: string;
   className?: string;
   autoplay?: boolean;
   controls?: boolean;
   onEnded?: () => void;
   onTimeUpdate?: (currentTime: number) => void;
   lessonId?: number;
}

export default function HLSVideoPlayer({
   src,
   poster,
   className,
   autoplay = false,
   controls = true,
   onEnded,
   onTimeUpdate,
   lessonId,
}: HLSVideoPlayerProps) {
   const videoRef = useRef<HTMLVideoElement>(null);
   const hlsRef = useRef<Hls | null>(null);
   const [isPlaying, setIsPlaying] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [isMuted, setIsMuted] = useState(false);
   const [volume, setVolume] = useState(100);
   const [currentTime, setCurrentTime] = useState(0);
   const [duration, setDuration] = useState(0);
   const [isFullscreen, setIsFullscreen] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [processingStatus, setProcessingStatus] = useState<any>(null);

   // Check processing status if lessonId is provided
   useEffect(() => {
      if (!lessonId) return;

      const checkStatus = async () => {
         try {
            const response = await fetch(`/api/video/status/${lessonId}`);
            const data = await response.json();
            
            if (data.success) {
               setProcessingStatus(data.data);
               
               // If still processing, poll every 5 seconds
               if (data.data.is_processing) {
                  setTimeout(checkStatus, 5000);
               }
            }
         } catch (error) {
            console.error('Failed to check processing status:', error);
         }
      };

      checkStatus();
   }, [lessonId]);

   // Initialize HLS
   useEffect(() => {
      if (!videoRef.current || !src) return;

      const video = videoRef.current;

      // Check if HLS is supported
      if (Hls.isSupported()) {
         const hls = new Hls({
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 90,
         });

         hlsRef.current = hls;

         hls.loadSource(src);
         hls.attachMedia(video);

         hls.on(Hls.Events.MANIFEST_PARSED, () => {
            setIsLoading(false);
            if (autoplay) {
               video.play().catch((e) => console.error('Autoplay failed:', e));
            }
         });

         hls.on(Hls.Events.ERROR, (event, data) => {
            console.error('HLS Error:', data);
            if (data.fatal) {
               switch (data.type) {
                  case Hls.ErrorTypes.NETWORK_ERROR:
                     setError('Network error - Failed to load video');
                     hls.startLoad();
                     break;
                  case Hls.ErrorTypes.MEDIA_ERROR:
                     setError('Media error - Trying to recover');
                     hls.recoverMediaError();
                     break;
                  default:
                     setError('Fatal error - Cannot play video');
                     hls.destroy();
                     break;
               }
            }
         });

         return () => {
            hls.destroy();
         };
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
         // Native HLS support (Safari)
         video.src = src;
         video.addEventListener('loadedmetadata', () => {
            setIsLoading(false);
         });
      } else {
         setError('HLS is not supported in this browser');
      }
   }, [src, autoplay]);

   // Video event handlers
   useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleTimeUpdate = () => {
         setCurrentTime(video.currentTime);
         onTimeUpdate?.(video.currentTime);
      };
      const handleDurationChange = () => setDuration(video.duration);
      const handleEnded = () => {
         setIsPlaying(false);
         onEnded?.();
      };
      const handleVolumeChange = () => {
         setVolume(video.volume * 100);
         setIsMuted(video.muted);
      };

      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('durationchange', handleDurationChange);
      video.addEventListener('ended', handleEnded);
      video.addEventListener('volumechange', handleVolumeChange);

      return () => {
         video.removeEventListener('play', handlePlay);
         video.removeEventListener('pause', handlePause);
         video.removeEventListener('timeupdate', handleTimeUpdate);
         video.removeEventListener('durationchange', handleDurationChange);
         video.removeEventListener('ended', handleEnded);
         video.removeEventListener('volumechange', handleVolumeChange);
      };
   }, [onEnded, onTimeUpdate]);

   // Control functions
   const togglePlay = () => {
      if (videoRef.current) {
         if (isPlaying) {
            videoRef.current.pause();
         } else {
            videoRef.current.play();
         }
      }
   };

   const toggleMute = () => {
      if (videoRef.current) {
         videoRef.current.muted = !videoRef.current.muted;
      }
   };

   const handleVolumeChange = (value: number[]) => {
      if (videoRef.current) {
         videoRef.current.volume = value[0] / 100;
      }
   };

   const handleSeek = (value: number[]) => {
      if (videoRef.current) {
         videoRef.current.currentTime = value[0];
      }
   };

   const toggleFullscreen = () => {
      if (!videoRef.current?.parentElement) return;

      if (!document.fullscreenElement) {
         videoRef.current.parentElement.requestFullscreen();
         setIsFullscreen(true);
      } else {
         document.exitFullscreen();
         setIsFullscreen(false);
      }
   };

   const retryProcessing = async () => {
      if (!lessonId) return;

      try {
         const response = await fetch(`/api/video/retry/${lessonId}`, {
            method: 'POST',
         });
         const data = await response.json();

         if (data.success) {
            // Refresh status
            window.location.reload();
         }
      } catch (error) {
         console.error('Failed to retry processing:', error);
      }
   };

   const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
   };

   // Show processing status
   if (processingStatus?.is_processing) {
      return (
         <div className={cn('relative aspect-video bg-black rounded-lg overflow-hidden', className)}>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
               <Loader2 className="h-12 w-12 animate-spin mb-4" />
               <p className="text-lg font-medium">Processing Video...</p>
               <p className="text-sm text-gray-400 mt-2">This may take a few minutes</p>
            </div>
         </div>
      );
   }

   // Show error with retry option
   if (error || processingStatus?.status === 'failed') {
      return (
         <div className={cn('relative aspect-video bg-black rounded-lg overflow-hidden', className)}>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
               <p className="text-lg font-medium text-red-500 mb-4">{error || processingStatus?.error}</p>
               {lessonId && (
                  <Button onClick={retryProcessing} variant="outline" className="gap-2">
                     <RefreshCw className="h-4 w-4" />
                     Retry Processing
                  </Button>
               )}
            </div>
         </div>
      );
   }

   return (
      <div className={cn('relative aspect-video bg-black rounded-lg overflow-hidden group', className)}>
         <video
            ref={videoRef}
            className="w-full h-full"
            poster={poster}
            playsInline
            onClick={togglePlay}
         />

         {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
               <Loader2 className="h-12 w-12 animate-spin text-white" />
            </div>
         )}

         {controls && !isLoading && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
               {/* Progress bar */}
               <Slider
                  value={[currentTime]}
                  max={duration}
                  step={0.1}
                  onValueChange={handleSeek}
                  className="mb-4"
               />

               <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                     <Button size="icon" variant="ghost" onClick={togglePlay} className="h-8 w-8">
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                     </Button>

                     <Button size="icon" variant="ghost" onClick={toggleMute} className="h-8 w-8">
                        {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                     </Button>

                     <div className="w-20">
                        <Slider value={[volume]} max={100} step={1} onValueChange={handleVolumeChange} />
                     </div>

                     <span className="text-sm">
                        {formatTime(currentTime)} / {formatTime(duration)}
                     </span>
                  </div>

                  <Button size="icon" variant="ghost" onClick={toggleFullscreen} className="h-8 w-8">
                     <Maximize className="h-4 w-4" />
                  </Button>
               </div>
            </div>
         )}
      </div>
   );
}
