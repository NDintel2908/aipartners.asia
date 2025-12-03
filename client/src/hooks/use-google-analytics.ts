import { useEffect } from 'react';

/**
 * Hook để tích hợp Google Analytics vào ứng dụng React
 * Thay thế YOUR_GA_ID bằng Google Analytics ID của bạn
 * VD: G-XXXXXXXXXX
 */
export function useGoogleAnalytics(gaId: string) {
  useEffect(() => {
    if (!gaId) {
      console.warn('Google Analytics ID không được cung cấp');
      return;
    }

    // Thêm script Google Analytics vào document
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(script1);

    // Cấu hình Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(arguments);
    }
    (window as any).gtag = gtag;
    gtag('js', new Date());
    gtag('config', gaId);
  }, [gaId]);
}

// Định nghĩa kiểu TypeScript cho dataLayer
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}
