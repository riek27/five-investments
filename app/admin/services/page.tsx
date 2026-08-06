'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminServicesPage() {
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/services')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/services', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setMessage(res.ok ? 'Services page updated!' : 'Save failed.');
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

  const tabs = ['hero', 'intro', 'services', 'industries', 'whyUs', 'process', 'faq', 'callToAction'];

  return (
    <div>
      <h1 style={{ fontFamily: 'DM Serif Display', marginBottom: 24 }}>Edit Services Page</h1>
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

      {activeTab === 'services' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.services?.eyebrow} onChange={(e) => updateField('services', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.services?.title} onChange={(e) => updateField('services', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.services?.description} onChange={(e) => updateField('services', 'description', e.target.value)} rows={2} style={inputStyle} />
          <h4>Service Cards</h4>
          {(data.services?.items || []).map((item: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('services', 'items', idx, 'icon', e.target.value)} placeholder="Icon (emoji)" style={inputStyle} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('services', 'items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={item.description} onChange={(e) => handleArrayItemChange('services', 'items', idx, 'description', e.target.value)} placeholder="Description" rows={2} style={inputStyle} />
              <label>List (one per line)</label>
              <textarea
                value={item.list?.join('\n')}
                onChange={(e) => handleArrayItemChange('services', 'items', idx, 'list', e.target.value.split('\n'))}
                rows={4}
                style={inputStyle}
              />
              <button onClick={() => handleArrayRemove('services', 'items', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('services', 'items', { icon: '', title: '', description: '', list: [] })} className="btn-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)', background: 'white' }}>+ Add Service</button>
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
          <h4>Industry Cards</h4>
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

      {activeTab === 'whyUs' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.whyUs?.eyebrow} onChange={(e) => updateField('whyUs', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.whyUs?.title} onChange={(e) => updateField('whyUs', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.whyUs?.description} onChange={(e) => updateField('whyUs', 'description', e.target.value)} rows={2} style={inputStyle} />
          <h4>Advantage Cards</h4>
          {(data.whyUs?.items || []).map((item: any, idx: number) => (
            <div key={idx} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <input value={item.icon} onChange={(e) => handleArrayItemChange('whyUs', 'items', idx, 'icon', e.target.value)} placeholder="Icon" style={{ ...inputStyle, flex: 1 }} />
              <input value={item.title} onChange={(e) => handleArrayItemChange('whyUs', 'items', idx, 'title', e.target.value)} placeholder="Title" style={{ ...inputStyle, flex: 2 }} />
              <button onClick={() => handleArrayRemove('whyUs', 'items', idx)}>✕</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('whyUs', 'items', { icon: '', title: '' })} className="btn-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)', background: 'white' }}>+ Add Advantage</button>
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
          <h4>Process Steps</h4>
          {(data.process?.steps || []).map((step: any, idx: number) => (
            <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
              <input value={step.title} onChange={(e) => handleArrayItemChange('process', 'steps', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
              <textarea value={step.text} onChange={(e) => handleArrayItemChange('process', 'steps', idx, 'text', e.target.value)} placeholder="Description" rows={3} style={inputStyle} />
              <button onClick={() => handleArrayRemove('process', 'steps', idx)}>Remove</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('process', 'steps', { title: '', text: '' })} className="btn-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)', background: 'white' }}>+ Add Step</button>
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
        Save Services Page
      </button>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block', marginBottom: 4, fontWeight: 600, fontSize: 14, color: 'var(--text)',
};