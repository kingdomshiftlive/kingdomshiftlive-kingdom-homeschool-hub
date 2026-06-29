import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './hooks/useTheme';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BackToTop from './components/ui/BackToTop';
import CookieBanner from './components/ui/CookieBanner';

// Eager load home for fastest initial paint
import Home from './pages/Home';

// Lazy load all other pages
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Resources = lazy(() => import('./pages/Resources'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const Tools = lazy(() => import('./pages/Tools'));
const AICoach = lazy(() => import('./pages/AICoach'));
const AdminConfig = lazy(() => import('./pages/AdminConfig'));
const FAQ = lazy(() => import('./pages/FAQ'));

// Legal pages from one module
const PrivacyPolicy = lazy(() =>
  import('./pages/Legal').then(m => ({ default: m.PrivacyPolicy }))
);
const Terms = lazy(() =>
  import('./pages/Legal').then(m => ({ default: m.Terms }))
);
const Disclaimer = lazy(() =>
  import('./pages/Legal').then(m => ({ default: m.Disclaimer }))
);
const AffiliateDisclosure = lazy(() =>
  import('./pages/Legal').then(m => ({ default: m.AffiliateDisclosure }))
);
const NotFound = lazy(() =>
  import('./pages/Legal').then(m => ({ default: m.NotFound }))
);

function PageLoader() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div className="loading-ring" aria-label="Loading…" />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/ai-coach" element={<AICoach />} />
            <Route path="/admin-config" element={<AdminConfig />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
      <CookieBanner />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '10px',
              fontSize: '0.9rem',
              fontFamily: 'Inter, sans-serif',
            },
            success: { iconTheme: { primary: '#5d9170', secondary: '#fff' } },
            error:   { iconTheme: { primary: '#e74c3c', secondary: '#fff' } },
          }}
        />
        <AppLayout />
      </BrowserRouter>
    </ThemeProvider>
  );
}
