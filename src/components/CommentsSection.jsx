import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, Send, CheckCircle2, User } from 'lucide-react';

export function CommentsSection({ articleSlug }) {
  const [comments, setComments] = useState(() => {
    try {
      const saved = localStorage.getItem(`comments_${articleSlug}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Clean out any legacy test comments (Michael Sterling / Priya Sharma)
        const clean = parsed.filter(c => c.author !== 'Dr. Michael Sterling, MD' && c.author !== 'Priya Sharma' && c.id !== 1 && c.id !== 2);
        if (clean.length !== parsed.length) {
          localStorage.setItem(`comments_${articleSlug}`, JSON.stringify(clean));
        }
        return clean;
      }
    } catch {}
    
    // Start with empty array — real readers post real comments
    return [];
  });

  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(`comments_${articleSlug}`, JSON.stringify(comments));
    } catch {}
  }, [comments, articleSlug]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      author: name.trim(),
      role: role.trim() || 'Reader',
      text: commentText.trim(),
      date: 'Just now',
      likes: 0,
      isVerified: false
    };

    setComments(prev => [newComment, ...prev]);
    setName('');
    setRole('');
    setCommentText('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleLike = (id) => {
    setComments(prev => prev.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c));
  };

  return (
    <div style={{ marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid var(--border-color)' }}>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MessageSquare size={20} color="var(--accent-teal)" /> Reader Discussion & Peer Comments ({comments.length})
      </h3>

      {/* New Comment Submission Form */}
      <form onSubmit={handleSubmit} style={{ background: 'var(--bg-secondary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <input 
            type="text" 
            placeholder="Your Name (Required)" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            style={{ padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.88rem' }}
          />
          <input 
            type="text" 
            placeholder="Role / Title (e.g. Nurse, Reader, Scientist)" 
            value={role} 
            onChange={(e) => setRole(e.target.value)} 
            style={{ padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.88rem' }}
          />
        </div>
        <textarea 
          rows={3} 
          placeholder="Share your clinical feedback or reader perspective..." 
          value={commentText} 
          onChange={(e) => setCommentText(e.target.value)} 
          required 
          style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)', fontSize: '0.88rem', resize: 'vertical', marginBottom: '0.75rem' }}
        />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Comments are moderated according to our Editorial Policy.
          </span>
          <button type="submit" className="btn-primary" style={{ padding: '0.55rem 1.25rem', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Send size={14} /> Post Comment
          </button>
        </div>
        {submitted && (
          <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <CheckCircle2 size={15} /> Your comment has been posted successfully!
          </div>
        )}
      </form>

      {/* List of Comments */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {comments.length === 0 ? (
          <div style={{ padding: '1.5rem', textAlign: 'center', background: 'var(--bg-secondary)', border: '1px dashed var(--border-color)', borderRadius: 'var(--radius-md)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            No reader comments yet. Be the first to share your perspective or medical insights above!
          </div>
        ) : (
          comments.map(c => (
            <div key={c.id} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {c.author.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      {c.author} {c.isVerified && <CheckCircle2 size={14} color="var(--accent-teal)" />}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{c.role} • {c.date}</div>
                  </div>
                </div>
                <button 
                  onClick={() => handleLike(c.id)} 
                  className="btn-icon" 
                  style={{ width: 'auto', padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-sm)', gap: '0.3rem', fontSize: '0.78rem', fontWeight: 600 }}
                >
                  <ThumbsUp size={13} /> {c.likes}
                </button>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {c.text}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
