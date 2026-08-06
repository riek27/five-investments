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

export default async function AboutPage() {
  const client = await getClient();
  const raw = await client.get('about');
  const data: any = raw ? JSON.parse(raw) : null;

  if (!data) return <div style={{ padding: 80, textAlign: 'center' }}>Error loading page</div>;

  const hero = data.hero || {};
  const about = data.about || {};
  const howWeWork = data.howWeWork || {};
  const cta = data.callToAction || {};
  // … keep the existing return ( … )

  return (
    <>
      {/* … keep the existing JSX exactly as is */}
      {/* ═══════════════ PAGE HERO ═══════════════ */}
      <section
        style={{
          backgroundImage: `url(${hero.backgroundImage || '/images/fivein2.jpeg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          color: 'white',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(15,23,42,0.85) 30%, rgba(15,23,42,0.6) 80%)',
          }}
        />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2, maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
          <span className="eyebrow" style={{ color: 'var(--primary-light)', marginBottom: '8px' }}>
            {hero.eyebrow || 'About Us'}
          </span>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(34px, 5vw, 56px)', marginBottom: '12px' }}>
            {hero.title || 'About Five Investment Limited'}
          </h1>
          <p style={{ opacity: 0.9, fontSize: '17px' }}>
            {hero.subtitle || 'Learn more about our story, values, and how we deliver excellence across multiple sectors.'}
          </p>
        </div>
      </section>

      {/* ═══════════════ ABOUT SECTION (Story, Vision, Mission, Values) ═══════════════ */}
      <section id="about" className="section-light">
        <div className="grid-2">
          {/* Left Column: Text & Cards */}
          <div className="reveal">
            <span className="eyebrow">{about.eyebrow || 'Our Story'}</span>
            <h2 className="section-title">{about.title || 'A Proudly South Sudanese Enterprise'}</h2>

            {/* Incorporation Date */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--primary)',
              color: 'white',
              padding: '8px 20px',
              borderRadius: '999px',
              fontSize: '13px',
              fontWeight: 600,
              marginBottom: '24px',
              boxShadow: '0 4px 12px rgba(217,119,6,0.3)',
            }}>
              <i className="fa-regular fa-calendar"></i> Incorporated on {about.incorporationDate || '17th October 2013'}
            </div>

            {/* Background & Profile Card */}
            <div className="card" style={{ borderLeft: '4px solid var(--primary)', marginBottom: '24px' }}>
              <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', color: 'var(--navy)', marginBottom: '12px' }}>
                Background &amp; Profile
              </h4>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--text)' }}>
                {about.backgroundText}
              </p>
              <div className="five-list" style={{ marginTop: '16px' }}>
                {(about.fivePillars || []).map((item: string, idx: number) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      gridColumn: idx === 4 ? 'span 2' : 'auto',
                      padding: '4px 0',
                    }}
                  >
                    <span style={{
                      background: 'var(--primary)',
                      color: 'white',
                      width: '22px',
                      height: '22px',
                      borderRadius: '50%',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 700,
                      flexShrink: 0,
                    }}>
                      {idx + 1}
                    </span>
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Currently Engaged Pills */}
            <div style={{
              background: 'var(--primary)',
              color: 'white',
              borderRadius: 'var(--radius-md)',
              padding: '16px 20px',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
              boxShadow: 'var(--shadow-sm)',
            }}>
              <span style={{ fontWeight: 700, fontSize: '14px', letterSpacing: '0.5px' }}>⚡ Currently Engaged In:</span>
              {(about.currentlyEngaged || []).map((item: string, idx: number) => (
                <span
                  key={idx}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '6px 16px',
                    borderRadius: '999px',
                    fontSize: '13px',
                    fontWeight: 500,
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>

            {/* Motto Card */}
            <div style={{
              background: 'var(--navy)',
              color: 'var(--gold)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              textAlign: 'center',
              marginBottom: '24px',
              boxShadow: 'var(--shadow-md)',
            }}>
              <span style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '1px', display: 'block' }}>
                &quot;{about.mottoText}&quot;
              </span>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '8px', lineHeight: 1.6 }}>
                {about.mottoDescription}
              </p>
            </div>

            {/* Vision, Mission, Core Values Cards in a Grid */}
            <div className="vision-grid">
              <div className="card reveal text-center" style={{ borderTop: '4px solid var(--primary)' }}>
                <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>👁️</span>
                <h5 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: 'var(--primary)', marginBottom: '8px' }}>
                  Vision
                </h5>
                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>{about.vision}</p>
              </div>
              <div className="card reveal text-center" style={{ borderTop: '4px solid var(--gold)' }}>
                <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>🎯</span>
                <h5 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: 'var(--gold)', marginBottom: '8px' }}>
                  Mission
                </h5>
                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>{about.mission}</p>
              </div>
              <div className="card reveal text-center" style={{ borderTop: '4px solid var(--primary)' }}>
                <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>⭐</span>
                <h5 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '15px', color: 'var(--primary)', marginBottom: '8px' }}>
                  Core Values
                </h5>
                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>
                  {(about.coreValues || []).join(' · ')}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Image + Stat Cards */}
          <div className="reveal">
            <div className="about-image-wrap" style={{ marginBottom: '24px' }}>
              <img
                src={about.image || '/images/about.jpg'}
                alt="Five Investment Limited"
                style={{ width: '100%', height: '400px', objectFit: 'cover' }}
              />
              <div className="img-footer">
                <span><i className="fa-regular fa-building"></i> ESTABLISHED 2013</span>
                <span><i className="fa-regular fa-location-dot"></i> GUDELE 2, JUBA</span>
              </div>
            </div>

            {/* Core Values Pills */}
            <div className="card" style={{ textAlign: 'center' }}>
              <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '18px', marginBottom: '16px', color: 'var(--navy)' }}>
                Our Core Values
              </h4>
              <div className="values-wrap">
                {(about.coreValues || []).map((val: string, idx: number) => (
                  <span
                    key={idx}
                    className="reveal"
                    style={{
                      background: 'var(--light)',
                      padding: '10px 20px',
                      borderRadius: '999px',
                      fontSize: '14px',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: 'var(--shadow-sm)',
                      border: '1px solid var(--border)',
                      transition: '0.3s',
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>
                      {['🤝', '🏛️', '👥', '💬', '❤️'][idx]}
                    </span>
                    {val}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW WE WORK ═══════════════ */}
      <section style={{ background: 'var(--light)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span className="eyebrow">{howWeWork.eyebrow || 'Our Process'}</span>
          <h2 className="section-title">{howWeWork.title || 'How We Work'}</h2>
          <p className="section-sub">{howWeWork.description}</p>
        </div>
        <div className="grid-4">
          {(howWeWork.steps || []).map((step: any, idx: number) => (
            <div
              className="card reveal text-center"
              key={idx}
              style={{
                position: 'relative',
                borderTop: '4px solid var(--primary)',
                transition: '0.3s ease',
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'var(--primary)',
                color: 'white',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '14px',
                boxShadow: '0 4px 12px rgba(217,119,6,0.4)',
              }}>
                {idx + 1}
              </div>
              <span style={{ fontSize: '36px', display: 'block', marginTop: '16px', marginBottom: '12px' }}>
                {step.icon}
              </span>
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '18px', marginBottom: '8px', color: 'var(--navy)' }}>
                {step.title}
              </h4>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6 }}>
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ CALL TO ACTION ═══════════════ */}
      <section
        className="section-dark"
        style={{
          textAlign: 'center',
          padding: '80px 30px',
          backgroundImage: 'linear-gradient(135deg, var(--navy), #0a0f1a)',
        }}
      >
        <div className="reveal">
          <h2 className="section-title" style={{ color: 'white', marginBottom: '16px' }}>
            {cta.text || 'Ready to Build the Future?'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '500px', margin: '0 auto 30px', fontSize: '16px' }}>
            Partner with Five Investment Limited for reliable, honest, and innovative solutions across South Sudan.
          </p>
          <Link
            href={cta.buttonLink || '/contact'}
            className="btn-gold"
            style={{ padding: '16px 40px', fontSize: '16px' }}
          >
            <i className="fa-regular fa-envelope"></i> {cta.buttonText || 'Contact Us Today'}
          </Link>
        </div>
      </section>
    </>
  );
}