'use client';

import React from 'react';
import Link from 'next/link';
import { CreditCard, CalendarCheck, HelpCircle, ArrowRight } from 'lucide-react';
import styles from './HelpfulTools.module.css';

export default function HelpfulTools() {
  const tools = [
    {
      icon: <CreditCard size={28} />,
      title: 'Pay Duty & VAT',
      desc: 'Received a custom customs duty or tax payment request? Process it securely online to prevent delivery holds.',
      ctaText: 'Pay Duty & VAT Online',
      link: '/contact'
    },
    {
      icon: <CalendarCheck size={28} />,
      title: 'Did we miss you?',
      desc: 'Missed our courier? Arrange a free redelivery, redirect to a local service point, or request courier holding.',
      ctaText: 'Rearrange Redelivery',
      link: '/track'
    },
    {
      icon: <HelpCircle size={28} />,
      title: 'FAQs & Help Centre',
      desc: 'Got questions about package size limits, electronic devices, transit insurance, or delivery signatures?',
      ctaText: 'View Frequently Asked Questions',
      link: '/sending-gifts'
    }
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.tag}>CONVENIENT UTILITIES</span>
          <h2 className={styles.title}>HELPFUL SHIPPING & TRACKING TOOLS</h2>
          <p className={styles.subtitle}>
            Manage duty payments, missed courier collections, or explore detailed support guides in just a few clicks.
          </p>
        </div>

        <div className={styles.grid}>
          {tools.map((tool, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.iconWrapper}>
                  {tool.icon}
                </div>
                <h3 className={styles.cardTitle}>{tool.title}</h3>
                <p className={styles.cardDesc}>{tool.desc}</p>
              </div>

              <Link href={tool.link} className={styles.cta}>
                <span>{tool.ctaText}</span>
                <ArrowRight size={16} className={styles.arrow} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
