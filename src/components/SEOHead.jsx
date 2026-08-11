import { useEffect } from 'react';

const SITE_URL = 'https://govtrojgarupdates.in';
const SITE_NAME = 'Govt Rojgar Updates';

export function SEOHead({ 
  title, 
  description, 
  image, 
  urlPath = '', 
  type = 'website',
  author = 'GovtRojgar Editorial Team',
  datePublished,
  dateModified,
  keywords = 'govt rojgar, sarkari result, ssc cgl, upsc, rrb ntpc, ibps po, sarkari naukri, admit card, exam syllabus, bank jobs, railway jobs'
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Latest Sarkari Job Notifications, Admit Cards & Results`;
  const fullUrl = `${SITE_URL}${urlPath.startsWith('/') ? urlPath : '/' + urlPath}`;
  const metaDescription = description || "Get instant updates on Government Jobs, SSC, Railway, Banking, Defense, Police, Teaching, UPSC notifications, admit cards, exam patterns, syllabus, and results.";
  const metaImage = image && image.startsWith('http') ? image : `${SITE_URL}${image || '/favicon.svg'}`;

  useEffect(() => {
    // 1. Update Document Title
    document.title = fullTitle;

    // Helper function to update or create meta tags
    const setMetaTag = (attr, attrValue, content) => {
      let element = document.querySelector(`meta[${attr}="${attrValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content || '');
    };

    // Helper function to update or create link tags
    const setLinkTag = (rel, href) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Meta Descriptions & Keywords
    setMetaTag('name', 'description', metaDescription);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'author', author);

    // 3. Canonical URL
    setLinkTag('canonical', fullUrl);

    // 4. Open Graph Tags
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', metaDescription);
    setMetaTag('property', 'og:image', metaImage);
    setMetaTag('property', 'og:url', fullUrl);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', SITE_NAME);

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:site', '@GovtRojgar');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', metaDescription);
    setMetaTag('name', 'twitter:image', metaImage);

    // 6. JSON-LD Structured Data for Google Rich Snippets
    let jsonLdScript = document.getElementById('json-ld-schema');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.id = 'json-ld-schema';
      jsonLdScript.type = 'application/ld+json';
      document.head.appendChild(jsonLdScript);
    }

    const schemaData = type === 'article' ? [
      {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        "headline": title,
        "description": metaDescription,
        "image": metaImage,
        "url": fullUrl,
        "datePublished": datePublished || "2026-08-09",
        "dateModified": dateModified || "2026-08-09",
        "author": {
          "@type": "Organization",
          "name": author,
          "url": SITE_URL
        },
        "publisher": {
          "@type": "Organization",
          "name": SITE_NAME,
          "logo": {
            "@type": "ImageObject",
            "url": `${SITE_URL}/favicon.svg`
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": fullUrl
        }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": SITE_URL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Articles",
            "item": `${SITE_URL}/#latest-jobs`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": title,
            "item": fullUrl
          }
        ]
      }
    ] : {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": SITE_NAME,
      "url": SITE_URL,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${SITE_URL}/?search={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };

    jsonLdScript.textContent = JSON.stringify(schemaData);

    // Track Pageview in Google Analytics if initialized
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: fullTitle,
        page_location: fullUrl,
        page_path: urlPath
      });
    }

  }, [fullTitle, metaDescription, metaImage, fullUrl, type, author, datePublished, dateModified, keywords, urlPath]);

  return null;
}
