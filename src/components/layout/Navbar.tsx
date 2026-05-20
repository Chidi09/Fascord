'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Track Parcel', path: '/track' },
    { name: 'Our Services', path: '/services' },
    { name: 'Sending Gifts', path: '/sending-gifts' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={`container ${styles.container}`}>
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image 
                src="/images/fascord-logo.png" 
                alt="Fascord Limited Logo" 
                width={200} 
                height={62} 
                className={styles.logo}
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav}>
            <ul className={styles.navList}>
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <li key={link.name} className={styles.navItem}>
                    <Link 
                      href={link.path} 
                      className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className={styles.ctaWrapper}>
            <Link href="/quote" className={styles.ctaButton}>
              GET A QUOTE
            </Link>
            
            {/* Hamburger Button */}
            <button 
              className={styles.mobileToggle} 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`${styles.mobileDrawer} ${isOpen ? styles.drawerOpen : ''}`}>
          <nav className={styles.mobileNav}>
            <ul className={styles.mobileNavList}>
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <li key={link.name}>
                    <Link 
                      href={link.path} 
                      className={`${styles.mobileNavLink} ${isActive ? styles.mobileActive : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className={styles.mobileFooter}>
              <Link 
                href="/quote" 
                className={styles.mobileCta}
                onClick={() => setIsOpen(false)}
              >
                GET AN INSTANT QUOTE
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
