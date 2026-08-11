import React, { useState, useEffect, useRef } from 'react';
import { 
  ScanSearch, SunMedium, MoonStar, FolderHeart, Fingerprint, ChevronDown, X, 
  Briefcase, CreditCard, Award, BookOpen, Key, MapPin, DollarSign, Train, 
  Shield, CheckCircle, PenTool, Mail, Sparkles
} from 'lucide-react';

export function Navbar({ onOpenSearch, onOpenBookmarks, bookmarkCount, theme, onToggleTheme, activeSection, onSelectSection, currentView, onNavigateHome, onOpenAdmin, onNavigateLegal, onNavigateContact }) {
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMegaMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMegaMenu = (menuKey) => {
    setActiveMegaMenu(prev => (prev === menuKey ? null : menuKey));
  };

  const handleSelectCategory = (catName) => {
    onNavigateHome();
    onSelectSection(catName);
    setActiveMegaMenu(null);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="container announcement-content">
          <div className="ticker-wrap">
            <span className="ticker-label">LATEST NOTIFICATION</span>
            <span className="ticker-text">
              SSC CGL 2024 Tier 1 & 2 Complete Guide • UPSC Civil Services Prelims Results • RRB NTPC 2024 Recruitment
            </span>
          </div>
          <div className="ticker-date">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Sticky Header */}
      <header className="single-combined-sticky-header" ref={menuRef}>
        <div className="container combined-header-container">
          
          {/* Brand Logo */}
          <a href="/" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="brand-logo-wrap" aria-label="Govt Rojgar Updates Home" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'none' }}>
            <div style={{ background: 'var(--accent-teal)', color: '#fff', padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Briefcase size={22} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1, letterSpacing: '-0.02em' }}>
                GOVT ROJGAR <span style={{ color: 'var(--accent-teal)' }}>UPDATES</span>
              </div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Sarkari Naukri & Exam Portal
              </div>
            </div>
          </a>

          {/* Nav Middle Links */}
          <nav className="combined-nav-middle">
            <ul className="combined-nav-links">
              <li>
                <a 
                  href="/"
                  className={`nav-link ${currentView === 'home' && !activeSection && !activeMegaMenu ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateHome();
                    onSelectSection(null);
                    setActiveMegaMenu(null);
                  }}
                >
                  Home
                </a>
              </li>

              <li className="mega-menu-item">
                <a 
                  href="/#latest-jobs"
                  className={`nav-link mega-btn ${activeSection === 'Latest Jobs' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelectCategory('Latest Jobs');
                  }}
                >
                  Latest Jobs
                </a>
              </li>

              <li className="mega-menu-item">
                <a 
                  href="/#admit-cards"
                  className={`nav-link mega-btn ${activeSection === 'Admit Cards' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelectCategory('Admit Cards');
                  }}
                >
                  Admit Cards
                </a>
              </li>

              <li className="mega-menu-item">
                <a 
                  href="/#results"
                  className={`nav-link mega-btn ${activeSection === 'Results' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelectCategory('Results');
                  }}
                >
                  Results
                </a>
              </li>

              <li className="mega-menu-item">
                <a 
                  href="/#syllabus"
                  className={`nav-link mega-btn ${activeSection === 'Syllabus' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelectCategory('Syllabus');
                  }}
                >
                  Syllabus
                </a>
              </li>

              <li className="mega-menu-item">
                <button 
                  className={`nav-link mega-btn ${activeMegaMenu === 'categories' ? 'active' : ''}`}
                  onClick={() => toggleMegaMenu('categories')}
                >
                  All Categories <ChevronDown size={14} className={`dropdown-arrow ${activeMegaMenu === 'categories' ? 'open' : ''}`} />
                </button>
              </li>
            </ul>
          </nav>

          {/* Header Action Buttons */}
          <div className="header-actions">
            <button 
              onClick={onOpenAdmin}
              className="btn-icon"
              title="Admin Portal (Passcode: admin123)"
              style={{ background: 'var(--accent-teal-light)', color: 'var(--accent-teal-dark)' }}
            >
              <Fingerprint size={19} />
            </button>

            <button 
              onClick={onOpenSearch} 
              className="btn-icon" 
              title="Search Recruitment Updates"
              aria-label="Search posts"
            >
              <ScanSearch size={19} />
            </button>

            <button 
              onClick={onOpenBookmarks} 
              className="btn-icon" 
              style={{ position: 'relative' }} 
              title="Saved Job Posts"
              aria-label="Saved Bookmarks"
            >
              <FolderHeart size={19} />
              {bookmarkCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'var(--accent-rose)',
                  color: 'white',
                  fontSize: '0.65rem',
                  fontWeight: '800',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {bookmarkCount}
                </span>
              )}
            </button>

            <button 
              onClick={onToggleTheme} 
              className="btn-icon" 
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <SunMedium size={19} /> : <MoonStar size={19} />}
            </button>
          </div>

          {/* Mega Menu Dropdown */}
          {activeMegaMenu === 'categories' && (
            <div className="mega-dropdown-panel">
              <div className="mega-panel-header">
                <h3><Briefcase size={19} color="var(--accent-teal)" /> All Government Exam & Recruitment Sectors</h3>
                <button onClick={() => setActiveMegaMenu(null)} className="btn-icon" style={{ width: '30px', height: '30px' }}><X size={16} /></button>
              </div>

              <div className="mega-panel-grid">
                <div>
                  <div className="mega-col-title">Central & Staff Selection</div>
                  <ul className="mega-link-list">
                    <li><button onClick={() => handleSelectCategory('Latest Jobs')}>SSC CGL & CHSL Recruitment</button></li>
                    <li><button onClick={() => handleSelectCategory('Syllabus')}>UPSC Civil Services & CDS</button></li>
                    <li><button onClick={() => handleSelectCategory('Latest Jobs')}>SSC GD Constable & MTS</button></li>
                  </ul>
                </div>

                <div>
                  <div className="mega-col-title">Banking & Railway</div>
                  <ul className="mega-link-list">
                    <li><button onClick={() => handleSelectCategory('Bank Jobs')}>IBPS PO, Clerk & RRB Exams</button></li>
                    <li><button onClick={() => handleSelectCategory('Bank Jobs')}>SBI PO & Junior Associate</button></li>
                    <li><button onClick={() => handleSelectCategory('Railway Jobs')}>RRB NTPC, ALP & Group D</button></li>
                  </ul>
                </div>

                <div>
                  <div className="mega-col-title">Defence & Police</div>
                  <ul className="mega-link-list">
                    <li><button onClick={() => handleSelectCategory('Defence Jobs')}>NDA, CDS & Airforce Group X/Y</button></li>
                    <li><button onClick={() => handleSelectCategory('Police Jobs')}>State Police Constable & SI</button></li>
                    <li><button onClick={() => handleSelectCategory('Defence Jobs')}>CISF, CRPF, BSF Tradesman</button></li>
                  </ul>
                </div>

                <div>
                  <div className="mega-col-title">State & Teaching</div>
                  <ul className="mega-link-list">
                    <li><button onClick={() => handleSelectCategory('Teaching Jobs')}>CTET, UPTET & BPSC TRE</button></li>
                    <li><button onClick={() => handleSelectCategory('State Jobs')}>State PSC Exams (BPSC, MPPSC)</button></li>
                    <li><button onClick={() => handleSelectCategory('Teaching Jobs')}>DSSSB TGT & PGT Recruitment</button></li>
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>
      </header>
    </>
  );
}
