import { createClient } from 'redis';
import Link from 'next/link';

let redis: any;

async function getClient() {
  if (!redis) {
    redis = await createClient({ url: process.env.REDIS_URL }).connect();
  }
  return redis;
}

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  const client = await getClient();
  const raw = await client.get('services');
  const data: any = raw ? JSON.parse(raw) : null;

  if (!data) return <div style={{ padding: 80, textAlign: 'center' }}>Error loading page</div>;

  const hero = data.hero || {};
  const intro = data.intro || {};
  const services = data.services || {};
  const industries = data.industries || {};
  const whyUs = data.whyUs || {};
  const process = data.process || {};
  const faq = data.faq || {};
  const cta = data.callToAction || {};
  // … existing JSX

  return (
    <>
      {/* … keep the existing JSX exactly as is */}
      {/* Hero */}
      <section style={{
        backgroundImage: `url(${hero.backgroundImage || '/images/services-hero.jpg'})`,
        backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '55vh',
        display: 'flex', alignItems: 'center', position: 'relative', color: 'white',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,23,42,0.85), rgba(15,23,42,0.6))' }} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2, maxWidth: 780, margin: '0 auto', textAlign: 'center' }}>
          <span className="eyebrow" style={{ color: 'var(--primary-light)' }}>{hero.eyebrow}</span>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(34px, 5vw, 56px)' }}>{hero.title}</h1>
          <p style={{ opacity: 0.9, fontSize: 17, marginBottom: 24 }}>{hero.subtitle}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary">Request a Quote</Link>
            <Link href="/contact" className="btn-outline">Contact Our Team</Link>
          </div>
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

      {/* Detailed Service Cards */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{services.eyebrow}</span>
          <h2 className="section-title">{services.title}</h2>
          <p className="section-sub">{services.description}</p>
        </div>
        <div className="grid-3">
          {(services.items || []).map((item: any, idx: number) => (
            <div key={idx} className="card reveal" style={{ borderTop: '4px solid var(--primary)', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 40, display: 'block', marginBottom: 12 }}>{item.icon}</span>
              <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{item.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6, flex: 1 }}>{item.description}</p>
              {item.list && (
                <ul style={{ listStyle: 'none', padding: 0, marginTop: 12 }}>
                  {item.list.map((li: string, i: number) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, fontSize: 14 }}>
                      <span style={{ color: 'var(--primary)', fontWeight: 700 }}>•</span> {li}
                    </li>
                  ))}
                </ul>
              )}
              <Link href="/contact" className="btn-outline" style={{ marginTop: 16, borderColor: 'var(--primary)', color: 'var(--primary)', alignSelf: 'flex-start' }}>
                Request Quote
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="section-cream">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{industries.eyebrow}</span>
          <h2 className="section-title">{industries.title}</h2>
          <p className="section-sub">{industries.description}</p>
        </div>
        <div className="grid-4">
          {(industries.items || []).map((item: any, idx: number) => (
            <div key={idx} className="card reveal text-center" style={{ borderBottom: '4px solid var(--primary)' }}>
              <span style={{ fontSize: 30, display: 'block', marginBottom: 10 }}>{item.icon}</span>
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16 }}>{item.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{whyUs.eyebrow}</span>
          <h2 className="section-title">{whyUs.title}</h2>
          <p className="section-sub">{whyUs.description}</p>
        </div>
        <div className="grid-4">
          {(whyUs.items || []).map((item: any, idx: number) => (
            <div key={idx} className="card reveal text-center" style={{ borderTop: '4px solid var(--gold)' }}>
              <span style={{ fontSize: 30, display: 'block', marginBottom: 10 }}>{item.icon}</span>
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16 }}>{item.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Service Delivery Process */}
      <section className="section-light">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{process.eyebrow}</span>
          <h2 className="section-title">{process.title}</h2>
          <p className="section-sub">{process.description}</p>
        </div>
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 28, top: 0, bottom: 0, width: 2, background: 'var(--primary)', opacity: 0.2 }} />
          {(process.steps || []).map((step: any, idx: number) => (
            <div key={idx} className="reveal" style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', background: 'var(--primary)', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 20,
                boxShadow: '0 6px 18px rgba(217,119,6,0.4)', flexShrink: 0, zIndex: 1,
              }}>
                {idx + 1}
              </div>
              <div style={{ paddingTop: 14 }}>
                <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{step.title}</h4>
                <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: 'var(--bg)' }}>
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

      {/* Call to Action */}
      <section className="section-dark" style={{ textAlign: 'center', padding: '80px 30px' }}>
        <div className="reveal">
          <h2 className="section-title" style={{ color: 'white' }}>{cta.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '0 auto 30px', fontSize: 16 }}>{cta.text}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-gold">{cta.button1Text}</Link>
            <Link href="/contact" className="btn-outline">{cta.button2Text}</Link>
          </div>
        </div>
      </section>
    </>
  );
}