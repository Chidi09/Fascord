'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ArrowRight, HelpCircle, ShieldAlert, Award } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        
        {/* Newsletter Signup Row */}
        <div className={styles.newsletterRow}>
          <div className={styles.newsletterText}>
            <h3>Sign up for Fascord news & offers</h3>
            <p>Get the latest logistics updates, customs notifications, and exclusive retail/corporate discounts.</p>
          </div>
          <form onSubmit={handleSubscribe} className={styles.newsletterForm}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.newsletterInput}
            />
            <button type="submit" className={styles.newsletterSubmit}>
              {subscribed ? 'SUBSCRIBED!' : 'SUBSCRIBE'}
            </button>
          </form>
        </div>

        <div className={styles.grid}>
          {/* Brand Info Column */}
          <div className={styles.brandCol}>
            <Image 
              src="/images/fascord-logo.png" 
              alt="Fascord Limited Logo" 
              width={200} 
              height={62} 
              className={styles.footerLogo}
            />
            <p className={styles.brandDesc}>
              Delivering more than parcels. Providing state-of-the-art global logistics, freight solutions, and express courier services across the UK and beyond.
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className={styles.linkCol}>
            <h3 className={styles.colTitle}>QUICK LINKS</h3>
            <ul className={styles.linkList}>
              <li><Link href="/track" className={styles.link}><ArrowRight size={12} /> Track a Parcel</Link></li>
              <li><Link href="/services" className={styles.link}><ArrowRight size={12} /> Courier Services</Link></li>
              <li><Link href="/quote" className={styles.link}><ArrowRight size={12} /> Get a Quote</Link></li>
              <li><Link href="/about" className={styles.link}><ArrowRight size={12} /> About Fascord</Link></li>
              <li><Link href="/contact" className={styles.link}><ArrowRight size={12} /> Customer Support</Link></li>
            </ul>
          </div>

          {/* Column 3: Popular Routes */}
          <div className={styles.linkCol}>
            <h3 className={styles.colTitle}>POPULAR ROUTES</h3>
            <ul className={styles.linkList}>
              <li><Link href="/services" className={styles.link}><ArrowRight size={12} /> United Kingdom to USA</Link></li>
              <li><Link href="/services" className={styles.link}><ArrowRight size={12} /> United Kingdom to Canada</Link></li>
              <li><Link href="/services" className={styles.link}><ArrowRight size={12} /> United Kingdom to Germany</Link></li>
              <li><Link href="/services" className={styles.link}><ArrowRight size={12} /> United Kingdom to Nigeria</Link></li>
              <li><Link href="/services" className={styles.link}><ArrowRight size={12} /> European Union Cargo</Link></li>
            </ul>
          </div>

          {/* Column 4: Help & Advice */}
          <div className={styles.linkCol}>
            <h3 className={styles.colTitle}>HELP & ADVICE</h3>
            <ul className={styles.linkList}>
              <li><Link href="/sending-gifts" className={styles.link}><ArrowRight size={12} /> FAQs & Support</Link></li>
              <li><Link href="/sending-gifts" className={styles.link}><ArrowRight size={12} /> What you can & can't send</Link></li>
              <li><Link href="/sending-gifts" className={styles.link}><ArrowRight size={12} /> Sending Gifts Guide</Link></li>
              <li><Link href="/services" className={styles.link}><ArrowRight size={12} /> Heavy Freight Guide</Link></li>
              <li><Link href="/contact" className={styles.link}><ArrowRight size={12} /> Leave a Review</Link></li>
            </ul>
          </div>

          {/* Column 5: Head Office */}
          <div className={styles.brandCol}>
            <h3 className={styles.colTitle}>HEAD OFFICE</h3>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <MapPin className={styles.contactIcon} size={18} />
                <span>100 Logistics Blvd, East London, EC2A 4AX, UK</span>
              </li>
              <li className={styles.contactItem}>
                <Phone className={styles.contactIcon} size={18} />
                <span>+44 (0) 20 7946 0888 (24/7)</span>
              </li>
              <li className={styles.contactItem}>
                <Mail className={styles.contactIcon} size={18} />
                <span>support@fascord.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal strip */}
        <div className={styles.bottomBar}>
          <p className={styles.copy}>
            &copy; {currentYear} Fascord Limited. All Rights Reserved. Co. Registration No. 1184988 | VAT No. 751812341.
          </p>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>Terms of Carriage</a>
            <span className={styles.divider}>|</span>
            <a href="#" className={styles.legalLink}>Privacy Policy</a>
            <span className={styles.divider}>|</span>
            <a href="#" className={styles.legalLink}>Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
