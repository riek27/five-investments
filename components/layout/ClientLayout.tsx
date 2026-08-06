'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Link from 'next/link';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isAdmin = pathname.startsWith('/admin');

  // For admin pages (except the login page), we check authentication
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    if (isAdmin && pathname !== '/admin') {
      const auth = localStorage.getItem('admin-auth');
      if (auth === 'true') {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.replace('/admin');
      }
    } else if (isAdmin && pathname === '/admin') {
      // No auth check on login page itself
      setIsAuthenticated(null);
    } else {
      setIsAuthenticated(null);
    }
  }, [pathname, isAdmin, router]);

  const handleLogout = () => {
    localStorage.removeItem('admin-auth');
    setIsAuthenticated(false);
    router.push('/admin');
  };

  // Admin login page – render without sidebar
  if (isAdmin && pathname === '/admin') {
    return <>{children}</>;
  }

  // Admin pages that require authentication – show loading until auth check completes
  if (isAdmin && isAuthenticated === null) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading…</div>;
  }

  // Admin pages – authenticated
  if (isAdmin && isAuthenticated === true) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        <aside
          style={{
            width: '250px',
            background: '#0F172A',
            color: 'white',
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <h2
            style={{
              fontFamily: 'DM Serif Display',
              fontSize: '20px',
              marginBottom: '20px',
              color: '#FBBF24',
            }}
          >
            Admin Panel
          </h2>
          <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { href: '/admin/homepage', label: 'Homepage', icon: '🏠' },
              { href: '/admin/about', label: 'About', icon: '📖' },
              { href: '/admin/services', label: 'Services', icon: '⚙️' },
              { href: '/admin/investments', label: 'Investments', icon: '💰' },
              { href: '/admin/activities', label: 'Activities', icon: '📋' },
              { href: '/admin/why-us', label: 'Why Us', icon: '⭐' },
              { href: '/admin/legal', label: 'Legal', icon: '📜' },
              { href: '/admin/contact', label: 'Contact', icon: '✉️' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 16px',
                  borderRadius: '8px',
                  color: pathname === link.href ? '#FBBF24' : 'rgba(255,255,255,0.7)',
                  backgroundColor: pathname === link.href ? 'rgba(251,191,36,0.2)' : 'transparent',
                  fontWeight: pathname === link.href ? 700 : 400,
                  textDecoration: 'none',
                }}
              >
                <span>{link.icon}</span> {link.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            style={{
              marginTop: 'auto',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: 'white',
              padding: '10px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            🔒 Logout
          </button>
        </aside>
        <main style={{ flex: 1, padding: '32px', background: '#f8fafc' }}>
          {children}
        </main>
      </div>
    );
  }

  // Public pages (non‑admin)
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}