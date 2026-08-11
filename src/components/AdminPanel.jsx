import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Edit3, 
  Trash2, 
  Eye, 
  Lock, 
  LogOut, 
  Save, 
  CheckCircle2, 
  Search, 
  X
} from 'lucide-react';
import { sectionsConfig } from '../data/blogsData';

export function AdminPanel({ blogs, onAddBlog, onUpdateBlog, onDeleteBlog, onSelectBlog, onCloseAdmin }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard view tabs: 'dashboard', 'editor', 'list'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingBlogId, setEditingBlogId] = useState(null);

  // Form State for Create / Edit Blog
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    section: 'Featured Stories',
    sectionSlug: 'featured-stories',
    category: 'Latest Jobs',
    author: 'GovtRojgar Team',
    authorTitle: 'Senior Recruitment Analyst',
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    reviewedBy: 'GovtRojgar Editorial Desk',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    tags: 'Sarkari Naukri, Govt Jobs, Recruitment',
    excerpt: '',
    readTime: '15 min read (1,850+ words)',
    content: ''
  });

  const [notification, setNotification] = useState('');

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    if (adminPassword === 'admin123' || adminPassword === 'admin') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Admin Passcode! Use "admin123" to log in.');
    }
  };

  // Open Create New Blog Form
  const handleNewBlogClick = () => {
    setEditingBlogId(null);
    setFormData({
      title: '',
      subtitle: '',
      section: 'Featured Stories',
      sectionSlug: 'featured-stories',
      category: 'Breaking Health News',
      author: 'Dr. Sarah Jenkins',
      authorTitle: 'Senior Medical Writer & Molecular Biologist',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      reviewedBy: 'Dr. Marcus Vance, MD (Medical Reviewer)',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      tags: 'Health, Clinical Research, Wellness',
      excerpt: '',
      readTime: '15 min read (1,850+ words)',
      content: `<h2>Executive Clinical Overview</h2>\n<p>Write your detailed human-style clinical insights here...</p>\n\n<div className="takeaway-box">\n<div className="takeaway-title">Practical Takeaway</div>\n<p>Actionable advice for patients...</p>\n</div>`
    });
    setActiveTab('editor');
  };

  // Open Edit Blog Form
  const handleEditClick = (blog) => {
    setEditingBlogId(blog.id);
    setFormData({
      title: blog.title || '',
      subtitle: blog.subtitle || '',
      section: blog.section || 'Featured Stories',
      sectionSlug: blog.sectionSlug || 'featured-stories',
      category: blog.category || 'Health',
      author: blog.author || '',
      authorTitle: blog.authorTitle || '',
      date: blog.date || '',
      reviewedBy: blog.reviewedBy || '',
      image: blog.image || '',
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags || '',
      excerpt: blog.excerpt || '',
      readTime: blog.readTime || '15 min read',
      content: blog.content || ''
    });
    setActiveTab('editor');
  };

  // Handle Save (Create or Update)
  const handleSaveBlog = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      alert('Please fill out the Title and Article Content fields.');
      return;
    }

    const processedTags = formData.tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const generatedSlug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const blogObj = {
      id: editingBlogId || `custom-${Date.now()}`,
      slug: generatedSlug,
      section: formData.section,
      sectionSlug: formData.sectionSlug,
      category: formData.category,
      title: formData.title,
      subtitle: formData.subtitle,
      author: formData.author,
      authorTitle: formData.authorTitle,
      date: formData.date,
      reviewedBy: formData.reviewedBy,
      image: formData.image,
      tags: processedTags,
      excerpt: formData.excerpt || formData.subtitle,
      readTime: formData.readTime,
      content: formData.content
    };

    if (editingBlogId) {
      onUpdateBlog(blogObj);
      showNotification('✓ Article updated and published live!');
    } else {
      onAddBlog(blogObj);
      showNotification('✓ New Article created and published live!');
    }

    setActiveTab('list');
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3000);
  };

  // Handle Section Dropdown Selection
  const handleSectionChange = (e) => {
    const selectedSecName = e.target.value;
    const foundSec = sectionsConfig.find(s => s.name === selectedSecName);
    if (foundSec) {
      setFormData(prev => ({
        ...prev,
        section: foundSec.name,
        sectionSlug: foundSec.slug
      }));
    }
  };

  // Filtered blogs for management list
  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.section.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If Not Authenticated, Render Login Screen
  if (!isAuthenticated) {
    return (
      <div className="modal-overlay" style={{ background: 'rgba(0, 0, 0, 0.85)' }}>
        <div style={{
          width: '90%',
          maxWidth: '420px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem 2rem',
          boxShadow: 'var(--shadow-xl)',
          textAlign: 'center'
        }}>
          <div style={{ width: '64px', height: '64px', background: 'var(--accent-teal)', color: 'white', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem auto', fontSize: '1.5rem', fontWeight: 900 }}>
            GR
          </div>

          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.4rem' }}>
            Govt Rojgar CMS Admin
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.75rem' }}>
            Enter your secure admin passcode to access content management tools.
          </p>

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="bmi-field">
              <input 
                type="password" 
                placeholder="Enter Admin Passcode (admin123)..."
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                autoFocus
                style={{ textAlign: 'center', fontSize: '1.1rem', letterSpacing: '0.1em' }}
              />
            </div>

            {loginError && (
              <div style={{ color: 'var(--accent-rose)', fontSize: '0.85rem', fontWeight: 600 }}>
                {loginError}
              </div>
            )}

            <button 
              type="submit"
              style={{
                padding: '0.8rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-teal)',
                color: 'white',
                fontWeight: 800,
                fontSize: '0.95rem',
                marginTop: '0.5rem'
              }}
            >
              Log In to Dashboard →
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <button onClick={onCloseAdmin} style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              ← Return to Main Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', paddingBottom: '5rem' }}>
      
      {/* Top Admin Header Bar */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 90
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--text-primary)' }}>GOVT ROJGAR <span style={{ color: 'var(--accent-teal)' }}>UPDATES</span></span>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-teal)', textTransform: 'uppercase', padding: '0.2rem 0.6rem', background: 'var(--accent-teal-light)', borderRadius: '4px' }}>
              CMS ADMIN PORTAL
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button 
              onClick={handleNewBlogClick}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--accent-teal)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <PlusCircle size={16} /> Create New Article
            </button>

            <button 
              onClick={() => setIsAuthenticated(false)}
              className="btn-icon"
              title="Log Out"
            >
              <LogOut size={18} />
            </button>

            <button 
              onClick={onCloseAdmin}
              className="btn-icon"
              title="Close Admin Panel"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Admin Body */}
      <div className="container" style={{ paddingTop: '2rem' }}>
        
        {/* Toast Notification */}
        {notification && (
          <div style={{
            padding: '0.9rem 1.25rem',
            background: 'var(--accent-emerald)',
            color: 'white',
            borderRadius: 'var(--radius-md)',
            fontWeight: 700,
            fontSize: '0.95rem',
            marginBottom: '1.5rem',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <CheckCircle2 size={20} /> {notification}
          </div>
        )}

        {/* Dashboard Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
          <button 
            onClick={() => setActiveTab('dashboard')}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 700,
              fontSize: '0.9rem',
              background: activeTab === 'dashboard' ? 'var(--accent-teal-light)' : 'transparent',
              color: activeTab === 'dashboard' ? 'var(--accent-teal-dark)' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <LayoutDashboard size={18} /> Overview & Analytics
          </button>

          <button 
            onClick={() => setActiveTab('list')}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 700,
              fontSize: '0.9rem',
              background: activeTab === 'list' ? 'var(--accent-teal-light)' : 'transparent',
              color: activeTab === 'list' ? 'var(--accent-teal-dark)' : 'var(--text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <FileText size={18} /> Manage Articles ({blogs.length})
          </button>

          {activeTab === 'editor' && (
            <button 
              style={{
                padding: '0.6rem 1.25rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 700,
                fontSize: '0.9rem',
                background: 'var(--accent-amber-light)',
                color: 'var(--accent-amber)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <Edit3 size={18} /> {editingBlogId ? 'Edit Article' : 'New Article Editor'}
            </button>
          )}
        </div>

        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Stat Cards Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-teal)', textTransform: 'uppercase' }}>TOTAL ARTICLES</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.2rem' }}>{blogs.length}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Published live on Healthy Spin</div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-blue)', textTransform: 'uppercase' }}>SECTIONS COVERED</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.2rem' }}>11</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Homepage content modules</div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-emerald)', textTransform: 'uppercase' }}>AVG WORD COUNT</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.2rem' }}>1,850+</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Human deep medical guides</div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-purple)', textTransform: 'uppercase' }}>ADSENSE STATUS</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-heading)', marginTop: '0.4rem', color: 'var(--accent-emerald)' }}>✓ 100% Ready</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Legal policies & slots active</div>
              </div>
            </div>

            {/* Quick Actions & Recent Articles */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.75rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>
                  Recently Added / Modified Articles
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {blogs.slice(0, 5).map(blog => (
                    <div key={blog.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem',
                      background: 'var(--bg-tertiary)',
                      borderRadius: 'var(--radius-sm)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src={blog.image} alt={blog.title} style={{ width: '48px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div>
                          <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent-teal)' }}>{blog.section}</div>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{blog.title}</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button onClick={() => handleEditClick(blog)} className="btn-icon" title="Edit">
                          <Edit3 size={16} />
                        </button>
                        <button onClick={() => { onSelectBlog(blog.slug); onCloseAdmin(); }} className="btn-icon" title="View Live">
                          <Eye size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.75rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>
                  CMS Quick Actions
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <button 
                    onClick={handleNewBlogClick}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--accent-teal)',
                      color: 'white',
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <PlusCircle size={18} /> Write & Publish New Article
                  </button>

                  <button 
                    onClick={() => setActiveTab('list')}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <FileText size={18} /> Search All 40+ Articles
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MANAGED ARTICLES LIST */}
        {activeTab === 'list' && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div className="search-input-wrap" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.5rem 1rem', width: '100%', maxWidth: '400px' }}>
                <Search size={18} color="var(--accent-teal)" />
                <input 
                  type="text" 
                  placeholder="Search articles by title, category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <button 
                onClick={handleNewBlogClick}
                style={{
                  padding: '0.66rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-teal)',
                  color: 'white',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <PlusCircle size={18} /> Add New Blog
              </button>
            </div>

            <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)' }}>
                    <th style={{ padding: '0.9rem 1rem', textAlign: 'left' }}>Article</th>
                    <th style={{ padding: '0.9rem 1rem', textAlign: 'left' }}>Section</th>
                    <th style={{ padding: '0.9rem 1rem', textAlign: 'left' }}>Author</th>
                    <th style={{ padding: '0.9rem 1rem', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBlogs.map(blog => (
                    <tr key={blog.id} style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                      <td style={{ padding: '0.8rem 1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img src={blog.image} alt={blog.title} style={{ width: '50px', height: '42px', objectFit: 'cover', borderRadius: '4px' }} />
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{blog.title}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{blog.category} • {blog.readTime}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '0.8rem 1rem', fontWeight: 600, color: 'var(--accent-teal)' }}>
                        {blog.section}
                      </td>
                      <td style={{ padding: '0.8rem 1rem', color: 'var(--text-secondary)' }}>
                        {blog.author}
                      </td>
                      <td style={{ padding: '0.8rem 1rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                          <button 
                            onClick={() => handleEditClick(blog)}
                            className="btn-icon"
                            title="Edit Article"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button 
                            onClick={() => { onSelectBlog(blog.slug); onCloseAdmin(); }}
                            className="btn-icon"
                            title="View Live Article"
                          >
                            <Eye size={16} color="var(--accent-teal)" />
                          </button>
                          <button 
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete "${blog.title}"?`)) {
                                onDeleteBlog(blog.id);
                                showNotification('Article deleted!');
                              }
                            }}
                            className="btn-icon"
                            title="Delete Article"
                          >
                            <Trash2 size={16} color="var(--accent-rose)" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ARTICLE EDITOR FORM (CREATE / EDIT) */}
        {activeTab === 'editor' && (
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-xl)', padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800 }}>
                {editingBlogId ? 'Edit Article Content' : 'Write & Publish New Health Article'}
              </h2>
              <button onClick={() => setActiveTab('list')} className="btn-icon">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
                <div className="bmi-field">
                  <label>Article Main Title *</label>
                  <input 
                    type="text" 
                    placeholder="Enter catchy headline..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="bmi-field">
                  <label>Homepage Section *</label>
                  <select value={formData.section} onChange={handleSectionChange}>
                    {sectionsConfig.map(sec => (
                      <option key={sec.slug} value={sec.name}>{sec.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bmi-field">
                <label>Article Subtitle / Teaser *</label>
                <input 
                  type="text" 
                  placeholder="Enter detailed subtitle explaining key clinical takeaways..."
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
                <div className="bmi-field">
                  <label>Category Tag</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Heart Health, FDA Approvals"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>

                <div className="bmi-field">
                  <label>Author Name</label>
                  <input 
                    type="text" 
                    placeholder="Dr. Sarah Jenkins"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  />
                </div>

                <div className="bmi-field">
                  <label>Medical Reviewer</label>
                  <input 
                    type="text" 
                    placeholder="Dr. Marcus Vance, MD"
                    value={formData.reviewedBy}
                    onChange={(e) => setFormData({ ...formData, reviewedBy: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.25rem' }}>
                <div className="bmi-field">
                  <label>Hero Image URL</label>
                  <input 
                    type="text" 
                    placeholder="https://images.unsplash.com/... or /assets/images/..."
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                </div>

                <div className="bmi-field">
                  <label>Read Time Display</label>
                  <input 
                    type="text" 
                    placeholder="15 min read (1,850+ words)"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  />
                </div>
              </div>

              <div className="bmi-field">
                <label>Article HTML Content *</label>
                <textarea 
                  rows="16"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your detailed article HTML here using <h2>, <h3>, <p>, <ul>, <table>, <div class='takeaway-box'>..."
                  required
                  style={{ fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.5 }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                <button 
                  type="button" 
                  onClick={() => setActiveTab('list')}
                  style={{
                    padding: '0.8rem 1.5rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    fontWeight: 700
                  }}
                >
                  Cancel
                </button>

                <button 
                  type="submit"
                  style={{
                    padding: '0.8rem 2rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--accent-teal)',
                    color: 'white',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <Save size={18} /> {editingBlogId ? 'Update & Publish Live' : 'Publish Article Live'}
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
