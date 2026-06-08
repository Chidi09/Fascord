'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Search, Shield, Clock, Globe, Lock, ArrowRight } from 'lucide-react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const [activeTab, setActiveTab] = useState<'track' | 'quote'>('track');
  const [trackingId, setTrackingId] = useState('');
  
  // Quick Quote state
  const [toCountry, setToCountry] = useState('United States');
  const [weight, setWeight] = useState('1');
  const [parcels, setParcels] = useState('1');

  const router = useRouter();

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingId.trim()) {
      router.push(`/track?id=${encodeURIComponent(trackingId.trim().toUpperCase())}`);
    }
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/quote?from=United+Kingdom&to=${encodeURIComponent(toCountry)}&weight=${encodeURIComponent(weight)}&parcels=${encodeURIComponent(parcels)}`
    );
  };

  const supportPillars = [
    { icon: <Shield size={20} />, label: 'RELIABLE SERVICE' },
    { icon: <Clock size={20} />, label: 'ON TIME DELIVERY' },
    { icon: <Globe size={20} />, label: 'WORLDWIDE REACH' },
    { icon: <Lock size={20} />, label: 'SECURE HANDLING' },
  ];

  return (
    <section className={styles.hero}>
      {/* Background Image */}
      <div className={styles.bgWrapper}>
        <Image 
          src="/hero.jpeg" 
          alt="Fascord Global Transport Fleet" 
          fill
          priority
          sizes="100vw"
          className={styles.bgImage}
        />
        <div className={styles.overlay}></div>
      </div>

      <div className={`container ${styles.container}`}>
        <div className={styles.content}>
          <span className={styles.badge}>PREMIUM LOGISTICS SOLUTIONS</span>
          <h1 className={styles.title}>
            DELIVERING MORE THAN <span className={styles.accent}>PARCELS</span>
          </h1>
          <p className={styles.subtitle}>
            Reliable. Fast. Worldwide. Fascord Limited provides premier logistics and courier solutions across the UK and beyond.
          </p>

          {/* Form Tabs Switcher */}
          <div className={styles.tabContainer}>
            <button 
              type="button" 
              className={`${styles.tabBtn} ${activeTab === 'track' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('track')}
            >
              TRACK PARCEL
            </button>
            <button 
              type="button" 
              className={`${styles.tabBtn} ${activeTab === 'quote' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('quote')}
            >
              GET QUICK QUOTE
            </button>
          </div>

          {activeTab === 'track' ? (
            /* Quick Track Search Input */
            <form className={styles.trackForm} onSubmit={handleTrackSubmit}>
              <div className={styles.inputWrapper}>
                <Search className={styles.searchIcon} size={20} />
                <input 
                  type="text" 
                  placeholder="Enter 10-digit Tracking ID (e.g. FAS-DELIVERED, FAS-12345)..."
                  className={styles.trackInput}
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className={styles.trackButton}>
                TRACK
              </button>
            </form>
          ) : (
            /* Quick Quote Mini Calculator Form */
            <form className={styles.quoteForm} onSubmit={handleQuoteSubmit}>
              <div className={styles.quoteFields}>
                <div className={styles.fieldGroup}>
                  <label className={styles.label}>From</label>
                  <input 
                    type="text" 
                    value="United Kingdom" 
                    disabled 
                    className={styles.selectInputDisabled} 
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>To</label>
                  <select 
                    value={toCountry}
                    onChange={(e) => setToCountry(e.target.value)}
                    className={styles.selectInput}
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Germany">Germany</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="France">France</option>
                    <option value="Australia">Australia</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="South Africa">South Africa</option>
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Weight (kg)</label>
                  <input 
                    type="number" 
                    min="0.1" 
                    step="0.1" 
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className={styles.selectInput}
                    required
                  />
                </div>

                <div className={styles.fieldGroup}>
                  <label className={styles.label}>Parcels</label>
                  <select 
                    value={parcels}
                    onChange={(e) => setParcels(e.target.value)}
                    className={styles.selectInput}
                  >
                    <option value="1">1 Parcel</option>
                    <option value="2">2 Parcels</option>
                    <option value="3">3+ Parcels</option>
                  </select>
                </div>
              </div>

              <button type="submit" className={styles.quoteButton}>
                GET PRICE <ArrowRight size={18} />
              </button>
            </form>
          )}

          {/* Support Info strip */}
          <div className={styles.pillarStrip}>
            {supportPillars.map((p, i) => (
              <div key={i} className={styles.pillar}>
                <div className={styles.pillarIcon}>{p.icon}</div>
                <span className={styles.pillarLabel}>{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

