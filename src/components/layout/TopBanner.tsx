'use client';

import React from 'react';
import { AlertCircle } from 'lucide-react';
import styles from './TopBanner.module.css';

export default function TopBanner() {
  return (
    <div className={styles.banner}>
      <div className="container">
        <div className={styles.content}>
          <AlertCircle className={styles.icon} size={16} />
          <span className={styles.text}>
            <strong>Service Notice:</strong> Standard shipping routes operate normally. High volume delays may occur on cross-channel shipping.
          </span>
        </div>
      </div>
    </div>
  );
}
