import React, { useEffect } from 'react';
import { legalPagesData } from '../data/legalPagesData';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export function LegalPage({ pageKey, onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pageKey]);

  const page = legalPagesData[pageKey];

  if (!page) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Page Not Found</h2>
        <a href="/" onClick={(e) => { e.preventDefault(); onBack(); }} style={{ marginTop: '1rem', color: 'var(--accent-teal)', textDecoration: 'none', display: 'inline-block' }}>
          ← Return Home
        </a>
      </div>
    );
  }

  return (
    <div className="container-narrow" style={{ paddingTop: '2.5rem', paddingBottom: '5rem' }}>
      <SEOHead 
        title={page.title}
        description={`Read Govt Rojgar Updates' official ${page.title}. Learn about our standards, privacy guidelines, and user rights.`}
        urlPath={`/legal/${pageKey}`}
      />
      <a 
        href="/"
        onClick={(e) => { e.preventDefault(); onBack(); }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'var(--accent-teal)',
          fontWeight: 700,
          fontSize: '0.9rem',
          marginBottom: '2rem',
          textDecoration: 'none'
        }}
      >
        <ArrowLeft size={16} /> Back to Homepage
      </a>

      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-xl)',
        padding: '2.5rem 2rem',
        boxShadow: 'var(--shadow-md)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
          <ShieldCheck size={18} /> Google AdSense & GDPR Compliance Document
        </div>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          {page.title}
        </h1>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
          Last Updated: {page.lastUpdated} • Govt Rojgar Updates
        </div>

        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  );
}
