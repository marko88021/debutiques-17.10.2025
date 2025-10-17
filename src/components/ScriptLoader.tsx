import { useEffect } from 'react';
import { useCookieConsent } from '@/hooks/useCookieConsent';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export function ScriptLoader() {
  const { hasConsent } = useCookieConsent();

  useEffect(() => {
    // Load Google Analytics if analytics consent is given
    if (hasConsent('analytics')) {
      loadGoogleAnalytics();
    }

    // Load other marketing scripts if marketing consent is given
    if (hasConsent('marketing')) {
      loadMarketingScripts();
    }
  }, [hasConsent]);

  const loadGoogleAnalytics = () => {
    // Check if already loaded
    if (typeof window.gtag !== 'undefined') return;

    // Load Google Analytics
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-3J4GFD3G8G';
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-3J4GFD3G8G');
    `;
    document.head.appendChild(script2);

    console.log('Google Analytics loaded with consent');
  };

  const loadMarketingScripts = () => {
    // Load Google Tag Manager if not already loaded
    if (!document.querySelector('script[src*="gtm.js"]')) {
      const script = document.createElement('script');
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-T7Q7GQN2');
      `;
      document.head.appendChild(script);

      // Add noscript fallback
      const noscript = document.createElement('noscript');
      noscript.innerHTML = `
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-T7Q7GQN2"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>
      `;
      document.body.appendChild(noscript);

      console.log('Google Tag Manager loaded with consent');
    }
  };

  return null; // This component doesn't render anything
}