const csrfToken = () => {
   const xsrfCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];

   if (xsrfCookie) {
      return decodeURIComponent(xsrfCookie);
   }

   return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
};

export const postAudit = (url: string, payload: Record<string, unknown>) => {
   if (typeof window === 'undefined' || !url) {
      return;
   }

   fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      keepalive: true,
      headers: {
         'Content-Type': 'application/json',
         Accept: 'application/json',
         'X-Requested-With': 'XMLHttpRequest',
         'X-XSRF-TOKEN': csrfToken(),
      },
      body: JSON.stringify(payload),
   }).catch((error) => {
      console.debug('[Audit] request failed', { url, error });
   });
};
