import React, { useEffect } from 'react';

export function AdSenseSlot({ 
  slotId = "1234567890", 
  format = "auto", 
  responsive = true,
  label = "ADVERTISEMENT",
  style = {} 
}) {
  useEffect(() => {
    try {
      if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      // AdSense fails gracefully if ad blocker is active or script not loaded
    }
  }, []);

  return (
    <div className="adsense-slot-container" style={{ margin: '2rem 0', ...style }}>
      <div className="adsense-slot-label">
        <span>{label}</span> • <span>GOOGLE ADSENSE AD UNIT</span>
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textDecoration: 'none' }}
        data-ad-client="ca-pub-YOUR-PUB-ID"
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
