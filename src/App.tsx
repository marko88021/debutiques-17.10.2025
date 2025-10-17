import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { ScrollToTop } from '@/components/ScrollToTop';
import { CookieConsentModal } from '@/components/CookieConsentModal';
import { ScriptLoader } from '@/components/ScriptLoader';
import { useCookieConsent } from '@/hooks/useCookieConsent';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import './App.css';

const HomePage = lazy(() => import('@/pages/HomePage'));
const PrivacyPolicy = lazy(() => import('@/components/PrivacyPolicy'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'));
const AdminLoginPage = lazy(() => import('@/pages/AdminLoginPage'));
const AdminGalleryPage = lazy(() => import('@/pages/AdminGalleryPage'));

// Utility: load external script once
function loadScriptOnce(src: string) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement('script');
  s.src = src;
  s.async = true;
  document.body.appendChild(s);
}

/**
 * Calendly: inject only when the inline widget is on screen (or after 15s idle).
 * This avoids loading ~90–120KB of JS on first paint.
 */
function CalendlyDeferredLoader() {
  const { pathname } = useLocation();

  useEffect(() => {
    // If there is no Calendly embed on this route, do nothing.
    const target = document.querySelector('.calendly-inline-widget');
    if (!target) return;

    let loaded = false;
    const loadCalendly = () => {
      if (loaded) return;
      loaded = true;
      loadScriptOnce('https://assets.calendly.com/assets/external/widget.js');
    };

    // 1) Load when the widget is about to be visible
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            loadCalendly();
            io.disconnect();
          }
        });
      },
      { rootMargin: '600px' } // pre-load just before it scrolls into view
    );
    io.observe(target);

    // 2) Fallback: load after some idle time (first user session)
    const fallback = window.setTimeout(loadCalendly, 15000);

    return () => {
      try { io.disconnect(); } catch {}
      window.clearTimeout(fallback);
    };
  }, [pathname]);

  return null;
}

/**
 * Light-touch asset protection:
 * Prevent right-click only on media (img/video/canvas), not globally.
 * Global blocks (select, keydown) harm accessibility & Best Practices.
 */
function MediaContextGuard() {
  useEffect(() => {
    const onCtx = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      if (el && el.closest('img, video, canvas')) {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', onCtx, { capture: true });
    return () => document.removeEventListener('contextmenu', onCtx, { capture: true } as any);
  }, []);
  return null;
}

function AppShell() {
  const {
    showModal,
    acceptAll,
    declineAll,
    savePreferences,
    closeModal,
  } = useCookieConsent();

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="no-select no-context-menu">
          <ScrollToTop />

          {/* Load marketing/analytics only after consent */}
          <ScriptLoader />

          {/* Defer Calendly until needed */}
          <CalendlyDeferredLoader />

          {/* Scope right-click block to media only */}
          <MediaContextGuard />

          <Suspense
            fallback={
              <div
                style={{
                  minHeight: '100vh',
                  backgroundColor: '#000',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily:
                    'Outfit, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
                  fontSize: 12,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  opacity: 0.7,
                }}
              >
                Loading…
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route
                path="/admin/gallery"
                element={
                  <ProtectedRoute>
                    <AdminGalleryPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>

          <CookieConsentModal
            isOpen={showModal}
            onAcceptAll={acceptAll}
            onDeclineAll={declineAll}
            onSavePreferences={savePreferences}
            onClose={closeModal}
          />

          <Toaster />
          <Sonner />

        {/* Reserve space when cookie bar is visible (avoid CLS) */}
        {showModal && (
          <style>
            {`
              body { padding-bottom: 200px; }
              @media (max-width: 768px) {
                body { padding-bottom: 300px; }
              }
            `}
          </style>
        )}
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppShell;
