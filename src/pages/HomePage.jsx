import React, { useState } from 'react';
import { sectionsConfig } from '../data/blogsData';
import { BmiCalculator } from '../components/BmiCalculator';
import { SEOHead } from '../components/SEOHead';
import { 
  Bookmark, Clock, ArrowRight, Briefcase, CreditCard, Award, BookOpen, Key, 
  MapPin, DollarSign, Train, Shield, CheckCircle, PenTool, Sparkles, TrendingUp
} from 'lucide-react';

export function HomePage({ onSelectBlog, onToggleBookmark, bookmarkedSlugs, activeSectionFilter }) {
  // Helper to render category icon
  const renderCategoryIcon = (name) => {
    switch (name) {
      case 'Latest Jobs': return <Briefcase size={16} color="var(--accent-teal)" />;
      case 'Admit Cards': return <CreditCard size={16} color="var(--accent-teal)" />;
      case 'Results': return <Award size={16} color="var(--accent-teal)" />;
      case 'Syllabus': return <BookOpen size={16} color="var(--accent-teal)" />;
      case 'Answer Keys': return <Key size={16} color="var(--accent-teal)" />;
      case 'State Jobs': return <MapPin size={16} color="var(--accent-teal)" />;
      case 'Bank Jobs': return <DollarSign size={16} color="var(--accent-teal)" />;
      case 'Railway Jobs': return <Train size={16} color="var(--accent-teal)" />;
      case 'Defence Jobs': return <Shield size={16} color="var(--accent-teal)" />;
      case 'Police Jobs': return <CheckCircle size={16} color="var(--accent-teal)" />;
      case 'Teaching Jobs': return <PenTool size={16} color="var(--accent-teal)" />;
      default: return <Sparkles size={16} color="var(--accent-teal)" />;
    }
  };

  // Render a standard article card
  const renderCard = (blog) => {
    const isBookmarked = bookmarkedSlugs.includes(blog.slug);
    return (
      <div key={blog.id} className="card">
        <a 
          href={`/article/${blog.slug}`} 
          onClick={(e) => { e.preventDefault(); onSelectBlog(blog.slug); }}
          className="card-img-wrap"
          style={{ display: 'block', textDecoration: 'none' }}
        >
          <img src={blog.image || blog.imageUrl} alt={blog.title} loading="lazy" />
          <span className="card-badge">{blog.category}</span>
        </a>
        <div className="card-content">
          <div className="card-meta">
            <span className="author-info">
              <span className="author-avatar">{blog.author.charAt(0)}</span>
              {blog.author}
            </span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Clock size={12} /> {blog.readTime}
            </span>
          </div>
          <h3 className="card-title">
            <a 
              href={`/article/${blog.slug}`}
              onClick={(e) => { e.preventDefault(); onSelectBlog(blog.slug); }}
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              {blog.title}
            </a>
          </h3>
          <p className="card-excerpt">{blog.excerpt}</p>
          <div className="card-footer">
            <a 
              href={`/article/${blog.slug}`}
              onClick={(e) => { e.preventDefault(); onSelectBlog(blog.slug); }}
              style={{ fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}
            >
              Read Full Guide <ArrowRight size={14} />
            </a>
            <button 
              onClick={() => onToggleBookmark(blog.slug)} 
              title={isBookmarked ? "Remove Bookmark" : "Save Article"}
              style={{ color: isBookmarked ? 'var(--accent-teal)' : 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const filteredSections = activeSectionFilter
    ? sectionsConfig.filter(sec => sec.name.toLowerCase() === activeSectionFilter.toLowerCase() || sec.slug.toLowerCase() === activeSectionFilter.toLowerCase())
    : sectionsConfig;

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <SEOHead 
        title="Latest Sarkari Job Notifications, Admit Cards & Exam Results"
        description="Get instant updates on Government Jobs, SSC, Railway, Banking, Defense, Police, Teaching, UPSC notifications, admit cards, exam patterns, syllabus, and results."
        urlPath="/"
        type="website"
      />

      {/* Hero Header Section */}
      <div style={{ marginBottom: '2.5rem', background: 'var(--bg-secondary)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 800, color: 'var(--accent-teal)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          <TrendingUp size={18} /> Official Government Recruitment & Sarkari Result Portal
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.75rem', lineHeight: 1.2 }}>
          Government Job Updates, Exam Patterns & Recruitment Guides
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '800px', lineHeight: 1.6 }}>
          Explore 30+ comprehensive, 1,500 to 1,800 word guides covering SSC CGL, UPSC Civil Services, RRB NTPC, IBPS PO, SBI Clerk, State Police, Defence, and Teaching exams across India.
        </p>
      </div>

      {/* Dynamically Render Category Sections */}
      {filteredSections.map(sec => {
        if (!sec.items || sec.items.length === 0) return null;
        return (
          <section className="section" id={sec.slug} key={sec.slug} style={{ marginBottom: '3.5rem' }}>
            <div className="section-header">
              <div>
                <span className="section-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  {renderCategoryIcon(sec.name)} {sec.name}
                </span>
                <h2 className="section-title" style={{ marginTop: '0.4rem' }}>
                  {sec.name} Notifications & Exam Guides
                </h2>
                <p className="section-subtitle">
                  {sec.subtitle}
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {sec.items.map(renderCard)}
            </div>
          </section>
        );
      })}

      {/* Age & Eligibility Calculator Tool */}
      <section className="section" style={{ marginTop: '2rem' }}>
        <BmiCalculator />
      </section>
    </div>
  );
}
