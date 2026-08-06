'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminHeroPage() {
  const [form, setForm] = useState({
    tagline: '',
    heading: '',
    subheading: '',
    backgroundImage: '',
    stats: [{ number: '', label: '' }],
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadHero();
  }, []);

  const loadHero = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/hero');
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setForm({
        tagline: data.tagline || '',
        heading: data.heading || '',
        subheading: data.subheading || '',
        backgroundImage: data.backgroundImage || '',
        stats: data.stats || [{ number: '', label: '' }],
      });
    } catch (err: any) {
      setError(err.message || 'Could not load hero data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/hero', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setMessage('Hero updated successfully!');
    } else {
      setMessage('Update failed.');
    }
  };

  const handleStatChange = (index: number, field: 'number' | 'label', value: string) => {
    const newStats = [...form.stats];
    newStats[index][field] = value;
    setForm({ ...form, stats: newStats });
  };

  const addStat = () => setForm({ ...form, stats: [...form.stats, { number: '', label: '' }] });
  const removeStat = (index: number) => {
    if (form.stats.length <= 1) return;
    setForm({ ...form, stats: form.stats.filter((_, i) => i !== index) });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const uploadForm = new FormData();
    uploadForm.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: uploadForm });
      const data = await res.json();
      if (data.url) {
        setForm({ ...form, backgroundImage: data.url });
        setMessage('Image uploaded!');
      } else {
        setMessage('Upload failed');
      }
    } catch {
      setMessage('Upload failed');
    }
    setUploading(false);
  };

  return (
    <div>
      <h1 style={{ fontFamily: 'DM Serif Display, serif', marginBottom: '24px', color: 'var(--navy)' }}>
        Edit Hero Section
      </h1>
      {loading && <p>Loading hero data…</p>}
      {error && (
        <div style={{ color: 'red', marginBottom: '16px' }}>
          <p>{error}</p>
          <button onClick={loadHero} className="btn-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>Retry</button>
        </div>
      )}
      {message && (
        <p style={{ color: message.includes('success') || message.includes('uploaded') ? 'green' : 'red', marginBottom: '16px' }}>{message}</p>
      )}
      {!loading && !error && (
        <form onSubmit={handleSubmit}>
          <label style={labelStyle}>Tagline</label>
          <input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} style={inputStyle} />
          <label style={labelStyle}>Heading (use \n for line break)</label>
          <textarea value={form.heading} onChange={(e) => setForm({ ...form, heading: e.target.value })} rows={3} style={inputStyle} />
          <label style={labelStyle}>Subheading</label>
          <textarea value={form.subheading} onChange={(e) => setForm({ ...form, subheading: e.target.value })} rows={4} style={inputStyle} />
          <label style={labelStyle}>Background Image</label>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
            <input value={form.backgroundImage} onChange={(e) => setForm({ ...form, backgroundImage: e.target.value })} placeholder="Image URL (or upload below)" style={{ ...inputStyle, marginBottom: 0 }} />
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileUpload} style={{ display: 'none' }} />
            <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-outline" style={{ whiteSpace: 'nowrap', borderColor: 'var(--primary)', color: 'var(--primary)' }}>
              {uploading ? 'Uploading…' : 'Upload Image'}
            </button>
          </div>
          {form.backgroundImage && (
            <div style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '13px', color: 'var(--muted)' }}>Preview:</p>
              <img src={form.backgroundImage} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '12px', border: '1px solid var(--border)' }} />
            </div>
          )}
          <h3 style={{ margin: '20px 0 10px', fontFamily: 'Manrope, sans-serif', color: 'var(--navy)' }}>Stats</h3>
          {form.stats.map((stat, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '10px', marginBottom: '8px', alignItems: 'center' }}>
              <input value={stat.number} onChange={(e) => handleStatChange(idx, 'number', e.target.value)} placeholder="Number (e.g. 11+)" style={{ ...inputStyle, flex: 1, marginBottom: 0 }} />
              <input value={stat.label} onChange={(e) => handleStatChange(idx, 'label', e.target.value)} placeholder="Label" style={{ ...inputStyle, flex: 2, marginBottom: 0 }} />
              <button type="button" onClick={() => removeStat(idx)} style={removeBtnStyle}>✕</button>
            </div>
          ))}
          <button type="button" onClick={addStat} className="btn-outline" style={{ marginTop: '8px', borderColor: 'var(--primary)', color: 'var(--primary)' }}>+ Add Stat</button>
          <br /><br />
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>Save Hero</button>
        </form>
      )}
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
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  marginBottom: '16px',
  borderRadius: '12px',
  border: '1.5px solid #e5e7eb',
  fontSize: '14px',
  fontFamily: 'inherit',
};
const removeBtnStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: 'var(--primary)',
  cursor: 'pointer',
  fontSize: '18px',
  padding: '0 8px',
};