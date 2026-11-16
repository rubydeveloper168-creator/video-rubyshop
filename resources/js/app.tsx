import '../css/app.css';

import { createInertiaApp, router } from '@inertiajs/react';
import axios from 'axios';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const metaCsrfToken = () => document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content || '';

// rubyshop.co.th (main shop) sets its XSRF-TOKEN cookie on .rubyshop.co.th, so document.cookie here can hold TWO
// XSRF-TOKEN cookies and the first one may belong to the other app -> 419 Page Expired. Send this app's own token
// from the meta tag instead (Laravel checks X-CSRF-TOKEN before X-XSRF-TOKEN); the meta tag is kept fresh below.
const applyCsrfHeaders = (headers: Record<string, unknown> | { set?: (name: string, value: string) => void }) => {
   const token = metaCsrfToken();
   if (!token) return;

   if (typeof headers.set === 'function') {
      headers.set('X-CSRF-TOKEN', token);
      return;
   }

   (headers as Record<string, unknown>)['X-CSRF-TOKEN'] = token;
};

// Session token rotates on login/logout done via Inertia; refresh the meta tag from the shared prop.
router.on('navigate', (event) => {
   const token = (event.detail.page.props as { csrf_token?: string }).csrf_token;
   const meta = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]');
   if (token && meta) meta.content = token;
});

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';

applyCsrfHeaders(axios.defaults.headers.common);

axios.interceptors.request.use((config) => {
   config.headers = config.headers || {};
   applyCsrfHeaders(config.headers);

   return config;
});

// Global Axios interceptor — logs every 4xx/5xx response body to console
axios.interceptors.response.use(
   (response) => response,
   (error) => {
      if (error.response) {
         console.error(
            `[HTTP ${error.response.status}] ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
            '\nResponse:', error.response.data,
         );
      }
      return Promise.reject(error);
   },
);

const appName = import.meta.env.VITE_APP_NAME;

createInertiaApp({
   title: (title) => `${title}`,
   resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
   setup({ el, App, props }) {
      const root = createRoot(el);

      root.render(<App {...props} />);
   },
   progress: {
      color: '#4B5563',
   },
});

// This will set light / dark mode on load...
initializeTheme();
