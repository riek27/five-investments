'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function Scripts() {
  const pathname = usePathname();
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // ── Clean up previous observer and timer ──
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
    }

    // ── Reveal animations ──
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
    observerRef.current = revealObserver;

    // Fallback: after 1.5s, force any still‑hidden reveals to become visible
    fallbackTimerRef.current = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
        el.classList.add('visible');
      });
    }, 1500);

    // ── Smooth scroll for anchor links ──
    const handleSmoothScroll = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const navbar = document.getElementById('navbar');
          const offset = navbar ? navbar.offsetHeight + 10 : 70;
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - offset,
            behavior: 'smooth',
          });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', handleSmoothScroll);
    });

    // ── Contact form submit (via Web3Forms) ──
    const contactForm = document.getElementById('contactForm') as HTMLFormElement | null;
    if (contactForm) {
      contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        if (!btn) return;

        const formData = new FormData(contactForm);
        // Build the payload with all form fields + the Web3Forms access key
        const payload = {
          access_key: 'd044c4e8-a34b-4800-be0d-f56824ca4f13',
          name: formData.get('name') as string,
          phone: formData.get('phone') as string,
          email: formData.get('email') as string,
          organization: formData.get('organization') as string,
          service: formData.get('service') as string,
          subject: formData.get('subject') as string,
          details: formData.get('details') as string,
        };

        const originalText = btn.textContent;
        btn.textContent = '⏳ Sending...';
        btn.style.background = 'var(--primary-dark)';

        try {
          const res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });

          if (res.ok) {
            btn.textContent = '✓ Message Sent!';
            btn.style.background = 'var(--primary-dark)';
            setTimeout(() => {
              btn.textContent = originalText;
              btn.style.background = '';
              contactForm.reset();
            }, 2500);
          } else {
            btn.textContent = '✕ Failed – Try Again';
            setTimeout(() => {
              btn.textContent = originalText;
              btn.style.background = '';
            }, 2500);
          }
        } catch (err) {
          btn.textContent = '✕ Network Error';
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
          }, 2500);
        }
      });
    }

    // Cleanup on unmount or before next run
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
      }
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, [pathname]); // <-- Re‑run on every route change

  return null;
}