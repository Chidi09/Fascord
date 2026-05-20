'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import styles from './BusinessHub.module.css';

export default function BusinessHub() {
  const cards = [
    {
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=600&auto=format&fit=crop',
      title: 'Open a Business Account',
      desc: 'Simplify your company logistics. Unlock exclusive commercial volume discounts, flexible monthly billing, and an assigned enterprise dispatch coordinator.',
      ctaText: 'Open Business Account',
      link: '/contact'
    },
    {
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop',
      title: 'Large & Heavy Shipping',
      desc: 'Transport heavy machinery, bulk manufacturing shipments, or fragile oversized payloads across the UK or globally. Custom logistics routing from start to finish.',
      ctaText: 'Explore Freight Solutions',
      link: '/services'
    },
    {
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=600&auto=format&fit=crop',
      title: 'Express vs Economy',
      desc: 'Compare document transit speeds, container sea cargo schedules, and overnight overland transport. Balance speed and budget to optimize your operations.',
      ctaText: 'Compare Service Tiers',
      link: '/services'
    },
    {
      image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=600&auto=format&fit=crop',
      title: 'Packaging & Price Guide',
      desc: 'Avoid shipping errors and custom delays. Access our exact box weight and size requirements, packing instructions, and instant shipping price calculators.',
      ctaText: 'Calculate Box Prices',
      link: '/quote'
    }
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.gridContainer}>
          {/* Left Intro Block */}
          <div className={styles.introBlock}>
            <span className={styles.tag}>ENTERPRISE LOGISTICS</span>
            <h2 className={styles.title}>FASCORD BUSINESS & SHIPPING HUB</h2>
            <p className={styles.desc}>
              Whether you are a scaling e-commerce retailer sending hundreds of parcel gifts a week, or a multinational corporation managing heavy container cargo - Fascord provides tailored commercial solutions.
            </p>
            <div className={styles.actionBlock}>
              <Link href="/contact" className={styles.mainCta}>
                TALK TO BUSINESS DISPATCH
              </Link>
            </div>
          </div>

          {/* Right 2x2 Grid */}
          <div className={styles.grid}>
            {cards.map((c, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.imgWrapper}>
                  <Image 
                    src={c.image} 
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className={styles.cardImg}
                  />
                  <div className={styles.overlay}></div>
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{c.title}</h3>
                  <p className={styles.cardDesc}>{c.desc}</p>
                  
                  <Link href={c.link} className={styles.cardLink}>
                    <span>{c.ctaText}</span>
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
