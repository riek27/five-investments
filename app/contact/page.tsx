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

export default async function ContactPage() {
  const client = await getClient();
  const raw = await client.get('contact-page');
  const data: any = raw ? JSON.parse(raw) : null;

  if (!data) return <div style={{ padding: 80, textAlign: 'center' }}>Error loading page</div>;

  const hero = data.hero || {};
  const contactInfo = data.contactInfo || {};
  const formData = data.form || {};
  const map = data.map || {};
  const whyContactUs = data.whyContactUs || {};
  const responseCommitment = data.responseCommitment || {};
  const faq = data.faq || {};
  const gallery = data.gallery || {};
  const cta = data.cta || {};
  const downloadProfile = data.downloadProfile || {};
  // … existing JSX

  return (
    <>
      {/* … keep the existing JSX exactly as is */}
      {/* Hero */}
      <section style={{
        backgroundImage: `url(${hero.backgroundImage || '/images/contact-hero.jpg'})`,
        backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '50vh',
        display: 'flex', alignItems: 'center', position: 'relative', color: 'white',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,23,42,0.85), rgba(15,23,42,0.6))' }} />
        <div className="hero-content" style={{ position: 'relative', zIndex: 2, maxWidth: 780, margin: '0 auto', textAlign: 'center' }}>
          <span className="eyebrow" style={{ color: 'var(--primary-light)' }}>{hero.eyebrow}</span>
          <h1 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 'clamp(34px, 5vw, 56px)' }}>{hero.title}</h1>
          <p style={{ opacity: 0.9, fontSize: 17, marginBottom: 24 }}>{hero.subtitle}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="#contact-form" className="btn-primary">Request a Quote</Link>
            <a href={`tel:${contactInfo.emergencyPhone}`} className="btn-outline">Call Us</a>
          </div>
          {downloadProfile.enabled && (
            <div style={{ marginTop: 20 }}>
              <a href={downloadProfile.file} download className="btn-gold">
                <i className="fa-solid fa-download"></i> {downloadProfile.text || 'Download Company Profile'}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="section-light">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{contactInfo.eyebrow}</span>
          <h2 className="section-title">{contactInfo.title}</h2>
        </div>
        <div className="grid-4">
          <div className="card reveal text-center" style={{ borderTop: '4px solid var(--primary)' }}>
            <span style={{ fontSize: 30, display: 'block', marginBottom: 10 }}>📍</span>
            <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Office Address</h4>
            <p style={{ color: 'var(--muted)', fontSize: 14, whiteSpace: 'pre-line' }}>{contactInfo.address}</p>
          </div>
          <div className="card reveal text-center" style={{ borderTop: '4px solid var(--primary)' }}>
            <span style={{ fontSize: 30, display: 'block', marginBottom: 10 }}>📞</span>
            <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Phone Numbers</h4>
            {(contactInfo.phones || []).map((phone: string, idx: number) => (
              <p key={idx} style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 4 }}>
                <a href={`tel:${phone.replace(/\s/g, '')}`} style={{ color: 'var(--primary)' }}>{phone}</a>
              </p>
            ))}
          </div>
          <div className="card reveal text-center" style={{ borderTop: '4px solid var(--primary)' }}>
            <span style={{ fontSize: 30, display: 'block', marginBottom: 10 }}>✉️</span>
            <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Email & Website</h4>
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>
              <a href={`mailto:${contactInfo.email}`} style={{ color: 'var(--primary)' }}>{contactInfo.email}</a>
            </p>
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>
              <a href={`https://${contactInfo.website}`} target="_blank" style={{ color: 'var(--primary)' }}>{contactInfo.website}</a>
            </p>
          </div>
          <div className="card reveal text-center" style={{ borderTop: '4px solid var(--primary)' }}>
            <span style={{ fontSize: 30, display: 'block', marginBottom: 10 }}>🕒</span>
            <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Business Hours</h4>
            <p style={{ color: 'var(--muted)', fontSize: 14, whiteSpace: 'pre-line' }}>{contactInfo.workingHours}</p>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" style={{ background: 'var(--bg)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{formData.eyebrow}</span>
          <h2 className="section-title">{formData.title}</h2>
          <p className="section-sub">{formData.description}</p>
        </div>
        <div className="grid-2" style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div className="reveal card" style={{ padding: 36 }}>
            <form id="contactForm">
              <input type="text" name="name" placeholder="Full Name *" required style={inputStyle} />
              <input type="text" name="organization" placeholder="Organization / Company" style={inputStyle} />
              <input type="email" name="email" placeholder="Email Address" style={inputStyle} />
              <input type="tel" name="phone" placeholder="Phone Number *" required style={inputStyle} />
              <select name="service" style={inputStyle}>
                <option value="">Service Required *</option>
                {(formData.services || []).map((s: string, i: number) => (
                  <option key={i} value={s}>{s}</option>
                ))}
              </select>
              <input type="text" name="subject" placeholder="Subject" style={inputStyle} />
              <textarea name="details" rows={4} placeholder="Message" style={{ ...inputStyle, resize: 'vertical' }}></textarea>
              <button type="submit" style={{
                background: 'var(--primary)', color: 'white', border: 'none', padding: '16px',
                width: '100%', borderRadius: '999px', fontWeight: 700, cursor: 'pointer',
                fontSize: 15, fontFamily: 'inherit',
              }}>
                {formData.submitButtonText || 'Send Message →'}
              </button>
            </form>
          </div>
          <div className="reveal">
            <div style={{ padding: 20 }}>
              <h3 style={{ fontFamily: 'DM Serif Display, serif', fontSize: 24, marginBottom: 16 }}>Need Immediate Assistance?</h3>
              <div className="contact-info-item">
                <div className="ci-icon"><i className="fa-solid fa-phone"></i></div>
                <div>
                  <strong>Emergency Contact</strong><br />
                  <a href={`tel:${contactInfo.emergencyPhone}`}>{contactInfo.emergencyPhone}</a>
                </div>
              </div>
              <div className="contact-info-item">
                <div className="ci-icon"><i className="fa-solid fa-envelope"></i></div>
                <div>
                  <strong>Direct Email</strong><br />
                  <a href={`mailto:${contactInfo.emergencyEmail}`}>{contactInfo.emergencyEmail}</a>
                </div>
              </div>
              <a
                href={`https://wa.me/${contactInfo.emergencyPhone?.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: '#25D366', color: 'white', padding: '12px 24px',
                  borderRadius: '999px', fontWeight: 700, textDecoration: 'none',
                  marginTop: 16, fontSize: 14,
                }}
              >
                <i className="fa-brands fa-whatsapp"></i> Chat with Us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Office Location / Map */}
      <section className="section-light">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{map.eyebrow}</span>
          <h2 className="section-title">{map.title}</h2>
          <p style={{ fontSize: 16, color: 'var(--muted)', marginBottom: 20 }}>{map.address}</p>
        </div>
        <div className="reveal" style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
            <iframe
              src={map.embedUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(map.address)}`}
              target="_blank"
              className="btn-outline"
              style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* Why Contact Us */}
      <section style={{ background: 'var(--bg)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="eyebrow">{whyContactUs.eyebrow}</span>
          <h2 className="section-title">{whyContactUs.title}</h2>
        </div>
        <div className="grid-4">
          {(whyContactUs.items || []).map((item: string, idx: number) => (
            <div key={idx} className="card reveal text-center" style={{ borderLeft: '4px solid var(--primary)' }}>
              <span style={{ fontSize: 24, display: 'block', marginBottom: 8 }}>✔️</span>
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16 }}>{item}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Response Commitment */}
      <section className="section-cream" style={{ textAlign: 'center' }}>
        <div className="reveal" style={{ maxWidth: 800, margin: '0 auto' }}>
          <span className="eyebrow">{responseCommitment.eyebrow}</span>
          <h2 className="section-title">{responseCommitment.title}</h2>
          <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.8 }}>{responseCommitment.text}</p>
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

      {/* Office Gallery */}
      {gallery.images && gallery.images.length > 0 && (
        <section className="section-light">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
            <span className="eyebrow">{gallery.eyebrow}</span>
            <h2 className="section-title">{gallery.title}</h2>
            <p className="section-sub">{gallery.description}</p>
          </div>
          <div className="grid-4">
            {(gallery.images || []).map((img: any, idx: number) => (
              <div key={idx} className="reveal" style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                <img src={img.url} alt={img.caption} style={{ width: '100%', height: 220, objectFit: 'cover' }} />
                <p style={{ padding: '8px 16px', background: 'white', fontSize: 13, color: 'var(--text)' }}>{img.caption}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="section-dark" style={{ textAlign: 'center', padding: '80px 30px' }}>
        <div className="reveal">
          <h2 className="section-title" style={{ color: 'white' }}>{cta.title}</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 600, margin: '0 auto 30px', fontSize: 16 }}>{cta.text}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="#contact-form" className="btn-gold">{cta.button1Text}</Link>
            <a href={`tel:${contactInfo.emergencyPhone}`} className="btn-outline">{cta.button2Text}</a>
          </div>
        </div>
      </section>
    </>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px',
  marginBottom: '14px',
  borderRadius: '12px',
  border: '1.5px solid #e5e7eb',
  fontSize: '14px',
  fontFamily: 'inherit',
  background: 'white',
};