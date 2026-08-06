import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Column 1 – Company Info & Social */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div className="logo-mark">
              <i className="fa-solid fa-building"></i>
            </div>
            <span style={{ fontFamily: 'DM Serif Display, serif', fontSize: '20px' }}>
              Five Investment
            </span>
          </div>
          <p style={{ opacity: 0.7, fontSize: '14px', lineHeight: 1.7 }}>
            A South Sudanese-owned company incorporated on 17th October 2013, dedicated to delivering
            excellence across multiple sectors.
          </p>
          <p style={{ opacity: 0.6, fontSize: '13px', marginTop: '8px' }}>
            Motto: Under Promise &amp; Over Deliver
          </p>
          <p style={{ opacity: 0.5, fontSize: '12px', marginTop: '4px' }}>
            UNGM: 389997 | DU: 989994234
          </p>
          <div className="social-wrap">
            <a
              href="https://www.facebook.com/profile.php?id=100075841376066"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
          </div>
        </div>

        {/* Column 2 – Quick Links */}
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/investments">Investments</Link></li>
            <li><Link href="/activities">Main Activities</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/why-us">Why Choose Us</Link></li>
            <li><Link href="/legal">Legal &amp; Certifications</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3 – Our Services */}
        <div>
          <h4>Our Services</h4>
          <ul>
            <li><Link href="/services">Roads &amp; Bridges</Link></li>
            <li><Link href="/services">General Construction</Link></li>
            <li><Link href="/services">Procurement &amp; Supplies</Link></li>
            <li><Link href="/services">Agriculture &amp; Food Security</Link></li>
            <li><Link href="/services">Architectural Design</Link></li>
            <li><Link href="/services">Metal Works</Link></li>
          </ul>
        </div>

        {/* Column 4 – Contact Information */}
        <div>
          <h4>Contact Information</h4>
          <p style={{ opacity: 0.7, fontSize: '14px', lineHeight: 1.8 }}>
            📞 +211 922 627 256<br />
            📞 +211 925 811 998<br />
            ✉️ <a href="mailto:info@fiveinvestment-ss.com">info@fiveinvestment-ss.com</a><br />
            🌐 <a href="https://www.fiveinvestment-ss.com" target="_blank">fiveinvestment-ss.com</a><br />
            📍 Gudele 2, Shar Betri Road, Juba, South Sudan
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; 2026 Five Investment Limited. All rights reserved. &nbsp;|&nbsp; UN Number: 389997 &nbsp;|&nbsp; DU Number: 989994234<br />
        <Link href="#">Privacy Policy</Link> &nbsp;·&nbsp; <Link href="#">Terms of Service</Link>
      </div>
    </footer>
  );
}