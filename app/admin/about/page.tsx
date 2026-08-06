'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminAboutPage() {
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/about')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/about', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (res.ok) setMessage('About page updated!');
    else setMessage('Save failed.');
  };

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

  const handleImageUpload = async (section: string, field: string) => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const result = await res.json();
      if (result.url) {
        updateField(section, field, result.url);
        setMessage('Image uploaded!');
      }
    } catch (err) {
      setMessage('Upload failed.');
    }
  };

  if (loading) return <div>Loading about data...</div>;
  if (!data) return <div>Error loading data.</div>;

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    marginBottom: '16px',
    borderRadius: '12px',
    border: '1.5px solid #e5e7eb',
    fontSize: '14px',
    fontFamily: 'inherit',
  };

  return (
    <div>
      <h1 style={{ fontFamily: 'DM Serif Display', marginBottom: '24px' }}>Edit About Page</h1>
      {message && <p style={{ color: message.includes('updated') || message.includes('uploaded') ? 'green' : 'red' }}>{message}</p>}

      {/* Hero */}
      <h2>Hero Section</h2>
      <label>Title</label>
      <input value={data.hero?.title} onChange={(e) => updateField('hero', 'title', e.target.value)} style={inputStyle} />
      <label>Subtitle</label>
      <textarea value={data.hero?.subtitle} onChange={(e) => updateField('hero', 'subtitle', e.target.value)} rows={2} style={inputStyle} />
      <label>Background Image URL</label>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input value={data.hero?.backgroundImage} onChange={(e) => updateField('hero', 'backgroundImage', e.target.value)} style={{ ...inputStyle, flex: 1 }} />
        <input type="file" ref={fileInputRef} onChange={() => handleImageUpload('hero', 'backgroundImage')} style={{ display: 'none' }} />
        <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-outline">Upload</button>
      </div>
      {data.hero?.backgroundImage && (
        <img src={data.hero.backgroundImage} style={{ maxWidth: '200px', marginBottom: '16px' }} />
      )}

      {/* About Content */}
      <h2>About Content</h2>
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
      {data.about?.image && (
        <img src={data.about.image} style={{ maxWidth: '200px', marginBottom: '16px' }} />
      )}

      {/* How We Work */}
      <h2>How We Work</h2>
      <label>Eyebrow</label>
      <input value={data.howWeWork?.eyebrow} onChange={(e) => updateField('howWeWork', 'eyebrow', e.target.value)} style={inputStyle} />
      <label>Title</label>
      <input value={data.howWeWork?.title} onChange={(e) => updateField('howWeWork', 'title', e.target.value)} style={inputStyle} />
      <label>Description</label>
      <textarea value={data.howWeWork?.description} onChange={(e) => updateField('howWeWork', 'description', e.target.value)} rows={2} style={inputStyle} />
      <h4>Steps</h4>
      {(data.howWeWork?.steps || []).map((step: any, idx: number) => (
        <div key={idx} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
          <input value={step.icon} onChange={(e) => handleArrayItemChange('howWeWork', 'steps', idx, 'icon', e.target.value)} placeholder="Icon (emoji)" style={inputStyle} />
          <input value={step.title} onChange={(e) => handleArrayItemChange('howWeWork', 'steps', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
          <textarea value={step.text} onChange={(e) => handleArrayItemChange('howWeWork', 'steps', idx, 'text', e.target.value)} placeholder="Text" rows={3} style={inputStyle} />
          <button onClick={() => handleArrayRemove('howWeWork', 'steps', idx)}>Remove</button>
        </div>
      ))}
      <button onClick={() => handleArrayAdd('howWeWork', 'steps', { icon: '', title: '', text: '' })} className="btn-outline">+ Add Step</button>

      {/* Call to Action */}
      <h2>Call to Action</h2>
      <label>Text</label>
      <input value={data.callToAction?.text} onChange={(e) => updateField('callToAction', 'text', e.target.value)} style={inputStyle} />
      <label>Button Text</label>
      <input value={data.callToAction?.buttonText} onChange={(e) => updateField('callToAction', 'buttonText', e.target.value)} style={inputStyle} />
      <label>Button Link (e.g., /contact)</label>
      <input value={data.callToAction?.buttonLink} onChange={(e) => updateField('callToAction', 'buttonLink', e.target.value)} style={inputStyle} />

      <button onClick={handleSave} className="btn-primary" style={{ marginTop: '20px', width: '100%' }}>Save About Page</button>
    </div>
  );
}