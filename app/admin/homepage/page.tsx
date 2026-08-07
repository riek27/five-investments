'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminHomepagePage() {
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingFor, setUploadingFor] = useState<{ section: string; field: string } | null>(null);

  useEffect(() => {
    fetch('/api/homepage')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/homepage', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) setMessage('Homepage updated!');
    else setMessage('Save failed.');
  };

  const updateField = (section: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const updateNestedField = (section: string, parentField: string, childField: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parentField]: {
          ...prev[section]?.[parentField],
          [childField]: value,
        },
      },
    }));
  };

  const handleArrayAdd = (section: string, field: string, newItem: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: [...(prev[section]?.[field] || []), newItem],
      },
    }));
  };

  const handleArrayRemove = (section: string, field: string, index: number) => {
    setData((prev: any) => {
      const arr = [...(prev[section]?.[field] || [])];
      arr.splice(index, 1);
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: arr,
        },
      };
    });
  };

  const handleArrayItemChange = (section: string, field: string, index: number, key: string, value: any) => {
    setData((prev: any) => {
      const arr = [...(prev[section]?.[field] || [])];
      if (arr[index]) {
        arr[index] = { ...arr[index], [key]: value };
      }
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: arr,
        },
      };
    });
  };

  const handleImageUpload = async (section: string, field: string) => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;
    setUploadingFor({ section, field });
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const result = await res.json();
      if (result.url) {
        updateField(section, field, result.url);
        setMessage('Image uploaded!');
      } else {
        setMessage('Upload failed');
      }
    } catch (err) {
      setMessage('Upload failed.');
    }
    setUploadingFor(null);
  };

  if (loading) return <div>Loading homepage data...</div>;
  if (!data) return <div>Error loading data.</div>;

  const tabStyle = (tab: string) => ({
    padding: '8px 16px',
    borderRadius: '8px',
    border: activeTab === tab ? '2px solid var(--primary)' : '1px solid #ccc',
    background: activeTab === tab ? 'var(--primary)' : 'white',
    color: activeTab === tab ? 'white' : 'var(--text)',
    fontWeight: 600,
    cursor: 'pointer',
    marginRight: '8px',
    marginBottom: '8px',
  });

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    marginBottom: '16px',
    borderRadius: '12px',
    border: '1.5px solid #e5e7eb',
    fontSize: '14px',
    fontFamily: 'inherit',
  };

  // Tabs without "contact"
  const tabs = ['hero', 'about', 'services', 'whyUs', 'team', 'legal'];

  return (
    <div>
      <h1 style={{ fontFamily: 'DM Serif Display', marginBottom: '24px' }}>Edit Homepage</h1>
      {message && <p style={{ color: message.includes('updated') || message.includes('uploaded') ? 'green' : 'red', marginBottom: '16px' }}>{message}</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={tabStyle(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Hero Tab */}
      {activeTab === 'hero' && (
        <div>
          <label>Tagline</label>
          <input value={data.hero?.tagline} onChange={(e) => updateField('hero', 'tagline', e.target.value)} style={inputStyle} />
          <label>Heading</label>
          <textarea value={data.hero?.heading} onChange={(e) => updateField('hero', 'heading', e.target.value)} rows={3} style={inputStyle} />
          <label>Subheading</label>
          <textarea value={data.hero?.subheading} onChange={(e) => updateField('hero', 'subheading', e.target.value)} rows={4} style={inputStyle} />
          <label>Background Image URL</label>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <input value={data.hero?.backgroundImage} onChange={(e) => updateField('hero', 'backgroundImage', e.target.value)} style={{ ...inputStyle, flex: 1, marginBottom: 0 }} />
            <input type="file" ref={fileInputRef} onChange={() => handleImageUpload('hero', 'backgroundImage')} style={{ display: 'none' }} />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-outline" style={{ whiteSpace: 'nowrap', borderColor: 'var(--primary)', color: 'var(--primary)' }}>
              {uploadingFor?.section === 'hero' && uploadingFor?.field === 'backgroundImage' ? 'Uploading...' : 'Upload'}
            </button>
          </div>
          {data.hero?.backgroundImage && (
            <div style={{ marginBottom: '16px' }}>
              <p>Preview:</p>
              <img src={data.hero.backgroundImage} style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '12px' }} />
            </div>
          )}
          <h4>Stats</h4>
          {(data.hero?.stats || []).map((stat: any, idx: number) => (
            <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
              <input value={stat.number} onChange={(e) => handleArrayItemChange('hero', 'stats', idx, 'number', e.target.value)} style={{ ...inputStyle, flex: 1 }} />
              <input value={stat.label} onChange={(e) => handleArrayItemChange('hero', 'stats', idx, 'label', e.target.value)} style={{ ...inputStyle, flex: 2 }} />
              <button onClick={() => handleArrayRemove('hero', 'stats', idx)} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>✕</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('hero', 'stats', { number: '', label: '' })} className="btn-outline" style={{ marginTop: '8px', borderColor: 'var(--primary)', color: 'var(--primary)' }}>+ Add Stat</button>
        </div>
      )}

      {/* About Tab */}
      {activeTab === 'about' && (
        <div>
          <label>Eyebrow</label>
          <input value={data.about?.eyebrow} onChange={(e) => updateField('about', 'eyebrow', e.target.value)} style={inputStyle} />
          <label>Title</label>
          <input value={data.about?.title} onChange={(e) => updateField('about', 'title', e.target.value)} style={inputStyle} />
          <label>Incorporation Date</label>
          <input value={data.about?.incorporationDate} onChange={(e) => updateField('about', 'incorporationDate', e.target.value)} style={inputStyle} />
          <label>Background Text</label>
          <textarea value={data.about?.backgroundText} onChange={(e) => updateField('about', 'backgroundText', e.target.value)} rows={4} style={inputStyle} />
          <label>Motto Text</label>
          <input value={data.about?.mottoText} onChange={(e) => updateField('about', 'mottoText', e.target.value)} style={inputStyle} />
          <label>Motto Description</label>
          <textarea value={data.about?.mottoDescription} onChange={(e) => updateField('about', 'mottoDescription', e.target.value)} rows={3} style={inputStyle} />
          <label>Vision</label>
          <textarea value={data.about?.vision} onChange={(e) => updateField('about', 'vision', e.target.value)} rows={2} style={inputStyle} />
          <label>Mission</label>
          <textarea value={data.about?.mission} onChange={(e) => updateField('about', 'mission', e.target.value)} rows={2} style={inputStyle} />

          <label>Five Pillars (comma separated)</label>
          <input
            value={data.about?.fivePillars?.join(', ')}
            onChange={(e) => updateField('about', 'fivePillars', e.target.value.split(',').map((s: string) => s.trim()))}
            style={inputStyle}
          />
          <label>Currently Engaged (comma separated)</label>
          <input
            value={data.about?.currentlyEngaged?.join(', ')}
            onChange={(e) => updateField('about', 'currentlyEngaged', e.target.value.split(',').map((s: string) => s.trim()))}
            style={inputStyle}
          />
          <label>Core Values (comma separated)</label>
          <input
            value={data.about?.coreValues?.join(', ')}
            onChange={(e) => updateField('about', 'coreValues', e.target.value.split(',').map((s: string) => s.trim()))}
            style={inputStyle}
          />

          <label>Image URL</label>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <input value={data.about?.image} onChange={(e) => updateField('about', 'image', e.target.value)} style={{ ...inputStyle, flex: 1, marginBottom: 0 }} />
            <button onClick={() => handleImageUpload('about', 'image')} className="btn-outline">Upload</button>
          </div>

          <h4>Stats</h4>
          {(data.about?.stats || []).map((stat: any, idx: number) => (
            <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
              <input value={stat.number} onChange={(e) => handleArrayItemChange('about', 'stats', idx, 'number', e.target.value)} style={{ ...inputStyle, flex: 1 }} />
              <input value={stat.label} onChange={(e) => handleArrayItemChange('about', 'stats', idx, 'label', e.target.value)} style={{ ...inputStyle, flex: 2 }} />
              <button onClick={() => handleArrayRemove('about', 'stats', idx)}>✕</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('about', 'stats', { number: '', label: '' })}>+ Add Stat</button>
        </div>
      )}

      {/* Services Tab */}
{activeTab === 'services' && (
  <div>
    <label>Eyebrow</label>
    <input value={data.services?.eyebrow} onChange={(e) => updateField('services', 'eyebrow', e.target.value)} style={inputStyle} />
    <label>Title</label>
    <input value={data.services?.title} onChange={(e) => updateField('services', 'title', e.target.value)} style={inputStyle} />
    <label>Description</label>
    <textarea value={data.services?.description} onChange={(e) => updateField('services', 'description', e.target.value)} rows={3} style={inputStyle} />

    {['mining', 'construction', 'procurement', 'agriculture', 'other'].map((cat) => (
      <div key={cat} style={{ marginBottom: '24px' }}>
        <h4>{cat === 'mining' ? 'Mining & Mineral' : cat.charAt(0).toUpperCase() + cat.slice(1)}</h4>
        <label>Title</label>
        <input
          value={data.services?.[cat]?.title}
          onChange={(e) => updateNestedField('services', cat, 'title', e.target.value)}
          style={inputStyle}
        />
        <label>Items (one per line)</label>
        <textarea
          value={data.services?.[cat]?.items?.join('\n')}
          onChange={(e) => updateNestedField('services', cat, 'items', e.target.value.split('\n'))}
          rows={6}
          style={inputStyle}
        />
      </div>
    ))}
  </div>
)}

      {/* Why Us Tab */}
      {activeTab === 'whyUs' && (
        <div>
          <label>Eyebrow</label>
          <input value={data.whyUs?.eyebrow} onChange={(e) => updateField('whyUs', 'eyebrow', e.target.value)} style={inputStyle} />
          <label>Title</label>
          <input value={data.whyUs?.title} onChange={(e) => updateField('whyUs', 'title', e.target.value)} style={inputStyle} />
          <label>Description</label>
          <textarea value={data.whyUs?.description} onChange={(e) => updateField('whyUs', 'description', e.target.value)} rows={3} style={inputStyle} />

          <h4>Items</h4>
          {(data.whyUs?.items || []).map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom: '10px' }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('whyUs', 'items', idx, 'icon', e.target.value)} placeholder="Icon" style={{ ...inputStyle, marginBottom: '8px' }} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('whyUs', 'items', idx, 'title', e.target.value)} placeholder="Title" style={{ ...inputStyle, marginBottom: '8px' }} />
              <textarea value={item.text} onChange={(e) => handleArrayItemChange('whyUs', 'items', idx, 'text', e.target.value)} placeholder="Text" rows={3} style={inputStyle} />
              <button onClick={() => handleArrayRemove('whyUs', 'items', idx)} style={{ color: 'red' }}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('whyUs', 'items', { icon: '', title: '', text: '' })} className="btn-outline">+ Add Item</button>
        </div>
      )}

      {/* Team Tab */}
      {activeTab === 'team' && (
        <div>
          <label>Eyebrow</label>
          <input value={data.team?.eyebrow} onChange={(e) => updateField('team', 'eyebrow', e.target.value)} style={inputStyle} />
          <label>Title</label>
          <input value={data.team?.title} onChange={(e) => updateField('team', 'title', e.target.value)} style={inputStyle} />
          <label>Description</label>
          <textarea value={data.team?.description} onChange={(e) => updateField('team', 'description', e.target.value)} rows={3} style={inputStyle} />

          <h4>Leadership</h4>
          {(data.team?.leadership || []).map((leader: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom: '10px' }}>
              <input value={leader.icon} onChange={(e) => handleArrayItemChange('team', 'leadership', idx, 'icon', e.target.value)} placeholder="Icon" style={inputStyle} />
              <input value={leader.title} onChange={(e) => handleArrayItemChange('team', 'leadership', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <input value={leader.subtitle} onChange={(e) => handleArrayItemChange('team', 'leadership', idx, 'subtitle', e.target.value)} placeholder="Subtitle" style={inputStyle} />
              <button onClick={() => handleArrayRemove('team', 'leadership', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('team', 'leadership', { icon: '', title: '', subtitle: '' })}>+ Add Leader</button>

          <h4>Members (one per line)</h4>
          <textarea
            value={data.team?.members?.join('\n')}
            onChange={(e) => updateField('team', 'members', e.target.value.split('\n'))}
            rows={6}
            style={inputStyle}
          />
        </div>
      )}

      {/* Legal Tab */}
{/* Legal Tab */}
{activeTab === 'legal' && (
  <div>
    <label style={{ display: 'block', marginBottom: 4, fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>Eyebrow</label>
    <input value={data.legal?.eyebrow} onChange={(e) => updateField('legal', 'eyebrow', e.target.value)} style={inputStyle} />
    <label style={{ display: 'block', marginBottom: 4, fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>Title</label>
    <input value={data.legal?.title} onChange={(e) => updateField('legal', 'title', e.target.value)} style={inputStyle} />
    <label style={{ display: 'block', marginBottom: 4, fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>Description</label>
    <textarea value={data.legal?.description} onChange={(e) => updateField('legal', 'description', e.target.value)} rows={3} style={inputStyle} />

    <h4 style={{ margin: '20px 0 10px' }}>Items</h4>
    {(data.legal?.items || []).map((item: any, idx: number) => (
      <div key={idx} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom: '10px' }}>
        <input value={item.icon} onChange={(e) => handleArrayItemChange('legal', 'items', idx, 'icon', e.target.value)} placeholder="Icon (without fa-)" style={inputStyle} />
        <input value={item.title} onChange={(e) => handleArrayItemChange('legal', 'items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
        <textarea value={item.text} onChange={(e) => handleArrayItemChange('legal', 'items', idx, 'text', e.target.value)} placeholder="Text" rows={3} style={inputStyle} />
        <input value={item.number} onChange={(e) => handleArrayItemChange('legal', 'items', idx, 'number', e.target.value)} placeholder="Number/ID" style={inputStyle} />

        {/* File upload with unique ID */}
        <div style={{ marginBottom: '8px' }}>
          <label style={{ display: 'block', marginBottom: 4, fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>File path / Upload</label>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
            <input
              value={item.file}
              onChange={(e) => handleArrayItemChange('legal', 'items', idx, 'file', e.target.value)}
              placeholder="File URL"
              style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
            />
            <input
              type="file"
              id={`legal-file-${idx}`}
              style={{ display: 'none' }}
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const formData = new FormData();
                formData.append('file', file);
                try {
                  const res = await fetch('/api/upload', { method: 'POST', body: formData });
                  const result = await res.json();
                  if (result.url) {
                    handleArrayItemChange('legal', 'items', idx, 'file', result.url);
                    setMessage('File uploaded! Click Save to keep it.');
                  } else {
                    setMessage('Upload failed');
                  }
                } catch {
                  setMessage('Upload failed');
                }
              }}
            />
            <button
              type="button"
              onClick={() => document.getElementById(`legal-file-${idx}`)?.click()}
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
              Upload File
            </button>
          </div>
          {item.file && (
            <p style={{ fontSize: '13px', color: 'var(--muted)' }}>
              Current file: <a href={item.file} target="_blank" rel="noreferrer">{item.file}</a>
            </p>
          )}
        </div>

        <button onClick={() => handleArrayRemove('legal', 'items', idx)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
      </div>
    ))}
    <button onClick={() => handleArrayAdd('legal', 'items', { icon: '', title: '', text: '', number: '', file: '' })} className="btn-outline" style={{ marginTop: '8px', borderColor: 'var(--primary)', color: 'var(--primary)', background: 'white' }}>+ Add Item</button>
  </div>
)}

      <button onClick={handleSave} className="btn-primary" style={{ marginTop: '20px', width: '100%', padding: '14px', fontSize: '15px' }}>
        Save Homepage
      </button>
    </div>
  );
}