import React, { useState } from 'react';
import { ArrowLeft, Search, AlertCircle, Home, Sparkles } from 'lucide-react';
import { allBlogs } from '../data/blogsData';
import { SEOHead } from '../components/SEOHead';

export function NotFoundPage({ onNavigateHome, onSelectBlog }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = searchQuery.trim() 
    ? allBlogs.filter(b => 
        (b.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
        (b.category || '').toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : allBlogs.slice(0, 4);

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '6rem', maxWidth: '850px' }}>
      <SEOHead 
        title="404 Page Not Found" 
        description="The article or page you were looking for could not be found on Govt Rojgar Updates." 
        urlPath="/404" 
      />

      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
        <div style={{ 
          width: '72px', 
          height: '72px', 
          borderRadius: '50%', 
          background: 'var(--accent-rose-light)', 
          color: 'var(--accent-rose)', 
          display: 'inline-flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginBottom: '1.25rem' 
        }}>
          <AlertCircle size={36} />
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 900, marginBottom: '0.75rem' }}>
          404 — Page Not Found
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto 2rem auto' }}>
          The article or link you followed may have moved or no longer exists. Use the search bar below or explore our recruitment guides.
        </p>

        {/* 404 Inline Search Bar */}
        <div style={{ maxWidth: '480px', margin: '0 auto 1.5rem auto', position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search 30+ recruitment guides & syllabus..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.85rem 1rem 0.85rem 2.8rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              fontSize: '0.95rem'
            }}
          />
        </div>

        <a 
          href="/"
          onClick={(e) => { e.preventDefault(); onNavigateHome(); }}
          className="btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)', fontWeight: 700, textDecoration: 'none' }}
        >
          <Home size={16} /> Return to Homepage
        </a>
      </div>

      {/* Recommended Articles Grid on 404 Page */}
      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Sparkles size={16} color="var(--accent-teal)" /> Recommended Recruitment Guides
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {filteredBlogs.map(blog => (
            <a 
              key={blog.id} 
              href={`/article/${blog.slug}`}
              onClick={(e) => { e.preventDefault(); onSelectBlog(blog.slug); }}
              className="card"
              style={{ cursor: 'pointer', padding: '1rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', textDecoration: 'none', color: 'inherit' }}
            >
              <span className="card-badge" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>{blog.category}</span>
              <h4 style={{ fontSize: '0.98rem', fontWeight: 800, lineHeight: 1.35, marginBottom: '0.4rem' }}>{blog.title}</h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {blog.excerpt}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
