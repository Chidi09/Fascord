'use client';

import React from 'react';
import Link from 'next/link';
import { Package, Globe, Clock, ShieldCheck, CheckCircle2, ChevronRight, MapPin, Laptop, PhoneCall } from 'lucide-react';
import TopBanner from '@/components/layout/TopBanner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './services.module.css';

export default function ServicesPage() {
  const serviceDetails = [
    {
      icon: <Package size={40} />,
      title: 'FASCORD EXPRESS COURIER',
      desc: 'Our primary door-to-door express transport network for documents, retail items, and small parcels. We offer direct delivery routes across the UK and to over 220 countries.',
      features: [
        'UK Next-Day Delivery (before 12:00 PM available)',
        'Fully integrated end-to-end status tracking',
        'Complimentary liability cover up to £100',
        'Convenient local drop-off and collection points',
      ],
      price: 'Rates starting from £7.99'
    },
    {
      icon: <Globe size={40} />,
      title: 'GLOBAL FREIGHT FORWARDING',
      desc: 'Engineered for high-volume commercial shipping and bulk cargo requirements. We coordinate air, ocean, and overland freight, including full customs duty clearance.',
      features: [
        'FCL (Full Container Load) & LCL (Less Container Load) shipping',
        'Expedited international air freight terminal connections',
        'Comprehensive import and export documentation filing',
        'Assigned commercial accounts manager',
      ],
      price: 'Custom tailored cargo quotes'
    },
    {
      icon: <Clock size={40} />,
      title: 'DEDICATED SAME-DAY COURIER',
      desc: 'When timing is absolute. We assign a dedicated courier and vehicle to collect and deliver your payload directly without intermediate sorting or co-loading.',
      features: [
        'Immediate dispatch within 60 minutes of booking',
        'Direct vehicle point-to-point transit paths',
        'Perfect for fragile, high-value, or medical payloads',
        'Direct driver telephone coordination access',
      ],
      price: 'Rates starting from £45.00'
    }
  ];

  const comparisonRows = [
    { feature: 'Transit Time (UK)', express: '1-2 Days', freight: '3-7 Days', sameday: 'Same Day' },
    { feature: 'Transit Time (Intl)', express: '1-3 Days', freight: '3-14 Days', sameday: 'N/A' },
    { feature: 'Max Weight per Item', express: '30kg', freight: 'No Limit', sameday: '1000kg' },
    { feature: 'Dedicated Dispatch', express: '✕', freight: '✕', sameday: '✓' },
    { feature: 'Customs Clearance Help', express: '✓', freight: '✓', sameday: 'N/A' },
    { feature: 'Real-time Tracking', express: '✓', freight: '✓', sameday: '✓ (Live GPS)' },
  ];

  return (
    <>
      <TopBanner />
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.pageTitle}>LOGISTICS SERVICES & COMPARISONS</h1>
              <p className={styles.pageSubtitle}>
                State-of-the-art express shipping, global freight distribution, and dedicated same-day cargo systems designed around you.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Services block */}
        <section className={styles.servicesBlock}>
          <div className="container">
            <div className={styles.servicesGrid}>
              {serviceDetails.map((s, index) => (
                <div key={index} className={styles.serviceCard}>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconWrapper}>{s.icon}</div>
                    <h2 className={styles.cardTitle}>{s.title}</h2>
                  </div>
                  <p className={styles.cardDesc}>{s.desc}</p>
                  
                  <div className={styles.featuresWrapper}>
                    <h4 className={styles.featuresTitle}>Included in this Service:</h4>
                    <ul className={styles.featuresList}>
                      {s.features.map((f, i) => (
                        <li key={i} className={styles.featureItem}>
                          <CheckCircle2 size={16} className={styles.checkIcon} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.cardFooter}>
                    <span className={styles.priceLabel}>{s.price}</span>
                    <Link href="/quote" className={styles.quoteBtn}>
                      GET QUOTE <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparisons Table section */}
        <section className={styles.comparisonSection}>
          <div className="container">
            <div className={styles.comparisonHeader}>
              <span className={styles.tag}>MATRIX OVERVIEW</span>
              <h2 className={styles.sectionTitle}>SERVICE COMPARISON MATRIX</h2>
              <p className={styles.sectionSubtitle}>
                Compare specifications, limits, and timelines of our three primary service modules to select your ideal logistics fit.
              </p>
            </div>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Specification / Feature</th>
                    <th>Express Courier</th>
                    <th>Freight Forwarding</th>
                    <th>Same-Day Courier</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, index) => (
                    <tr key={index}>
                      <td className={styles.featName}>{row.feature}</td>
                      <td>{row.express}</td>
                      <td>{row.freight}</td>
                      <td>{row.sameday}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.tableCta}>
              <ShieldCheck size={24} className={styles.shieldIcon} />
              <p>
                <strong>Unsure which route fits your cargo?</strong> Our logistics dispatch coordinators are available 24/7 to help you configure custom cargo shipping networks. <Link href="/contact">Get in Touch</Link>
              </p>
            </div>
          </div>
        </section>

        {/* Choose How You'd Like to Send section */}
        <section className={styles.howToSendSection}>
          <div className="container">
            <div className={styles.howToSendHeader}>
              <span className={styles.tag}>SHIPPING METHODS</span>
              <h2 className={styles.sectionTitle}>CHOOSE HOW YOU'D LIKE TO SEND</h2>
              <p className={styles.sectionSubtitle}>
                We offer multiple convenient options to drop off your parcels or schedule courier collections.
              </p>
            </div>

            <div className={styles.methodsGrid}>
              <div className={styles.methodCard}>
                <div className={styles.methodIconWrapper}>
                  <MapPin size={28} />
                </div>
                <h3 className={styles.methodCardTitle}>Fascord Drop-off Points</h3>
                <p className={styles.methodCardDesc}>
                  Drop off your parcels at any of our 1,600+ convenient local partner locations across the UK. No account needed.
                </p>
                <Link href="/quote" className={styles.methodCta}>
                  <span>Book & Find Drop-Off</span> <ChevronRight size={14} />
                </Link>
              </div>

              <div className={styles.methodCard}>
                <div className={styles.methodIconWrapper}>
                  <Laptop size={28} />
                </div>
                <h3 className={styles.methodCardTitle}>Book Collection Online</h3>
                <p className={styles.methodCardDesc}>
                  Schedule a courier collection directly from your home, warehouse, or office. Print labels easily.
                </p>
                <Link href="/quote" className={styles.methodCta}>
                  <span>Book Collection</span> <ChevronRight size={14} />
                </Link>
              </div>

              <div className={styles.methodCard}>
                <div className={styles.methodIconWrapper}>
                  <PhoneCall size={28} />
                </div>
                <h3 className={styles.methodCardTitle}>Book by Phone</h3>
                <p className={styles.methodCardDesc}>
                  Speak to our dedicated logistics advisors for priority booking, Saturday delivery, or oversized cargo guidance.
                </p>
                <Link href="/contact" className={styles.methodCta}>
                  <span>Call Customer Desk</span> <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
