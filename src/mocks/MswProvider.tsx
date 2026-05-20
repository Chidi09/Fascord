'use client';

import { useEffect } from 'react';

export function MswProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
      const initMsw = async () => {
        try {
          const { worker } = await import('./browser');
          await worker.start({
            onUnhandledRequest: 'bypass',
          });
          console.log('[MSW] Mock Service Worker started successfully in dev mode.');
        } catch (error) {
          console.error('[MSW] Failed to start Mock Service Worker:', error);
        }
      };
      initMsw();
    }
  }, []);

  return <>{children}</>;
}
