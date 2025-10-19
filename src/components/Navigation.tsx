import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navigation() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-md border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="flex flex-col items-center text-center gap-1 leading-tight">
                <h1 className="logo-text text-xl">DEBUTIQUES</h1>
                <span className="logo-pronunciation uppercase">/DE-BYU-TEEK/</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors hover-underline"
                >
                  {t('navigation.services')}
                </button>
                <button
                  onClick={() => scrollToSection('showcase')}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors hover-underline"
                >
                  {t('navigation.showcase')}
                </button>
                <button
                  onClick={() => scrollToSection('process')}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors hover-underline"
                >
                  {t('navigation.process')}
                </button>
                <button
                  onClick={() => scrollToSection('schedule')}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors hover-underline"
                >
                  {t('navigation.schedule')}
                </button>
                </div>
            </div>

            {/* Language Switcher & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={toggleMenu}
                  className="mobile-toggle-btn"
                  aria-expanded={isMenuOpen}
                  aria-label="Toggle navigation menu"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6 text-white" />
                  ) : (
                    <Menu className="h-6 w-6 text-white" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-50 md:hidden mobile-menu-overlay"
          onClick={closeMenu}
        >
          <div 
            className="fixed inset-y-0 right-0 w-80 max-w-sm mobile-menu-content mobile-menu-enter"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeMenu}
              className="mobile-close-btn"
              aria-label="Close navigation menu"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            {/* Mobile Navigation Items */}
            <div className="flex flex-col pt-16">
              <button
                onClick={() => scrollToSection('services')}
                className="mobile-menu-item"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white text-lg font-medium">{t('navigation.services')}</span>
                  <span className="mobile-menu-number text-sm">01</span>
                </div>
              </button>

              <button
                onClick={() => scrollToSection('showcase')}
                className="mobile-menu-item"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white text-lg font-medium">{t('navigation.showcase')}</span>
                  <span className="mobile-menu-number text-sm">02</span>
                </div>
              </button>

              <button
                onClick={() => scrollToSection('process')}
                className="mobile-menu-item"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white text-lg font-medium">{t('navigation.process')}</span>
                  <span className="mobile-menu-number text-sm">03</span>
                </div>
              </button>

              <button
                onClick={() => scrollToSection('schedule')}
                className="mobile-menu-item"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white text-lg font-medium">{t('navigation.schedule')}</span>
                  <span className="mobile-menu-number text-sm">04</span>
                </div>
              </button>              
            </div>
          </div>
        </div>
      )}
    </>
  );
}
