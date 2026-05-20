'use client';

import React from 'react';
import Link from 'next/link';
import { Plane, ArrowRight } from 'lucide-react';
import styles from './Destinations.module.css';

export default function Destinations() {
  const routes = [
    { country: 'United States', flag: '🇺🇸', code: 'USA', time: '1-2 Days Transit' },
    { country: 'Germany', flag: '🇩🇪', code: 'DEU', time: '1 Day Transit' },
    { country: 'Canada', flag: '🇨🇦', code: 'CAN', time: '2 Days Transit' },
    { country: 'Nigeria', flag: '🇳🇬', code: 'NGA', time: '3 Days Transit' },
    { country: 'Australia', flag: '🇦🇺', code: 'AUS', time: '3-4 Days Transit' },
    { country: 'China', flag: '🇨🇳', code: 'CHN', time: '2-3 Days Transit' },
    { country: 'France', flag: '🇫🇷', code: 'FRA', time: '1 Day Transit' },
    { country: 'India', flag: '🇮🇳', code: 'IND', time: '2-3 Days Transit' },
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}>POPULAR SHIPPING ROUTES</span>
          <h2 className={styles.title}>EXPANDING YOUR GLOBAL REACH</h2>
          <p className={styles.subtitle}>
            Fascord connects your business directly to major international commerce hubs with dedicated weekly flights and freight networks.
          </p>
        </div>

        <div className={styles.grid}>
          {routes.map((r, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.flagWrapper}>
                <span className={styles.flag}>{r.flag}</span>
                <span className={styles.code}>{r.code}</span>
              </div>
              <div className={styles.info}>
                <h3 className={styles.countryName}>{r.country}</h3>
                <span className={styles.time}><Plane size={12} className={styles.planeIcon} /> {r.time}</span>
              </div>
              <Link 
                href={`/quote?origin=United+Kingdom&destination=${encodeURIComponent(r.country)}`} 
                className={styles.link}
                aria-label={`Get shipping quote for ${r.country}`}
              >
                Quote <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        <div className={styles.actionRow}>
          <Link href="/services" className={styles.allRoutesLink}>
            EXPLORE ALL 220+ DESTINATIONS
          </Link>
        </div>
      </div>
    </section>
  );
}
