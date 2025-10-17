import { useTranslation } from 'react-i18next';

export function TrustedBySection() {
  const { t } = useTranslation();

  // Logo data with proper paths and alt text
  const logos = [
    {
      id: 'andlight',
      src: '/assets/andlight_logo_300-200x200.jpg.jpg',
      alt: 'Andlight',
      name: 'Andlight'
    },
    {
      id: 'rum21',
      src: '/assets/white_RGB_secondary_logotype_rum21.png',
      alt: 'Rum21',
      name: 'Rum21'
    },
    {
      id: 'debutiques',
      src: '/assets/debutilogo2.png',
      alt: 'Debutiques Partner',
      name: 'Debutiques Partner'
    },
    {
      id: 'logo0',
      src: '/assets/logo0.png',
      alt: 'Partner Logo',
      name: 'Partner'
    },
    {
      id: 'logo3',
      src: '/assets/logo3.png',
      alt: 'Client Logo',
      name: 'Client'
    },
    {
      id: 'logo4',
      src: '/assets/logo4.png',
      alt: 'Brand Partner',
      name: 'Brand Partner'
    }
  ];

  // Duplicate logos for seamless scrolling
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-12 md:py-16 bg-neutral-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-white/90 mb-2">
            {t('socialProof.trustedBy')}
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto"></div>
        </div>

        {/* Scrolling Logo Container */}
        <div className="relative">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-neutral-950 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-neutral-950 to-transparent z-10 pointer-events-none"></div>
          
          {/* Scrolling track */}
          <div className="overflow-hidden">
            <div className="animate-scroll logo-track">
              {duplicatedLogos.map((logo, index) => (
                <div key={`${logo.id}-${index}`} className="logo-container flex-shrink-0">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="logo-image h-8 md:h-10 w-auto object-contain filter brightness-0 invert opacity-40 hover:opacity-70 transition-opacity duration-300"
                    loading="lazy"
                    onError={(e) => {
                      console.warn(`Failed to load logo: ${logo.name} - ${logo.src}`);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}