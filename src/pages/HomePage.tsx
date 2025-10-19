import { useRef, useState, useEffect } from 'react';
import {
  ChevronRight, X, Check, Image as ImageIcon, Video, RotateCw, Hammer,
  Chrome as Home, Plus, Minus, Menu, ChevronLeft, ArrowUp, Mail, Phone
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { About } from '@/components/About';
import { Hero } from '@/components/Hero';
import { allGalleryItems as importedGalleryItems } from '@/utils/galleryCleanup';

/* ===========================
   Why Choose Us — two columns
=========================== */
function WhyChooseUsTwoCol({ onScheduleClick }: { onScheduleClick: () => void }) {
  return (
    <div className="text-white py-16">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-light mb-8 tracking-tight text-center">
          Why Choose Us
        </h2>

        {/* Table */}
        <div className="rounded-xl border border-neutral-800 overflow-hidden mb-8">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-b border-neutral-800">
            <div className="px-5 py-4 text-sm uppercase tracking-widest text-neutral-300 bg-neutral-900">
              Furniture Visualization Challenges
            </div>
            <div className="px-5 py-4 text-sm uppercase tracking-widest text-emerald-300 bg-emerald-500/5">
              The Debutiques Solution
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-neutral-800">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="px-5 py-6">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded bg-red-900/20">
                    <X className="h-4 w-4 text-red-500" />
                  </span>
                  <div>
                    <p className="font-light">Expensive photoshoots</p>
                    <p className="text-sm text-neutral-400 font-light">
                      Traditional photography requires physical prototypes, studio time, and complex logistics.
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-5 py-6 bg-emerald-500/5">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded bg-emerald-900/20">
                    <Check className="h-4 w-4 text-emerald-500" />
                  </span>
                  <div>
                    <p className="font-light">Renderings for any finish</p>
                    <p className="text-sm text-neutral-300/90 font-light">
                      Create unlimited material variations digitally—from libraries or scanned samples—for launch-ready visuals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="px-5 py-6">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded bg-red-900/20">
                    <X className="h-4 w-4 text-red-500" />
                  </span>
                  <div>
                    <p className="font-light">Endless prototypes</p>
                    <p className="text-sm text-neutral-400 font-light">
                      Physical samples for each material/color variation are costly and time-consuming.
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-5 py-6 bg-emerald-500/5">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded bg-emerald-900/20">
                    <Check className="h-4 w-4 text-emerald-500" />
                  </span>
                  <div>
                    <p className="font-light">Feature-focused animations</p>
                    <p className="text-sm text-neutral-300/90 font-light">
                      Highlight mechanisms, transformations, and USPs impossible to show in static photos.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="px-5 py-6">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded bg-red-900/20">
                    <X className="h-4 w-4 text-red-500" />
                  </span>
                  <div>
                    <p className="font-light">Slow product launches</p>
                    <p className="text-sm text-neutral-400 font-light">
                      Waiting for photography delays time-to-market and hurts competitive advantage.
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-5 py-6 bg-emerald-500/5">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded bg-emerald-900/20">
                    <Check className="h-4 w-4 text-emerald-500" />
                  </span>
                  <div>
                    <p className="font-light">360° visuals for e-commerce</p>
                    <p className="text-sm text-neutral-300/90 font-light">
                      Interactive product views build buyer confidence and increase conversions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="px-5 py-6">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded bg-red-900/20">
                    <X className="h-4 w-4 text-red-500" />
                  </span>
                  <div>
                    <p className="font-light">Inconsistent presentation</p>
                    <p className="text-sm text-neutral-400 font-light">
                      Different photographers and lighting cause inconsistencies across your catalog.
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-5 py-6 bg-emerald-500/5">
                <div className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded bg-emerald-900/20">
                    <Check className="h-4 w-4 text-emerald-500" />
                  </span>
                  <div>
                    <p className="font-light">Interior staging</p>
                    <p className="text-sm text-neutral-300/90 font-light">
                      Place products in aspirational environments that inspire customers and enhance perceived value.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA outside the table */}
        <div className="text-center">
          <button
            onClick={onScheduleClick}
            className="inline-flex items-center justify-center rounded-full bg-emerald-400 text-black px-5 py-2.5 md:px-6 md:py-3 text-xs md:text-sm font-medium uppercase tracking-widest shadow-[0_3px_12px_rgba(16,185,129,0.15)] hover:bg-emerald-300 hover:shadow-[0_5px_18px_rgba(16,185,129,0.20)] focus:outline-none focus:ring-2 focus:ring-emerald-300/40 focus:ring-offset-2 focus:ring-offset-transparent transition-all"
          >
            Get a Custom Quote
          </button>
        </div>
      </div>
    </div>
  );
}

/* -----------------------
   Media / data constants
------------------------ */
interface GalleryItem {
  id: string | number;
  src: string;
  title?: string;
  category: 'product' | 'interior' | 'video';
  type?: 'video';
  alt?: string;
}

const allGalleryImages: GalleryItem[] = importedGalleryItems.map(item => ({
  id: item.id,
  src: item.src,
  title: item.title || '',
  category: item.category,
  type: item.category === 'video' ? 'video' : undefined,
  alt: item.title || `${item.category} image`
}));

const companyLogos = [
  '/assets/white_RGB_secondary_logotype_rum21.png',
  '/assets/product-campaign-t2.png',
  '/assets/logo0.png',
  '/assets/logo3.png',
  '/assets/logo4.png',
  '/assets/andlight.png',
];

// Story Reel
const STORY_REEL_BASE = '/story%20reel';
interface StoryReelItem {
  src: string;
  alt: string;
}
const storyReelImages: StoryReelItem[] = [
  { src: `${STORY_REEL_BASE}/chair_crop_photoreal_v1.jpg`, alt: 'Photorealistic cropped chair render' },
  { src: `${STORY_REEL_BASE}/chair_photoreal_v1-min.png`, alt: 'Minimalist photorealistic chair' },
  { src: `${STORY_REEL_BASE}/highbar_photoreal_v1-min.jpg`, alt: 'Photorealistic high bar stool' },
  { src: `${STORY_REEL_BASE}/living_editorial_v1-min.jpg`, alt: 'Editorial living room scene' },
  { src: `${STORY_REEL_BASE}/kitchen_clean_photoreal_v1.jpg`, alt: 'Clean photorealistic kitchen setup' },
  { src: `${STORY_REEL_BASE}/marble_photoreal_v1-min.jpg`, alt: 'Marble surface photorealistic render' },
  { src: `${STORY_REEL_BASE}/drawers_canon_pro_v1.jpg`, alt: 'Professional drawer unit render' },
  { src: `${STORY_REEL_BASE}/render_photoreal_v1.jpg`, alt: 'General photorealistic furniture render' },
  { src: `${STORY_REEL_BASE}/toaster_photoreal_pro_v1.jpg`, alt: 'Photorealistic toaster appliance' },
  { src: `${STORY_REEL_BASE}/cabinet_nikon_pro_v1.jpg`, alt: 'Professional cabinet render' },
];

// Reusable Schedule Button
interface ScheduleButtonProps {
  onClick: () => void;
  className?: string;
  fullWidth?: boolean;
}
const ScheduleButton: React.FC<ScheduleButtonProps> = ({ onClick, className = '', fullWidth = false }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center justify-center rounded-full bg-emerald-400 text-black px-5 py-2.5 md:px-6 md:py-3 text-xs md:text-sm font-medium uppercase tracking-widest shadow-[0_3px_12px_rgba(16,185,129,0.15)] hover:bg-emerald-300 hover:shadow-[0_5px_18px_rgba(16,185,129,0.20)] focus:outline-none focus:ring-2 focus:ring-emerald-300/40 focus:ring-offset-2 focus:ring-offset-transparent transition-all ${fullWidth ? 'w-full' : ''} ${className}`}
  >
    Get a Custom Quote
  </button>
);

function HomePage() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('hero');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<GalleryItem | null>(null);
  const [currentZoomedImageIndex, setCurrentZoomedImageIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'product' | 'interior' | 'video'>('all');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const socialProofRef = useRef<HTMLDivElement>(null);
  const selectedWorkRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const brandReelRef = useRef<HTMLDivElement>(null);

  const navigationItems = [
    { label: t('navigation.services'), ref: servicesRef, id: 'services' },
    { label: t('navigation.showcase'), ref: showcaseRef, id: 'showcase' },
    { label: t('navigation.process'), ref: processRef, id: 'process' },
    { label: 'About', ref: aboutRef, id: 'about' },
    { label: t('navigation.schedule'), ref: scheduleRef, id: 'schedule' },
    { label: t('navigation.contact'), ref: footerRef, id: 'footer' },
  ];

  const services = [
    { icon: <ImageIcon className="h-8 w-8" />, title: t('services.renderings.title'), description: t('services.renderings.description') },
    { icon: <Video className="h-8 w-8" />, title: t('services.animations.title'), description: t('services.animations.description') },
    { icon: <RotateCw className="h-8 w-8" />, title: t('services.360Animations.title'), description: t('services.360Animations.description') },
    { icon: <Hammer className="h-8 w-8" />, title: t('services.assemblyAnimations.title'), description: t('services.assemblyAnimations.description') },
    { icon: <Home className="h-8 w-8" />, title: t('services.interiorShots.title'), description: t('services.interiorShots.description') },
  ];

  const impactStats: Array<{ value: string; caption: string }> = [
    { value: '72%', caption: 'Lower visual content production cost vs. traditional photo shoots' },
    { value: '18%', caption: 'Higher return (ROI)' },
    { value: '38%', caption: 'Increase in conversion rates' },
    { value: '21%', caption: 'Higher average order value (AOV)' },
  ];

  const faqItems = [
    { question: t('faq.items.renderingProcess.question'), answer: t('faq.items.renderingProcess.answer') },
    { question: t('faq.items.cgiFurniture.question'), answer: t('faq.items.cgiFurniture.answer') },
    { question: t('faq.items.3dVisualization.question'), answer: t('faq.items.3dVisualization.answer') },
    { question: t('faq.items.turnaroundTime.question'), answer: t('faq.items.turnaroundTime.answer') },
    { question: t('faq.items.businessBenefits.question'), answer: t('faq.items.businessBenefits.answer') },
    { question: t('faq.items.visualizationTypes.question'), answer: t('faq.items.visualizationTypes.answer') },
    { question: t('faq.items.pricing.question'), answer: t('faq.items.pricing.answer') },
    { question: t('faq.items.cgiStudio.question'), answer: t('faq.items.cgiStudio.answer') },
    { question: t('faq.items.gettingStarted.question'), answer: t('faq.items.gettingStarted.answer') },
  ];

  // Click away to close mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Escape + arrow keys for modal / menu
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isMobileMenuOpen) setIsMobileMenuOpen(false);
        if (zoomedImage) {
          setZoomedImage(null);
          setCurrentZoomedImageIndex(null);
        }
      }
      if (zoomedImage && currentZoomedImageIndex !== null) {
        if (event.key === 'ArrowLeft') {
          event.preventDefault();
          showPreviousImage();
        } else if (event.key === 'ArrowRight') {
          event.preventDefault();
          showNextImage();
        }
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isMobileMenuOpen, zoomedImage, currentZoomedImageIndex]);

  // Lock body scroll when menu or zoom is open
  useEffect(() => {
    if (isMobileMenuOpen || zoomedImage) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen, zoomedImage]);

  // Active section highlighting
  useEffect(() => {
    const options = { root: null, rootMargin: '0px', threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, options);

    const sections = [
      heroRef.current, socialProofRef.current, selectedWorkRef.current, problemRef.current,
      storyRef.current, servicesRef.current, showcaseRef.current, aboutRef.current, processRef.current,
      faqRef.current, scheduleRef.current, brandReelRef.current, contactRef.current,
    ].filter(Boolean) as Element[];

    sections.forEach((section) => { if (section) observer.observe(section); });
    return () => { 
      sections.forEach((section) => { 
        if (section) observer.unobserve(section); 
      }); 
    };
  }, []);

  // Back-to-top visibility
  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero video boot
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const handleCanPlay = () => { setVideoLoaded(true); setVideoError(false); };
    const handleError = () => { setVideoError(true); setVideoLoaded(false); };
    const handleLoadedData = () => setVideoLoaded(true);

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('loadeddata', handleLoadedData);

    const playVideo = async () => {
      try {
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise !== undefined) await playPromise;
      } catch { setVideoError(true); }
    };

    try {
      video.load();
      const timer = setTimeout(() => playVideo(), 100);
      return () => {
        clearTimeout(timer);
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
        video.removeEventListener('loadeddata', handleLoadedData);
      };
    } catch { setVideoError(true); }
  }, []);

  // Unmute/play after first interaction (mobile)
  useEffect(() => {
    const handleUserInteraction = () => {
      const video = heroVideoRef.current;
      if (video && video.muted && !videoError) {
        video.muted = true;
        if (video.paused) { video.play().catch(() => setVideoError(true)); }
      }
    };
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [videoError]);

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleFaq = (index: number) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  const handleImageClick = (image: GalleryItem) => {
    const imageIndex = allGalleryImages.findIndex((img) => img.id === image.id);
    setZoomedImage(image);
    setCurrentZoomedImageIndex(imageIndex);
  };

  const showNextImage = () => {
    if (currentZoomedImageIndex === null) return;
    const nextIndex = (currentZoomedImageIndex + 1) % allGalleryImages.length;
    const nextImage = allGalleryImages[nextIndex];
    setZoomedImage(nextImage);
    setCurrentZoomedImageIndex(nextIndex);
  };

  const showPreviousImage = () => {
    if (currentZoomedImageIndex === null) return;
    const prevIndex = currentZoomedImageIndex === 0 ? allGalleryImages.length - 1 : currentZoomedImageIndex - 1;
    const prevImage = allGalleryImages[prevIndex];
    setZoomedImage(prevImage);
    setCurrentZoomedImageIndex(prevIndex);
  };

  const filteredImages = activeFilter === 'all' ? allGalleryImages : allGalleryImages.filter((image) => image.category === activeFilter);

  const selectedWork = allGalleryImages.slice(0, 9);



  return (
    <div className="bg-black text-white">
      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-[70] bg-black/80 backdrop-blur-sm">
        <div className="mx-auto max-w-[1600px] px-4 md:px-6">
          <div className="grid grid-cols-[auto,1fr,auto] items-center gap-4 md:gap-6 py-4 md:py-5">
            {/* LEFT: Logo */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Go to top"
                className="flex flex-col items-center gap-1 text-center leading-tight"
              >
                <img
                  src="/assets/debutilogo2.png"
                  alt="DEBUTIQUES logo"
                  className="h-8 w-auto object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const textLogo = document.createElement('div');
                    textLogo.className = 'logo-text text-white text-xl font-bold';
                    textLogo.textContent = 'DEBUTIQUES';
                    target.parentNode?.insertBefore(textLogo, target);
                  }}
                />
                <span className="logo-pronunciation uppercase text-white/70">/DE-BYU-TEEK/</span>
              </button>
            </div>

            {/* CENTER: Primary nav */}
            <div className="hidden md:flex justify-center min-w-0">
              <div className="flex items-center gap-6 lg:gap-8 xl:gap-10 2xl:gap-12">
                {navigationItems.map((item) => (
                  item.link ? (
                    <Link
                      key={item.label}
                      to={item.link}
                      className="whitespace-nowrap text-xs uppercase tracking-super transition-colors hover:text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none text-neutral-500"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={item.label}
                      onClick={() => item.ref && scrollToSection(item.ref)}
                      className={`whitespace-nowrap text-xs uppercase tracking-super transition-colors hover:text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none ${
                        activeSection === item.id ? 'text-white' : 'text-neutral-500'
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="ml-auto hidden md:flex items-center gap-3 lg:gap-5">
              <a
                href="mailto:info@debutiques.com"
                className="text-neutral-500 hover:text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none transition-colors p-2"
                aria-label="Email us"
                title="info@debutiques.com"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href="tel:+38166009540"
                className="text-neutral-500 hover:text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none transition-colors p-2"
                aria-label="Call us"
                title="+381 (66) 009-540"
              >
                <Phone className="h-5 w-5" />
              </a>

              <div className="hidden xl:block">
                <LanguageSwitcher />
              </div>

              <ScheduleButton onClick={() => scrollToSection(scheduleRef)} />
            </div>

            {/* RIGHT (mobile) */}
            <div className="ml-auto flex items-center gap-4 md:hidden">
              <LanguageSwitcher />
              <button
                ref={menuButtonRef}
                id="mobile-menu-toggle"
                className="mobile-toggle-btn flex items-center justify-center focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                onClick={toggleMobileMenu}
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`fixed inset-0 z-[9999] md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} aria-hidden={!isMobileMenuOpen}>
          <div
            ref={mobileMenuRef}
            id="mobile-menu"
            className="min-h-screen w-full bg-black flex flex-col overflow-y-auto pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-toggle"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
              <span className="text-xs uppercase tracking-widest text-neutral-400">Menu</span>
              <div className="flex items-center gap-3">
                <LanguageSwitcher />
                <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu" className="p-2 -mr-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none">
                  <X className="h-5 w-5 text-neutral-300" />
                </button>
              </div>
            </div>

            <div className="px-6 py-4">
              <ul className="divide-y divide-neutral-900">
                {navigationItems.map((item, index) => (
                  <li key={item.label}>
                    {item.link ? (
                      <Link to={item.link} className="w-full flex items-baseline gap-3 py-4 focus:ring-2 focus:ring-emerald-400 focus:outline-none">
                        <span className="w-8 shrink-0 text-sm text-neutral-500">{(index + 1).toString().padStart(2, '0')}</span>
                        <span className="text-2xl leading-none font-light tracking-wide text-white">{item.label}</span>
                      </Link>
                    ) : (
                      <button onClick={() => item.ref && scrollToSection(item.ref)} className="w-full flex items-baseline gap-3 py-4 focus:ring-2 focus:ring-emerald-400 focus:outline-none">
                        <span className="w-8 shrink-0 text-sm text-neutral-500">{(index + 1).toString().padStart(2, '0')}</span>
                        <span className="text-2xl leading-none font-light tracking-wide text-white">{item.label}</span>
                      </button>
                    )}
                  </li>
                ))}
              </ul>

              <div className="pt-6">
                <ScheduleButton 
                  onClick={() => {
                    scrollToSection(scheduleRef);
                    setIsMobileMenuOpen(false);
                  }} 
                  fullWidth 
                />
              </div>
            </div>

            <div className="mt-auto px-6 py-6 border-t border-neutral-800 space-y-2">
              <a href="mailto:info@debutiques.com" className="block text-neutral-400 hover:text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none">
                info@debutiques.com
              </a>
              <a href="tel:+38166009540" className="block text-neutral-400 hover:text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none">
                +381 (66) 009-540
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <Hero
        heroRef={heroRef}
        heroVideoRef={heroVideoRef}
        videoError={videoError}
        setVideoError={setVideoError}
        videoLoaded={videoLoaded}
        scheduleRef={scheduleRef}
        showcaseRef={showcaseRef}
        scrollToSection={scrollToSection}
      />

      {/* SOCIAL PROOF */}
      <section id="social-proof" ref={socialProofRef} className="py-12 md:py-14 bg-neutral-950">
        <div className="container mx-auto px-6 md:px-10">
          <div className="text-center overflow-hidden">
            <p className="text-[11px] md:text-xs uppercase tracking-[0.18em] text-neutral-400 mb-4">
              {t('socialProof.trustedBy')}
            </p>
            <div className="relative w-full">
              <div className="flex overflow-hidden">
                <div className="flex animate-scroll [animation-duration:45s] md:[animation-duration:30s]">
                  {companyLogos.map((logo, index) => (
                    <div key={`logo-1-${index}`} className="logo-container mx-8 sm:mx-10">
                      <img 
                        src={logo} 
                        alt={`Partner company logo ${index + 1}`} 
                        className="logo-image h-8 md:h-10 w-auto opacity-80 hover:opacity-100" 
                        loading="lazy" 
                      />
                    </div>
                  ))}
                  {companyLogos.map((logo, index) => (
                    <div key={`logo-2-${index}`} className="logo-container mx-8 sm:mx-10">
                      <img 
                        src={logo} 
                        alt={`Partner company logo ${index + 1}`} 
                        className="logo-image h-8 md:h-10 w-auto opacity-80 hover:opacity-100" 
                        loading="lazy" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
            <div>
              <p className="text-3xl md:text-4xl font-light leading-none mb-1">50+</p>
              <p className="mt-1 text-neutral-400 text-[11px] md:text-xs uppercase tracking-[0.18em]">
                {t('socialProof.productsVisualized')}
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-light leading-none mb-1">10,000+</p>
              <p className="mt-1 text-neutral-400 text-[11px] md:text-xs uppercase tracking-[0.18em]">
                {t('socialProof.rendersDelivered')}
              </p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-light leading-none mb-1">Global</p>
              <p className="mt-1 text-neutral-400 text-[11px] md:text-xs uppercase tracking-[0.18em]">
                {t('socialProof.catalogDistribution')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SELECTED WORK (3×3) */}
      <section id="selected-work" ref={selectedWorkRef} className="py-12 bg-black">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-center">Selected Work</h2>
        </div>

        <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-8">
          <div className="grid grid-cols-3 gap-px bg-neutral-900">
            {selectedWork.map((item) => (
              <button
                key={item.id}
                onClick={() => handleImageClick(item)}
                className="group relative w-full overflow-hidden bg-black focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                aria-label={`View ${item.title}`}
              >
                <div className="relative w-full pt-[100%]">
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12">
          <div className="mt-8 text-center">
            <button onClick={() => scrollToSection(showcaseRef)} className="text-sm uppercase tracking-widest text-white/80 hover:text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none">
              See full gallery ↓
            </button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="problem" ref={problemRef} className="bg-neutral-950">
        <WhyChooseUsTwoCol onScheduleClick={() => scrollToSection(scheduleRef)} />
      </section>

      {/* IMPACT */}
      <section id="impact" className="py-24 bg-black">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-light mb-16 tracking-tight text-center">Boost Sales with Powerful Imagery</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
            {impactStats.map((item, idx) => (
              <div key={idx} className={`text-center md:text-left px-0 md:px-6 ${idx > 0 ? 'md:border-l md:border-neutral-800' : ''}`}>
                <p className="text-5xl font-light mb-3">{item.value}</p>
                <p className="text-neutral-400 font-light">{item.caption}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-neutral-500">
            Benchmarks based on aggregated data from our clients' data science teams and industry data; results vary by product and channel.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" ref={servicesRef} className="py-24 bg-neutral-950">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-light mb-16 tracking-tight text-center">{t('services.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-neutral-900/50 p-8 hover:bg-neutral-800/50 transition-colors">
                <div className="mb-6 text-neutral-300">{service.icon}</div>
                <h3 className="text-xl font-light mb-4">{service.title}</h3>
                <p className="text-neutral-400 font-light text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SHOWCASE / OUR WORK (6×6) */}
      <section id="showcase" ref={showcaseRef} className="py-24 bg-black">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-light mb-8 tracking-tight text-center">{t('showcase.title')}</h2>

          <div className="flex justify-center mb-12 px-4">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 bg-neutral-900/50 p-2 rounded-lg w-full">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 sm:px-6 py-2 text-xs sm:text-sm uppercase tracking-widest transition-all whitespace-nowrap focus:ring-2 focus:ring-emerald-400 focus:outline-none ${
                  activeFilter === 'all' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {t('showcase.filters.allWork')}
              </button>
              <button
                onClick={() => setActiveFilter('product')}
                className={`px-3 sm:px-6 py-2 text-xs sm:text-sm uppercase tracking-widest transition-all whitespace-nowrap focus:ring-2 focus:ring-emerald-400 focus:outline-none ${
                  activeFilter === 'product' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {t('showcase.filters.productRenders')}
              </button>
              <button
                onClick={() => setActiveFilter('interior')}
                className={`px-3 sm:px-6 py-2 text-xs sm:text-sm uppercase tracking-widest transition-all whitespace-nowrap focus:ring-2 focus:ring-emerald-400 focus:outline-none ${
                  activeFilter === 'interior' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {t('showcase.filters.interiorScenes')}
              </button>
              <button
                onClick={() => setActiveFilter('video')}
                className={`px-3 sm:px-6 py-2 text-xs sm:text-sm uppercase tracking-widest transition-all whitespace-nowrap focus:ring-2 focus:ring-emerald-400 focus:outline-none ${
                  activeFilter === 'video' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {t('showcase.filters.videos')}
              </button>
            </div>
          </div>

          {/* 6×6 SQUARE GRID */}
          <div className="mx-auto max-w-[1600px]">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {filteredImages.slice(0, 36).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleImageClick(item)}
                  className="group relative w-full overflow-hidden rounded-sm bg-neutral-900 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                >
                  <div className="relative w-full pt-[100%]">
                    {item.type === 'video' ? (
                      <video
                        src={item.src}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={item.alt}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                  </div>
                  <span className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/30" />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-neutral-400 text-sm">
              {t('showcase.showingResults', { count: filteredImages.length, total: allGalleryImages.length })}
            </p>
          </div>
        </div>
      </section>

      {/* ZOOM MODAL */}
      {zoomedImage && (
        <div className="zoom-modal-container" onClick={() => { setZoomedImage(null); setCurrentZoomedImageIndex(null); }} style={{ animation: 'fadeIn 0.3s ease-out' }}>
          <div className="zoom-modal-content" onClick={(e) => e.stopPropagation()}>
            {filteredImages.length > 1 && (
              <>
                <button 
                  onClick={(e) => { e.stopPropagation(); showPreviousImage(); }} 
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20 focus:ring-2 focus:ring-emerald-400 focus:outline-none" 
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); showNextImage(); }} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20 focus:ring-2 focus:ring-emerald-400 focus:outline-none" 
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
            {zoomedImage.type === 'video' ? (
              <video src={zoomedImage.src} className="zoom-modal-video" controls autoPlay loop muted playsInline style={{ animation: 'zoomIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
            ) : (
              <img src={zoomedImage.src} alt={zoomedImage.alt} className="zoom-modal-image" style={{ animation: 'zoomIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }} />
            )}
            <button 
              onClick={(e) => { e.stopPropagation(); setZoomedImage(null); setCurrentZoomedImageIndex(null); }} 
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full focus:ring-2 focus:ring-emerald-400 focus:outline-none" 
              aria-label="Close zoom view"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}

      {/* PROCESS */}
      <section id="process" ref={processRef} className="py-24 bg-neutral-950">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-light mb-16 tracking-tight text-center">{t('process.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-900 mb-6">
                <p className="text-2xl font-light">1</p>
              </div>
              <h3 className="text-xl font-light mb-4">{t('process.step1.title')}</h3>
              <p className="text-neutral-400 font-light">{t('process.step1.description')}</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-900 mb-6">
                <p className="text-2xl font-light">2</p>
              </div>
              <h3 className="text-xl font-light mb-4">{t('process.step2.title')}</h3>
              <p className="text-neutral-400 font-light">{t('process.step2.description')}</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-900 mb-6">
                <p className="text-2xl font-light">3</p>
              </div>
              <h3 className="text-xl font-light mb-4">{t('process.step3.title')}</h3>
              <p className="text-neutral-400 font-light">{t('process.step3.description')}</p>
            </div>
          </div>

          <div className="mt-14 text-center">
            <ScheduleButton onClick={() => scrollToSection(scheduleRef)} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" ref={faqRef} className="py-24 bg-black">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-light mb-16 tracking-tight text-center">{t('faq.title')}</h2>
          <div className="max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <div key={index} className="mb-6 border-b border-neutral-800 pb-6">
                <button onClick={() => toggleFaq(index)} className="flex justify-between items-center w-full text-left focus:ring-2 focus:ring-emerald-400 focus:outline-none">
                  <h3 className="text-xl font-light">{item.question}</h3>
                  <div className="flex-shrink-0 ml-4">
                    {openFaqIndex === index ? <Minus className="h-5 w-5 text-neutral-400" /> : <Plus className="h-5 w-5 text-neutral-400" />}
                  </div>
                </button>
                {openFaqIndex === index && (
                  <div className="mt-4 text-neutral-400 font-light whitespace-pre-line text-left">{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <div ref={aboutRef}>
        <About />
      </div>

      {/* SCHEDULE */}
      <section id="schedule" ref={scheduleRef} className="bg-neutral-950">
        <div className="px-6 md:px-4 pt-24">
          <h2 className="text-4xl font-light mb-4 tracking-tight text-center text-white">{t('schedule.title')}</h2>
          <p className="text-xl text-neutral-300 mb-8 font-light text-center max-w-2xl mx-auto">
            {t('schedule.description')}
          </p>
        </div>
        <div className="px-6 md:px-4 pb-6">
          <div className="calendly-inline-widget" data-url="https://calendly.com/debutiques/meeting" style={{ minWidth: '320px', height: '1000px' }} />
        </div>
      </section>

      {/* STORY REEL */}
      <section id="story" ref={storyRef} className="relative bg-black py-14">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-center mb-8">
            Market the Experience, Not Just the Item
          </h2>
        </div>

        <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent" />
          <div className="reel-track" style={{ animationDuration: '50s' }}>
            {storyReelImages.concat(storyReelImages).map((item, i) => (
              <div key={i} className="shrink-0" style={{ width: 'clamp(150px, 18vw, 280px)' }}>
                <div className="aspect-[2/3] rounded-sm overflow-hidden bg-neutral-900 relative">
                  <img src={item.src} alt={item.alt} className="w-full h-full object-cover" loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <ScheduleButton onClick={() => scrollToSection(scheduleRef)} />
        </div>
      </section>

      {/* BRAND REEL */}
      <section id="brand-reel" ref={brandReelRef} className="relative bg-black min-h-[65vh]">
        <img
          src="/assets/interiors/Walnut_KitchenCloseup_01_Kitchen0001.jpg"
          alt="Walnut kitchen close-up interior"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </section>

      {/* FOOTER */}
      <footer ref={footerRef} className="py-12 bg-neutral-950 border-t border-neutral-900">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Column 1: Logo + blurb */}
            <div className="text-center md:text-left">
              <div className="flex justify-center md:justify-start">
                <button
                  type="button"
                  onClick={scrollToTop}
                  aria-label="Go to top"
                  className="flex flex-col items-center md:items-start gap-1 text-center md:text-left leading-tight"
                >
                  <img
                    src="/assets/debutilogo2.png"
                    alt="DEBUTIQUES logo"
                    className="h-8 w-auto object-contain"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const textLogo = document.createElement('div');
                      textLogo.className = 'logo-text text-white text-xl font-bold';
                      textLogo.textContent = 'DEBUTIQUES';
                      target.parentNode?.insertBefore(textLogo, target);
                    }}
                  />
                  <span className="logo-pronunciation uppercase text-white/70">/DE-BYU-TEEK/</span>
                </button>
              </div>
              <p className="text-neutral-400 font-light mt-4">{t('footer.description')}</p>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h3 className="text-sm uppercase tracking-widest mb-6">{t('footer.navigation')}</h3>
              <div className="grid gap-2 md:block md:space-y-3">
                <div><button onClick={() => scrollToSection(servicesRef)} className="text-neutral-400 hover:text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none">{t('navigation.services')}</button></div>
                <div><button onClick={() => scrollToSection(showcaseRef)} className="text-neutral-400 hover:text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none">{t('navigation.showcase')}</button></div>
                <div><button onClick={() => scrollToSection(aboutRef)} className="text-neutral-400 hover:text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none">About</button></div>
                <div><button onClick={() => scrollToSection(processRef)} className="text-neutral-400 hover:text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none">{t('navigation.process')}</button></div>
                <div><Link to="/privacy-policy" className="text-neutral-400 hover:text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none">{t('navigation.privacy')}</Link></div>
                <div><button onClick={() => scrollToSection(scheduleRef)} className="text-neutral-400 hover:text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none">{t('navigation.contact')}</button></div>
              </div>
            </div>

            {/* Column 3: Contact */}
            <div>
              <h3 className="text-sm uppercase tracking-widest mb-6">{t('footer.contact')}</h3>
              <div className="grid gap-2 md:space-y-3 md:block">
                <a href="mailto:info@debutiques.com" className="text-neutral-400 hover:text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none">{t('footer.email')}</a>
                <p className="text-neutral-400">{t('footer.locations')}</p>
              </div>
            </div>

            {/* Column 4: Connect */}
            <div>
              <h3 className="text-sm uppercase tracking-widest mb-6">{t('footer.connect')}</h3>
              <div className="flex gap-4 md:justify-start justify-center">
                <a href="https://www.linkedin.com/company/19198411" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none">LinkedIn</a>
                <a href="https://www.instagram.com/debutiques/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white focus:ring-2 focus:ring-emerald-400 focus:outline-none">Instagram</a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-900 text-center text-neutral-500 text-sm">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </div>
        </div>

        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 bg-white text-black p-3 rounded-full shadow-lg transition-opacity duration-300 hover:bg-neutral-200 focus:ring-2 focus:ring-emerald-400 focus:outline-none ${
            showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </footer>
    </div>
  );
}

export default HomePage;
