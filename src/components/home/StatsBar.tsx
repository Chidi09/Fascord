'use client';

import React from 'react';
import styles from './StatsBar.module.css';

export default function StatsBar() {
  const stats = [
    { number: '220+', label: 'Countries Served' },
    { number: '15M+', label: 'Deliveries Made' },
    { number: '99.8%', label: 'On-Time Accuracy' },
    { number: '250+', label: 'Regional Depots' },
  ];

  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.grid}>
          {stats.map((s, index) => (
            <div key={index} className={styles.stat}>
              <span className={styles.number}>{s.number}</span>
              <span className={styles.label}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
