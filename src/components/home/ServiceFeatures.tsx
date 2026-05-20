'use client';

import React from 'react';
import { Globe, ShieldCheck, Clock, FileText, MapPin, CheckSquare, Home, Navigation } from 'lucide-react';
import styles from './ServiceFeatures.module.css';

export default function ServiceFeatures() {
  const features = [
    {
      icon: <Globe size={24} />,
      title: 'UK & International Courier',
      desc: 'Deliveries to over 220 countries and territories.'
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'Fast, Secure & Reliable',
      desc: 'State-of-the-art handling for every document or box.'
    },
    {
      icon: <Clock size={24} />,
      title: 'Next Working Day Delivery',
      desc: 'Swift shipping routes ensuring time-critical transit.'
    },
    {
      icon: <FileText size={24} />,
      title: 'Customs Experts',
      desc: 'Pre-clearance documentation guidance and duty filing.'
    },
    {
      icon: <MapPin size={24} />,
      title: 'Convenient Delivery Options',
      desc: 'Choose drop-off or collection at your preference.'
    },
    {
      icon: <CheckSquare size={24} />,
      title: 'Signature on Delivery',
      desc: 'Proof of delivery signed by the verified receiver.'
    },
    {
      icon: <Home size={24} />,
      title: 'Door-to-Door Delivery',
      desc: 'Seamless transit directly from source to destination.'
    },
    {
      icon: <Navigation size={24} />,
      title: 'Real-Time Parcel Tracking',
      desc: 'Full status monitoring of your parcel milestones.'
    }
  ];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>All our express delivery options offer:</h2>
        </div>

        <div className={styles.grid}>
          {features.map((feat, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.iconWrapper}>
                {feat.icon}
              </div>
              <div className={styles.textWrapper}>
                <h3 className={styles.itemTitle}>{feat.title}</h3>
                <p className={styles.itemDesc}>{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
