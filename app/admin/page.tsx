'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      // Store authentication flag in localStorage
      localStorage.setItem('admin-auth', 'true');
      // Redirect to the hero editor (or dashboard)
      router.push('/admin/hero');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#f1f5f9',
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '16px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          width: '350px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontFamily: 'DM Serif Display, serif', marginBottom: '20px', color: 'var(--navy)' }}>
          Admin Login
        </h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            marginBottom: '12px',
            fontSize: '14px',
          }}
        />
        {error && <p style={{ color: 'red', fontSize: '13px', marginBottom: '8px' }}>{error}</p>}
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            background: 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: '999px',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}