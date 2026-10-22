import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import FloatingActionButton from './components/FloatingActionButton';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import PageMetadata from './components/PageMetadata';
import { isPagePath, pagePath, pages, type PagePath } from '../seo/pages';

function App() {
  const [path, setPath] = useState<PagePath | null>(() => isPagePath(window.location.pathname) ? window.location.pathname : null);
  const currentPage = path ? pages[path].id : 'not-found';
  useEffect(() => {
    const onPopState = () => setPath(isPagePath(window.location.pathname) ? window.location.pathname : null);
    window.addEventListener('popstate', onPopState);
    if (window.location.hash === '#about-section') document.getElementById('about-section')?.scrollIntoView();
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal, .stagger-children');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [currentPage]);

  const handleNavigate = (page: string) => {
    if (page === 'about') {
      if (currentPage !== 'home') {
        window.history.pushState({}, '', '/#about-section');
        setPath('/');
        setTimeout(() => {
          const aboutSection = document.getElementById('about-section');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      } else {
        const aboutSection = document.getElementById('about-section');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      return;
    }

    const nextPath = pagePath(page);
    window.history.pushState({}, '', nextPath);
    setPath(nextPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'booking':
        return <BookingPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminPage />;
      default:
        return <section className="max-w-7xl mx-auto px-4 py-20"><h1>Page not found</h1><a href="/">Return home</a></section>;
    }
  };

  return (
    <div className="min-h-screen bg-surface-0">
      <PageMetadata path={path} />
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      {currentPage !== 'admin' && <Footer />}
      {currentPage !== 'admin' && <FloatingActionButton />}
    </div>
  );
}

export default App;
