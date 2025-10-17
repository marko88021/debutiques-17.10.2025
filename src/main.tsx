import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './i18n';

// Split the main bundle: App is lazy-loaded
const App = lazy(() => import('./App'));

const rootEl = document.getElementById('root')!;
const root = createRoot(rootEl);

root.render(
  <StrictMode>
    <Suspense
      fallback={
        // ultra-light fallback to avoid layout shift
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
            fontSize: '12px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            opacity: 0.7,
          }}
        >
          Loading…
        </div>
      }
    >
      <App />
    </Suspense>
  </StrictMode>
);
