import { postAudit } from '@/lib/audit';
import { SharedData } from '@/types/global';
import { usePage } from '@inertiajs/react';
import { useEffect, useMemo, useRef } from 'react';

const HEARTBEAT_SECONDS = 30;
const IDLE_AFTER_SECONDS = 60;

const nowIso = () => new Date().toISOString();

const currentUrl = () => `${window.location.pathname}${window.location.search}${window.location.hash}`;

const routeUrl = (name: string) => {
   try {
      return route(name);
   } catch {
      return '';
   }
};

const AuditTracker = () => {
   const { props, url } = usePage<SharedData>();
   const user = props.auth?.user;
   const enteredAtRef = useRef<Date | null>(null);
   const visitUrlRef = useRef('');
   const lastActivityAtRef = useRef(Date.now());

   const endpoints = useMemo(
      () => ({
         pageEnter: routeUrl('audit.track.page-enter'),
         pageLeave: routeUrl('audit.track.page-leave'),
         heartbeat: routeUrl('audit.track.heartbeat'),
      }),
      [],
   );

   useEffect(() => {
      if (!user || !endpoints.pageEnter || !endpoints.pageLeave) {
         return;
      }

      const enteredAt = new Date();
      const pageUrl = currentUrl();
      enteredAtRef.current = enteredAt;
      visitUrlRef.current = pageUrl;

      postAudit(endpoints.pageEnter, {
         url: pageUrl,
         title: document.title,
         referrer: document.referrer,
         entered_at: enteredAt.toISOString(),
      });

      const leave = () => {
         if (!enteredAtRef.current || !visitUrlRef.current) {
            return;
         }

         const durationSeconds = Math.max(0, Math.round((Date.now() - enteredAtRef.current.getTime()) / 1000));
         postAudit(endpoints.pageLeave, {
            url: visitUrlRef.current,
            left_at: nowIso(),
            duration_seconds: durationSeconds,
         });

         enteredAtRef.current = null;
      };

      const handleVisibilityChange = () => {
         if (document.visibilityState === 'hidden') {
            leave();
         }
      };

      window.addEventListener('beforeunload', leave);
      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
         leave();
         window.removeEventListener('beforeunload', leave);
         document.removeEventListener('visibilitychange', handleVisibilityChange);
      };
   }, [endpoints.pageEnter, endpoints.pageLeave, url, user]);

   useEffect(() => {
      if (!user || !endpoints.heartbeat) {
         return;
      }

      const markActive = () => {
         lastActivityAtRef.current = Date.now();
      };

      const events = ['click', 'keydown', 'mousemove', 'scroll', 'touchstart'];
      events.forEach((eventName) => window.addEventListener(eventName, markActive, { passive: true }));

      const interval = window.setInterval(() => {
         const idleSeconds = Math.round((Date.now() - lastActivityAtRef.current) / 1000);
         postAudit(endpoints.heartbeat, {
            active_seconds: idleSeconds > IDLE_AFTER_SECONDS ? 0 : HEARTBEAT_SECONDS,
            idle_seconds: idleSeconds > IDLE_AFTER_SECONDS ? HEARTBEAT_SECONDS : 0,
         });
      }, HEARTBEAT_SECONDS * 1000);

      return () => {
         window.clearInterval(interval);
         events.forEach((eventName) => window.removeEventListener(eventName, markActive));
      };
   }, [endpoints.heartbeat, user]);

   return null;
};

export default AuditTracker;
