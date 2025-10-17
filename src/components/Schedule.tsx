import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function Schedule() {
  const { t } = useTranslation();

  useEffect(() => {
    // Ensure Calendly script is loaded
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    
    // Only add if not already present
    if (!document.querySelector('script[src*="calendly"]')) {
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup if needed
      const existingScript = document.querySelector('script[src*="calendly"]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <section id="schedule" className="py-16 md:py-24 bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 section-heading">
            {t('schedule.title')}
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            {t('schedule.description')}
          </p>
        </div>

        {/* Calendly Embed */}
        <div className="max-w-4xl mx-auto">
          <div 
            className="calendly-inline-widget bg-neutral-950 rounded-lg overflow-hidden border border-neutral-800"
            data-url="https://calendly.com/your-calendly-link"
            style={{ minWidth: '320px', height: '700px' }}
          ></div>
        </div>
      </div>
    </section>
  );
}