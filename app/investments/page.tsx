import { kv } from '@vercel/kv';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function InvestmentsPage() {
  const data = await kv.get('investments');
  if (!data) return <div>Error loading page</div>;

  const hero = data.hero || {};
  const intro = data.intro || {};
  const pillars = data.pillars || [];
  const additionalAreas = data.additionalAreas || [];
  const whyInvest = data.whyInvest || [];
  const approach = data.approach || [];
  const featuredProjects = data.featuredProjects || [];
  const impact = data.impact || {};
  const partnerReasons = data.partnerReasons || [];
  const opportunities = data.opportunities || {};
  const faq = data.faq || [];
  const cta = data.callToAction || {};

  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section
        style={{
          backgroundImage: `url(${hero.backgroundImage || '/images/investments-hero.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '60vh',
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
          <span className="eyebrow" style={{ color: 'var(--primary-light)' }}>
            {hero.eyebrow || 'Our Investments'}
          </span>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(34px, 5vw, 56px)', marginBottom: '12px' }}>
            {hero.title || 'Our Investment Sectors'}
          </h1>
          <p style={{ opacity: 0.9, fontSize: '17px', marginBottom: '24px' }}>
            {hero.subtitle || 'Driving sustainable economic growth across South Sudan through strategic investments.'}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary">Request Partnership</Link>
            <Link href="/contact" className="btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ INTRODUCTION ═══════════════ */}
      <section className="section-light" style={{ textAlign: 'center' }}>
        <div className="reveal" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span className="eyebrow">{intro.eyebrow || 'Our Vision'}</span>
          <h2 className="section-title">{intro.title || 'Investing in South Sudan\'s Future'}</h2>
          <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.8 }}>
            {intro.text ||
              'Five Investment Limited invests in key sectors that support economic development and improve the lives of communities throughout South Sudan. Our diversified investment strategy allows us to deliver sustainable solutions while creating long-term value for our partners and clients.'}
          </p>
        </div>
      </section>

      {/* ═══════════════ FIVE PILLARS ═══════════════ */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span className="eyebrow">{pillars.eyebrow || 'Our Focus'}</span>
          <h2 className="section-title">{pillars.title || 'Our Five Investment Pillars'}</h2>
          <p className="section-sub">{pillars.description || 'We channel our expertise into five core sectors that drive growth.'}</p>
        </div>
        <div className="grid-3">
          {(pillars.items || []).map((pillar: any, idx: number) => (
            <div
              key={idx}
              className="card reveal"
              style={{
                borderTop: '4px solid var(--primary)',
                transition: '0.3s ease',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {pillar.image && (
                <div className="card-img" style={{ marginBottom: '16px' }}>
                  <img src={pillar.image} alt={pillar.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '14px' }} />
                </div>
              )}
              <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '22px', marginBottom: '8px' }}>{pillar.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6, flex: 1 }}>
                {pillar.description}
              </p>
              {pillar.list && (
                <ul style={{ listStyle: 'none', padding: 0, marginTop: '12px' }}>
                  {pillar.list.map((item: string, i: number) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontSize: '14px', color: 'var(--text)' }}>
                      <span style={{ color: 'var(--primary)', fontWeight: 700 }}>•</span> {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ ADDITIONAL INVESTMENT AREAS ═══════════════ */}
      <section className="section-cream">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span className="eyebrow">{additionalAreas.eyebrow || 'Beyond The Core'}</span>
          <h2 className="section-title">{additionalAreas.title || 'Additional Investment Areas'}</h2>
          <p className="section-sub">{additionalAreas.description || 'Exploring new frontiers for growth and development.'}</p>
        </div>
        <div className="grid-4">
          {(additionalAreas.items || []).map((area: any, idx: number) => (
            <div
              key={idx}
              className="card reveal text-center"
              style={{ borderTop: '4px solid var(--gold)' }}
            >
              <span style={{ fontSize: '32px', display: 'block', marginBottom: '8px' }}>{area.icon}</span>
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '16px' }}>{area.title}</h4>
              <p style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '4px' }}>{area.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ WHY WE INVEST ═══════════════ */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span className="eyebrow">{whyInvest.eyebrow || 'Impact'}</span>
          <h2 className="section-title">{whyInvest.title || 'Why We Invest'}</h2>
          <p className="section-sub">{whyInvest.description || 'Our investments are driven by a commitment to create lasting change.'}</p>
        </div>
        <div className="grid-4">
          {(whyInvest.items || []).map((item: any, idx: number) => (
            <div
              key={idx}
              className="card reveal text-center"
              style={{ borderLeft: '4px solid var(--primary)' }}
            >
              <span style={{ fontSize: '30px', display: 'block', marginBottom: '8px' }}>{item.icon}</span>
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '16px' }}>{item.title}</h4>
              <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5 }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ INVESTMENT APPROACH ═══════════════ */}
      <section className="section-light">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span className="eyebrow">{approach.eyebrow || 'Process'}</span>
          <h2 className="section-title">{approach.title || 'Investment Approach'}</h2>
          <p className="section-sub">{approach.description || 'A proven methodology that ensures every project succeeds.'}</p>
        </div>
        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          <div
            style={{
              position: 'absolute',
              left: '28px',
              top: '0',
              bottom: '0',
              width: '2px',
              background: 'var(--primary)',
              opacity: 0.3,
            }}
          />
          {(approach.steps || []).map((step: any, idx: number) => (
            <div key={idx} className="reveal" style={{ display: 'flex', gap: '20px', marginBottom: '32px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '20px',
                  fontWeight: 800,
                  flexShrink: 0,
                  boxShadow: '0 6px 18px rgba(217,119,6,0.4)',
                  zIndex: 1,
                }}
              >
                {idx + 1}
              </div>
              <div>
                <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '18px', marginBottom: '4px' }}>{step.title}</h4>
                <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6 }}>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ FEATURED PROJECTS ═══════════════ */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span className="eyebrow">{featuredProjects.eyebrow || 'Portfolio'}</span>
          <h2 className="section-title">{featuredProjects.title || 'Featured Projects'}</h2>
          <p className="section-sub">{featuredProjects.description || 'A selection of projects we have delivered.'}</p>
        </div>
        <div className="grid-3">
          {(featuredProjects.items || []).map((project: any, idx: number) => (
            <div key={idx} className="card reveal" style={{ overflow: 'hidden' }}>
              {project.image && (
                <div className="card-img" style={{ aspectRatio: '16/10', marginBottom: '16px' }}>
                  <img src={project.image} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
              <h4 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px', marginBottom: '4px' }}>{project.name}</h4>
              <p style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '8px' }}>
                {project.sector} · {project.location}
              </p>
              <span
                style={{
                  display: 'inline-block',
                  background: project.status === 'Completed' ? '#FEF3C7' : '#E2E8F0',
                  color: project.status === 'Completed' ? 'var(--primary-dark)' : 'var(--muted)',
                  padding: '2px 12px',
                  borderRadius: '999px',
                  fontSize: '11px',
                  fontWeight: 700,
                }}
              >
                {project.status}
              </span>
              {project.description && (
                <p style={{ color: 'var(--muted)', fontSize: '14px', marginTop: '12px', lineHeight: 1.5 }}>
                  {project.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ INVESTMENT IMPACT ═══════════════ */}
      <section className="section-dark">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span className="eyebrow">{impact.eyebrow || 'Results'}</span>
          <h2 className="section-title">{impact.title || 'Investment Impact'}</h2>
          <p className="section-sub">{impact.description || 'Our investments create measurable outcomes.'}</p>
        </div>
        <div className="grid-4">
          {(impact.stats || []).map((stat: any, idx: number) => (
            <div key={idx} className="card-dark reveal text-center">
              <span
                style={{
                  fontSize: '36px',
                  fontWeight: 800,
                  color: 'var(--primary-light)',
                  fontFamily: 'Space Grotesk, sans-serif',
                  display: 'block',
                }}
              >
                {stat.number}
              </span>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginTop: '4px' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ WHY PARTNER WITH US ═══════════════ */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span className="eyebrow">{partnerReasons.eyebrow || 'Advantages'}</span>
          <h2 className="section-title">{partnerReasons.title || 'Why Partner With Us'}</h2>
          <p className="section-sub">{partnerReasons.description || 'We bring more than just capital to the table.'}</p>
        </div>
        <div className="grid-3">
          {(partnerReasons.items || []).map((reason: any, idx: number) => (
            <div
              key={idx}
              className="card reveal text-center"
              style={{ borderBottom: '4px solid var(--primary)' }}
            >
              <span style={{ fontSize: '30px', display: 'block', marginBottom: '10px' }}>{reason.icon}</span>
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '16px' }}>{reason.title}</h4>
              <p style={{ color: 'var(--muted)', fontSize: '13px', lineHeight: 1.5 }}>{reason.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ INVESTMENT OPPORTUNITIES ═══════════════ */}
      <section className="section-cream">
        <div className="reveal" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <span className="eyebrow">{opportunities.eyebrow || 'Join Us'}</span>
          <h2 className="section-title">{opportunities.title || 'Investment Opportunities'}</h2>
          <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '24px' }}>
            {opportunities.text ||
              'Five Investment welcomes partnerships in infrastructure, agriculture, manufacturing, procurement, international trade, and public-private partnerships.'}
          </p>
          <Link href="/contact" className="btn-gold" style={{ padding: '14px 36px' }}>
            {opportunities.buttonText || 'Become a Partner'}
          </Link>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span className="eyebrow">{faq.eyebrow || 'Common Questions'}</span>
          <h2 className="section-title">{faq.title || 'Frequently Asked Questions'}</h2>
        </div>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {(faq.items || []).map((item: any, idx: number) => (
            <div
              key={idx}
              className="reveal"
              style={{
                background: 'white',
                borderRadius: 'var(--radius-md)',
                padding: '20px 24px',
                marginBottom: '16px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '16px', marginBottom: '8px', color: 'var(--navy)' }}>
                {item.question}
              </h4>
              <p style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.6 }}>{item.answer}</p>
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
            {cta.title || 'Let\'s Build the Future Together'}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto 30px', fontSize: '16px' }}>
            {cta.text ||
              'Whether you\'re a government institution, NGO, investor, or private organization, Five Investment Limited is ready to deliver reliable and sustainable investment solutions across South Sudan.'}
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-gold" style={{ padding: '16px 40px' }}>
              Request a Consultation
            </Link>
            <Link href="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}