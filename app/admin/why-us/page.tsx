'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminWhyUsPage() {
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/whyus')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/whyus', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setMessage(res.ok ? 'Why Us page updated!' : 'Save failed.');
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
    'hero', 'intro', 'whyClients', 'competitiveAdvantages', 'coreValues',
    'commitment', 'industries', 'clientSatisfaction', 'certifications', 'motto', 'callToAction'
  ];

  return (
    <div>
      <h1 style={{ fontFamily: 'DM Serif Display', marginBottom: 24 }}>Edit Why Us Page</h1>
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
          <div style={{ display: 'flex', gap: 10 }}>
            <input value={data.hero?.backgroundImage} onChange={(e) => updateField('hero', 'backgroundImage', e.target.value)} style={{ ...inputStyle, flex: 1 }} />
            <input type="file" ref={fileInputRef} onChange={() => handleImageUpload((url) => updateField('hero', 'backgroundImage', url))} style={{ display: 'none' }} />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)', background: 'white' }}>Upload</button>
          </div>
          {data.hero?.backgroundImage && <img src={data.hero.backgroundImage} style={{ maxWidth: 200, marginTop: 8 }} />}
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

      {activeTab === 'whyClients' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.whyClients?.eyebrow} onChange={(e) => updateField('whyClients', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.whyClients?.title} onChange={(e) => updateField('whyClients', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.whyClients?.description} onChange={(e) => updateField('whyClients', 'description', e.target.value)} rows={2} style={inputStyle} />
          <h4>Cards</h4>
          {(data.whyClients?.cards || []).map((card: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={card.icon} onChange={(e) => handleArrayItemChange('whyClients', 'cards', idx, 'icon', e.target.value)} placeholder="Icon (emoji)" style={inputStyle} />
              <input value={card.title} onChange={(e) => handleArrayItemChange('whyClients', 'cards', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={card.text} onChange={(e) => handleArrayItemChange('whyClients', 'cards', idx, 'text', e.target.value)} placeholder="Text" rows={3} style={inputStyle} />
              <button onClick={() => handleArrayRemove('whyClients', 'cards', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('whyClients', 'cards', { icon: '', title: '', text: '' })} className="btn-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)', background: 'white' }}>+ Add Card</button>
        </div>
      )}

      {activeTab === 'competitiveAdvantages' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.competitiveAdvantages?.eyebrow} onChange={(e) => updateField('competitiveAdvantages', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.competitiveAdvantages?.title} onChange={(e) => updateField('competitiveAdvantages', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.competitiveAdvantages?.description} onChange={(e) => updateField('competitiveAdvantages', 'description', e.target.value)} rows={2} style={inputStyle} />
          <label style={labelStyle}>Items (one per line)</label>
          <textarea
            value={data.competitiveAdvantages?.items?.join('\n')}
            onChange={(e) => updateField('competitiveAdvantages', 'items', e.target.value.split('\n'))}
            rows={6}
            style={inputStyle}
          />
        </div>
      )}

      {activeTab === 'coreValues' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.coreValues?.eyebrow} onChange={(e) => updateField('coreValues', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.coreValues?.title} onChange={(e) => updateField('coreValues', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.coreValues?.description} onChange={(e) => updateField('coreValues', 'description', e.target.value)} rows={2} style={inputStyle} />
          <h4>Values</h4>
          {(data.coreValues?.items || []).map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.title} onChange={(e) => handleArrayItemChange('coreValues', 'items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={item.text} onChange={(e) => handleArrayItemChange('coreValues', 'items', idx, 'text', e.target.value)} placeholder="Description" rows={3} style={inputStyle} />
              <button onClick={() => handleArrayRemove('coreValues', 'items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('coreValues', 'items', { title: '', text: '' })} className="btn-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)', background: 'white' }}>+ Add Value</button>
        </div>
      )}

      {activeTab === 'commitment' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.commitment?.eyebrow} onChange={(e) => updateField('commitment', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.commitment?.title} onChange={(e) => updateField('commitment', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Text</label>
          <textarea value={data.commitment?.text} onChange={(e) => updateField('commitment', 'text', e.target.value)} rows={4} style={inputStyle} />
        </div>
      )}

      {activeTab === 'industries' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.industries?.eyebrow} onChange={(e) => updateField('industries', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.industries?.title} onChange={(e) => updateField('industries', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.industries?.description} onChange={(e) => updateField('industries', 'description', e.target.value)} rows={2} style={inputStyle} />
          <h4>Sectors</h4>
          {(data.industries?.items || []).map((item: any, idx: number) => (
            <div key={idx} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('industries', 'items', idx, 'icon', e.target.value)} placeholder="Icon" style={{ ...inputStyle, flex: 1 }} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('industries', 'items', idx, 'title', e.target.value)} placeholder="Title" style={{ ...inputStyle, flex: 2 }} />
              <button onClick={() => handleArrayRemove('industries', 'items', idx)}>✕</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('industries', 'items', { icon: '', title: '' })} className="btn-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)', background: 'white' }}>+ Add Industry</button>
        </div>
      )}

      {activeTab === 'clientSatisfaction' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.clientSatisfaction?.eyebrow} onChange={(e) => updateField('clientSatisfaction', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.clientSatisfaction?.title} onChange={(e) => updateField('clientSatisfaction', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.clientSatisfaction?.description} onChange={(e) => updateField('clientSatisfaction', 'description', e.target.value)} rows={2} style={inputStyle} />
          <label style={labelStyle}>Items (one per line)</label>
          <textarea
            value={data.clientSatisfaction?.items?.join('\n')}
            onChange={(e) => updateField('clientSatisfaction', 'items', e.target.value.split('\n'))}
            rows={5}
            style={inputStyle}
          />
        </div>
      )}

      {activeTab === 'certifications' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.certifications?.eyebrow} onChange={(e) => updateField('certifications', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.certifications?.title} onChange={(e) => updateField('certifications', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.certifications?.description} onChange={(e) => updateField('certifications', 'description', e.target.value)} rows={2} style={inputStyle} />
          <h4>Certificates</h4>
          {(data.certifications?.items || []).map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('certifications', 'items', idx, 'icon', e.target.value)} placeholder="Icon (FontAwesome class without fa-)" style={inputStyle} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('certifications', 'items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={item.text} onChange={(e) => handleArrayItemChange('certifications', 'items', idx, 'text', e.target.value)} placeholder="Description" rows={2} style={inputStyle} />
              <button onClick={() => handleArrayRemove('certifications', 'items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('certifications', 'items', { icon: '', title: '', text: '' })} className="btn-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)', background: 'white' }}>+ Add Certificate</button>
        </div>
      )}

      {activeTab === 'motto' && (
        <div>
          <label style={labelStyle}>Motto</label>
          <input value={data.motto?.text} onChange={(e) => updateField('motto', 'text', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Explanation</label>
          <textarea value={data.motto?.explanation} onChange={(e) => updateField('motto', 'explanation', e.target.value)} rows={3} style={inputStyle} />
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
        Save Why Us Page
      </button>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block', marginBottom: 4, fontWeight: 600, fontSize: 14, color: 'var(--text)',
};