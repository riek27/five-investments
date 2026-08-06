import Link from 'next/link';

interface HomePageProps {
  data: any;
}

export default function HomePage({ data }: HomePageProps) {
  const hero = data?.hero || {};
  const about = data?.about || {};
  const services = data?.services || {};
  const whyUs = data?.whyUs || {};
  const team = data?.team || {};
  const legal = data?.legal || {};
  const contact = data?.contact || {};

  return (
    <>
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="hero" id="home">
        <div
          className="hero-bg"
          style={{
            backgroundImage: `url(${hero.backgroundImage || '/assets/five.jpg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-tag reveal">{hero.tagline || '★ Under Promise & Over Deliver ★'}</div>
          <h1 className="reveal">
            {(hero.heading || 'Building South Sudan\nThrough Investment & Innovation')
              .split('\n')
              .map((line: string, i: number) => (
                <span key={i}>
                  {i === 0 ? line : <span>{line}</span>}
                  <br />
                </span>
              ))}
          </h1>
          <p className="reveal">
            {hero.subheading ||
              'Five Investment Limited is a proudly South Sudanese-owned company delivering excellence in Construction, Procurement, Agriculture, Import/Export, and Light Agro-Industries across the nation.'}
          </p>
          <div className="hero-ctas reveal">
            <Link href="/contact" className="btn-primary">
              Request a Quote →
            </Link>
            <Link href="/about" className="btn-outline">
              Discover Our Story →
            </Link>
          </div>
          <div className="hero-stats reveal">
            {(hero.stats || [
              { number: '11+', label: 'Years of Excellence' },
              { number: '5', label: 'Investment Pillars' },
              { number: '100%', label: 'Client Commitment' },
            ]).map((stat: any, idx: number) => (
              <div className="stat-item" key={idx}>
                <span className="stat-number">{stat.number}</span>
                <span className="stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ABOUT ═══════════════ */}
      <section id="about" className="section-light">
        <div className="grid-2">
          <div className="reveal">
            <span className="eyebrow">{about.eyebrow || 'About Us'}</span>
            <h2 className="section-title">
              {about.title || 'A Proudly South Sudanese Enterprise'}
            </h2>
            <div
              style={{
                display: 'inline-block',
                background: 'var(--primary)',
                color: 'white',
                padding: '6px 18px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 600,
                marginBottom: '16px',
              }}
            >
              <i className="fa-regular fa-calendar"></i> Incorporated on{' '}
              {about.incorporationDate || '17th October 2013'} in South Sudan
            </div>

            {/* Background & Profile */}
            <div
              style={{
                background: 'white',
                borderRadius: 'var(--radius-md)',
                padding: '20px 24px',
                marginBottom: '20px',
                borderLeft: '4px solid var(--primary)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h4
                style={{
                  fontFamily: 'DM Serif Display,serif',
                  fontSize: '18px',
                  color: 'var(--navy)',
                  marginBottom: '6px',
                }}
              >
                Background &amp; Profile
              </h4>
              <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--text)' }}>
                {about.backgroundText ||
                  'Five Investment Limited (FIL) is a South Sudanese owned company, incorporated on 17th October 2013...'}
              </p>
              <div className="five-list">
                {(about.fivePillars || [
                  'Procurement and Supplies',
                  'Construction – Roads',
                  'Agriculture and Food Security',
                  'Import and Export',
                  'Establishment of Light Agro-industries',
                ]).map((item: string, idx: number) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      gridColumn: idx === 4 ? 'span 2' : 'auto',
                    }}
                  >
                    <span style={{ color: 'var(--primary)', fontWeight: 700 }}>
                      {idx + 1}.
                    </span>{' '}
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Currently Engaged */}
            <div
              style={{
                background: 'var(--primary)',
                color: 'white',
                borderRadius: 'var(--radius-md)',
                padding: '14px 20px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              <span style={{ fontWeight: 700, fontSize: '14px', letterSpacing: '0.5px' }}>
                ⚡ Currently Engaged In:
              </span>
              {(about.currentlyEngaged || [
                'Procurement & Supplies',
                'Construction',
                'Agriculture',
                'Mining & Mineral Exploitation',
              ]).map((item: string, idx: number) => (
                <span
                  key={idx}
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    padding: '4px 14px',
                    borderRadius: '999px',
                    fontSize: '13px',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>

            <p style={{ fontSize: '15px', lineHeight: '1.8', color: 'var(--muted)', marginBottom: '12px' }}>
              The Company was established on the principles of <strong>honesty and integrity</strong>. We
              believe in team work and good results acceptable to our clients. Time is a very important
              component of our team — that is why our motto says:
            </p>
            <div
              style={{
                background: 'var(--navy)',
                color: 'var(--gold)',
                borderRadius: 'var(--radius-md)',
                padding: '16px 24px',
                textAlign: 'center',
                marginBottom: '16px',
              }}
            >
              <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '1px' }}>
                &quot;{about.mottoText || 'Under Promise and Over Deliver'}&quot;
              </span>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', marginTop: '4px' }}>
                {about.mottoDescription ||
                  'As a policy, we shall not apply to works beyond our capacity to deliver since this will undermine our principle.'}
              </p>
            </div>

            {/* Vision, Mission, Core Values */}
            <div className="vision-grid">
              <div
                style={{
                  background: 'white',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  textAlign: 'center',
                  border: '1px solid var(--border)',
                }}
              >
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '4px' }}>👁️</span>
                <h5
                  style={{
                    fontFamily: 'Manrope,sans-serif',
                    fontWeight: 700,
                    fontSize: '13px',
                    color: 'var(--primary)',
                  }}
                >
                  Vision
                </h5>
                <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.5 }}>
                  {about.vision ||
                    'To be the most reliable, honest and caring goods and service provider in South Sudan and beyond.'}
                </p>
              </div>
              <div
                style={{
                  background: 'white',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  textAlign: 'center',
                  border: '1px solid var(--border)',
                }}
              >
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '4px' }}>🎯</span>
                <h5
                  style={{
                    fontFamily: 'Manrope,sans-serif',
                    fontWeight: 700,
                    fontSize: '13px',
                    color: 'var(--primary)',
                  }}
                >
                  Mission
                </h5>
                <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.5 }}>
                  {about.mission ||
                    'To appreciate best practice and embrace knowledge, value people and satisfy their needs.'}
                </p>
              </div>
              <div
                style={{
                  background: 'white',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  textAlign: 'center',
                  border: '1px solid var(--border)',
                }}
              >
                <span style={{ fontSize: '24px', display: 'block', marginBottom: '4px' }}>⭐</span>
                <h5
                  style={{
                    fontFamily: 'Manrope,sans-serif',
                    fontWeight: 700,
                    fontSize: '13px',
                    color: 'var(--primary)',
                  }}
                >
                  Core Values
                </h5>
                <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.5 }}>
                  {(about.coreValues || [
                    'Honesty',
                    'Integrity',
                    'Team Work',
                    'Communication',
                    'Love',
                  ]).join(' · ')}
                </p>
              </div>
            </div>

            <Link href="#services" className="btn-primary" style={{ marginTop: '20px' }}>
              <i className="fa-regular fa-arrow-right"></i> Explore Our Services →
            </Link>
          </div>

          {/* Right Column */}
          <div className="reveal">
            <div className="about-image-wrap">
              <img
                src={about.image || '/assets/five.jpg'}
                alt="Five Investment - Construction"
              />
              <div className="img-footer">
                <span>
                  <i className="fa-regular fa-building"></i> ESTABLISHED 2013
                </span>
                <span>
                  <i className="fa-regular fa-location-dot"></i> GUDELE 2, JUBA
                </span>
              </div>
            </div>

            <div className="stats-grid">
              {(about.stats || [
                { number: '11+', label: 'Years of Excellence' },
                { number: '5', label: 'Investment Pillars' },
                { number: '100%', label: 'Client Commitment' },
              ]).map((stat: any, idx: number) => (
                <div
                  key={idx}
                  style={{
                    background: 'white',
                    borderRadius: 'var(--radius-md)',
                    padding: '20px 12px',
                    textAlign: 'center',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-sm)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '28px',
                      fontWeight: 800,
                      color: 'var(--primary)',
                      fontFamily: 'Space Grotesk,sans-serif',
                      display: 'block',
                    }}
                  >
                    {stat.number}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: 500 }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                background: 'white',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                marginTop: '20px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <h4
                style={{
                  fontFamily: 'DM Serif Display,serif',
                  fontSize: '17px',
                  marginBottom: '12px',
                  textAlign: 'center',
                  color: 'var(--navy)',
                }}
              >
                Our Core Values
              </h4>
              <div className="values-wrap">
                {(about.coreValues || [
                  'Honesty',
                  'Integrity',
                  'Team Work',
                  'Communication',
                  'Love',
                ]).map((val: string, idx: number) => (
                  <span
                    key={idx}
                    style={{
                      background: 'var(--light)',
                      padding: '6px 16px',
                      borderRadius: '999px',
                      fontSize: '13px',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <span style={{ color: 'var(--primary)' }}>{val}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Activities Overview */}
        <div style={{ marginTop: '50px', paddingTop: '40px', borderTop: '2px solid var(--border)' }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="eyebrow">What We Do</span>
            <h2 className="section-title" style={{ fontSize: '32px' }}>
              Main Activities of the Company
            </h2>
            <p className="section-sub" style={{ fontSize: '15px' }}>
              Comprehensive services across multiple sectors to support development and growth in South
              Sudan.
            </p>
          </div>

          <div className="activities-grid">
            <div
              style={{
                background: 'white',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '24px' }}>🏗️</span>
                <h4
                  style={{
                    fontFamily: 'Manrope,sans-serif',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--navy)',
                  }}
                >
                  General Construction
                </h4>
              </div>
              <ul style={{ listStyle: 'none', fontSize: '13px', color: 'var(--muted)', lineHeight: 2 }}>
                {services.construction?.items?.length
                  ? services.construction.items.map((item: string, i: number) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--primary)' }}>✓</span> {item}
                      </li>
                    ))
                  : null}
              </ul>
            </div>

            <div
              style={{
                background: 'white',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '24px' }}>📦</span>
                <h4
                  style={{
                    fontFamily: 'Manrope,sans-serif',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--navy)',
                  }}
                >
                  Procurement &amp; Supplies
                </h4>
              </div>
              <ul style={{ listStyle: 'none', fontSize: '13px', color: 'var(--muted)', lineHeight: 2 }}>
                {services.procurement?.items?.length
                  ? services.procurement.items.map((item: string, i: number) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--primary)' }}>✓</span> {item}
                      </li>
                    ))
                  : null}
              </ul>
            </div>

            <div
              style={{
                background: 'white',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '24px' }}>🌾</span>
                <h4
                  style={{
                    fontFamily: 'Manrope,sans-serif',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--navy)',
                  }}
                >
                  Agriculture &amp; Food Security
                </h4>
              </div>
              <ul style={{ listStyle: 'none', fontSize: '13px', color: 'var(--muted)', lineHeight: 2 }}>
                {services.agriculture?.items?.length
                  ? services.agriculture.items.map((item: string, i: number) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--primary)' }}>✓</span> {item}
                      </li>
                    ))
                  : null}
              </ul>
            </div>

            <div
              style={{
                background: 'white',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '24px' }}>🔧</span>
                <h4
                  style={{
                    fontFamily: 'Manrope,sans-serif',
                    fontSize: '15px',
                    fontWeight: 700,
                    color: 'var(--navy)',
                  }}
                >
                  Other Services
                </h4>
              </div>
              <ul style={{ listStyle: 'none', fontSize: '13px', color: 'var(--muted)', lineHeight: 2 }}>
                {services.other?.items?.length
                  ? services.other.items.map((item: string, i: number) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--primary)' }}>✓</span> {item}
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURED SERVICES (Construction) ═══════════════ */}
      <section id="featured-services" style={{ background: 'var(--bg)', padding: '60px 30px' }}>
        <div className="featured-grid">
          <div className="featured-image reveal">
            <img src={hero.backgroundImage || '/assets/five.jpg'} alt="Construction Project" />
          </div>
          <div className="featured-content reveal">
            <span className="badge">
              <i className="fa-regular fa-star"></i> Featured Service
            </span>
            <h2>{services.construction?.title || 'Construction & Infrastructure'}</h2>
            <p>
              Expert construction using labor-based and equipment-based methods. We build durable
              infrastructure that connects communities across South Sudan.
            </p>
            <ul className="featured-list">
              {services.construction?.items?.slice(0, 5).map((item: string, i: number) => (
                <li key={i}>
                  <i className="fa-regular fa-circle-check"></i> {item}
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
              <Link href="/contact" className="btn-primary">
                Request a Quote →
              </Link>
              <Link
                href="/services"
                className="btn-outline"
                style={{ borderColor: 'var(--primary)', color: 'var(--primary)', padding: '14px 28px' }}
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PROFESSIONAL SERVICES ═══════════════ */}
      <section id="services" style={{ background: 'var(--light)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span className="eyebrow">{services.eyebrow || 'Our Expertise'}</span>
          <h2 className="section-title">{services.title || 'Professional Services'}</h2>
          <p className="section-sub">
            {services.description ||
              'Delivering quality solutions with integrity, precision, and a commitment to exceeding expectations across every sector we serve.'}
          </p>
        </div>

        {/* Construction */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '28px' }}>🏗️</span>
            <h3 style={{ fontSize: '22px', fontFamily: 'DM Serif Display, serif' }}>
              {services.construction?.title || 'Construction'}
            </h3>
            <span
              style={{
                background: 'var(--primary)',
                color: 'white',
                padding: '2px 14px',
                borderRadius: '999px',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Infrastructure &amp; Building
            </span>
          </div>
          <div className="services-grid-4">
            {(services.construction?.items || []).map((item: string, i: number) => (
              <div className="service-card" key={i}>
                <div className="service-icon">
                  <i className="fa-solid fa-helmet-safety"></i>
                </div>
                <div>
                  <h4>{item}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Procurement */}
        <div style={{ marginBottom: '48px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '28px' }}>📦</span>
            <h3 style={{ fontSize: '22px', fontFamily: 'DM Serif Display, serif' }}>
              {services.procurement?.title || 'Procurement'}
            </h3>
            <span
              style={{
                background: 'var(--primary)',
                color: 'white',
                padding: '2px 14px',
                borderRadius: '999px',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Supply &amp; Logistics
            </span>
          </div>
          <div className="services-grid-4">
            {(services.procurement?.items || []).map((item: string, i: number) => (
              <div className="service-card" key={i}>
                <div className="service-icon">
                  <i className="fa-solid fa-print"></i>
                </div>
                <div>
                  <h4>{item}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agriculture */}
        <div style={{ marginBottom: '48px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '28px' }}>🌾</span>
            <h3 style={{ fontSize: '22px', fontFamily: 'DM Serif Display, serif' }}>
              {services.agriculture?.title || 'Agriculture'}
            </h3>
            <span
              style={{
                background: 'var(--primary)',
                color: 'white',
                padding: '2px 14px',
                borderRadius: '999px',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Food Security &amp; Farming
            </span>
          </div>
          <div className="services-grid-4">
            {(services.agriculture?.items || []).map((item: string, i: number) => (
              <div className="service-card" key={i}>
                <div className="service-icon">
                  <i className="fa-solid fa-wheat-awn"></i>
                </div>
                <div>
                  <h4>{item}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Services */}
        <div style={{ marginBottom: '32px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '28px' }}>🔧</span>
            <h3 style={{ fontSize: '22px', fontFamily: 'DM Serif Display, serif' }}>
              {services.other?.title || 'Other Services'}
            </h3>
            <span
              style={{
                background: 'var(--gold)',
                color: 'var(--navy)',
                padding: '2px 14px',
                borderRadius: '999px',
                fontSize: '10px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Diversified Portfolio
            </span>
          </div>
          <div className="services-grid-4">
            {(services.other?.items || []).map((item: string, i: number) => (
              <div className="service-card" key={i}>
                <div className="service-icon">
                  <i className="fa-solid fa-hammer"></i>
                </div>
                <div>
                  <h4>{item}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal" style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/contact" className="btn-primary" style={{ padding: '14px 44px', fontSize: '15px' }}>
            <i className="fa-regular fa-eye"></i> See Our Services →
          </Link>
          <p style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '10px' }}>
            Contact us for a personalized quote or consultation.
          </p>
        </div>
      </section>

      {/* ═══════════════ WHY US ═══════════════ */}
      <section id="why-us" className="section-dark">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span className="eyebrow">{whyUs.eyebrow || 'The 5IL Advantage'}</span>
          <h2 className="section-title">
            {whyUs.title || 'Why Choose Five Investment Limited'}
          </h2>
          <p className="section-sub">
            {whyUs.description ||
              'We combine honesty, integrity, and expertise to deliver solutions that exceed expectations.'}
          </p>
        </div>
        <div className="grid-3">
          {(whyUs.items || []).map((item: any, idx: number) => (
            <div className="card-dark reveal text-center" key={idx}>
              <span style={{ fontSize: '40px', display: 'block', color: 'var(--primary-light)', marginBottom: '10px' }}>
                {item.icon}
              </span>
              <h3>{item.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ TEAM ═══════════════ */}
      <section id="team" style={{ background: 'var(--bg)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="eyebrow">{team.eyebrow || 'Our Team'}</span>
          <h2 className="section-title">{team.title || 'Company Structure'}</h2>
          <p className="section-sub">
            {team.description ||
              'A well-organized team ensuring efficient project delivery and professional management at every level.'}
          </p>
        </div>

        {/* Leadership */}
        <div className="leadership-grid">
          {(team.leadership || []).map((leader: any, idx: number) => (
            <div
              className="card reveal text-center"
              style={{ borderTop: '4px solid var(--primary)' }}
              key={idx}
            >
              <span style={{ fontSize: '36px' }}>{leader.icon}</span>
              <h4 style={{ fontFamily: 'Manrope,sans-serif' }}>{leader.title}</h4>
              <p style={{ fontSize: '12px', color: 'var(--muted)' }}>{leader.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Team grid */}
        <div className="team-grid">
          {(team.members || []).map((member: string, idx: number) => (
            <div className="team-card reveal" key={idx}>
              <span className="team-icon">👷</span>
              <h5>{member}</h5>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ textAlign: 'center', marginTop: '44px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
          <Link href="/about" className="btn-primary" style={{ padding: '14px 44px', fontSize: '15px' }}>
            <i className="fa-regular fa-arrow-right"></i> Learn More About Us →
          </Link>
          <p style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '12px' }}>
            Discover our story, mission, and the values that drive us forward.
          </p>
        </div>
      </section>

      {/* ═══════════════ LEGAL ═══════════════ */}
      <section id="legal" className="section-dark">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '44px' }}>
          <span className="eyebrow">{legal.eyebrow || 'Credentials'}</span>
          <h2 className="section-title">
            {legal.title || 'Legal Documents & Certifications'}
          </h2>
          <p className="section-sub">
            {legal.description ||
              'Fully registered, certified, and compliant with all regulatory requirements in South Sudan.'}
          </p>
        </div>
        <div className="credential-grid">
          {(legal.items || []).map((item: any, idx: number) => (
            <div className="credential-card reveal" key={idx}>
              <div className="cred-icon">
                <i className={`fa-solid fa-${item.icon}`}></i>
              </div>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
              <span className="cred-number">{item.number}</span>
              <div className="cred-action">
                <a href={item.file} download className="btn-download">
                  <i className="fa-solid fa-download"></i> Download Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ CONTACT (INFO ONLY) ═══════════════ */}
<section id="contact" style={{ background: 'var(--bg)' }}>
  <div className="reveal" style={{ textAlign: 'center', marginBottom: '44px' }}>
    <span className="eyebrow">{contact.eyebrow || 'Get In Touch'}</span>
    <h2 className="section-title">
      {contact.title || 'Ready to Start Your Next Project?'}
    </h2>
    <p className="section-sub">
      {contact.description ||
        'Whether you need construction services, procurement solutions, or agricultural support — Five Investment Limited is your trusted partner in South Sudan.'}
    </p>
  </div>

  <div style={{ maxWidth: '700px', margin: '0 auto' }} className="reveal">
    <div className="contact-info-item">
      <div className="ci-icon"><i className="fa-solid fa-location-dot"></i></div>
      <div>
        <strong>Office Location</strong><br />
        {contact.location || 'Rock City, Juba, South Sudan'}
      </div>
    </div>
    <div className="contact-info-item">
      <div className="ci-icon"><i className="fa-solid fa-phone"></i></div>
      <div>
        <strong>Phone Numbers</strong><br />
        {(contact.phoneNumbers || ['+211 925 811 998', '+211 980 334 805', '+211 922 627 256']).map((phone: string, i: number) => (
          <span key={i}>
            <a href={`tel:${phone.replace(/\s/g, '')}`}>{phone}</a><br />
          </span>
        ))}
      </div>
    </div>
    <div className="contact-info-item">
      <div className="ci-icon"><i className="fa-solid fa-envelope"></i></div>
      <div>
        <strong>Email Address</strong><br />
        <a href={`mailto:${contact.email || 'info@fiveinvestment-ss.com'}`}>
          {contact.email || 'info@fiveinvestment-ss.com'}
        </a>
      </div>
    </div>
    <div className="contact-info-item">
      <div className="ci-icon gold"><i className="fa-solid fa-globe"></i></div>
      <div>
        <strong>Website</strong><br />
        <a href={`https://${contact.website || 'www.fiveinvestment-ss.com'}`} target="_blank">
          {contact.website || 'www.fiveinvestment-ss.com'}
        </a>
      </div>
    </div>

    <div style={{ textAlign: 'center', marginTop: '36px' }}>
      <Link href="/contact" className="btn-gold" style={{ padding: '14px 36px' }}>
        <i className="fa-regular fa-envelope"></i> Get a Free Quote
      </Link>
    </div>
  </div>
</section>
    </>
  );
}