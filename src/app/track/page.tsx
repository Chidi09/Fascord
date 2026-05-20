'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, MapPin, Calendar, Clock, CheckCircle2, ChevronRight, AlertTriangle, Truck } from 'lucide-react';
import TopBanner from '@/components/layout/TopBanner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './track.module.css';

interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  details: string;
  completed: boolean;
}

interface TrackingData {
  trackingId: string;
  status: 'delivered' | 'in_transit' | 'pending' | 'failed';
  shipper: string;
  recipient: string;
  origin: string;
  destination: string;
  estimatedDelivery: string;
  currentStep: number;
  steps: TrackingEvent[];
}

function TrackingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const trackingQuery = searchParams.get('id') || '';

  const [inputVal, setInputVal] = useState(trackingQuery);
  const [trackingId, setTrackingId] = useState(trackingQuery);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<TrackingData | null>(null);

  useEffect(() => {
    if (!trackingId) return;

    const fetchTracking = async () => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const response = await fetch(`/api/track/${trackingId}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch tracking data');
        }

        setData(result);
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'An error occurred while fetching tracking details.';
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchTracking();
  }, [trackingId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      const cleanId = inputVal.trim().toUpperCase();
      setTrackingId(cleanId);
      router.push(`/track?id=${encodeURIComponent(cleanId)}`);
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'in_transit': return 'In Transit';
      case 'pending': return 'Pending Collection';
      default: return 'Information Received';
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'delivered': return styles.statusDelivered;
      case 'in_transit': return styles.statusTransit;
      default: return styles.statusPending;
    }
  };

  return (
    <div className={styles.pageContent}>
      <section className={styles.searchHero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.pageTitle}>PARCEL TRACKING</h1>
            <p className={styles.pageSubtitle}>
              Check real-time shipping events, delivery timelines, and transit checkpoints for your shipment.
            </p>

            <form onSubmit={handleSearch} className={styles.searchBar}>
              <Search className={styles.searchIcon} size={20} />
              <input 
                type="text" 
                placeholder="Enter Tracking ID (e.g. FAS-DELIVERED, FAS-10023)..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className={styles.searchInput}
                required
              />
              <button type="submit" className={styles.searchButton}>
                SEARCH
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className={styles.resultsSection}>
        <div className="container">
          {loading && (
            <div className={styles.loadingWrapper}>
              <div className={styles.spinner}></div>
              <p>Retrieving secure logistics ledger...</p>
            </div>
          )}

          {error && (
            <div className={styles.errorCard}>
              <AlertTriangle className={styles.errorIcon} size={32} />
              <div className={styles.errorContent}>
                <h3 className={styles.errorTitle}>SHIPMENT NOT FOUND</h3>
                <p className={styles.errorText}>{error}</p>
                <div className={styles.demoCodes}>
                  <p><strong>Try these test codes:</strong></p>
                  <ul>
                    <li><code onClick={() => { setInputVal('FAS-DELIVERED'); setTrackingId('FAS-DELIVERED'); }}>FAS-DELIVERED</code> (Successfully Delivered parcel timeline)</li>
                    <li><code onClick={() => { setInputVal('FAS-INTRANSIT'); setTrackingId('FAS-INTRANSIT'); }}>FAS-INTRANSIT</code> (En route with active checkpoints)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && data && (
            <div className={styles.resultsGrid}>
              {/* Left Column: Shipment Overview */}
              <div className={styles.overviewCol}>
                <div className={styles.overviewCard}>
                  <div className={styles.cardHeader}>
                    <div>
                      <span className={styles.trackingIdLabel}>TRACKING NUMBER</span>
                      <h2 className={styles.trackingId}>{data.trackingId}</h2>
                    </div>
                    <span className={`${styles.statusBadge} ${getStatusClass(data.status)}`}>
                      {getStatusText(data.status)}
                    </span>
                  </div>

                  <div className={styles.metaGrid}>
                    <div className={styles.metaItem}>
                      <MapPin size={18} className={styles.metaIcon} />
                      <div>
                        <span className={styles.metaLabel}>FROM (ORIGIN)</span>
                        <span className={styles.metaVal}>{data.origin}</span>
                      </div>
                    </div>

                    <div className={styles.metaItem}>
                      <MapPin size={18} className={styles.metaIcon} />
                      <div>
                        <span className={styles.metaLabel}>TO (DESTINATION)</span>
                        <span className={styles.metaVal}>{data.destination}</span>
                      </div>
                    </div>

                    <div className={styles.metaItem}>
                      <Calendar size={18} className={styles.metaIcon} />
                      <div>
                        <span className={styles.metaLabel}>ESTIMATED DELIVERY</span>
                        <span className={styles.metaVal}>
                          {new Date(data.estimatedDelivery).toLocaleDateString('en-GB', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>

                    <div className={styles.metaItem}>
                      <Clock size={18} className={styles.metaIcon} />
                      <div>
                        <span className={styles.metaLabel}>SHIPPER DISPATCH</span>
                        <span className={styles.metaVal}>{data.shipper}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.supportCard}>
                  <Truck className={styles.supportIcon} size={28} />
                  <div>
                    <h4 className={styles.supportTitle}>Need Help With Your Package?</h4>
                    <p className={styles.supportText}>
                      Our logistics coordinators are available 24/7. Call us or submit a dispatch support inquiry.
                    </p>
                    <Link href="/contact" className={styles.supportLink}>
                      Support Desk <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Timeline */}
              <div className={styles.timelineCol}>
                <div className={styles.timelineCard}>
                  <h3 className={styles.timelineTitle}>SHIPPING MILESTONES</h3>
                  
                  <div className={styles.timeline}>
                    {data.steps.map((step, index) => {
                      const isCompleted = step.completed;
                      return (
                        <div 
                          key={index} 
                          className={`${styles.timelineStep} ${isCompleted ? styles.stepCompleted : styles.stepPending}`}
                        >
                          <div className={styles.markerWrapper}>
                            <div className={styles.markerDot}>
                              {isCompleted && <CheckCircle2 size={16} className={styles.markerCheck} />}
                            </div>
                            {index < data.steps.length - 1 && <div className={styles.markerLine}></div>}
                          </div>
                          
                          <div className={styles.stepContent}>
                            <div className={styles.stepHeader}>
                              <h4 className={styles.stepStatus}>{step.status}</h4>
                              <span className={styles.stepTime}>
                                {step.timestamp !== 'Pending' ? new Date(step.timestamp).toLocaleTimeString('en-GB', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                }) : ''}
                                {' '}
                                {step.timestamp !== 'Pending' ? new Date(step.timestamp).toLocaleDateString('en-GB', {
                                  day: '2-digit',
                                  month: 'short'
                                }) : 'Awaiting Checkpoint'}
                              </span>
                            </div>
                            <span className={styles.stepLocation}>{step.location}</span>
                            <p className={styles.stepDetails}>{step.details}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && !data && (
            <div className={styles.emptyState}>
              <Truck className={styles.emptyIcon} size={48} />
              <h3>Awaiting Search Parameters</h3>
              <p>Please enter your 10-digit Fascord Tracking ID above to check your package transit details.</p>
              <div className={styles.demoSuggestions}>
                <p>💡 <strong>Demo Codes:</strong> Click to auto-fill:</p>
                <div className={styles.demoButtons}>
                  <button onClick={() => { setInputVal('FAS-DELIVERED'); setTrackingId('FAS-DELIVERED'); }}>FAS-DELIVERED</button>
                  <button onClick={() => { setInputVal('FAS-INTRANSIT'); setTrackingId('FAS-INTRANSIT'); }}>FAS-INTRANSIT</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function TrackPage() {
  return (
    <>
      <TopBanner />
      <Navbar />
      <main style={{ flexGrow: 1 }}>
        <Suspense fallback={
          <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
            <h2>Loading tracking search...</h2>
          </div>
        }>
          <TrackingContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
