'use client';

import { useState, useEffect, useRef } from 'react';

export default function AdminLegalPage() {
  const [data, setData] = useState<any>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('hero');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/legal')
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const handleSave = async () => {
    const res = await fetch('/api/legal', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setMessage(res.ok ? 'Legal page updated!' : 'Save failed.');
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
    'hero', 'intro', 'legalDocs', 'companyRegistrations', 'complianceStandards',
    'procurementStandards', 'hseCommitment', 'corporateGovernance', 'companyPolicies',
    'faq', 'downloadCenter', 'contactVerification'
  ];

  return (
    <div>
      <h1 style={{ fontFamily: 'DM Serif Display', marginBottom: 24 }}>Edit Legal Page</h1>
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
            <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)', background: 'white' }}>Upload Image</button>
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

      {activeTab === 'legalDocs' && (
  <div>
    <label style={labelStyle}>Eyebrow</label>
    <input value={data.legalDocs?.eyebrow} onChange={(e) => updateField('legalDocs', 'eyebrow', e.target.value)} style={inputStyle} />
    <label style={labelStyle}>Title</label>
    <input value={data.legalDocs?.title} onChange={(e) => updateField('legalDocs', 'title', e.target.value)} style={inputStyle} />
    <label style={labelStyle}>Description</label>
    <textarea value={data.legalDocs?.description} onChange={(e) => updateField('legalDocs', 'description', e.target.value)} rows={2} style={inputStyle} />

    <h4 style={{ margin: '20px 0 10px' }}>Document Cards</h4>
    {(data.legalDocs?.items || []).map((item: any, idx: number) => (
      <div key={idx} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom: '16px' }}>
        <input value={item.icon} onChange={(e) => handleArrayItemChange('legalDocs', 'items', idx, 'icon', e.target.value)} placeholder="Icon (FontAwesome without fa-)" style={inputStyle} />
        <input value={item.title} onChange={(e) => handleArrayItemChange('legalDocs', 'items', idx, 'title', e.target.value)} placeholder="Title" style={inputStyle} />
        <textarea value={item.text} onChange={(e) => handleArrayItemChange('legalDocs', 'items', idx, 'text', e.target.value)} placeholder="Description" rows={2} style={inputStyle} />
        <input value={item.number} onChange={(e) => handleArrayItemChange('legalDocs', 'items', idx, 'number', e.target.value)} placeholder="Number/ID" style={inputStyle} />

        {/* File upload with unique ID */}
        <label style={labelStyle}>File path / Upload</label>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
          <input
            value={item.file}
            onChange={(e) => handleArrayItemChange('legalDocs', 'items', idx, 'file', e.target.value)}
            placeholder="File URL"
            style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
          />
          <input
            type="file"
            id={`legaldoc-file-${idx}`}
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
                    handleArrayItemChange('legalDocs', 'items', idx, 'file', result.url);
                    setMessage('File uploaded! Click Save to keep it.');
                  }
                })
                .catch(() => setMessage('Upload failed.'));
            }}
          />
          <button
            type="button"
            onClick={() => document.getElementById(`legaldoc-file-${idx}`)?.click()}
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
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>
            Current file: <a href={item.file} target="_blank">{item.file}</a>
          </p>
        )}

        <button
          onClick={() => handleArrayRemove('legalDocs', 'items', idx)}
          style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Remove
        </button>
      </div>
    ))}
    <button
      onClick={() => handleArrayAdd('legalDocs', 'items', { icon: '', title: '', text: '', number: '', file: '' })}
      className="btn-outline"
      style={{
        marginTop: '8px',
        borderColor: 'var(--primary)',
        color: 'var(--primary)',
        background: 'white',
      }}
    >
      + Add Document
    </button>
  </div>
)}

      {activeTab === 'companyRegistrations' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.companyRegistrations?.eyebrow} onChange={(e) => updateField('companyRegistrations', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.companyRegistrations?.title} onChange={(e) => updateField('companyRegistrations', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.companyRegistrations?.description} onChange={(e) => updateField('companyRegistrations', 'description', e.target.value)} rows={2} style={inputStyle} />
          <h4>Registration Items</h4>
          {(data.companyRegistrations?.items || []).map((item: any, idx: number) => (
            <div key={idx} style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
              <input value={item.label} onChange={(e) => handleArrayItemChange('companyRegistrations', 'items', idx, 'label', e.target.value)} placeholder="Label" style={{ ...inputStyle, flex: 1 }} />
              <input value={item.value} onChange={(e) => handleArrayItemChange('companyRegistrations', 'items', idx, 'value', e.target.value)} placeholder="Value" style={{ ...inputStyle, flex: 1 }} />
              <button onClick={() => handleArrayRemove('companyRegistrations', 'items', idx)}>✕</button>
            </div>
          ))}
          <button onClick={() => handleArrayAdd('companyRegistrations', 'items', { label: '', value: '' })} className="btn-outline" style={{ borderColor: 'var(--primary)', color: 'var(--primary)', background: 'white' }}>+ Add Registration</button>
        </div>
      )}

      {activeTab === 'complianceStandards' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.complianceStandards?.eyebrow} onChange={(e) => updateField('complianceStandards', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.complianceStandards?.title} onChange={(e) => updateField('complianceStandards', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Description</label>
          <textarea value={data.complianceStandards?.description} onChange={(e) => updateField('complianceStandards', 'description', e.target.value)} rows={2} style={inputStyle} />
          <label style={labelStyle}>Standards (one per line)</label>
          <textarea
            value={data.complianceStandards?.items?.join('\n')}
            onChange={(e) => updateField('complianceStandards', 'items', e.target.value.split('\n'))}
            rows={6}
            style={inputStyle}
          />
        </div>
      )}

      {activeTab === 'procurementStandards' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.procurementStandards?.eyebrow} onChange={(e) => updateField('procurementStandards', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.procurementStandards?.title} onChange={(e) => updateField('procurementStandards', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Text</label>
          <textarea value={data.procurementStandards?.text} onChange={(e) => updateField('procurementStandards', 'text', e.target.value)} rows={6} style={inputStyle} />
        </div>
      )}

      {activeTab === 'hseCommitment' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.hseCommitment?.eyebrow} onChange={(e) => updateField('hseCommitment', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.hseCommitment?.title} onChange={(e) => updateField('hseCommitment', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Items (one per line)</label>
          <textarea
            value={data.hseCommitment?.items?.join('\n')}
            onChange={(e) => updateField('hseCommitment', 'items', e.target.value.split('\n'))}
            rows={6}
            style={inputStyle}
          />
        </div>
      )}

      {activeTab === 'corporateGovernance' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.corporateGovernance?.eyebrow} onChange={(e) => updateField('corporateGovernance', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.corporateGovernance?.title} onChange={(e) => updateField('corporateGovernance', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Items (one per line)</label>
          <textarea
            value={data.corporateGovernance?.items?.join('\n')}
            onChange={(e) => updateField('corporateGovernance', 'items', e.target.value.split('\n'))}
            rows={6}
            style={inputStyle}
          />
        </div>
      )}

      {activeTab === 'companyPolicies' && (
  <div>
    <label style={labelStyle}>Eyebrow</label>
    <input value={data.companyPolicies?.eyebrow} onChange={(e) => updateField('companyPolicies', 'eyebrow', e.target.value)} style={inputStyle} />
    <label style={labelStyle}>Title</label>
    <input value={data.companyPolicies?.title} onChange={(e) => updateField('companyPolicies', 'title', e.target.value)} style={inputStyle} />
    <label style={labelStyle}>Description</label>
    <textarea value={data.companyPolicies?.description} onChange={(e) => updateField('companyPolicies', 'description', e.target.value)} rows={2} style={inputStyle} />

    <h4 style={{ margin: '20px 0 10px' }}>Policy Cards</h4>
    {(data.companyPolicies?.items || []).map((item: any, idx: number) => (
      <div key={idx} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom: '16px' }}>
        <input
          value={item.title}
          onChange={(e) => handleArrayItemChange('companyPolicies', 'items', idx, 'title', e.target.value)}
          placeholder="Policy Title"
          style={inputStyle}
        />

        {/* File upload with unique ID */}
        <label style={labelStyle}>File path / Upload</label>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
          <input
            value={item.file}
            onChange={(e) => handleArrayItemChange('companyPolicies', 'items', idx, 'file', e.target.value)}
            placeholder="File URL"
            style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
          />
          <input
            type="file"
            id={`policy-file-${idx}`}
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
                    handleArrayItemChange('companyPolicies', 'items', idx, 'file', result.url);
                    setMessage('File uploaded! Click Save to keep it.');
                  }
                })
                .catch(() => setMessage('Upload failed.'));
            }}
          />
          <button
            type="button"
            onClick={() => document.getElementById(`policy-file-${idx}`)?.click()}
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
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>
            Current file: <a href={item.file} target="_blank" style={{ color: 'var(--primary)' }}>{item.file}</a>
          </p>
        )}

        <button
          onClick={() => handleArrayRemove('companyPolicies', 'items', idx)}
          style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Remove
        </button>
      </div>
    ))}
    <button
      onClick={() => handleArrayAdd('companyPolicies', 'items', { title: '', file: '' })}
      className="btn-outline"
      style={{
        marginTop: '8px',
        borderColor: 'var(--primary)',
        color: 'var(--primary)',
        background: 'white',
      }}
    >
      + Add Policy
    </button>
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

      {activeTab === 'downloadCenter' && (
  <div>
    <label style={labelStyle}>Eyebrow</label>
    <input value={data.downloadCenter?.eyebrow} onChange={(e) => updateField('downloadCenter', 'eyebrow', e.target.value)} style={inputStyle} />
    <label style={labelStyle}>Title</label>
    <input value={data.downloadCenter?.title} onChange={(e) => updateField('downloadCenter', 'title', e.target.value)} style={inputStyle} />
    <label style={labelStyle}>Description</label>
    <textarea value={data.downloadCenter?.description} onChange={(e) => updateField('downloadCenter', 'description', e.target.value)} rows={2} style={inputStyle} />

    <h4 style={{ margin: '20px 0 10px' }}>Download Items</h4>
    {(data.downloadCenter?.items || []).map((item: any, idx: number) => (
      <div key={idx} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', marginBottom: '16px' }}>
        <input
          value={item.title}
          onChange={(e) => handleArrayItemChange('downloadCenter', 'items', idx, 'title', e.target.value)}
          placeholder="Item Title"
          style={inputStyle}
        />

        {/* File upload with unique ID */}
        <label style={labelStyle}>File path / Upload</label>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
          <input
            value={item.file}
            onChange={(e) => handleArrayItemChange('downloadCenter', 'items', idx, 'file', e.target.value)}
            placeholder="File URL"
            style={{ ...inputStyle, flex: 1, marginBottom: 0 }}
          />
          <input
            type="file"
            id={`download-file-${idx}`}
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
                    handleArrayItemChange('downloadCenter', 'items', idx, 'file', result.url);
                    setMessage('File uploaded! Click Save to keep it.');
                  }
                })
                .catch(() => setMessage('Upload failed.'));
            }}
          />
          <button
            type="button"
            onClick={() => document.getElementById(`download-file-${idx}`)?.click()}
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
          <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '8px' }}>
            Current file: <a href={item.file} target="_blank" style={{ color: 'var(--primary)' }}>{item.file}</a>
          </p>
        )}

        <button
          onClick={() => handleArrayRemove('downloadCenter', 'items', idx)}
          style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          Remove
        </button>
      </div>
    ))}
    <button
      onClick={() => handleArrayAdd('downloadCenter', 'items', { title: '', file: '' })}
      className="btn-outline"
      style={{
        marginTop: '8px',
        borderColor: 'var(--primary)',
        color: 'var(--primary)',
        background: 'white',
      }}
    >
      + Add Download
    </button>
  </div>
)}

      {activeTab === 'contactVerification' && (
        <div>
          <label style={labelStyle}>Eyebrow</label>
          <input value={data.contactVerification?.eyebrow} onChange={(e) => updateField('contactVerification', 'eyebrow', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Title</label>
          <input value={data.contactVerification?.title} onChange={(e) => updateField('contactVerification', 'title', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Text</label>
          <textarea value={data.contactVerification?.text} onChange={(e) => updateField('contactVerification', 'text', e.target.value)} rows={4} style={inputStyle} />
          <label style={labelStyle}>Button 1 Text</label>
          <input value={data.contactVerification?.button1Text} onChange={(e) => updateField('contactVerification', 'button1Text', e.target.value)} style={inputStyle} />
          <label style={labelStyle}>Button 2 Text</label>
          <input value={data.contactVerification?.button2Text} onChange={(e) => updateField('contactVerification', 'button2Text', e.target.value)} style={inputStyle} />
        </div>
      )}

      <button onClick={handleSave} className="btn-primary" style={{ marginTop: 20, width: '100%', padding: 14, fontSize: 15 }}>
        Save Legal Page
      </button>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block', marginBottom: 4, fontWeight: 600, fontSize: 14, color: 'var(--text)',
};