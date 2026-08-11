import React, { useState } from 'react';
import { Search, X, BookOpen, ArrowRight } from 'lucide-react';
import { searchBlogs } from '../data/blogsData';

export function SearchModal({ isOpen, onClose, onSelectBlog, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const results = searchBlogs(query);

  const handleQueryChange = (val) => {
    setQuery(val);
    if (val.trim()) {
      window.history.replaceState({}, '', `/?search=${encodeURIComponent(val)}`);
    } else {
      window.history.replaceState({}, '', window.location.pathname);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => { window.history.replaceState({}, '', window.location.pathname); onClose(); }}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-wrap">
          <Search size={22} color="var(--accent-teal)" />
          <input 
            type="text"
            placeholder="Search across all 30+ recruitment guides, SSC, UPSC, RRB, or IBPS..."
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            autoFocus
          />
          <button onClick={() => { window.history.replaceState({}, '', window.location.pathname); onClose(); }} className="btn-icon" aria-label="Close search">
            <X size={18} />
          </button>
        </div>

        <div className="search-results">
          {query.trim() === '' ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <BookOpen size={36} style={{ marginBottom: '0.75rem', opacity: 0.5 }} />
              <p>Type keywords like <em>"SSC CGL"</em>, <em>"UPSC"</em>, <em>"NTPC"</em>, <em>"Syllabus"</em>, or <em>"Admit Card"</em> to discover articles.</p>
            </div>
          ) : results.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No articles found matching "{query}". Try searching another recruitment topic!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', paddingBottom: '0.25rem' }}>
                FOUND {results.length} MATCHING ARTICLES
              </div>
              {results.map(blog => (
                <a 
                  key={blog.id} 
                  href={`/article/${blog.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectBlog(blog.slug);
                    onClose();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '0.8rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-tertiary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--accent-teal-light)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-tertiary)'}
                >
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    style={{ width: '60px', height: '50px', borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} 
                  />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-teal)', textTransform: 'uppercase' }}>
                      {blog.section ? `${blog.section} • ` : ''}{blog.category || ''}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.3 }}>
                      {blog.title}
                    </div>
                  </div>
                  <ArrowRight size={16} color="var(--text-muted)" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
