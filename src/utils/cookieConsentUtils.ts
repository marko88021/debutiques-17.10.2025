export interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required: boolean;
}

export interface CookieConsent {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: number;
  version: string;
}

export const COOKIE_CATEGORIES: CookieCategory[] = [
  {
    id: 'essential',
    name: 'Essential Cookies',
    description: 'These cookies are necessary for the website to function and cannot be switched off.',
    required: true,
  },
  {
    id: 'analytics',
    name: 'Analytics Cookies',
    description: 'These cookies help us understand how visitors interact with our website.',
    required: false,
  },
  {
    id: 'marketing',
    name: 'Marketing Cookies',
    description: 'These cookies are used to deliver personalized advertisements.',
    required: false,
  },
  {
    id: 'preferences',
    name: 'Preference Cookies',
    description: 'These cookies remember your choices and personalize your experience.',
    required: false,
  },
];

const CONSENT_KEY = 'debutiques_cookie_consent';
const CONSENT_VERSION = '1.0';

export const getConsent = (): CookieConsent | null => {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;
    
    const consent = JSON.parse(stored) as CookieConsent;
    
    // Check if consent is from current version
    if (consent.version !== CONSENT_VERSION) {
      return null;
    }
    
    return consent;
  } catch (error) {
    console.error('Error reading cookie consent:', error);
    return null;
  }
};

export const setConsent = (preferences: Partial<CookieConsent>): void => {
  try {
    const consent: CookieConsent = {
      essential: true, // Always true
      analytics: preferences.analytics || false,
      marketing: preferences.marketing || false,
      preferences: preferences.preferences || false,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };
    
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    
    // Trigger custom event for other parts of the app
    window.dispatchEvent(new CustomEvent('cookieConsentChanged', { detail: consent }));
  } catch (error) {
    console.error('Error saving cookie consent:', error);
  }
};

export const hasConsent = (category: keyof Omit<CookieConsent, 'timestamp' | 'version'>): boolean => {
  const consent = getConsent();
  if (!consent || typeof consent !== 'object') return false;
  
  return Boolean(consent[category]);
};

export const clearConsent = (): void => {
  try {
    localStorage.removeItem(CONSENT_KEY);
    window.dispatchEvent(new CustomEvent('cookieConsentChanged', { detail: null }));
  } catch (error) {
    console.error('Error clearing cookie consent:', error);
  }
};

export const acceptAllCookies = (): void => {
  setConsent({
    essential: true,
    analytics: true,
    marketing: true,
    preferences: true,
  });
};

export const declineAllCookies = (): void => {
  setConsent({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });
};