'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminActivitiesPage() {
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const heroImageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/activities')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/activities', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setMessage(res.ok ? 'Activities page updated!' : 'Save failed.');
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
    'hero', 'intro', 'coreActivities', 'process', 'sectors', 'equipment',
    'principles', 'gallery', 'impact', 'callToAction',
  ];

  return (
    <div>
      <h1 style={{ fontFamily: 'DM Serif Display', marginBottom: 24 }}>Edit Activities Page</h1>
      {message && <p style={{ color: message.includes('updated') ? 'green' : 'red', marginBottom: 16 }}>{message}</p>}
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
        Upload
      </button>
    </div>

    {data.hero?.backgroundImage && (
      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontSize: '13px', color: 'var(--muted)' }}>Preview (saved on disk, but not yet in live site – click Save below to apply)</p>
        <img src={data.hero.backgroundImage} style={{ maxWidth: '300px', borderRadius: '8px' }} />
      </div>
    )}
  </div>
)}

      {activeTab === 'intro' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.intro?.eyebrow} onChange={(e) => updateField('intro', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.intro?.title} onChange={(e) => updateField('intro', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Text</label>
          <textarea value={data.intro?.text} onChange={(e) => updateField('intro', 'text', e.target.value)} rows={5} style={inputStyle} />
        </div>
      )}

      {activeTab === 'coreActivities' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.coreActivities?.eyebrow} onChange={(e) => updateField('coreActivities', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.coreActivities?.title} onChange={(e) => updateField('coreActivities', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.coreActivities?.description} onChange={(e) => updateField('coreActivities', 'description', e.target.value)} rows={2} style={inputStyle} />
          <h4>Items</h4>
          {(data.coreActivities?.items || []).map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('coreActivities', 'items', idx, 'icon', e.target.value)} placeholder="Icon (emoji)" style={inputStyle} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('coreActivities', 'items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={item.text} onChange={(e) => handleArrayItemChange('coreActivities', 'items', idx, 'text', e.target.value)} placeholder="Text" rows={3} style={inputStyle} />
              <button onClick={() => handleArrayRemove('coreActivities', 'items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('coreActivities', 'items', { icon: '', title: '', text: '' })} className="btn-outline">+ Add Activity</button>
        </div>
      )}

      {activeTab === 'process' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.process?.eyebrow} onChange={(e) => updateField('process', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.process?.title} onChange={(e) => updateField('process', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.process?.description} onChange={(e) => updateField('process', 'description', e.target.value)} rows={2} style={inputStyle} />
          <label style={labelStyle}>Steps (one per line)</label>
          <textarea value={data.process?.steps?.join('\n')} onChange={(e) => updateField('process', 'steps', e.target.value.split('\n'))} rows={7} style={inputStyle} />
        </div>
      )}

      {activeTab === 'sectors' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.sectors?.eyebrow} onChange={(e) => updateField('sectors', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.sectors?.title} onChange={(e) => updateField('sectors', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.sectors?.description} onChange={(e) => updateField('sectors', 'description', e.target.value)} rows={2} style={inputStyle} />
          <h4>Items</h4>
          {(data.sectors?.items || []).map((item: any, idx: number) => (
            <div key={idx} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('sectors', 'items', idx, 'icon', e.target.value)} placeholder="Icon" style={{ ...inputStyle, flex: 1 }} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('sectors', 'items', idx, 'title', e.target.value)} placeholder="Title" style={{ ...inputStyle, flex: 2 }} />
              <button onClick={() => handleArrayRemove('sectors', 'items', idx)}>✕</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('sectors', 'items', { icon: '', title: '' })} className="btn-outline">+ Add</button>
        </div>
      )}

      {activeTab === 'equipment' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.equipment?.eyebrow} onChange={(e) => updateField('equipment', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.equipment?.title} onChange={(e) => updateField('equipment', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.equipment?.description} onChange={(e) => updateField('equipment', 'description', e.target.value)} rows={2} style={inputStyle} />
          <label style={labelStyle}>Items (one per line)</label>
          <textarea value={data.equipment?.items?.join('\n')} onChange={(e) => updateField('equipment', 'items', e.target.value.split('\n'))} rows={6} style={inputStyle} />
        </div>
      )}

      {activeTab === 'principles' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.principles?.eyebrow} onChange={(e) => updateField('principles', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.principles?.title} onChange={(e) => updateField('principles', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.principles?.description} onChange={(e) => updateField('principles', 'description', e.target.value)} rows={2} style={inputStyle} />
          <h4>Items</h4>
          {(data.principles?.items || []).map((item: any, idx: number) => (
            <div key={idx} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('principles', 'items', idx, 'icon', e.target.value)} placeholder="Icon" style={{ ...inputStyle, flex: 1 }} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('principles', 'items', idx, 'title', e.target.value)} placeholder="Title" style={{ ...inputStyle, flex: 2 }} />
              <button onClick={() => handleArrayRemove('principles', 'items', idx)}>✕</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('principles', 'items', { icon: '', title: '' })} className="btn-outline">+ Add</button>
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
      <div key={idx} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom: '10px' }}>
        <label style={labelStyle}>Image URL</label>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
          <input
            value={img.url}
            onChange={(e) => handleArrayItemChange('gallery', 'images', idx, 'url', e.target.value)}
            style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
          />
          {/* Hidden file input – unique per item */}
          <input
            type="file"
            id={`gallery-file-${idx}`}
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
                    setMessage('Image uploaded!');
                  }
                })
                .catch(() => setMessage('Upload failed.'));
            }}
            style={{ display: 'none' }}
          />
          <button
            type="button"
            onClick={() => document.getElementById(`gallery-file-${idx}`)?.click()}
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
        {img.url && (
          <img
            src={img.url}
            style={{ maxWidth: '150px', borderRadius: '8px', marginBottom: '8px', display: 'block' }}
          />
        )}
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

      {activeTab === 'impact' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.impact?.eyebrow} onChange={(e) => updateField('impact', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.impact?.title} onChange={(e) => updateField('impact', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.impact?.description} onChange={(e) => updateField('impact', 'description', e.target.value)} rows={2} style={inputStyle} />
          <h4>Stats</h4>
          {(data.impact?.stats || []).map((stat: any, idx: number) => (
            <div key={idx} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <input value={stat.number} onChange={(e) => handleArrayItemChange('impact', 'stats', idx, 'number', e.target.value)} style={{ ...inputStyle, flex: 1 }} />
              <input value={stat.label} onChange={(e) => handleArrayItemChange('impact', 'stats', idx, 'label', e.target.value)} style={{ ...inputStyle, flex: 2 }} />
              <button onClick={() => handleArrayRemove('impact', 'stats', idx)}>✕</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('impact', 'stats', { number: '', label: '' })} className="btn-outline">+ Add Stat</button>
        </div>
      )}

      {activeTab === 'callToAction' && (
        <div>
          <label style={labelStyle}>Title</label>
          <input value={data.callToAction?.title} onChange={(e) => updateField('callToAction', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Text</label>
          <textarea value={data.callToAction?.text} onChange={(e) => updateField('callToAction', 'text', e.target.value)} rows={4} style={inputStyle} />
          <label style={labelStyle}>Button 1 Text</label>
          <input value={data.callToAction?.button1Text} onChange={(e) => updateField('callToAction', 'button1Text', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Button 2 Text</label>
          <input value={data.callToAction?.button2Text} onChange={(e) => updateField('callToAction', 'button2Text', e.target.value)} style={inputStyle} />
        </div>
      )}

      <button onClick={handleSave} className="btn-primary" style={{ marginTop: 20, width: '100%', padding: 14, fontSize: 15 }}>
        Save Activities Page
      </button>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block', marginBottom: 4, fontWeight: 600, fontSize: 14, color: 'var(--text)',
};