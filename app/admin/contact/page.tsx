'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminContactPage() {
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);
  const heroImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/contact')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/contact', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setMessage(res.ok ? 'Contact page updated!' : 'Save failed.');
  };

  const updateField = (section: string, field: string, value: any) => {
    setData((prev: any) => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  };

  const handleArrayAdd = (section: string, field: string, newItem: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: [...(prev[section]?.[field] || []), newItem] },
    }));
  };

  const handleArrayRemove = (section: string, field: string, index: number) => {
    setData((prev: any) => {
      const arr = [...(prev[section]?.[field] || [])];
      arr.splice(index, 1);
      return { ...prev, [section]: { ...prev[section], [field]: arr } };
    });
  };

  const handleArrayItemChange = (section: string, field: string, index: number, key: string, value: any) => {
    setData((prev: any) => {
      const arr = [...(prev[section]?.[field] || [])];
      if (arr[index]) arr[index] = { ...arr[index], [key]: value };
      return { ...prev, [section]: { ...prev[section], [field]: arr } };
    });
  };

  const handleFileUpload = (callback: (url: string) => void) => {
    const file = documentInputRef.current?.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    fetch('/api/upload', { method: 'POST', body: formData })
      .then((res) => res.json())
      .then((result) => {
        if (result.url) {
          callback(result.url);
          setMessage('File uploaded!');
        }
      })
      .catch(() => setMessage('Upload failed.'));
  };

  const handleImageUpload = (callback: (url: string) => void) => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    fetch('/api/upload', { method: 'POST', body: formData })
      .then((res) => res.json())
      .then((result) => {
        if (result.url) {
          callback(result.url);
          setMessage('Image uploaded!');
        }
      })
      .catch(() => setMessage('Upload failed.'));
  };

  if (loading) return <div style={{ padding: 40 }}>Loading…</div>;
  if (!data) return <div style={{ padding: 40 }}>Error loading data.</div>;

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '12px',
    border: '1.5px solid #e5e7eb', fontSize: '14px', fontFamily: 'inherit',
  };

  const tabStyle = (tab: string) => ({
    padding: '8px 16px', borderRadius: '8px',
    border: activeTab === tab ? '2px solid var(--primary)' : '1px solid #ccc',
    background: activeTab === tab ? 'var(--primary)' : 'white',
    color: activeTab === tab ? 'white' : 'var(--text)', fontWeight: 600, cursor: 'pointer',
    marginRight: 8, marginBottom: 8,
  });

  const tabs = [
    'hero', 'contactInfo', 'form', 'map', 'whyContactUs',
    'responseCommitment', 'faq', 'gallery', 'cta', 'downloadProfile'
  ];

  return (
    <div>
      <h1 style={{ fontFamily: 'DM Serif Display', marginBottom: 24 }}>Edit Contact Page</h1>
      {message && <p style={{ color: message.includes('updated') || message.includes('uploaded') ? 'green' : 'red', marginBottom: 16 }}>{message}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: 20 }}>
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={tabStyle(tab)}>
            {tab.replace(/([A-Z])/g, ' $1').replace(/^./, (s: string) => s.toUpperCase())}
          </button>
        ))}
      </div>

      {activeTab === 'hero' && (
  <div>
    <label style={labelStyle}>Eyebrow</label>
    <input value={data.hero?.eyebrow} onChange={(e) => updateField('hero', 'eyebrow', e.target.value)} style={inputStyle} />
    <label style={labelStyle}>Title</label>
    <input value={data.hero?.title} onChange={(e) => updateField('hero', 'title', e.target.value)} style={inputStyle} />
    <label style={labelStyle}>Subtitle</label>
    <textarea value={data.hero?.subtitle} onChange={(e) => updateField('hero', 'subtitle', e.target.value)} rows={3} style={inputStyle} />

    <label style={labelStyle}>Background Image</label>
    <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
      <input
        value={data.hero?.backgroundImage}
        onChange={(e) => updateField('hero', 'backgroundImage', e.target.value)}
        style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
      />
      {/* Dedicated hidden file input for hero image */}
      <input
        type="file"
        ref={heroImageInputRef}
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          const formData = new FormData();
          formData.append('file', file);
          fetch('/api/upload', { method: 'POST', body: formData })
            .then((res) => res.json())
            .then((result) => {
              if (result.url) {
                updateField('hero', 'backgroundImage', result.url);
                setMessage('Image uploaded! Click Save to keep it.');
              }
            })
            .catch(() => setMessage('Upload failed.'));
        }}
      />
      <button
        type="button"
        onClick={() => heroImageInputRef.current?.click()}
        style={{
          border: '1.5px solid var(--primary)',
          color: 'var(--primary)',
          background: 'white',
          padding: '8px 16px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}
      >
        Upload Image
      </button>
    </div>

    {data.hero?.backgroundImage && (
      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '13px', color: 'var(--muted)' }}>
          Preview (saved on disk, but not yet live – click <strong>Save Contact Page</strong> below)
        </p>
        <img src={data.hero.backgroundImage} style={{ maxWidth: '300px', borderRadius: '8px' }} />
      </div>
    )}
  </div>
)}

      {activeTab === 'contactInfo' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.contactInfo?.eyebrow} onChange={(e) => updateField('contactInfo', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.contactInfo?.title} onChange={(e) => updateField('contactInfo', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Address</label>
          <textarea value={data.contactInfo?.address} onChange={(e) => updateField('contactInfo', 'address', e.target.value)} rows={3} style={inputStyle} />
          <label style={labelStyle}>Phone Numbers (one per line)</label>
          <textarea
            value={data.contactInfo?.phones?.join('\n')}
            onChange={(e) => updateField('contactInfo', 'phones', e.target.value.split('\n'))}
            rows={3}
            style={inputStyle}
          />
          <label style={labelStyle}>Email</label>
          <input value={data.contactInfo?.email} onChange={(e) => updateField('contactInfo', 'email', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Website</label>
          <input value={data.contactInfo?.website} onChange={(e) => updateField('contactInfo', 'website', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Working Hours (use \n for line break)</label>
          <textarea value={data.contactInfo?.workingHours} onChange={(e) => updateField('contactInfo', 'workingHours', e.target.value)} rows={4} style={inputStyle} />
          <label style={labelStyle}>Emergency Phone</label>
          <input value={data.contactInfo?.emergencyPhone} onChange={(e) => updateField('contactInfo', 'emergencyPhone', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Emergency Email</label>
          <input value={data.contactInfo?.emergencyEmail} onChange={(e) => updateField('contactInfo', 'emergencyEmail', e.target.value)} style={inputStyle} />
        </div>
      )}

      {activeTab === 'form' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.form?.eyebrow} onChange={(e) => updateField('form', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.form?.title} onChange={(e) => updateField('form', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.form?.description} onChange={(e) => updateField('form', 'description', e.target.value)} rows={3} style={inputStyle} />
          <label style={labelStyle}>Service options (one per line)</label>
          <textarea
            value={data.form?.services?.join('\n')}
            onChange={(e) => updateField('form', 'services', e.target.value.split('\n'))}
            rows={5}
            style={inputStyle}
          />
          <label style={labelStyle}>Submit button text</label>
          <input value={data.form?.submitButtonText} onChange={(e) => updateField('form', 'submitButtonText', e.target.value)} style={inputStyle} />
        </div>
      )}

      {activeTab === 'map' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.map?.eyebrow} onChange={(e) => updateField('map', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.map?.title} onChange={(e) => updateField('map', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Address</label>
          <input value={data.map?.address} onChange={(e) => updateField('map', 'address', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Google Maps Embed URL</label>
          <textarea value={data.map?.embedUrl} onChange={(e) => updateField('map', 'embedUrl', e.target.value)} rows={4} style={inputStyle} />
        </div>
      )}

      {activeTab === 'whyContactUs' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.whyContactUs?.eyebrow} onChange={(e) => updateField('whyContactUs', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.whyContactUs?.title} onChange={(e) => updateField('whyContactUs', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Items (one per line)</label>
          <textarea
            value={data.whyContactUs?.items?.join('\n')}
            onChange={(e) => updateField('whyContactUs', 'items', e.target.value.split('\n'))}
            rows={6}
            style={inputStyle}
          />
        </div>
      )}

      {activeTab === 'responseCommitment' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.responseCommitment?.eyebrow} onChange={(e) => updateField('responseCommitment', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.responseCommitment?.title} onChange={(e) => updateField('responseCommitment', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Text</label>
          <textarea value={data.responseCommitment?.text} onChange={(e) => updateField('responseCommitment', 'text', e.target.value)} rows={4} style={inputStyle} />
        </div>
      )}

      {activeTab === 'faq' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.faq?.eyebrow} onChange={(e) => updateField('faq', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.faq?.title} onChange={(e) => updateField('faq', 'title', e.target.value)} style={inputStyle} />
          <h4>Questions</h4>
          {(data.faq?.items || []).map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.question} onChange={(e) => handleArrayItemChange('faq', 'items', idx, 'question', e.target.value)} placeholder="Question" style={inputStyle} />
              <textarea value={item.answer} onChange={(e) => handleArrayItemChange('faq', 'items', idx, 'answer', e.target.value)} placeholder="Answer" rows={3} style={inputStyle} />
              <button onClick={() => handleArrayRemove('faq', 'items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('faq', 'items', { question: '', answer: '' })} className="btn-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)', background: 'white' }}>+ Add FAQ</button>
        </div>
      )}

      {activeTab === 'gallery' && (
  <div>
    <label style={labelStyle}>Eyebrow</label>
    <input value={data.gallery?.eyebrow} onChange={(e) => updateField('gallery', 'eyebrow', e.target.value)} style={inputStyle} />
    <label style={labelStyle}>Title</label>
    <input value={data.gallery?.title} onChange={(e) => updateField('gallery', 'title', e.target.value)} style={inputStyle} />
    <label style={labelStyle}>Description</label>
    <textarea value={data.gallery?.description} onChange={(e) => updateField('gallery', 'description', e.target.value)} rows={2} style={inputStyle} />

    <h4 style={{ margin: '20px 0 10px' }}>Gallery Images</h4>
    {(data.gallery?.images || []).map((img: any, idx: number) => (
      <div key={idx} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom: '16px' }}>
        {/* Image URL */}
        <label style={labelStyle}>URL</label>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
          <input
            value={img.url}
            onChange={(e) => handleArrayItemChange('gallery', 'images', idx, 'url', e.target.value)}
            placeholder="Image URL"
            style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
          />
          {/* Unique hidden file input per gallery item */}
          <input
            type="file"
            id={`contact-gallery-file-${idx}`}
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const formData = new FormData();
              formData.append('file', file);
              fetch('/api/upload', { method: 'POST', body: formData })
                .then((res) => res.json())
                .then((result) => {
                  if (result.url) {
                    handleArrayItemChange('gallery', 'images', idx, 'url', result.url);
                    setMessage('Image uploaded! Click Save to keep it.');
                  }
                })
                .catch(() => setMessage('Upload failed.'));
            }}
          />
          <button
            type="button"
            onClick={() => document.getElementById(`contact-gallery-file-${idx}`)?.click()}
            style={{
              border: '1.5px solid var(--primary)',
              color: 'var(--primary)',
              background: 'white',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
              whiteSpace: 'nowrap',
            }}
          >
            Upload
          </button>
        </div>

        {/* Preview */}
        {img.url && (
          <img
            src={img.url}
            style={{ maxWidth: '150px', borderRadius: '8px', marginBottom: '8px' }}
          />
        )}

        {/* Caption */}
        <input
          value={img.caption}
          onChange={(e) => handleArrayItemChange('gallery', 'images', idx, 'caption', e.target.value)}
          placeholder="Caption"
          style={inputStyle}
        />

        <button
          onClick={() => handleArrayRemove('gallery', 'images', idx)}
          style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Remove
        </button>
      </div>
    ))}
    <button
      onClick={() => handleArrayAdd('gallery', 'images', { url: '', caption: '' })}
      className="btn-outline"
      style={{
        marginTop: '8px',
        borderColor: 'var(--primary)',
        color: 'var(--primary)',
        background: 'white',
      }}
    >
      + Add Image
    </button>
  </div>
)}

      {activeTab === 'cta' && (
        <div>
          <label style={labelStyle}>Title</label>
          <input value={data.cta?.title} onChange={(e) => updateField('cta', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Text</label>
          <textarea value={data.cta?.text} onChange={(e) => updateField('cta', 'text', e.target.value)} rows={4} style={inputStyle} />
          <label style={labelStyle}>Button 1 Text</label>
          <input value={data.cta?.button1Text} onChange={(e) => updateField('cta', 'button1Text', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Button 2 Text</label>
          <input value={data.cta?.button2Text} onChange={(e) => updateField('cta', 'button2Text', e.target.value)} style={inputStyle} />
        </div>
      )}

      {activeTab === 'downloadProfile' && (
        <div>
          <label style={labelStyle}>Enable Download Button?</label>
          <input type="checkbox" checked={data.downloadProfile?.enabled} onChange={(e) => updateField('downloadProfile', 'enabled', e.target.checked)} />
          <label style={labelStyle}>Button Text</label>
          <input value={data.downloadProfile?.text} onChange={(e) => updateField('downloadProfile', 'text', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Company Profile File</label>
          <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
            <input value={data.downloadProfile?.file} onChange={(e) => updateField('downloadProfile', 'file', e.target.value)} placeholder="File URL" style={{ ...inputStyle, flex: 1, marginBottom: 0 }} />
            <input type="file" ref={documentInputRef} onChange={() => handleFileUpload((url) => updateField('downloadProfile', 'file', url))} style={{ display: 'none' }} />
            <button type="button" onClick={() => documentInputRef.current?.click()} className="btn-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)', background: 'white' }}>Upload File</button>
          </div>
        </div>
      )}

      <button onClick={handleSave} className="btn-primary" style={{ marginTop: 20, width: '100%', padding: 14, fontSize: 15 }}>
        Save Contact Page
      </button>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block', marginBottom: 4, fontWeight: 600, fontSize: 14, color: 'var(--text)',
};