import Link from 'next/link';

async function getWhyUsData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/whyus`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function WhyUsPage() {
  const data = await getWhyUsData();
  if (!data) return <div style={{ padding: 80, textAlign: 'center' }}>Error loading page</div>;

  const hero = data.hero || {};
  const intro = data.intro || {};
  const whyClients = data.whyClients || {};
  const competitiveAdvantages = data.competitiveAdvantages || {};
  const coreValues = data.coreValues || {};
  const commitment = data.commitment || {};
  const industries = data.industries || {};
  const clientSatisfaction = data.clientSatisfaction || {};
  const certifications = data.certifications || {};
  const motto = data.motto || {};
  const cta = data.callToAction || {};

  return (
    <>
      {/* ── Hero ── */}
      <section style={{
        backgroundImage: `url(${hero.backgroundImage || '/images/whyus-hero.jpg'})`,
        backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '55vh',
        display: 'flex', alignItems: 'center', position: 'relative', color: 'white',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,23,42,0.85), rgba(15,23,42,0.6))' }} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2, maxWidth: 780, margin: '0 auto', textAlign: 'center' }}>
          <span className="eyebrow" style={{ color: 'var(--primary-light)' }}>{hero.eyebrow}</span>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(34px, 5vw, 56px)' }}>{hero.title}</h1>
          <p style={{ opacity: 0.9, fontSize: 17, marginBottom: 24 }}>{hero.subtitle}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary">Get a Free Quote</Link>
            <Link href="/contact" className="btn-outline">Contact Our Team</Link>
          </div>
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

      {/* ── Why Clients Choose Us Cards ── */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{whyClients.eyebrow}</span>
          <h2 className="section-title">{whyClients.title}</h2>
          <p className="section-sub">{whyClients.description}</p>
        </div>
        <div className="grid-3">
          {(whyClients.cards || []).map((card: any, idx: number) => (
            <div key={idx} className="card reveal" style={{ borderTop: '4px solid var(--primary)' }}>
              <span style={{ fontSize: 40, display: 'block', marginBottom: 12 }}>{card.icon}</span>
              <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{card.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Competitive Advantages ── */}
      <section className="section-cream">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{competitiveAdvantages.eyebrow}</span>
          <h2 className="section-title">{competitiveAdvantages.title}</h2>
          <p className="section-sub">{competitiveAdvantages.description}</p>
        </div>
        <div className="grid-4">
          {(competitiveAdvantages.items || []).map((item: string, idx: number) => (
            <div key={idx} className="card reveal text-center" style={{ borderLeft: '4px solid var(--gold)' }}>
              <span style={{ fontSize: 24, display: 'block', marginBottom: 8 }}>✔️</span>
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16 }}>{item}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* ── Core Values ── */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{coreValues.eyebrow}</span>
          <h2 className="section-title">{coreValues.title}</h2>
          <p className="section-sub">{coreValues.description}</p>
        </div>
        <div className="grid-3">
          {(coreValues.items || []).map((value: any, idx: number) => (
            <div key={idx} className="card reveal text-center" style={{ borderTop: '4px solid var(--primary)' }}>
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 18, marginBottom: 8, color: 'var(--navy)' }}>{value.title}</h4>
              <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Commitment ── */}
      <section className="section-dark" style={{ textAlign: 'center' }}>
        <div className="reveal" style={{ maxWidth: 800, margin: '0 auto' }}>
          <span className="eyebrow" style={{ color: 'var(--primary-light)' }}>{commitment.eyebrow}</span>
          <h2 className="section-title" style={{ color: 'white' }}>{commitment.title}</h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>{commitment.text}</p>
        </div>
      </section>

      {/* ── Industries We Serve ── */}
      <section className="section-light">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{industries.eyebrow}</span>
          <h2 className="section-title">{industries.title}</h2>
          <p className="section-sub">{industries.description}</p>
        </div>
        <div className="grid-4">
          {(industries.items || []).map((item: any, idx: number) => (
            <div key={idx} className="card reveal text-center">
              <span style={{ fontSize: 30, display: 'block', marginBottom: 10 }}>{item.icon}</span>
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16 }}>{item.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* ── Client Satisfaction ── */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{clientSatisfaction.eyebrow}</span>
          <h2 className="section-title">{clientSatisfaction.title}</h2>
          <p className="section-sub">{clientSatisfaction.description}</p>
        </div>
        <div className="grid-3">
          {(clientSatisfaction.items || []).map((item: string, idx: number) => (
            <div key={idx} className="card reveal text-center">
              <span style={{ fontSize: 28, display: 'block', marginBottom: 8 }}>⭐</span>
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16 }}>{item}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="section-cream">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{certifications.eyebrow}</span>
          <h2 className="section-title">{certifications.title}</h2>
          <p className="section-sub">{certifications.description}</p>
        </div>
        <div className="grid-4">
          {(certifications.items || []).map((item: any, idx: number) => (
            <div key={idx} className="card reveal text-center">
              <div className="cred-icon" style={{ marginBottom: 10, fontSize: 28 }}><i className={`fa-solid ${item.icon}`}></i></div>
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16 }}>{item.title}</h4>
              <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Motto ── */}
      <section className="section-dark" style={{ textAlign: 'center' }}>
        <div className="reveal">
          <span style={{ fontSize: 32, fontWeight: 700, color: 'var(--primary-light)', fontFamily: 'DM Serif Display, serif' }}>
            &quot;{motto.text}&quot;
          </span>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '16px auto 0', fontSize: 16 }}>{motto.explanation}</p>
        </div>
      </section>

      {/* ── Call to Action ── */}
      <section style={{ textAlign: 'center', padding: '80px 30px', background: 'linear-gradient(135deg, var(--navy), #0a0f1a)' }}>
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