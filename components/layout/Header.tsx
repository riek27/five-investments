'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Sticky navbar class toggle on scroll
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ── Top Bar ── */}
      <div className="top-bar">
        <div className="left">
  <a href="mailto:info@fiveinvestment-ss.com"><i className="fa-solid fa-envelope"></i> info@fiveinvestment-ss.com</a>
  <a href="tel:+211925811998"><i className="fa-solid fa-phone"></i> +211 922 727 256</a>
  <span><i className="fa-regular fa-building"></i> Gudele 2 , Shar Betri Road, Juba, South Sudan</span>
</div>
        <div className="right">
          <Link href="/services">Services</Link>
          <Link href="/contact">Get in Touch</Link>
        </div>
      </div>

      {/* ── Navbar ── */}
      <nav id="navbar" className="navbar">
        <Link href="/" className="logo">
          <div className="logo-mark">
            <img src="/images/fivelogo.jpeg" alt="Five Investment Limited Logo" />
          </div>
          <span>Five Investment Limited</span>
        </Link>

        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/investments">Investments</Link></li>
          <li><Link href="/activities">Activities</Link></li>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/why-us">Why Us</Link></li>
          <li><Link href="/legal">Legal</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/contact" className="nav-cta">Get in Touch</Link></li>
        </ul>

        <button
          id="mobileToggle"
          className={`mobile-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* ── Mobile Menu ── */}
      <div id="mobileMenu" className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
        <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link href="/investments" onClick={() => setMenuOpen(false)}>Investments</Link>
        <Link href="/activities" onClick={() => setMenuOpen(false)}>Activities</Link>
        <Link href="/services" onClick={() => setMenuOpen(false)}>Services</Link>
        <Link href="/why-us" onClick={() => setMenuOpen(false)}>Why Us</Link>
        <Link href="/legal" onClick={() => setMenuOpen(false)}>Legal</Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>Get in Touch</Link>
      </div>
    </>
  );
}