import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  heroRef: React.RefObject<HTMLDivElement>;
  heroVideoRef: React.RefObject<HTMLVideoElement>;
  videoError: boolean;
  setVideoError: (error: boolean) => void;
  videoLoaded: boolean;
  scheduleRef: React.RefObject<HTMLDivElement>;
  showcaseRef: React.RefObject<HTMLDivElement>;
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
}

export function Hero({
  heroRef,
  heroVideoRef,
  videoError,
  setVideoError,
  videoLoaded,
  scheduleRef,
  showcaseRef,
  scrollToSection
}: HeroProps) {
  const { t } = useTranslation();

  return (
    <section id="hero" ref={heroRef} className="min-h-screen w-full relative flex items-center overflow-hidden">
      <div className="video-hero-background">
        {!videoError && (
          <video
            ref={heroVideoRef}
            className="video-hero-element"
            muted
            loop
            playsInline
            preload="metadata"
            onLoadStart={() => console.log('Video load started')}
            onCanPlay={() => console.log('Video can play')}
            onPlay={() => console.log('Video started playing')}
            onError={() => {
              console.warn('Video error occurred, using fallback background');
              setVideoError(true);
            }}
          >
            <source src="https://stackblitz.com/storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCRnhJUlFFPSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--118236dbe30255cc452245d35c9a85528f19cec1/-Mediabench%20Assembly%20Animation%20MEDIUM%20QUALITY%20smaller.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {videoError && (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-800">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          </div>
        )}
        {!videoLoaded && !videoError && (
          <div className="absolute inset-0 bg-black flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}
        <div className="video-hero-overlay" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-20">
        <div className="max-w-4xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light mb-4 sm:mb-6 tracking-tight leading-[1.1] text-left text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.8)] whitespace-pre-wrap">
            {t('hero.title')}
          </h2>
          <p className="text-lg sm:text-xl  md:text-2xl lg:text-3xl xl:text-4xl text-white mb-8 sm:mb-12 font-light text-left leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
            <Button
              onClick={() => scrollToSection(scheduleRef)}
              className="text-sm uppercase tracking-widest rounded-none px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto bg-white text-black hover:bg-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_12px_48px_rgba(0,0,0,0.6)]"
            >
              {t('hero.cta')}
            </Button>

            <button
              onClick={() => scrollToSection(showcaseRef)}
              className="group flex items-center justify-center sm:justify-start gap-2 text-white hover:text-white/80 transition-all duration-300 ease-out drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] hover:scale-105"
            >
              <span className="text-xs tracking-widest uppercase">{t('hero.viewShowcase')}</span>
              <ChevronRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
