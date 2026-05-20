'use client';

import React from 'react';
import Link from 'next/link';
import { Package, Globe, Clock, ArrowRight } from 'lucide-react';
import styles from './ServicesGrid.module.css';

export default function ServicesGrid() {
  const services = [
    {
      icon: <Package size={32} />,
      title: 'Express Courier',
      tagline: 'Domestic & International',
      desc: 'Premium door-to-door express parcel courier with absolute end-to-end status tracking. Fast, secure, and fully customized around your timelines.',
      bullets: ['Next Day UK Delivery', 'Worldwide Air Express', 'Convenient Drop-off Points', 'Free Delivery Signature'],
      link: '/services',
    },
    {
      icon: <Globe size={32} />,
      title: 'Global Freight Forwarding',
      tagline: 'Air, Ocean & Land Cargo',
      desc: 'High-volume shipping solutions covering all global trade lanes. Custom clearance clearance assistance, container booking, and bulk freight forwarding.',
      bullets: ['FCL & LCL Container Shipping', 'Expedited Air Freight Cargo', 'Customs Duty Filing Support', 'Warehousing Logistics'],
      link: '/services',
    },
    {
      icon: <Clock size={32} />,
      title: 'Dedicated Same-Day',
      tagline: 'Urgent & Special Handlings',
      desc: 'Dedicated courier transit for critical payloads, fragile equipment, and sensitive documents. Zero co-loading, direct point-to-point delivery.',
      bullets: ['Direct Dedicated Vehicle', 'Instant GPS Courier Tracking', 'Fragile & High-Value Payloads', '24/7 Priority Booking'],
      link: '/services',
    },
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}>OUR SERVICES</span>
          <h2 className={styles.title}>LOGISTICS TAILORED FOR YOUR SUCCESS</h2>
          <p className={styles.subtitle}>
            From single document envelopes to complete container freight payloads, Fascord provides premium transport networks.
          </p>
        </div>

        <div className={styles.grid}>
          {services.map((s, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.iconWrapper}>
                {s.icon}
              </div>
              <span className={styles.cardTag}>{s.tagline}</span>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardDesc}>{s.desc}</p>
              
              <ul className={styles.bulletList}>
                {s.bullets.map((b, i) => (
                  <li key={i} className={styles.bullet}>
                    <span className={styles.bulletCheck}>✓</span> {b}
                  </li>
                ))}
              </ul>

              <Link href={s.link} className={styles.cardLink}>
                Learn More <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
