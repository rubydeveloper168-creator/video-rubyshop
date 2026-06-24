import { postAudit } from '@/lib/audit';
import Hls from 'hls.js';
import Plyr, { APITypes } from 'plyr-react';
import { useEffect, useMemo, useRef } from 'react';
import 'plyr-react/plyr.css';

interface Props {
   source: {
      type: 'video' | 'audio';
      sources: Array<{
         src: string;
         type?: string;
         provider?: 'youtube' | 'vimeo' | 'html5';
         label?: string;
      }>;
   };
   debugLabel?: string;
   processingStatus?: string;
   forceHlsOnly?: boolean;
   audit?: {
      courseId?: number | null;
      lessonId?: number | null;
   };
}

const VideoPlayer = ({ source, debugLabel = 'player', processingStatus = 'unknown', forceHlsOnly = false, audit }: Props) => {
   const playerRef = useRef<APITypes>(null);
   const watchStartedAtRef = useRef<number | null>(null);
   const lastVideoAuditAtRef = useRef(0);

   // Common Plyr options for all video types
   const plyrOptions = useMemo(
      () => ({
         controls: ['play-large', 'play', 'progress', 'current-time', 'duration', 'mute', 'volume', 'settings', 'fullscreen'],
         settings: ['quality', 'speed'],
         speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
         resetOnEnd: true,
         keyboard: { focused: true, global: true },
         displayDuration: true,
         tooltips: { controls: true, seek: true },
         i18n: {
            restart: 'Restart',
            rewind: 'Rewind {seektime}s',
            play: 'Play',
            pause: 'Pause',
            forward: 'Forward {seektime}s',
            played: 'Played',
            buffered: 'Buffered',
            currentTime: 'Current time',
            duration: 'Duration',
            volume: 'Volume',
            toggleMute: 'Toggle Mute',
            toggleCaptions: 'Toggle Captions',
            toggleFullscreen: 'Toggle Fullscreen',
         },
      }),
      [],
   );

   // Process the source for YouTube URLs
   const processedSource = useMemo(() => {
      const src = source.sources[0]?.src;
      if (!src) return null;

      // Check if it's a YouTube URL
      const isYouTube = src.includes('youtube.com') || src.includes('youtu.be');
      if (!isYouTube) return source;

      // Extract video ID from YouTube URL
      const getYouTubeId = (url: string) => {
         const regExp = /^.*(youtu.be\/|v\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
         const match = url.match(regExp);
         return match && match[2].length === 11 ? match[2] : null;
      };

      const videoId = getYouTubeId(src);
      if (!videoId) return null;

      return {
         type: 'video' as const,
         sources: [
            {
               src: videoId,
               provider: 'youtube' as const,
            },
         ],
      };
   }, [source]);

   if (!processedSource) {
      return (
         <div className="flex h-full items-center justify-center">
            <p>No video available</p>
         </div>
      );
   }

   const primarySource = useMemo(() => processedSource.sources?.[0], [processedSource.sources]);
   const fallbackSources = useMemo(
      () => (forceHlsOnly ? [] : processedSource.sources?.slice(1) ?? []),
      [processedSource.sources, forceHlsOnly],
   );
   useEffect(() => {
      let cleanup: (() => void) | null = null;
      let animationId: number | null = null;
      let initialised = false;

      const labelPrefix = `[VideoPlayer:${debugLabel}]`;

      const initialisePlayer = (playerInstance: APITypes['plyr'], media: HTMLMediaElement) => {
         console.groupCollapsed(`${labelPrefix} Initialising source`);
         console.log('Processing status', processingStatus);
         console.log('Primary source', primarySource);
         console.log('Fallback sources', fallbackSources);
         console.log('Force HLS only', forceHlsOnly);
         console.groupEnd();

         const isYouTubeSource = primarySource?.provider === 'youtube';
         const isHlsSource =
            primarySource &&
            !isYouTubeSource &&
            ((primarySource.type && primarySource.type.toLowerCase().includes('mpegurl')) ||
               (primarySource.src && primarySource.src.toLowerCase().endsWith('.m3u8')));

         const getBufferedEnd = () => {
            if (!media.buffered || media.buffered.length === 0) {
               return 0;
            }
            try {
               return media.buffered.end(media.buffered.length - 1);
            } catch {
               return 0;
            }
         };

         let usedFallback = false;
         const useFallbackSource = () => {
            if (forceHlsOnly) {
               console.warn(`${labelPrefix} Fallback to MP4 disabled (forceHlsOnly=true).`);
               return;
            }
            if (usedFallback) return;
            const fallback = fallbackSources.find((item) => !!item.src);

            if (fallback) {
               usedFallback = true;
               console.warn(`${labelPrefix} Switching to fallback source`, fallback);
               playerInstance.source = {
                  type: 'video',
                  sources: [fallback],
               };
            } else {
               console.error(`${labelPrefix} No fallback source available - playback may fail.`);
            }
         };

         const trackedEvents = [
            'ready',
            'loadstart',
            'loadedmetadata',
            'loadeddata',
            'canplay',
            'progress',
            'playing',
            'waiting',
            'pause',
            'seeking',
            'seeked',
            'stalled',
            'timeupdate',
            'ended',
            'error',
         ];

         const eventHandlers = trackedEvents.map((eventName) => {
            const handler = (event: any) => {
               const bufferedEnd = getBufferedEnd();
               const duration = Number.isFinite(media.duration) ? media.duration : 0;
               const playbackPosition = Number.isFinite(media.currentTime) ? media.currentTime : 0;
               const watchedSeconds =
                  watchStartedAtRef.current === null ? 0 : Math.max(0, Math.round((Date.now() - watchStartedAtRef.current) / 1000));
               const percentWatched = duration > 0 ? Math.min(100, Math.round((playbackPosition / duration) * 100)) : null;

               console.log(`${labelPrefix} Event: ${eventName}`, {
                  eventDetail: event?.detail ?? null,
                  currentTime: media.currentTime,
                  duration: media.duration,
                  bufferedEnd,
                  readyState: media.readyState,
               });

               if (eventName === 'error' && !usedFallback) {
                  useFallbackSource();
               }

               if (!audit?.lessonId) {
                  return;
               }

               if (eventName === 'playing' && watchStartedAtRef.current === null) {
                  watchStartedAtRef.current = Date.now();
               }

               const isImmediateAuditEvent = ['playing', 'pause', 'ended', 'seeking', 'seeked', 'error'].includes(eventName);
               const now = Date.now();
               const shouldHeartbeat = eventName === 'timeupdate' && now - lastVideoAuditAtRef.current >= 30000;

               if (!isImmediateAuditEvent && !shouldHeartbeat) {
                  return;
               }

               lastVideoAuditAtRef.current = now;

               postAudit(route('audit.track.video-event'), {
                  course_id: audit.courseId ?? null,
                  lesson_id: audit.lessonId,
                  event_type: shouldHeartbeat ? 'heartbeat' : eventName,
                  playback_position: Math.round(playbackPosition),
                  watched_seconds: watchedSeconds,
                  percent_watched: percentWatched,
                  metadata: {
                     debug_label: debugLabel,
                     processing_status: processingStatus,
                     ready_state: media.readyState,
                     buffered_end: Math.round(bufferedEnd),
                     duration: Math.round(duration),
                  },
               });
            };

            playerInstance.on(eventName, handler);
            return { eventName, handler };
         });

         let hls: Hls | null = null;

         if (isYouTubeSource) {
            console.log(`${labelPrefix} YouTube source detected, skipping HLS instrumentation.`);
         } else if (isHlsSource && primarySource?.src) {
            if (Hls.isSupported()) {
               console.log(`${labelPrefix} Hls.js is supported. Initialising for source`, primarySource.src);
               hls = new Hls({
                  enableWorker: true,
                  lowLatencyMode: true,
               });

               hls.attachMedia(media);
               hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                  console.log(`${labelPrefix} HLS media attached to video element`);
               });
               hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
                  console.log(`${labelPrefix} HLS manifest parsed`, {
                     availableLevels: data.levels?.length ?? 0,
                     firstLevel: data.firstLevel,
                  });
               });
               hls.on(Hls.Events.LEVEL_SWITCHED, (_, data) => {
                  console.log(`${labelPrefix} Switched HLS level`, { level: data.level });
               });
               hls.on(Hls.Events.LEVEL_LOADED, (_, data) => {
                  console.log(`${labelPrefix} HLS level loaded`, {
                     totalDuration: data.details?.totalduration,
                     fragments: data.details?.fragments?.length,
                  });
               });
               hls.on(Hls.Events.FRAG_LOADING, (_, data) => {
                  console.log(`${labelPrefix} Loading HLS fragment`, {
                     sn: data.frag?.sn,
                     level: data.frag?.level,
                     start: data.frag?.start?.toFixed?.(2),
                     duration: data.frag?.duration?.toFixed?.(2),
                  });
               });
               hls.on(Hls.Events.FRAG_CHANGED, (_, data) => {
                  console.log(`${labelPrefix} Now playing HLS fragment`, {
                     sn: data.frag?.sn,
                     start: data.frag?.start?.toFixed?.(2),
                     duration: data.frag?.duration?.toFixed?.(2),
                     url: data.frag?.relurl || data.frag?.url,
                  });
               });
               hls.on(Hls.Events.FRAG_BUFFERED, (_, data) => {
                  console.log(`${labelPrefix} Buffered HLS fragment`, {
                     sn: data.frag?.sn,
                     level: data.frag?.level,
                     start: data.frag?.start?.toFixed?.(2),
                     duration: data.frag?.duration?.toFixed?.(2),
                     bufferingTimeMs:
                        data.stats?.tbuffered && data.stats?.tload ? data.stats.tbuffered - data.stats.tload : undefined,
                  });
               });
               hls.on(Hls.Events.ERROR, (_, data) => {
                  console.error(`${labelPrefix} HLS error`, {
                     type: data.type,
                     details: data.details,
                     fatal: data.fatal,
                  });

                  if (data.fatal) {
                     switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                           hls?.startLoad();
                           break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                           hls?.recoverMediaError();
                           break;
                        default:
                           useFallbackSource();
                           break;
                     }
                  }
               });

               hls.loadSource(primarySource.src);
            } else if (media.canPlayType('application/vnd.apple.mpegurl')) {
               console.log(`${labelPrefix} Using native HLS support`);
               media.src = primarySource.src;
            } else {
               console.warn(`${labelPrefix} HLS not supported in this browser. Attempting fallback.`);
               useFallbackSource();
            }
         } else if (primarySource) {
            console.log(`${labelPrefix} Using standard HTML5 source`, { type: primarySource.type, src: primarySource.src });
         }

         cleanup = () => {
            eventHandlers.forEach(({ eventName, handler }) => {
               try {
                  playerInstance.off(eventName, handler);
               } catch {
                  // Ignore errors if Plyr has already been destroyed
               }
            });

            if (hls) {
               console.log(`${labelPrefix} Destroying HLS instance`);
               hls.destroy();
            }
         };
      };

      const waitForPlayer = () => {
        if (initialised) return;
        const player = playerRef.current?.plyr;
        const media = player?.media as HTMLMediaElement | null;

        if (!player || !media || !primarySource) {
          if (!player) {
            console.warn(`${labelPrefix} Plyr instance not ready yet`);
          } else if (!media) {
            console.warn(`${labelPrefix} Media element not available on plyr instance`);
          }
          animationId = window.requestAnimationFrame(waitForPlayer);
          return;
        }

        initialised = true;
        initialisePlayer(player, media);
      };

      waitForPlayer();

      return () => {
         if (animationId !== null) {
            cancelAnimationFrame(animationId);
         }
         cleanup?.();
      };
   }, [debugLabel, fallbackSources, forceHlsOnly, primarySource, processingStatus]);

   return <Plyr ref={playerRef} options={plyrOptions} source={processedSource} />;
};

export default VideoPlayer;
