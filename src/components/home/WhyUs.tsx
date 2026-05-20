'use client';

import React from 'react';
import { ShieldCheck, Truck, Headphones, TreePine } from 'lucide-react';
import styles from './WhyUs.module.css';

export default function WhyUs() {
  const pillars = [
    {
      icon: <ShieldCheck size={28} />,
      title: 'Custom-Cleared Express Transit',
      desc: 'Our logistics experts guide you through complex customs documentation, commercial invoices, and tax rules to ensure frictionless cross-border delivery.',
    },
    {
      icon: <Truck size={28} />,
      title: 'Premium End-to-End Tracking',
      desc: 'Monitor your freight cargos and express letters status at every milestone. Real-time courier vehicle telemetry and instant digital delivery proof.',
    },
    {
      icon: <Headphones size={28} />,
      title: '24/7 Priority Support Desk',
      desc: 'No automated menus or chatbots. Gain instant access to professional logistics dispatchers who manage your supply chain requirements proactively.',
    },
    {
      icon: <TreePine size={28} />,
      title: 'Eco-Responsible Fleet Action',
      desc: 'We invest in advanced biofuels, electric delivery vehicles, and local forestry carbon-offsets to minimize the impact of international logistics.',
    },
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left Block: Heading & Copy */}
          <div className={styles.infoBlock}>
            <span className={styles.tag}>WHY CHOOSE FASCORD</span>
            <h2 className={styles.title}>THE BENCHMARK IN SECURE COURIER & LOGISTICS</h2>
            <p className={styles.desc}>
              Fascord Limited builds relationships on trust, accuracy, and performance. Whether you are shipping critical legal instruments or container-load industrial supplies, we guarantee elite customer handling.
            </p>
            <div className={styles.highlightCard}>
              <h4 className={styles.highlightTitle}>OUR PROMISE</h4>
              <p className={styles.highlightText}>
                &ldquo;Frictionless delivery, transparent billing, and immediate proactive support. Your cargo is our absolute priority.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Block: Advantages Cards */}
          <div className={styles.cardsBlock}>
            {pillars.map((p, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.iconWrapper}>
                  {p.icon}
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{p.title}</h3>
                  <p className={styles.cardText}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
