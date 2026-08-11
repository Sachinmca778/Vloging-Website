import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { allBlogs } from '../data/blogsData';

export function BookmarksDrawer({ isOpen, onClose, bookmarkedSlugs, onRemoveBookmark, onSelectBlog }) {
  if (!isOpen) return null;

  const bookmarkedBlogs = allBlogs.filter(b => bookmarkedSlugs.includes(b.slug));

  return (
    <div className="modal-overlay" onClick={onClose} style={{ justifyContent: 'flex-end', paddingTop: 0 }}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '420px',
          height: '100vh',
          background: 'var(--bg-secondary)',
          borderLeft: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-xl)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 800, fontSize: '1.1rem' }}>
            <Bookmark size={20} color="var(--accent-teal)" /> Saved Bookmarks ({bookmarkedBlogs.length})
          </div>
          <button onClick={onClose} className="btn-icon" aria-label="Close bookmarks">
            <X size={18} />
          </button>
        </div>

        <div style={{ padding: '1.5rem', flexGrow: 1, overflowY: 'auto' }}>
          {bookmarkedBlogs.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', paddingTop: '4rem' }}>
              <Bookmark size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
              <p style={{ fontWeight: 600 }}>No saved articles yet.</p>
              <p style={{ fontSize: '0.85rem', marginTop: '0.4rem' }}>
                Click the bookmark icon on any of our 30+ recruitment guides to save them here for offline reading!
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {bookmarkedBlogs.map(blog => (
                <div 
                  key={blog.id}
                  style={{
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-tertiary)',
                    position: 'relative'
                  }}
                >
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-teal)', marginBottom: '0.3rem' }}>
                    {blog.category}
                  </div>
                  <h4>
                    <a 
                      href={`/article/${blog.slug}`}
                      onClick={(e) => { e.preventDefault(); onSelectBlog(blog.slug); onClose(); }}
                      style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.98rem', fontWeight: 700, lineHeight: 1.35, display: 'block', marginBottom: '0.5rem' }}
                    >
                      {blog.title}
                    </a>
                  </h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span>{blog.readTime}</span>
                    <button 
                      onClick={() => onRemoveBookmark(blog.slug)}
                      style={{ color: 'var(--accent-rose)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.8rem' }}
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
