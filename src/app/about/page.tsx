'use client';

import React from 'react';
import { Award, Target, Users, ShieldCheck, Heart, Clock, Globe, Truck } from 'lucide-react';
import TopBanner from '@/components/layout/TopBanner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './about.module.css';

export default function AboutPage() {
  const values = [
    {
      icon: <Target className={styles.valueIcon} size={32} />,
      title: 'Precision Execution',
      desc: 'We operate with strict timelines. From collection to customs sorting to courier delivery, every second is optimized for reliable delivery.'
    },
    {
      icon: <ShieldCheck className={styles.valueIcon} size={32} />,
      title: 'Ironclad Security',
      desc: 'Your shipments represent business trust. We utilize state-of-the-art GPS tracking and secure logistics ledgers to safeguard cargo.'
    },
    {
      icon: <Users className={styles.valueIcon} size={32} />,
      title: 'Customer-First Logistics',
      desc: 'Our dispatch agents are available 24/7. We offer bespoke account management to ensure your shipping profiles run with zero friction.'
    },
    {
      icon: <Heart className={styles.valueIcon} size={32} />,
      title: 'Sustainable Journeys',
      desc: 'We actively optimize route densities and vehicle loading to systematically reduce CO2 emissions across our UK fleet.'
    }
  ];

  const milestones = [
    { year: '2020', title: 'Fascord Founded', desc: 'Established in East London with a modest fleet of five regional dispatch vans.' },
    { year: '2022', title: 'National Expansion', desc: 'Opened Manchester and Birmingham depots, scaling express transit across all major UK hubs.' },
    { year: '2024', title: 'Global Integrations', desc: 'Partnered with Heathrow air terminals to launch comprehensive international freight pathways.' },
    { year: '2026', title: 'Logistics Ledgers', desc: 'Deployed local developer mock API systems and MSW endpoints to automate commercial rate sheets.' },
  ];

  return (
    <>
      <TopBanner />
      <Navbar />
      <main className={styles.main}>
        
        {/* About Hero */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.pageTitle}>DELIVERING FASCORD</h1>
              <p className={styles.pageSubtitle}>
                Learn how we engineered premium express courier networks and global cargo corridors on solid foundations of speed and trust.
              </p>
            </div>
          </div>
        </section>

        {/* Company Overview Story */}
        <section className={styles.storySection}>
          <div className="container">
            <div className={styles.storyGrid}>
              <div className={styles.storyText}>
                <span className={styles.tag}>OUR ORIGINS</span>
                <h2 className={styles.sectionTitle}>DELIVERING MORE THAN PARCELS</h2>
                <p>
                  Fascord Limited was established to bridge the gap between heavy commercial freight networks and fast, direct consumer-to-business parcel dispatch. Inspired by the speed, efficiency, and industrial clarity of the world&apos;s leading express networks, we set out to build a streamlined, highly responsive logistics infrastructure.
                </p>
                <p>
                  From documents to bulk retail cargo, we treat every package as a core transaction of trust. Our team comprises industry veterans, cargo pilots, and customs compliance specialists working around the clock to keep your supply chain moving.
                </p>
                <div className={styles.statsInline}>
                  <div className={styles.statMini}>
                    <span className={styles.statNum}>220+</span>
                    <span className={styles.statLbl}>Countries Reached</span>
                  </div>
                  <div className={styles.statMini}>
                    <span className={styles.statNum}>10M+</span>
                    <span className={styles.statLbl}>Parcels Dispatched</span>
                  </div>
                  <div className={styles.statMini}>
                    <span className={styles.statNum}>99.8%</span>
                    <span className={styles.statLbl}>On-Time Rating</span>
                  </div>
                </div>
              </div>

              <div className={styles.storyAssetCard}>
                <div className={styles.badgeWrapper}>
                  <Award className={styles.badgeIcon} size={48} />
                  <h3>FASCORD ASSURANCE</h3>
                  <p>Certified express courier dispatch and custom air terminal routing clearance.</p>
                </div>
                <div className={styles.assetList}>
                  <div className={styles.assetItem}>
                    <Clock size={18} className={styles.assetIcon} />
                    <span>60-Minute Urgent Pickups</span>
                  </div>
                  <div className={styles.assetItem}>
                    <Globe size={18} className={styles.assetIcon} />
                    <span>Comprehensive Customs Clearance</span>
                  </div>
                  <div className={styles.assetItem}>
                    <Truck size={18} className={styles.assetIcon} />
                    <span>Carbon-Offset Delivery Corridors</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Values Grid */}
        <section className={styles.valuesSection}>
          <div className="container">
            <div className={styles.centerHeader}>
              <span className={styles.tag}>HOW WE WORK</span>
              <h2 className={styles.centerTitle}>OUR CORE PILLARS</h2>
              <p className={styles.centerSubtitle}>
                Operating a global courier network requires precision alignment around values that place your parcel&apos;s security first.
              </p>
            </div>

            <div className={styles.valuesGrid}>
              {values.map((v, i) => (
                <div key={i} className={styles.valueCard}>
                  <div className={styles.valueIconWrapper}>{v.icon}</div>
                  <h3 className={styles.valueCardTitle}>{v.title}</h3>
                  <p className={styles.valueCardDesc}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Milestones Timeline */}
        <section className={styles.timelineSection}>
          <div className="container">
            <div className={styles.centerHeader}>
              <span className={styles.tag}>GROWTH JOURNEY</span>
              <h2 className={styles.centerTitle}>MILESTONES OF EXCELLENCE</h2>
              <p className={styles.centerSubtitle}>
                Trace our trajectory from a local East London dispatch fleet to an integrated international logistics provider.
              </p>
            </div>

            <div className={styles.timeline}>
              <div className={styles.timelineBar}></div>
              {milestones.map((m, i) => (
                <div key={i} className={`${styles.timelineItem} ${i % 2 === 0 ? styles.leftSide : styles.rightSide}`}>
                  <div className={styles.timelineMarker}>
                    <span className={styles.markerYear}>{m.year}</span>
                  </div>
                  <div className={styles.timelineCard}>
                    <span className={styles.timelineYearMobile}>{m.year}</span>
                    <h4 className={styles.timelineTitleText}>{m.title}</h4>
                    <p className={styles.timelineDescText}>{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
