'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminInvestmentsPage() {
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/investments')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/investments', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) setMessage('Investments page updated!');
    else setMessage('Save failed.');
  };

  // ── helpers (same as About admin) ──
  const updateField = (section: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const updateNestedField = (section: string, parentField: string, childField: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parentField]: { ...prev[section]?.[parentField], [childField]: value },
      },
    }));
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

  // ── image upload helpers ──
  const uploadAndSet = async (callback: (url: string) => void) => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const result = await res.json();
      if (result.url) {
        callback(result.url);
        setMessage('Image uploaded!');
      }
    } catch (err) {
      setMessage('Upload failed.');
    }
  };

  const handleImageUpload = (section: string, field: string) => {
    uploadAndSet((url) => updateField(section, field, url));
  };

  const handlePillarImageUpload = (index: number) => {
    uploadAndSet((url) => handleArrayItemChange('pillars', 'items', index, 'image', url));
  };

  const handleProjectImageUpload = (index: number) => {
    uploadAndSet((url) => handleArrayItemChange('featuredProjects', 'items', index, 'image', url));
  };

  if (loading) return <div style={{ padding: 40 }}>Loading investments data…</div>;
  if (!data) return <div style={{ padding: 40 }}>Error loading data.</div>;

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    marginBottom: '16px',
    borderRadius: '12px',
    border: '1.5px solid #e5e7eb',
    fontSize: '14px',
    fontFamily: 'inherit',
  };

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

  const tabs = [
    'hero', 'intro', 'pillars', 'additionalAreas', 'whyInvest', 'approach',
    'featuredProjects', 'impact', 'partnerReasons', 'opportunities', 'faq', 'callToAction',
  ];

  return (
    <div>
      <h1 style={{ fontFamily: 'DM Serif Display', marginBottom: '24px' }}>Edit Investments Page</h1>
      {message && (
        <p style={{ color: message.includes('updated') || message.includes('uploaded') ? 'green' : 'red', marginBottom: '16px' }}>
          {message}
        </p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={tabStyle(tab)}>
            {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/([A-Z])/g, ' $1')}
          </button>
        ))}
      </div>

      {/* ── Hero Tab ── */}
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
            <input value={data.hero?.backgroundImage} onChange={(e) => updateField('hero', 'backgroundImage', e.target.value)} placeholder="Image URL" style={{ ...inputStyle, flex: 1, marginBottom: 0 }} />
            <input type="file" ref={fileInputRef} onChange={() => handleImageUpload('hero', 'backgroundImage')} style={{ display: 'none' }} />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-outline" style={{ whiteSpace: 'nowrap', borderColor: 'var(--primary)', color: 'var(--primary)' }}>
              Upload
            </button>
          </div>
          {data.hero?.backgroundImage && (
            <img src={data.hero.backgroundImage} style={{ maxWidth: '300px', borderRadius: '8px', marginBottom: '16px' }} />
          )}
        </div>
      )}

      {/* ── Intro Tab ── */}
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

      {/* ── Pillars Tab ── */}
      {activeTab === 'pillars' && (
  <div>
    <label style={labelStyle}>Section Eyebrow</label>
    <input value={data.pillars?.eyebrow} onChange={(e) => updateField('pillars', 'eyebrow', e.target.value)} style={inputStyle} />
    <label style={labelStyle}>Section Title</label>
    <input value={data.pillars?.title} onChange={(e) => updateField('pillars', 'title', e.target.value)} style={inputStyle} />
    <label style={labelStyle}>Section Description</label>
    <textarea value={data.pillars?.description} onChange={(e) => updateField('pillars', 'description', e.target.value)} rows={2} style={inputStyle} />

    <h4 style={{ margin: '20px 0 10px' }}>Pillar Items</h4>
    {(data.pillars?.items || []).map((pillar: any, idx: number) => (
      <div key={idx} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom: '16px' }}>
        <input
          value={pillar.title}
          onChange={(e) => handleArrayItemChange('pillars', 'items', idx, 'title', e.target.value)}
          placeholder="Title"
          style={inputStyle}
        />
        <textarea
          value={pillar.description}
          onChange={(e) => handleArrayItemChange('pillars', 'items', idx, 'description', e.target.value)}
          placeholder="Description"
          rows={2}
          style={inputStyle}
        />
        <label style={labelStyle}>List items (one per line)</label>
        <textarea
          value={pillar.list?.join('\n')}
          onChange={(e) => handleArrayItemChange('pillars', 'items', idx, 'list', e.target.value.split('\n'))}
          rows={4}
          style={inputStyle}
        />

        {/* Image upload with unique ID */}
        <label style={labelStyle}>Image</label>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
          <input
            value={pillar.image}
            onChange={(e) => handleArrayItemChange('pillars', 'items', idx, 'image', e.target.value)}
            placeholder="Image URL"
            style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
          />
          <input
            type="file"
            id={`pillar-file-${idx}`}
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
                    handleArrayItemChange('pillars', 'items', idx, 'image', result.url);
                    setMessage('Image uploaded!');
                  }
                })
                .catch(() => setMessage('Upload failed.'));
            }}
          />
          <button
            type="button"
            onClick={() => document.getElementById(`pillar-file-${idx}`)?.click()}
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

        {pillar.image && (
          <img
            src={pillar.image}
            style={{ maxWidth: '150px', borderRadius: '8px', marginBottom: '8px' }}
          />
        )}

        <button
          onClick={() => handleArrayRemove('pillars', 'items', idx)}
          style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Remove Pillar
        </button>
      </div>
    ))}
    <button
      onClick={() => handleArrayAdd('pillars', 'items', { title: '', description: '', image: '', list: [] })}
      className="btn-outline"
      style={{
        marginTop: '8px',
        borderColor: 'var(--primary)',
        color: 'var(--primary)',
        background: 'white',
      }}
    >
      + Add Pillar
    </button>
  </div>
)}

      {/* ── Additional Areas Tab ── */}
      {activeTab === 'additionalAreas' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.additionalAreas?.eyebrow} onChange={(e) => updateField('additionalAreas', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.additionalAreas?.title} onChange={(e) => updateField('additionalAreas', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.additionalAreas?.description} onChange={(e) => updateField('additionalAreas', 'description', e.target.value)} rows={2} style={inputStyle} />

          <h4 style={{ margin: '20px 0 10px' }}>Area Cards</h4>
          {(data.additionalAreas?.items || []).map((area: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom: '16px' }}>
              <input value={area.icon} onChange={(e) => handleArrayItemChange('additionalAreas', 'items', idx, 'icon', e.target.value)} placeholder="Icon (emoji)" style={inputStyle} />
              <input value={area.title} onChange={(e) => handleArrayItemChange('additionalAreas', 'items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={area.text} onChange={(e) => handleArrayItemChange('additionalAreas', 'items', idx, 'text', e.target.value)} placeholder="Text" rows={2} style={inputStyle} />
              <button onClick={() => handleArrayRemove('additionalAreas', 'items', idx)} style={{ color: 'red' }}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('additionalAreas', 'items', { icon: '', title: '', text: '' })} className="btn-outline" style={{ marginTop: '8px', borderColor: 'var(--primary)', color: 'var(--primary)' }}>
            + Add Area
          </button>
        </div>
      )}

      {/* ── Why Invest Tab ── */}
      {activeTab === 'whyInvest' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.whyInvest?.eyebrow} onChange={(e) => updateField('whyInvest', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.whyInvest?.title} onChange={(e) => updateField('whyInvest', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.whyInvest?.description} onChange={(e) => updateField('whyInvest', 'description', e.target.value)} rows={2} style={inputStyle} />

          <h4 style={{ margin: '20px 0 10px' }}>Benefit Cards</h4>
          {(data.whyInvest?.items || []).map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom: '16px' }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('whyInvest', 'items', idx, 'icon', e.target.value)} placeholder="Icon (emoji)" style={inputStyle} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('whyInvest', 'items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={item.text} onChange={(e) => handleArrayItemChange('whyInvest', 'items', idx, 'text', e.target.value)} placeholder="Text" rows={3} style={inputStyle} />
              <button onClick={() => handleArrayRemove('whyInvest', 'items', idx)} style={{ color: 'red' }}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('whyInvest', 'items', { icon: '', title: '', text: '' })} className="btn-outline" style={{ marginTop: '8px', borderColor: 'var(--primary)', color: 'var(--primary)' }}>
            + Add Benefit
          </button>
        </div>
      )}

      {/* ── Approach Tab ── */}
      {activeTab === 'approach' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.approach?.eyebrow} onChange={(e) => updateField('approach', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.approach?.title} onChange={(e) => updateField('approach', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.approach?.description} onChange={(e) => updateField('approach', 'description', e.target.value)} rows={2} style={inputStyle} />

          <h4 style={{ margin: '20px 0 10px' }}>Steps</h4>
          {(data.approach?.steps || []).map((step: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom: '16px' }}>
              <input value={step.title} onChange={(e) => handleArrayItemChange('approach', 'steps', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={step.text} onChange={(e) => handleArrayItemChange('approach', 'steps', idx, 'text', e.target.value)} placeholder="Text" rows={3} style={inputStyle} />
              <button onClick={() => handleArrayRemove('approach', 'steps', idx)} style={{ color: 'red' }}>Remove Step</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('approach', 'steps', { title: '', text: '' })} className="btn-outline" style={{ marginTop: '8px', borderColor: 'var(--primary)', color: 'var(--primary)' }}>
            + Add Step
          </button>
        </div>
      )}

      {/* ── Featured Projects Tab ── */}
      {activeTab === 'featuredProjects' && (
  <div>
    <label style={labelStyle}>Eyebrow</label>
    <input value={data.featuredProjects?.eyebrow} onChange={(e) => updateField('featuredProjects', 'eyebrow', e.target.value)} style={inputStyle} />
    <label style={labelStyle}>Title</label>
    <input value={data.featuredProjects?.title} onChange={(e) => updateField('featuredProjects', 'title', e.target.value)} style={inputStyle} />
    <label style={labelStyle}>Description</label>
    <textarea value={data.featuredProjects?.description} onChange={(e) => updateField('featuredProjects', 'description', e.target.value)} rows={2} style={inputStyle} />

    <h4 style={{ margin: '20px 0 10px' }}>Project Cards</h4>
    {(data.featuredProjects?.items || []).map((proj: any, idx: number) => (
      <div key={idx} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom: '16px' }}>
        <input value={proj.name} onChange={(e) => handleArrayItemChange('featuredProjects', 'items', idx, 'name', e.target.value)} placeholder="Project Name" style={inputStyle} />
        <input value={proj.sector} onChange={(e) => handleArrayItemChange('featuredProjects', 'items', idx, 'sector', e.target.value)} placeholder="Sector" style={inputStyle} />
        <input value={proj.location} onChange={(e) => handleArrayItemChange('featuredProjects', 'items', idx, 'location', e.target.value)} placeholder="Location" style={inputStyle} />
        <select value={proj.status} onChange={(e) => handleArrayItemChange('featuredProjects', 'items', idx, 'status', e.target.value)} style={inputStyle}>
          <option>Completed</option>
          <option>In Progress</option>
          <option>Planned</option>
        </select>
        <textarea value={proj.description} onChange={(e) => handleArrayItemChange('featuredProjects', 'items', idx, 'description', e.target.value)} placeholder="Description" rows={3} style={inputStyle} />

        {/* Image upload with unique ID */}
        <label style={labelStyle}>Image</label>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
          <input
            value={proj.image}
            onChange={(e) => handleArrayItemChange('featuredProjects', 'items', idx, 'image', e.target.value)}
            placeholder="Image URL"
            style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
          />
          <input
            type="file"
            id={`project-file-${idx}`}
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
                    handleArrayItemChange('featuredProjects', 'items', idx, 'image', result.url);
                    setMessage('Image uploaded!');
                  }
                })
                .catch(() => setMessage('Upload failed.'));
            }}
          />
          <button
            type="button"
            onClick={() => document.getElementById(`project-file-${idx}`)?.click()}
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

        {proj.image && (
          <img
            src={proj.image}
            style={{ maxWidth: '150px', borderRadius: '8px', marginBottom: '8px' }}
          />
        )}

        <button
          onClick={() => handleArrayRemove('featuredProjects', 'items', idx)}
          style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Remove Project
        </button>
      </div>
    ))}
    <button
      onClick={() => handleArrayAdd('featuredProjects', 'items', { name: '', sector: '', location: '', status: 'Completed', description: '', image: '' })}
      className="btn-outline"
      style={{
        marginTop: '8px',
        borderColor: 'var(--primary)',
        color: 'var(--primary)',
        background: 'white',
      }}
    >
      + Add Project
    </button>
  </div>
)}

      {/* ── Impact Tab ── */}
      {activeTab === 'impact' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.impact?.eyebrow} onChange={(e) => updateField('impact', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.impact?.title} onChange={(e) => updateField('impact', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.impact?.description} onChange={(e) => updateField('impact', 'description', e.target.value)} rows={2} style={inputStyle} />

          <h4 style={{ margin: '20px 0 10px' }}>Stats</h4>
          {(data.impact?.stats || []).map((stat: any, idx: number) => (
            <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
              <input value={stat.number} onChange={(e) => handleArrayItemChange('impact', 'stats', idx, 'number', e.target.value)} placeholder="Number" style={{ ...inputStyle, flex: 1 }} />
              <input value={stat.label} onChange={(e) => handleArrayItemChange('impact', 'stats', idx, 'label', e.target.value)} placeholder="Label" style={{ ...inputStyle, flex: 2 }} />
              <button onClick={() => handleArrayRemove('impact', 'stats', idx)} style={{ color: 'red', background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer' }}>✕</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('impact', 'stats', { number: '', label: '' })} className="btn-outline" style={{ marginTop: '8px', borderColor: 'var(--primary)', color: 'var(--primary)' }}>
            + Add Stat
          </button>
        </div>
      )}

      {/* ── Partner Reasons Tab ── */}
      {activeTab === 'partnerReasons' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.partnerReasons?.eyebrow} onChange={(e) => updateField('partnerReasons', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.partnerReasons?.title} onChange={(e) => updateField('partnerReasons', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.partnerReasons?.description} onChange={(e) => updateField('partnerReasons', 'description', e.target.value)} rows={2} style={inputStyle} />

          <h4 style={{ margin: '20px 0 10px' }}>Reason Cards</h4>
          {(data.partnerReasons?.items || []).map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom: '16px' }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('partnerReasons', 'items', idx, 'icon', e.target.value)} placeholder="Icon (emoji)" style={inputStyle} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('partnerReasons', 'items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={item.text} onChange={(e) => handleArrayItemChange('partnerReasons', 'items', idx, 'text', e.target.value)} placeholder="Text" rows={3} style={inputStyle} />
              <button onClick={() => handleArrayRemove('partnerReasons', 'items', idx)} style={{ color: 'red' }}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('partnerReasons', 'items', { icon: '', title: '', text: '' })} className="btn-outline" style={{ marginTop: '8px', borderColor: 'var(--primary)', color: 'var(--primary)' }}>
            + Add Reason
          </button>
        </div>
      )}

      {/* ── Opportunities Tab ── */}
      {activeTab === 'opportunities' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.opportunities?.eyebrow} onChange={(e) => updateField('opportunities', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.opportunities?.title} onChange={(e) => updateField('opportunities', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Text</label>
          <textarea value={data.opportunities?.text} onChange={(e) => updateField('opportunities', 'text', e.target.value)} rows={4} style={inputStyle} />
          <label style={labelStyle}>Button Text</label>
          <input value={data.opportunities?.buttonText} onChange={(e) => updateField('opportunities', 'buttonText', e.target.value)} style={inputStyle} />
        </div>
      )}

      {/* ── FAQ Tab ── */}
      {activeTab === 'faq' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.faq?.eyebrow} onChange={(e) => updateField('faq', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.faq?.title} onChange={(e) => updateField('faq', 'title', e.target.value)} style={inputStyle} />

          <h4 style={{ margin: '20px 0 10px' }}>Questions</h4>
          {(data.faq?.items || []).map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom: '16px' }}>
              <input value={item.question} onChange={(e) => handleArrayItemChange('faq', 'items', idx, 'question', e.target.value)} placeholder="Question" style={inputStyle} />
              <textarea value={item.answer} onChange={(e) => handleArrayItemChange('faq', 'items', idx, 'answer', e.target.value)} placeholder="Answer" rows={3} style={inputStyle} />
              <button onClick={() => handleArrayRemove('faq', 'items', idx)} style={{ color: 'red' }}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('faq', 'items', { question: '', answer: '' })} className="btn-outline" style={{ marginTop: '8px', borderColor: 'var(--primary)', color: 'var(--primary)' }}>
            + Add FAQ
          </button>
        </div>
      )}

      {/* ── Call to Action Tab ── */}
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

      <button onClick={handleSave} className="btn-primary" style={{ marginTop: '20px', width: '100%', padding: '14px', fontSize: '15px' }}>
        Save Investments Page
      </button>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: '4px',
  fontWeight: 600,
  fontSize: '14px',
  color: 'var(--text)',
};