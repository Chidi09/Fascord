'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Laptop, PhoneCall, ChevronRight } from 'lucide-react';
import styles from './SendingOptions.module.css';

export default function SendingOptions() {
  const options = [
    {
      bgImage: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=600&auto=format&fit=crop',
      icon: <MapPin size={24} />,
      title: 'Drop off at a Fascord Service Point',
      bullets: [
        'No registration or account required',
        'Over 1,600 locations throughout the UK',
        'Convenient opening hours to fit your schedule',
        'Drop off pre-booked shipments instantly'
      ],
      ctaText: 'Find Service Point',
      link: '/services'
    },
    {
      bgImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600&auto=format&fit=crop',
      icon: <Laptop size={24} />,
      title: 'Book a Collection Online',
      bullets: [
        'Schedule a courier from home or office',
        'No account required - pay by debit/credit card',
        'Print labels easily at home or request them',
        'Book up to 5 days in advance'
      ],
      ctaText: 'Book Collection Online',
      link: '/quote'
    },
    {
      bgImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=600&auto=format&fit=crop',
      icon: <PhoneCall size={24} />,
      title: 'Book a Collection by Phone',
      bullets: [
        'Speak directly with a Fascord logistics advisor',
        'Ideal for custom schedules or urgent orders',
        'Saturday collection options available',
        'Guidance on shipping documents & declarations'
      ],
      ctaText: 'Call 0844 248 0828',
      link: '/contact'
    }
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}>CONVENIENT LOGISTICS</span>
          <h2 className={styles.title}>WAYS TO SEND A PARCEL WITH FASCORD</h2>
          <p className={styles.subtitle}>
            Choose the courier service method that best fits your timing, budget, and business flow.
          </p>
        </div>

        <div className={styles.grid}>
          {options.map((opt, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.bgWrapper}>
                <Image 
                  src={opt.bgImage} 
                  alt={opt.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={styles.bgImage}
                />
                <div className={styles.overlay}></div>
              </div>

              <div className={styles.cardContent}>
                <div className={styles.iconWrapper}>
                  {opt.icon}
                </div>
                <h3 className={styles.cardTitle}>{opt.title}</h3>
                
                <ul className={styles.bullets}>
                  {opt.bullets.map((b, index) => (
                    <li key={index} className={styles.bulletItem}>
                      <span className={styles.check}>✓</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <Link href={opt.link} className={styles.cta}>
                  <span>{opt.ctaText}</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
