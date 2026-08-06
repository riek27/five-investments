import { kv } from '@vercel/kv';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function LegalPage() {
  const data: any = await kv.get('legal');
  if (!data) return <div style={{ padding: 80, textAlign: 'center' }}>Error loading page</div>;

  const hero = data.hero || {};
  const intro = data.intro || {};
  const legalDocs = data.legalDocs || {};
  const companyRegistrations = data.companyRegistrations || {};
  const complianceStandards = data.complianceStandards || {};
  const procurementStandards = data.procurementStandards || {};
  const hseCommitment = data.hseCommitment || {};
  const corporateGovernance = data.corporateGovernance || {};
  const companyPolicies = data.companyPolicies || {};
  const faq = data.faq || {};
  const downloadCenter = data.downloadCenter || {};
  const contactVerification = data.contactVerification || {};

  return (
    <>
      {/* Hero */}
      <section style={{
        backgroundImage: `url(${hero.backgroundImage || '/images/legal-hero.jpg'})`,
        backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '50vh',
        display: 'flex', alignItems: 'center', position: 'relative', color: 'white',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,23,42,0.85), rgba(15,23,42,0.6))' }} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2, maxWidth: 780, margin: '0 auto', textAlign: 'center' }}>
          <span className="eyebrow" style={{ color: 'var(--primary-light)' }}>{hero.eyebrow}</span>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(34px, 5vw, 56px)' }}>{hero.title}</h1>
          <p style={{ opacity: 0.9, fontSize: 17 }}>{hero.subtitle}</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="section-light" style={{ textAlign: 'center' }}>
        <div className="reveal" style={{ maxWidth: 800, margin: '0 auto' }}>
          <span className="eyebrow">{intro.eyebrow}</span>
          <h2 className="section-title">{intro.title}</h2>
          <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.8 }}>{intro.text}</p>
        </div>
      </section>

      {/* Legal Documents & Certifications (Credential Cards) */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{legalDocs.eyebrow}</span>
          <h2 className="section-title">{legalDocs.title}</h2>
          <p className="section-sub">{legalDocs.description}</p>
        </div>
        <div className="grid-3">
          {(legalDocs.items || []).map((item: any, idx: number) => (
            <div key={idx} className="card reveal" style={{ borderTop: '4px solid var(--primary)', display: 'flex', flexDirection: 'column' }}>
              <div className="cred-icon" style={{ fontSize: 32, color: 'var(--primary)', marginBottom: 12 }}>
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{item.title}</h4>
              <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.5, flex: 1 }}>{item.text}</p>
              <span className="cred-number" style={{
                display: 'inline-block', background: '#FEF3C7', color: 'var(--primary-dark)',
                padding: '2px 14px', borderRadius: '999px', fontSize: 12, fontWeight: 700,
                margin: '12px 0',
              }}>{item.number}</span>
              {item.file && (
                <a href={item.file} download className="btn-download" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '8px 18px', borderRadius: '999px', background: 'var(--primary)',
                  color: 'white', fontSize: 13, fontWeight: 600, textDecoration: 'none',
                  marginTop: 'auto',
                }}><i className="fa-solid fa-download"></i> Download Profile</a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Company Registrations */}
      <section className="section-cream">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{companyRegistrations.eyebrow}</span>
          <h2 className="section-title">{companyRegistrations.title}</h2>
          <p className="section-sub">{companyRegistrations.description}</p>
        </div>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          {(companyRegistrations.items || []).map((item: any, idx: number) => (
            <div key={idx} className="reveal" style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              background: 'white', borderRadius: 'var(--radius-md)', padding: '16px 24px',
              marginBottom: 12, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)',
            }}>
              <span style={{ fontWeight: 600, color: 'var(--navy)' }}>{item.label}</span>
              <span style={{ color: 'var(--primary)', fontWeight: 700, fontFamily: 'Space Grotesk, sans-serif' }}>{item.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance Standards */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{complianceStandards.eyebrow}</span>
          <h2 className="section-title">{complianceStandards.title}</h2>
          <p className="section-sub">{complianceStandards.description}</p>
        </div>
        <div className="grid-4">
          {(complianceStandards.items || []).map((item: string, idx: number) => (
            <div key={idx} className="card reveal text-center" style={{ borderLeft: '4px solid var(--primary)' }}>
              <span style={{ fontSize: 24, display: 'block', marginBottom: 8 }}>✔️</span>
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16 }}>{item}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Procurement & Contracting Standards */}
      <section className="section-light">
        <div className="reveal" style={{ maxWidth: 800, margin: '0 auto' }}>
          <span className="eyebrow">{procurementStandards.eyebrow}</span>
          <h2 className="section-title">{procurementStandards.title}</h2>
          <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.8 }}>{procurementStandards.text}</p>
        </div>
      </section>

      {/* HSE Commitment */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{hseCommitment.eyebrow}</span>
          <h2 className="section-title">{hseCommitment.title}</h2>
        </div>
        <div className="grid-3">
          {(hseCommitment.items || []).map((item: string, idx: number) => (
            <div key={idx} className="card reveal" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color: 'var(--primary)', fontSize: 20 }}>🛡️</span>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 500 }}>{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Governance */}
      <section className="section-cream">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{corporateGovernance.eyebrow}</span>
          <h2 className="section-title">{corporateGovernance.title}</h2>
        </div>
        <div className="grid-3">
          {(corporateGovernance.items || []).map((item: string, idx: number) => (
            <div key={idx} className="card reveal" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ color: 'var(--primary)', fontSize: 20 }}>📊</span>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 500 }}>{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Company Policies (Downloadable Cards) */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{companyPolicies.eyebrow}</span>
          <h2 className="section-title">{companyPolicies.title}</h2>
          <p className="section-sub">{companyPolicies.description}</p>
        </div>
        <div className="grid-4">
          {(companyPolicies.items || []).map((item: any, idx: number) => (
            <div key={idx} className="card reveal text-center" style={{ borderTop: '4px solid var(--gold)' }}>
              <span style={{ fontSize: 28, display: 'block', marginBottom: 10 }}>📄</span>
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 12 }}>{item.title}</h4>
              <a href={item.file} download className="btn-download" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '8px 18px', borderRadius: '999px', background: 'var(--primary)',
                color: 'white', fontSize: 13, fontWeight: 600, textDecoration: 'none',
              }}><i className="fa-solid fa-download"></i> Download</a>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-light">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{faq.eyebrow}</span>
          <h2 className="section-title">{faq.title}</h2>
        </div>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {(faq.items || []).map((item: any, idx: number) => (
            <div key={idx} className="reveal" style={{
              background: 'white', borderRadius: 'var(--radius-md)', padding: '20px 24px',
              marginBottom: 16, border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)',
            }}>
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{item.question}</h4>
              <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Download Center */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{downloadCenter.eyebrow}</span>
          <h2 className="section-title">{downloadCenter.title}</h2>
          <p className="section-sub">{downloadCenter.description}</p>
        </div>
        <div className="grid-4">
          {(downloadCenter.items || []).map((item: any, idx: number) => (
            <div key={idx} className="card reveal text-center" style={{ borderBottom: '4px solid var(--primary)' }}>
              <span style={{ fontSize: 28, display: 'block', marginBottom: 10 }}>📁</span>
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 12 }}>{item.title}</h4>
              <a href={item.file} download className="btn-download" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '8px 18px', borderRadius: '999px', background: 'var(--primary)',
                color: 'white', fontSize: 13, fontWeight: 600, textDecoration: 'none',
              }}><i className="fa-solid fa-download"></i> Download</a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact for Verification */}
      <section className="section-dark" style={{ textAlign: 'center', padding: '80px 30px' }}>
        <div className="reveal">
          <span className="eyebrow" style={{ color: 'var(--primary-light)' }}>{contactVerification.eyebrow}</span>
          <h2 className="section-title" style={{ color: 'white' }}>{contactVerification.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '0 auto 30px', fontSize: 16 }}>{contactVerification.text}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-gold">{contactVerification.button1Text}</Link>
            <Link href="/contact" className="btn-outline">{contactVerification.button2Text}</Link>
          </div>
        </div>
      </section>
    </>
  );
}