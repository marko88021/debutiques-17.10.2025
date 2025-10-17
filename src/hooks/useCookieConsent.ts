import { useState, useEffect, useCallback } from 'react';
import {
  getConsent,
  setConsent,
  hasConsent,
  acceptAllCookies,
  declineAllCookies,
  type CookieConsent,
} from '@/utils/cookieConsentUtils';

export const useCookieConsent = () => {
  const [showModal, setShowModal] = useState(false);
  const [consent, setConsentState] = useState<CookieConsent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkConsent = () => {
      const existingConsent = getConsent();
      setConsentState(existingConsent);
      setShowModal(!existingConsent);
      setIsLoading(false);
    };

    checkConsent();

    // Listen for consent changes
    const handleConsentChange = (event: CustomEvent) => {
      setConsentState(event.detail);
      setShowModal(!event.detail);
    };

    window.addEventListener('cookieConsentChanged', handleConsentChange as EventListener);

    return () => {
      window.removeEventListener('cookieConsentChanged', handleConsentChange as EventListener);
    };
  }, []);

  const acceptAll = useCallback(() => {
    acceptAllCookies();
    setShowModal(false);
  }, []);

  const declineAll = useCallback(() => {
    declineAllCookies();
    setShowModal(false);
  }, []);

  const savePreferences = useCallback((preferences: Partial<CookieConsent>) => {
    setConsent(preferences);
    setShowModal(false);
  }, []);

  const openModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return {
    showModal,
    consent,
    isLoading,
    acceptAll,
    declineAll,
    savePreferences,
    openModal,
    closeModal,
    hasConsent: (category: keyof Omit<CookieConsent, 'timestamp' | 'version'>) => hasConsent(category),
  };
};