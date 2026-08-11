import React, { useState } from 'react';
import { ShieldCheck, Video, Globe, Share2, Mail, Rss, MessageSquare, Briefcase } from 'lucide-react';
import { sectionsConfig } from '../data/blogsData';

export function Footer({ onNavigateLegal, onNavigateContact, onNavigateSection }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        {/* Newsletter Section */}
        <div className="footer-newsletter-box">
          <div style={{ maxWidth: '550px' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Subscribe to Govt Rojgar Job Alerts
            </h3>
            <p style={{ opacity: 0.9, fontSize: '0.95rem', lineHeight: 1.5 }}>
              Get daily free Sarkari Result notifications, exam dates, admit cards, and job updates delivered straight to your email.
            </p>
          </div>

          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', width: '100%', maxWidth: '400px' }}>
            {subscribed ? (
              <div style={{ background: 'rgba(255,255,255,0.15)', padding: '0.75rem 1.25rem', fontWeight: 600, width: '100%', textAlign: 'center', border: '1px solid rgba(255,255,255,0.3)' }}>
                ✓ Subscribed successfully! You will receive daily job alerts.
              </div>
            ) : (
              <>
                <input 
                  type="email" 
                  className="newsletter-input"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe Free
                </button>
              </>
            )}
          </form>
        </div>

        {/* Footer Navigation Columns */}
        <div className="footer-grid">
          <div className="footer-col" style={{ gridColumn: 'span 1' }}>
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ background: 'var(--accent-teal)', color: '#fff', padding: '0.4rem 0.6rem', borderRadius: 'var(--radius-sm)' }}>
                <Briefcase size={20} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-primary)' }}>GOVT ROJGAR UPDATES</span>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Govt Rojgar Updates is India's leading portal for authentic, fast, and verified Government Job notifications, admit cards, answer keys, exam patterns, and detailed syllabus guides.
            </p>
            
            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube Channel" className="btn-icon" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-tertiary)' }} title="YouTube">
                <Video size={16} color="var(--text-primary)" />
              </a>
              <a href="https://t.me" target="_blank" rel="noopener noreferrer" aria-label="Telegram Channel" className="btn-icon" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-tertiary)' }} title="Telegram">
                <Globe size={16} color="var(--text-primary)" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter Feed" className="btn-icon" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-tertiary)' }} title="Twitter">
                <Share2 size={16} color="var(--text-primary)" />
              </a>
              <a href="mailto:contact@govtrojgarupdates.in" aria-label="Email Contact" className="btn-icon" style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--bg-tertiary)' }} title="Contact Email">
                <Mail size={16} color="var(--text-primary)" />
              </a>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={16} /> <span>Verified Official Government Job Information Portal</span>
            </div>
          </div>

          <div className="footer-col">
            <h4>Recruitment Categories</h4>
            <ul className="footer-links">
              {sectionsConfig.slice(0, 6).map(sec => (
                <li key={sec.slug}>
                  <a href={`/#${sec.slug}`} onClick={(e) => { e.preventDefault(); onNavigateSection(sec.name); }}>
                    {sec.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Popular Sectors</h4>
            <ul className="footer-links">
              {sectionsConfig.slice(6).map(sec => (
                <li key={sec.slug}>
                  <a href={`/#${sec.slug}`} onClick={(e) => { e.preventDefault(); onNavigateSection(sec.name); }}>
                    {sec.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h4>Important Links</h4>
            <ul className="footer-links">
              <li><a href="/legal/about-us" onClick={(e) => { e.preventDefault(); onNavigateLegal('about-us'); }}>About Us</a></li>
              <li><a href="/contact" onClick={(e) => { e.preventDefault(); onNavigateContact(); }}>Contact Us</a></li>
              <li><a href="/legal/privacy-policy" onClick={(e) => { e.preventDefault(); onNavigateLegal('privacy-policy'); }}>Privacy Policy</a></li>
              <li><a href="/legal/terms-and-conditions" onClick={(e) => { e.preventDefault(); onNavigateLegal('terms-and-conditions'); }}>Terms & Conditions</a></li>
              <li><a href="/legal/disclaimer" onClick={(e) => { e.preventDefault(); onNavigateLegal('disclaimer'); }}>Disclaimer</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Strip */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Govt Rojgar Updates. All rights reserved. Information sourced from official government notifications.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="/legal/privacy-policy" onClick={(e) => { e.preventDefault(); onNavigateLegal('privacy-policy'); }}>Privacy</a>
            <a href="/legal/terms-and-conditions" onClick={(e) => { e.preventDefault(); onNavigateLegal('terms-and-conditions'); }}>Terms</a>
            <a href="/legal/disclaimer" onClick={(e) => { e.preventDefault(); onNavigateLegal('disclaimer'); }}>Disclaimer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
