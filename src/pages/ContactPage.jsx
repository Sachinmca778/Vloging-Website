import React, { useState } from 'react';
import { ArrowLeft, Mail, MessageSquare, Send, CheckCircle2, ShieldCheck, Clock, MapPin } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export function ContactPage({ onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Feedback',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
    }
  };

  return (
    <div style={{ paddingTop: '2rem', paddingBottom: '5rem' }}>
      <SEOHead 
        title="Contact Editorial Desk"
        description="Get in touch with the Govt Rojgar Updates editorial team, submit recruitment inquiries, or provide feedback."
        urlPath="/contact"
      />
      <div className="container-narrow">
        
        {/* Back Link */}
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
            marginBottom: '1.5rem',
            textDecoration: 'none'
          }}
        >
          <ArrowLeft size={16} /> Return to Homepage
        </a>

        {/* Page Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-teal)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            EDITORIAL & SUPPORT DESK
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: 800, margin: '0.3rem 0 0.75rem 0', lineHeight: 1.25 }}>
            Contact Govt Rojgar Updates Team
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Have a question about our recruitment guides, exam patterns, editorial standards, or notification updates? Reach out directly to our editorial team below.
          </p>
        </div>

        {/* Success Alert */}
        {submitted ? (
          <div style={{
            background: 'var(--accent-emerald-light)',
            border: '1px solid var(--accent-emerald)',
            borderRadius: 'var(--radius-lg)',
            padding: '2.5rem',
            textAlign: 'center',
            color: 'var(--accent-teal-dark)',
            margin: '2rem 0'
          }}>
            <CheckCircle2 size={48} color="var(--accent-emerald)" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Message Received!
            </h3>
            <p style={{ fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.5 }}>
              Thank you for reaching out to Govt Rojgar Updates. Our editorial team responds to all legitimate inquiries within 24 to 48 business hours.
            </p>
            <button 
              onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: 'General Feedback', message: '' }); }}
              style={{
                marginTop: '1.5rem',
                padding: '0.6rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--accent-teal)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.88rem'
              }}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
            
            {/* Contact Form */}
            <form onSubmit={handleSubmit} style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Send Us a Direct Message
              </h3>

              <div className="bmi-field">
                <label>Your Full Name *</label>
                <input 
                  type="text" 
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="bmi-field">
                <label>Email Address *</label>
                <input 
                  type="email" 
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="bmi-field">
                <label>Subject / Topic</label>
                <select 
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                >
                  <option value="General Feedback">General Reader Feedback</option>
                  <option value="Editorial Correction">Editorial Correction / Exam Pattern Update</option>
                  <option value="AdSense Inquiry">Advertising & Sponsorship</option>
                  <option value="Press & Media">Press & Media Inquiries</option>
                </select>
              </div>

              <div className="bmi-field">
                <label>Your Message *</label>
                <textarea 
                  rows="5"
                  placeholder="Write your message or feedback here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    lineHeight: 1.5
                  }}
                />
              </div>

              <button 
                type="submit"
                style={{
                  padding: '0.85rem 1.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-teal)',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '0.95rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  marginTop: '0.5rem'
                }}
              >
                <Send size={16} /> Send Message to Editorial Board
              </button>
            </form>

            {/* Sidebar Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
                  <Mail size={20} color="var(--accent-teal)" />
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800 }}>
                    Direct Emails
                  </h4>
                </div>
                <div style={{ fontSize: '0.88rem', lineHeight: 1.6 }}>
                  <div><strong>Editorial Board:</strong></div>
                  <div style={{ color: 'var(--text-muted)' }}>editor@govtrojgarupdates.in</div>
                  
                  <div style={{ marginTop: '0.6rem' }}><strong>Privacy & Compliance:</strong></div>
                  <div style={{ color: 'var(--text-muted)' }}>privacy@govtrojgarupdates.in</div>
                </div>
              </div>

              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
                  <Clock size={20} color="var(--accent-teal)" />
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800 }}>
                    Response Guarantee
                  </h4>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  We review reader feedback daily and respond to all recruitment updates and policy inquiries within 24 to 48 business hours.
                </p>
              </div>

              <div style={{
                background: 'var(--accent-teal-light)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                color: 'var(--accent-teal-dark)',
                fontSize: '0.82rem',
                lineHeight: 1.5
              }}>
                <ShieldCheck size={18} style={{ marginBottom: '0.3rem' }} />
                <strong>AdSense Policy Guarantee:</strong> Govt Rojgar Updates maintains strict compliance with Google AdSense Publisher Policies. All articles are original, fact-checked against official recruitment notifications, and free from misleading claims.
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
