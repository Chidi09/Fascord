'use client';

import React from 'react';
import Link from 'next/link';
import styles from './CTASection.module.css';

export default function CTASection() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <h2 className={styles.title}>READY TO TRANSACT WITH FASCORD?</h2>
          <p className={styles.subtitle}>
            Access the UK’s premier express logistics and global freight dispatch networks. Get your pricing and routing schedules in under 60 seconds.
          </p>
          <div className={styles.actions}>
            <Link href="/quote" className={styles.primaryBtn}>
              GET A QUOTE NOW
            </Link>
            <Link href="/contact" className={styles.secondaryBtn}>
              TALK TO AN AGENT
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
