import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Linkedin, Instagram, ShieldCheck } from 'lucide-react';

export function Footer() {
  const { t, i18n } = useTranslation();
  console.log('Active language:', i18n.language);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-16 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-2">
            <div className="logo-container mb-6">
              <Link to="/" aria-label="Homepage">
                <h2 className="logo-text text-3xl">DEBUTIQUES</h2>
                </Link>
            </div>
            <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
              {t('footer.description')}
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                {t('footer.connect')}
              </h4>
              <div className="flex gap-3">
                <a 
                  href="https://linkedin.com/company/debutiques" 
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a 
                  href="https://instagram.com/debutiques" 
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 transition-colors group"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-white">{t('footer.navigation')}</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="#services" 
                  className="text-neutral-400 hover:text-white transition-colors duration-200 flex items-center overflow-hidden group"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-white transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  {t('navigation.services')}
                </a>
              </li>
              <li>
                <a 
                  href="#showcase" 
                  className="text-neutral-400 hover:text-white transition-colors duration-200 flex items-center overflow-hidden group"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-white transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  {t('navigation.showcase')}
                </a>
              </li>
              <li>
                <a 
                  href="#process" 
                  className="text-neutral-400 hover:text-white transition-colors duration-200 flex items-center overflow-hidden group"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-white transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  {t('navigation.process')}
                </a>
              </li>
              <li>
                <Link 
                  to="/privacy-policy" 
                  className="text-neutral-400 hover:text-white transition-colors duration-200 flex items-center overflow-hidden group"
                >
                  <span className="w-0 group-hover:w-2 h-px bg-white transition-all duration-200 mr-0 group-hover:mr-2"></span>
                  <ShieldCheck className="h-4 w-4 mr-2 text-gray-500 group-hover:text-gray-300" />
                  {t('navigation.privacy')}
                </Link>
              </li>              
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-white">{t('footer.contact')}</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-neutral-800 mt-0.5">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</p>
                  <a 
                    href="mailto:info@debutiques.com" 
                    className="text-gray-300 hover:text-white transition-colors duration-200 lowercase"
                  >
                    {t('footer.email')}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-neutral-800 mt-0.5">
                  <MapPin className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Locations</p>
                  <span className="text-gray-300">{t('footer.locations')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-neutral-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-sm">
              {t('footer.copyright', { year: currentYear })}
            </p>
            
            <div className="flex items-center gap-6">
              <span className="text-gray-500 text-sm">
                {t('footer.rights')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}