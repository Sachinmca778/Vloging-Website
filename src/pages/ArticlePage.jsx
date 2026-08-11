import React, { useEffect, useState } from 'react';
import { getBlogBySlug, allBlogs } from '../data/blogsData';
import { ArrowLeft, Bookmark, Share2, Clock, Calendar, User, Check, ThumbsUp, ThumbsDown, Activity, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { CommentsSection } from '../components/CommentsSection';
import { AdSenseSlot } from '../components/AdSenseSlot';

export function ArticlePage({ slug, onBack, onSelectBlog, onToggleBookmark, bookmarkedSlugs, onNavigateSection }) {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [feedbackGiven, setFeedbackGiven] = useState(null); // 'yes' or 'no'

  const blog = getBlogBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    setFeedbackGiven(null);
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  if (!blog) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Article Not Found</h2>
        <button onClick={onBack} style={{ marginTop: '1rem', color: 'var(--accent-teal)' }}>
          ← Return to Homepage
        </button>
      </div>
    );
  }

  const isBookmarked = bookmarkedSlugs.includes(blog.slug);

  // Related articles matching MNT bottom section layout
  const relatedBlogs = allBlogs
    .filter(b => b.slug !== blog.slug)
    .slice(0, 5);

  const mainRelated = relatedBlogs[0];
  const sideRelated = relatedBlogs.slice(1, 5);

  // Popular sidebar articles
  const popularSidebar = allBlogs.slice(10, 14);

  const handleShareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt || blog.title,
          url: window.location.href,
        });
        return;
      } catch (err) {
        // Fallback to clipboard if share sheet dismissed or rejected
      }
    }
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cleanExcerpt = blog.excerpt || blog.content.replace(/<[^>]+>/g, ' ').slice(0, 160).trim() + '...';
  const articleUrl = `https://govtrojgarupdates.in/article/${blog.slug}`;

  // Dynamic Reading Time Precision (Item 4)
  const plainText = blog ? blog.content.replace(/<[^>]+>/g, ' ') : '';
  const wordCount = plainText.trim().split(/\s+/).length;
  const exactReadTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  // Parse Table of Contents H2 headings (Item 2)
  const tocHeadings = [];
  let processedContent = blog ? blog.content : '';

  if (blog) {
    let index = 0;
    processedContent = blog.content.replace(/<h2>(.*?)<\/h2>/gi, (match, title) => {
      const id = `toc-heading-${index}`;
      tocHeadings.push({ id, title: title.replace(/<[^>]+>/g, '') });
      index++;
      return `<h2 id="${id}">${title}</h2>`;
    });
  }

  return (
    <div>
      <SEOHead
        title={blog.title}
        description={cleanExcerpt}
        image={blog.image}
        urlPath={`/article/${blog.slug}`}
        type="article"
        author={blog.author}
        datePublished={blog.date}
        keywords={`${(blog.category || '').toLowerCase()}, sarkari naukri, govt job, recruitment 2024, exam syllabus, admit card`}
      />

      {/* Top Scroll Reading Progress Indicator */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '4px',
          background: 'linear-gradient(90deg, var(--accent-teal), var(--accent-blue))',
          zIndex: 1000,
          transition: 'width 0.1s linear'
        }}
      />

      <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '5rem' }}>
        
        {/* Top Reserved Google AdSense Leaderboard Slot */}
        <AdSenseSlot slotId="7289012345" label="SPONSORED ADVERTISEMENT" />

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
            marginTop: '0.5rem',
            textDecoration: 'none'
          }}
        >
          <ArrowLeft size={16} /> Back to {blog.section || blog.category || 'Home'}
        </a>

        {/* Main Two-Column Article Grid */}
        <div className="article-layout-grid">
          
          {/* LEFT MAIN ARTICLE COLUMN */}
          <article className="article-main-col">
            
            {/* Header Title & Subtitle */}
            <header className="article-header">
              <span className="article-category">
                {blog.section ? `${blog.section} • ` : ''}{blog.category || ''}
              </span>
              <h1 className="article-main-title">
                {blog.title}
              </h1>
              <p className="article-subtitle">
                {blog.subtitle}
              </p>

              {/* Author & Fact-Check Metadata Bar */}
              <div className="article-meta-bar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <User size={15} />
                  <span>By <strong>GovtRojgar Editorial Team</strong></span>
                </div>
                <span>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Calendar size={14} /> {blog.date}
                </div>
                <span>•</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Clock size={14} /> {exactReadTime}
                </div>


              </div>
            </header>

            {/* Main Hero Image */}
            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '0.75rem', boxShadow: 'var(--shadow-sm)' }}>
              <img src={blog.image || blog.imageUrl} alt={`${blog.title} - Medical Research Analysis & Clinical Evidence`} style={{ width: '100%', maxHeight: '450px', objectFit: 'cover' }} />
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '1.75rem' }}>
              Image source: Govt Rojgar Updates Official Recruitment Archive. Verified for applicant guidance.
            </div>

            {/* Medical News Today (MNT) Style Key Takeaways Box */}
            <div className="mnt-takeaways-box">
              <div className="mnt-takeaways-title">
                <Sparkles size={18} color="var(--accent-teal)" /> KEY RECRUITMENT HIGHLIGHTS AT A GLANCE
              </div>
              <ul className="mnt-takeaways-list">
                <li>
                  <strong>Official Notification:</strong> Verified recruitment updates for {(blog.category || 'Government Jobs')} with complete eligibility breakdown.
                </li>
                <li>
                  <strong>Selection Scheme:</strong> Stage-wise computer-based examination (CBT), physical standard test, and document verification.
                </li>
                <li>
                  <strong>Applicant Action:</strong> Candidates must complete online registration on the official commission portal before the cutoff date.
                </li>
              </ul>
            </div>

            {/* Social Share & Bookmark Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              marginBottom: '2rem'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                Share this recruitment guide or save for quick reference:
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <a 
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(blog.title + ' - ' + articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-icon"
                  style={{ textDecoration: 'none', width: 'auto', padding: '0 0.7rem', borderRadius: 'var(--radius-sm)', gap: '0.3rem', fontSize: '0.82rem', fontWeight: 600, background: '#25D366', color: '#fff' }}
                >
                  WhatsApp
                </a>
                <a 
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-icon"
                  style={{ textDecoration: 'none', width: 'auto', padding: '0 0.7rem', borderRadius: 'var(--radius-sm)', gap: '0.3rem', fontSize: '0.82rem', fontWeight: 600, background: '#000', color: '#fff' }}
                >
                  X (Twitter)
                </a>
                <button 
                  onClick={handleShareLink} 
                  className="btn-icon"
                  style={{ width: 'auto', padding: '0 0.7rem', borderRadius: 'var(--radius-sm)', gap: '0.3rem', fontSize: '0.82rem', fontWeight: 600 }}
                >
                  {copied ? <Check size={15} color="var(--accent-emerald)" /> : <Share2 size={15} />}
                  {copied ? 'Copied' : 'Link'}
                </button>
                <button 
                  onClick={() => onToggleBookmark(blog.slug)}
                  className="btn-icon"
                  style={{
                    width: 'auto',
                    padding: '0 0.7rem',
                    borderRadius: 'var(--radius-sm)',
                    gap: '0.3rem',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    background: isBookmarked ? 'var(--accent-rose-light)' : 'var(--bg-tertiary)',
                    color: isBookmarked ? 'var(--accent-rose)' : 'var(--text-primary)'
                  }}
                >
                  <Bookmark size={15} fill={isBookmarked ? 'currentColor' : 'none'} />
                  {isBookmarked ? 'Saved' : 'Save'}
                </button>
              </div>
            </div>

            {/* Table of Contents (TOC) Box (Pro Polish Point 2) */}
            {tocHeadings.length > 0 && (
              <div style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem 1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sparkles size={15} color="var(--accent-teal)" /> In This Article (Table of Contents)
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {tocHeadings.map((h, i) => (
                    <li key={h.id} style={{ fontSize: '0.88rem', fontWeight: 600 }}>
                      <a 
                        href={`#${h.id}`} 
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(h.id);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        style={{ color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      >
                        <span style={{ color: 'var(--accent-teal)', fontSize: '0.78rem', fontWeight: 800 }}>0{i + 1}.</span>
                        <span>{h.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Content Text Body */}
            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: processedContent }}
            />

            {/* Article Tags (Item 13) */}
            <div style={{ marginTop: '2.5rem', marginBottom: '2.5rem', paddingTop: '1.5rem', borderTop: '1px dashed var(--border-color)' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                EXPLORE RELATED TOPICS
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {[blog.category, blog.section, 'Sarkari Naukri', 'Govt Jobs 2024', 'Exam Syllabus'].filter(Boolean).map((tag, idx) => (
                  <button 
                    key={idx}
                    onClick={() => onNavigateSection && onNavigateSection(blog.sectionSlug || 'featured-stories')}
                    style={{
                      padding: '0.35rem 0.85rem',
                      borderRadius: '999px',
                      background: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    #{tag.replace(/\s+/g, '')}
                  </button>
                ))}
              </div>
            </div>

            {/* In-Article Newsletter Retention Box (Item 7) */}
            <div style={{
              background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
              border: '1px solid var(--border-color)',
              borderLeft: '4px solid var(--accent-teal)',
              borderRadius: 'var(--radius-md)',
              padding: '1.5rem',
              marginBottom: '2.5rem'
            }}>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.4rem' }}>
                Never miss an official Government Job alert
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                Get daily Government Job notifications, admit card updates, and preparation guides delivered to your inbox — free and verified.
              </p>
              <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to GovtRojgar alerts!'); }} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <input 
                  type="email" 
                  placeholder="Enter your email..." 
                  required 
                  style={{
                    flexGrow: 1,
                    padding: '0.65rem 0.9rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.88rem'
                  }}
                />
                <button type="submit" className="btn-primary" style={{ padding: '0.65rem 1.25rem', borderRadius: 'var(--radius-sm)', fontWeight: 700, fontSize: '0.88rem' }}>
                  Subscribe
                </button>
              </form>
            </div>

            {/* Mid-Article Reserved Google AdSense Slot */}
            <AdSenseSlot slotId="3344556677" label="ADVERTISEMENT" />

            {/* "Was this article helpful?" Feedback Box */}
            <div className="helpful-widget">
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 800 }}>
                Was this recruitment guide helpful?
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                Your feedback helps us maintain the accuracy of our official job notifications.
              </p>

              {feedbackGiven ? (
                <div style={{ marginTop: '0.75rem', fontWeight: 700, color: 'var(--accent-emerald)', fontSize: '0.9rem' }}>
                  ✓ Thank you for your feedback!
                </div>
              ) : (
                <div className="helpful-buttons">
                  <button onClick={() => setFeedbackGiven('yes')} className="helpful-btn">
                    <ThumbsUp size={16} color="var(--accent-emerald)" /> Yes
                  </button>
                  <button onClick={() => setFeedbackGiven('no')} className="helpful-btn">
                    <ThumbsDown size={16} color="var(--accent-rose)" /> Needs improvement
                  </button>
                </div>
              )}
            </div>

            {/* Author Biography Box (Basic & Minimal Editorial Style) */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderLeft: '4px solid var(--text-primary)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              gap: '1.25rem',
              alignItems: 'center',
              marginBottom: '3rem'
            }}>
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                fontWeight: 700,
                flexShrink: 0
              }}>
                GR
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  WRITTEN BY
                </div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 800, margin: '0.15rem 0 0.3rem 0', color: 'var(--text-primary)' }}>
                  GovtRojgar Editorial Team
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                  Our editorial team covers government job notifications, exam patterns, recruitment guides, and eligibility criteria sourced from official commission portals.
                </p>
              </div>
            </div>

            {/* Reader Comments & Peer Discussion Section (Item 15) */}
            <CommentsSection articleSlug={blog.slug} />

            {/* Bottom Reserved Google AdSense Slot */}
            <AdSenseSlot slotId="8899001122" label="RECOMMENDED ADVERTISEMENT" />

            {/* Medical News Today (MNT) Style Bottom Related News Grid */}
            <div>
              <h3 className="mnt-related-header">
                READ THIS NEXT
              </h3>
              <div className="mnt-related-grid">
                
                {/* Left Primary Related Card */}
                {mainRelated && (
                  <a 
                    href={`/article/${mainRelated.slug}`}
                    onClick={(e) => { e.preventDefault(); onSelectBlog(mainRelated.slug); }}
                    style={{
                      background: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      color: 'inherit',
                      display: 'block'
                    }}
                  >
                    <img src={mainRelated.image} alt={mainRelated.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                    <div style={{ padding: '1.25rem' }}>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-teal)', textTransform: 'uppercase' }}>
                        {mainRelated.category}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, margin: '0.4rem 0 0.6rem 0', lineHeight: 1.3 }}>
                        {mainRelated.title}
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {mainRelated.excerpt}
                      </p>
                    </div>
                  </a>
                )}

                {/* Right 4 Mini Stacked Related Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {sideRelated.map(rel => (
                    <a 
                      key={rel.id}
                      href={`/article/${rel.slug}`}
                      onClick={(e) => { e.preventDefault(); onSelectBlog(rel.slug); }}
                      style={{
                        display: 'flex',
                        gap: '0.8rem',
                        padding: '0.6rem',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        textDecoration: 'none',
                        color: 'inherit'
                      }}
                    >
                      <img src={rel.image} alt={rel.title} style={{ width: '80px', height: '65px', borderRadius: '4px', objectFit: 'cover', flexShrink: 0 }} />
                      <div>
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--accent-teal)', textTransform: 'uppercase' }}>
                          {rel.category}
                        </span>
                        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.88rem', fontWeight: 700, lineHeight: 1.3, marginTop: '0.1rem' }}>
                          {rel.title}
                        </h4>
                      </div>
                    </a>
                  ))}
                </div>

              </div>
            </div>

          </article>

          {/* RIGHT STICKY ADVERTISING & TRENDING SIDEBAR */}
          <aside className="article-sidebar" style={{ position: 'sticky', top: '90px' }}>
            
            {/* Sidebar Ad Unit 1: Reserved 300x250 Medium Rectangle */}
            <div className="adsense-slot-container adsense-slot-sidebar-rect">
              <div className="adsense-slot-label">
                <span>ADVERTISEMENT</span> • <span>GOOGLE ADSENSE SLOT (300x250)</span>
              </div>
              <div className="adsense-slot-notice">
                [Insert Google AdSense Sidebar Rectangle Code Here]
              </div>
            </div>

            {/* Sidebar Trending & Popular Articles Widget */}
            <div style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginBottom: '1.5rem'
            }}>
              <h4 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.05rem',
                fontWeight: 800,
                paddingBottom: '0.5rem',
                borderBottom: '2px solid var(--accent-teal)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <Activity size={18} color="var(--accent-teal)" /> Trending Job Guides
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {popularSidebar.map((pop, idx) => (
                  <div 
                    key={pop.id}
                    onClick={() => onSelectBlog(pop.slug)}
                    style={{
                      display: 'flex',
                      gap: '0.75rem',
                      cursor: 'pointer',
                      alignItems: 'flex-start'
                    }}
                  >
                    <span style={{
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      color: 'var(--accent-teal)',
                      width: '20px',
                      flexShrink: 0
                    }}>
                      {idx + 1}.
                    </span>
                    <div>
                      <h5 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.88rem', fontWeight: 700, lineHeight: 1.35, color: 'var(--text-primary)' }}>
                        {pop.title}
                      </h5>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {pop.readTime}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Ad Unit 2: Reserved 300x600 Half Page Display Banner */}
            <div className="adsense-slot-container adsense-slot-sidebar-halfpage">
              <div className="adsense-slot-label">
                <span>ADVERTISEMENT</span> • <span>GOOGLE ADSENSE SLOT (300x600)</span>
              </div>
              <div className="adsense-slot-notice">
                [Insert Google AdSense Half-Page Display Code Here]
              </div>
            </div>

          </aside>

        </div>

      </div>
    </div>
  );
}
