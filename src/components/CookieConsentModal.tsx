import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Cookie, Shield, BarChart3, Target, Settings, ExternalLink, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { COOKIE_CATEGORIES, type CookieConsent } from '@/utils/cookieConsentUtils';

interface CookieConsentModalProps {
  isOpen: boolean;
  onAcceptAll: () => void;
  onDeclineAll: () => void;
  onSavePreferences: (preferences: Partial<CookieConsent>) => void;
  onClose: () => void;
}

const getCategoryIcon = (categoryId: string) => {
  switch (categoryId) {
    case 'essential':
      return <Shield className="h-5 w-5 text-green-500" />;
    case 'analytics':
      return <BarChart3 className="h-5 w-5 text-blue-500" />;
    case 'marketing':
      return <Target className="h-5 w-5 text-purple-500" />;
    case 'preferences':
      return <Settings className="h-5 w-5 text-orange-500" />;
    default:
      return <Cookie className="h-5 w-5 text-gray-500" />;
  }
};

export function CookieConsentModal({
  isOpen,
  onAcceptAll,
  onDeclineAll,
  onSavePreferences,
  onClose,
}: CookieConsentModalProps) {
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  const handleTogglePreference = (categoryId: string, enabled: boolean) => {
    if (categoryId === 'essential') return; // Essential cookies cannot be disabled
    
    setPreferences(prev => ({
      ...prev,
      [categoryId]: enabled,
    }));
  };

  const handleSavePreferences = () => {
    onSavePreferences(preferences);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed bottom-0 left-0 right-0 w-full max-w-full h-auto max-h-none m-0 p-0 rounded-none border-0 bg-black/95 backdrop-blur-md text-white shadow-2xl transition-all duration-300 ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom !transform-none !top-auto !left-0 !right-0 !bottom-0 sm:!max-w-full md:!w-full">
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors md:hidden"
          aria-label="Close cookie preferences"
        >
          <X className="h-4 w-4 text-white" />
        </button>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <DialogHeader className="space-y-4">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="p-2 rounded-lg bg-blue-100">
              <Cookie className="h-5 w-5 text-blue-600" />
            </div>
            <DialogTitle className="text-lg md:text-xl font-semibold text-white">
              {t('cookieConsent.title')}
            </DialogTitle>
          </div>
          <DialogDescription className="text-gray-300 text-sm md:text-base leading-relaxed text-center md:text-left">
            {t('cookieConsent.description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 md:space-y-6 mt-4 md:mt-6">
          {!showDetails ? (
            // Simple view
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                <p className="text-sm text-gray-300 mb-4 text-center md:text-left">
                  {t('cookieConsent.simpleDescription')}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <Button
                    onClick={onAcceptAll}
                    className="flex-1 sm:flex-none primary-button bg-white text-black hover:bg-gray-200 px-6 py-2 text-sm font-medium"
                  >
                    {t('cookieConsent.buttons.acceptAll')}
                  </Button>
                  <Button
                    onClick={onDeclineAll}
                    variant="secondary"
                    className="flex-1 sm:flex-none bg-neutral-800 text-white hover:bg-neutral-700 border border-white/20 px-6 py-2 text-sm font-medium"
                  >
                    {t('cookieConsent.buttons.declineAll')}
                  </Button>
                </div>
              </div>
              
              <div className="text-center md:text-left">
                <Button
                  onClick={() => setShowDetails(true)}
                  variant="ghost"
                  className="text-white/80 hover:text-white hover:bg-white/10 text-sm"
                >
                  {t('cookieConsent.buttons.customizeSettings')}
                </Button>
              </div>
            </div>
          ) : (
            // Detailed view
            <div className="space-y-6">
              <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-hide">
                {COOKIE_CATEGORIES.map((category) => (
                  <div key={category.id} className="border border-white/10 rounded-lg p-3 bg-white/5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        {getCategoryIcon(category.id)}
                        <div className="flex-1">
                          <h3 className="font-semibold text-white mb-1 text-sm">
                            {t(`cookieConsent.category.${category.id}.title`)}
                          </h3>
                          <p className="text-xs text-gray-300 leading-relaxed">
                            {t(`cookieConsent.category.${category.id}.description`)}
                          </p>
                          {category.required && (
                            <span className="inline-block mt-1 px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                              {t('cookieConsent.required')}
                            </span>
                          )}
                        </div>
                      </div>
                      <Switch
                        checked={preferences[category.id as keyof typeof preferences]}
                        onCheckedChange={(checked) => handleTogglePreference(category.id, checked)}
                        disabled={category.required}
                        className="custom-switch data-[state=checked]:bg-white data-[state=checked]:text-black"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="bg-white/10" />

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Button
                  onClick={handleSavePreferences}
                  className="flex-1 sm:flex-none primary-button bg-white text-black hover:bg-gray-200 px-6 py-2 text-sm font-medium"
                >
                  {t('cookieConsent.buttons.savePreferences')}
                </Button>
                <Button
                  onClick={onAcceptAll}
                  variant="secondary"
                  className="flex-1 sm:flex-none bg-neutral-800 text-white hover:bg-neutral-700 border border-white/20 px-6 py-2 text-sm font-medium"
                >
                  {t('cookieConsent.buttons.acceptAll')}
                </Button>
              </div>

              <div className="text-center md:text-left">
                <Button
                  onClick={() => setShowDetails(false)}
                  variant="ghost"
                  className="text-white/80 hover:text-white hover:bg-white/10 text-sm"
                >
                  {t('cookieConsent.buttons.backToSimple')}
                </Button>
              </div>
            </div>
          )}

          <Separator className="bg-white/10" />

          <div className="text-center md:text-left">
            <Link
              to="/privacy-policy"
              className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white hover:underline transition-colors"
              onClick={onClose}
            >
              {t('cookieConsent.privacyPolicyLink')}
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}