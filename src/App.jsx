import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { AdminPanel } from './components/AdminPanel';
import { BackToTop } from './components/BackToTop';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { LegalPage } from './pages/LegalPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { allBlogs as initialAllBlogs } from './data/blogsData';

export function App() {
  // Parse initial route from URL path
  const getInitialRoute = () => {
    const path = window.location.pathname;
    if (path === '/' || path === '') {
      return { view: 'home', slug: null, legalKey: 'privacy-policy' };
    }
    if (path.startsWith('/article/')) {
      const slug = path.replace('/article/', '');
      return { view: 'article', slug: slug, legalKey: 'privacy-policy' };
    }
    if (path === '/contact') {
      return { view: 'contact', slug: null, legalKey: 'privacy-policy' };
    }
    if (path.startsWith('/legal/')) {
      const key = path.replace('/legal/', '');
      return { view: 'legal', slug: null, legalKey: key || 'privacy-policy' };
    }
    return { view: '404', slug: null, legalKey: 'privacy-policy' };
  };

  const initialRoute = getInitialRoute();
  const [view, setView] = useState(initialRoute.view); // 'home', 'article', 'legal', 'contact', 'admin'
  const [selectedArticleSlug, setSelectedArticleSlug] = useState(initialRoute.slug);
  const [selectedLegalPage, setSelectedLegalPage] = useState(initialRoute.legalKey);
  const [activeSectionFilter, setActiveSectionFilter] = useState(null);

  // Search query param handling (?search=query)
  const [searchUrlQuery, setSearchUrlQuery] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('search') || '';
    } catch {
      return '';
    }
  });

  // Sync URL history state on popstate
  useEffect(() => {
    const handlePopState = () => {
      const route = getInitialRoute();
      setView(route.view);
      setSelectedArticleSlug(route.slug);
      setSelectedLegalPage(route.legalKey);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Dynamic Blogs List state (persisted in localStorage with fresh data sync)
  const [blogsList, setBlogsList] = useState(() => {
    try {
      const saved = localStorage.getItem('govtrojgar_dynamic_blogs_v1');
      return saved ? JSON.parse(saved) : initialAllBlogs;
    } catch {
      return initialAllBlogs;
    }
  });

  // Modals & Drawers
  const [searchOpen, setSearchOpen] = useState(false);
  const [bookmarksOpen, setBookmarksOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  // Bookmarks state (saved in localStorage)
  const [bookmarkedSlugs, setBookmarkedSlugs] = useState(() => {
    try {
      const saved = localStorage.getItem('govtrojgar_bookmarks');
      return saved ? JSON.parse(saved) : ['ssc-cgl-2024-comprehensive-recruitment-guide', 'upsc-civil-services-2024-complete-recruitment-guide'];
    } catch {
      return ['ssc-cgl-2024-comprehensive-recruitment-guide', 'upsc-civil-services-2024-complete-recruitment-guide'];
    }
  });

  // Theme state (light / dark)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('govtrojgar_theme') || 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('govtrojgar_theme', theme);
    } catch {}
  }, [theme]);

  useEffect(() => {
    try {
      localStorage.setItem('govtrojgar_bookmarks', JSON.stringify(bookmarkedSlugs));
    } catch {}
  }, [bookmarkedSlugs]);

  useEffect(() => {
    try {
      localStorage.setItem('govtrojgar_dynamic_blogs_v1', JSON.stringify(blogsList));
    } catch {}
  }, [blogsList]);

  // CRUD Operations for Admin Panel
  const handleAddBlog = (newBlog) => {
    setBlogsList(prev => [newBlog, ...prev]);
  };

  const handleUpdateBlog = (updatedBlog) => {
    setBlogsList(prev => prev.map(b => b.id === updatedBlog.id ? updatedBlog : b));
  };

  const handleDeleteBlog = (blogId) => {
    setBlogsList(prev => prev.filter(b => b.id !== blogId));
  };

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleToggleBookmark = (slug) => {
    setBookmarkedSlugs(prev => 
      prev.includes(slug) ? prev.filter(s => s !== slug) : [...prev, slug]
    );
  };

  const handleSelectBlog = (slug) => {
    setSelectedArticleSlug(slug);
    setView('article');
    if (window.location.pathname !== `/article/${slug}`) {
      window.history.pushState({}, '', `/article/${slug}`);
    }
    window.scrollTo(0, 0);
  };

  const handleNavigateLegal = (legalKey) => {
    setSelectedLegalPage(legalKey);
    setView('legal');
    if (window.location.pathname !== `/legal/${legalKey}`) {
      window.history.pushState({}, '', `/legal/${legalKey}`);
    }
    window.scrollTo(0, 0);
  };

  const handleNavigateContact = () => {
    setView('contact');
    if (window.location.pathname !== '/contact') {
      window.history.pushState({}, '', '/contact');
    }
    window.scrollTo(0, 0);
  };

  const handleNavigateHome = () => {
    setView('home');
    setSelectedArticleSlug(null);
    if (window.location.pathname !== '/') {
      window.history.pushState({}, '', '/');
    }
    window.scrollTo(0, 0);
  };

  const handleSelectSection = (sectionSlug) => {
    setActiveSectionFilter(sectionSlug);
    setView('home');
    if (sectionSlug) {
      setTimeout(() => {
        const el = document.getElementById(sectionSlug);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Global Navbar Header */}
      <Navbar 
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        bookmarkCount={bookmarkedSlugs.length}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        activeSection={activeSectionFilter}
        onSelectSection={handleSelectSection}
        currentView={view}
        onNavigateHome={handleNavigateHome}
        onOpenAdmin={() => setAdminOpen(true)}
        onNavigateLegal={handleNavigateLegal}
        onNavigateContact={handleNavigateContact}
      />

      {/* Main View Router */}
      <main style={{ flexGrow: 1 }}>
        {view === 'home' && (
          <HomePage 
            onSelectBlog={handleSelectBlog}
            onToggleBookmark={handleToggleBookmark}
            bookmarkedSlugs={bookmarkedSlugs}
            activeSectionFilter={activeSectionFilter}
          />
        )}

        {view === 'article' && (
          <ArticlePage 
            slug={selectedArticleSlug}
            onBack={() => handleNavigateHome()}
            onSelectBlog={handleSelectBlog}
            onToggleBookmark={handleToggleBookmark}
            bookmarkedSlugs={bookmarkedSlugs}
            onNavigateSection={handleSelectSection}
          />
        )}

        {view === 'legal' && (
          <LegalPage 
            pageKey={selectedLegalPage}
            onBack={() => handleNavigateHome()}
          />
        )}

        {view === 'contact' && (
          <ContactPage 
            onBack={() => handleNavigateHome()}
          />
        )}

        {view === '404' && (
          <NotFoundPage 
            onNavigateHome={() => handleNavigateHome()}
            onSelectBlog={handleSelectBlog}
          />
        )}
      </main>

      {/* Admin Panel Modal Overlay */}
      {adminOpen && (
        <AdminPanel 
          blogs={blogsList}
          onAddBlog={handleAddBlog}
          onUpdateBlog={handleUpdateBlog}
          onDeleteBlog={handleDeleteBlog}
          onSelectBlog={handleSelectBlog}
          onCloseAdmin={() => setAdminOpen(false)}
        />
      )}

      {/* Search Modal */}
      <SearchModal 
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectBlog={handleSelectBlog}
        initialQuery={searchUrlQuery}
      />

      {/* Bookmarks Drawer */}
      <BookmarksDrawer 
        isOpen={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
        bookmarkedSlugs={bookmarkedSlugs}
        onRemoveBookmark={handleToggleBookmark}
        onSelectBlog={handleSelectBlog}
      />

      {/* Floating Back To Top Button (Item 12) */}
      <BackToTop />

      {/* Global Footer */}
      <Footer 
        onNavigateLegal={handleNavigateLegal}
        onNavigateContact={handleNavigateContact}
        onNavigateSection={handleSelectSection}
      />
    </div>
  );
}

export default App;
