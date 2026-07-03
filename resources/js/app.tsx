import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import axios from 'axios';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const readCookie = (name: string) => {
   return document.cookie
      .split('; ')
      .find((row) => row.startsWith(`${name}=`))
      ?.split('=')
      .slice(1)
      .join('=');
};

const metaCsrfToken = () => document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content || '';

const xsrfCookieToken = () => {
   const xsrfCookie = readCookie('XSRF-TOKEN');

   return xsrfCookie ? decodeURIComponent(xsrfCookie) : '';
};

const setHeader = (headers: Record<string, unknown> | { set?: (name: string, value: string) => void }, name: string, value: string) => {
   if (!value) return;

   if (typeof headers.set === 'function') {
      headers.set(name, value);
      return;
   }

   headers[name] = value;
};

const removeHeader = (headers: Record<string, unknown> | { delete?: (name: string) => void }, name: string) => {
   if (typeof headers.delete === 'function') {
      headers.delete(name);
      return;
   }

   delete headers[name];
};

const applyCsrfHeaders = (headers: Record<string, unknown> | { set?: (name: string, value: string) => void }) => {
   const xsrfToken = xsrfCookieToken();

   if (xsrfToken) {
      removeHeader(headers, 'X-CSRF-TOKEN');
      setHeader(headers, 'X-XSRF-TOKEN', xsrfToken);
      return;
   }

   removeHeader(headers, 'X-XSRF-TOKEN');
   setHeader(headers, 'X-CSRF-TOKEN', metaCsrfToken());
};

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
