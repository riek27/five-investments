import Link from 'next/link';

async function getActivitiesData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/activities`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function ActivitiesPage() {
  const data = await getActivitiesData();
  if (!data) return <div style={{ padding: 80, textAlign: 'center' }}>Error loading page</div>;

  const hero = data.hero || {};
  const intro = data.intro || {};
  const coreActivities = data.coreActivities || {};
  const process = data.process || {};
  const sectors = data.sectors || {};
  const equipment = data.equipment || {};
  const principles = data.principles || {};
  const gallery = data.gallery || {};
  const impact = data.impact || {};
  const cta = data.callToAction || {};

  return (
    <>
      {/* ── Hero ── */}
      <section
        style={{
          backgroundImage: `url(${hero.backgroundImage || '/images/activities-hero.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '55vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          color: 'white',
        }}
      >
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,23,42,0.85), rgba(15,23,42,0.6))' }} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2, maxWidth: 780, margin: '0 auto', textAlign: 'center' }}>
          <span className="eyebrow" style={{ color: 'var(--primary-light)' }}>{hero.eyebrow}</span>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(34px, 5vw, 56px)' }}>{hero.title}</h1>
          <p style={{ opacity: 0.9, fontSize: 17 }}>{hero.subtitle}</p>
        </div>
      </section>

      {/* ── Introduction ── */}
      <section className="section-light" style={{ textAlign: 'center' }}>
        <div className="reveal" style={{ maxWidth: 800, margin: '0 auto' }}>
          <span className="eyebrow">{intro.eyebrow}</span>
          <h2 className="section-title">{intro.title}</h2>
          <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.8 }}>{intro.text}</p>
        </div>
      </section>

      {/* ── Core Business Activities ── */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{coreActivities.eyebrow}</span>
          <h2 className="section-title">{coreActivities.title}</h2>
          <p className="section-sub">{coreActivities.description}</p>
        </div>
        <div className="grid-3">
          {(coreActivities.items || []).map((item: any, idx: number) => (
            <div key={idx} className="card reveal" style={{ borderTop: '4px solid var(--primary)' }}>
              <span style={{ fontSize: 40, display: 'block', marginBottom: 10 }}>{item.icon}</span>
              <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 18 }}>{item.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How We Deliver Projects ── */}
      <section className="section-cream">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{process.eyebrow}</span>
          <h2 className="section-title">{process.title}</h2>
          <p className="section-sub">{process.description}</p>
        </div>
        <div style={{ maxWidth: 600, margin: '0 auto', position: 'relative' }}>
          <div style={{ position: 'absolute', left: 28, top: 0, bottom: 0, width: 2, background: 'var(--primary)', opacity: 0.2 }} />
          {(process.steps || []).map((step: string, idx: number) => (
            <div key={idx} className="reveal" style={{ display: 'flex', gap: 20, marginBottom: 28 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', background: 'var(--primary)', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 20,
                boxShadow: '0 6px 18px rgba(217,119,6,0.4)', flexShrink: 0, zIndex: 1,
              }}>
                {idx + 1}
              </div>
              <div style={{ paddingTop: 14 }}>
                <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 18 }}>{step}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sectors We Serve ── */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{sectors.eyebrow}</span>
          <h2 className="section-title">{sectors.title}</h2>
          <p className="section-sub">{sectors.description}</p>
        </div>
        <div className="grid-4">
          {(sectors.items || []).map((item: any, idx: number) => (
            <div key={idx} className="card reveal text-center" style={{ borderBottom: '4px solid var(--primary)' }}>
              <span style={{ fontSize: 30, display: 'block', marginBottom: 10 }}>{item.icon}</span>
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16 }}>{item.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* ── Equipment & Operational Capacity ── */}
      <section className="section-dark">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow" style={{ color: 'var(--primary-light)' }}>{equipment.eyebrow}</span>
          <h2 className="section-title">{equipment.title}</h2>
          <p className="section-sub">{equipment.description}</p>
        </div>
        <div className="grid-3">
          {(equipment.items || []).map((item: string, idx: number) => (
            <div key={idx} className="card-dark reveal text-center">
              <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>⚙️</span>
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16 }}>{item}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* ── Working Principles ── */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{principles.eyebrow}</span>
          <h2 className="section-title">{principles.title}</h2>
          <p className="section-sub">{principles.description}</p>
        </div>
        <div className="grid-4">
          {(principles.items || []).map((item: any, idx: number) => (
            <div key={idx} className="card reveal text-center" style={{ borderTop: '4px solid var(--gold)' }}>
              <span style={{ fontSize: 30, display: 'block', marginBottom: 10 }}>{item.icon}</span>
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16 }}>{item.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* ── Project Gallery ── */}
      <section className="section-light">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{gallery.eyebrow}</span>
          <h2 className="section-title">{gallery.title}</h2>
          <p className="section-sub">{gallery.description}</p>
        </div>
        <div className="grid-3">
          {(gallery.images || []).map((img: any, idx: number) => (
            <div key={idx} className="reveal" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              <img src={img.url} alt={img.caption} style={{ width: '100%', height: 250, objectFit: 'cover' }} />
              <p style={{ padding: '10px 16px', background: 'white', fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>{img.caption}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Operational Impact ── */}
      <section className="section-dark">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow" style={{ color: 'var(--primary-light)' }}>{impact.eyebrow}</span>
          <h2 className="section-title">{impact.title}</h2>
          <p className="section-sub">{impact.description}</p>
        </div>
        <div className="grid-4">
          {(impact.stats || []).map((stat: any, idx: number) => (
            <div key={idx} className="card-dark reveal text-center">
              <span style={{ fontSize: 36, fontWeight: 800, color: 'var(--primary-light)', fontFamily: 'Space Grotesk, sans-serif', display: 'block' }}>
                {stat.number}
              </span>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, marginTop: 4 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Call to Action ── */}
      <section style={{ textAlign: 'center', padding: '80px 30px', background: 'linear-gradient(135deg, var(--navy), #0a0f1a)' }}>
        <div className="reveal">
          <h2 className="section-title" style={{ color: 'white' }}>{cta.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '0 auto 30px', fontSize: 16 }}>
            {cta.text}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-gold">{cta.button1Text}</Link>
            <Link href="/contact" className="btn-outline">{cta.button2Text}</Link>
          </div>
        </div>
      </section>
    </>
  );
}