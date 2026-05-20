'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar, ArrowRight, ShieldCheck, Calculator, Clock, Check } from 'lucide-react';
import TopBanner from '@/components/layout/TopBanner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './quote.module.css';

interface QuoteFormInput {
  originCountry: string;
  destinationCountry: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  packageType: 'document' | 'parcel';
}

interface QuoteOption {
  id: string;
  name: string;
  price: string;
  currency: string;
  deliveryDays: string;
  estimatedDelivery: string;
  description: string;
}

export default function QuotePage() {
  const { register, handleSubmit } = useForm<QuoteFormInput>({
    defaultValues: {
      originCountry: 'United Kingdom',
      destinationCountry: 'United States',
      weight: 1,
      length: 20,
      width: 15,
      height: 10,
      packageType: 'parcel',
    }
  });

  const [loading, setLoading] = useState(false);
  const [rates, setRates] = useState<QuoteOption[] | null>(null);
  interface QueryDetails {
    origin: string;
    destination: string;
    weight: number;
  }

  const [queryDetails, setQueryDetails] = useState<QueryDetails | null>(null);

  const onSubmit = async (data: QuoteFormInput) => {
    setLoading(true);
    setRates(null);
    setQueryDetails(null);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setRates(result.options);
        setQueryDetails({
          origin: result.origin,
          destination: result.destination,
          weight: result.weight,
        });
      }
    } catch (error) {
      console.error('Error fetching mock quote:', error);
    } finally {
      setLoading(false);
    }
  };

  const countries = [
    'United Kingdom',
    'United States',
    'Germany',
    'Canada',
    'Nigeria',
    'Australia',
    'China',
    'France',
    'India',
  ];

  return (
    <>
      <TopBanner />
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.pageTitle}>GET A SHIPPING QUOTE</h1>
              <p className={styles.pageSubtitle}>
                Calculate instant transit rates, custom estimates, and cargo delivery schedules across the global Fascord network.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.formSection}>
          <div className="container">
            <div className={styles.layout}>
              
              {/* Left Column: Quote Form */}
              <div className={styles.formCard}>
                <div className={styles.formHeader}>
                  <Calculator className={styles.headerIcon} size={24} />
                  <h3 className={styles.formTitle}>SHIPMENT DETAILS</h3>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                  <div className={styles.row}>
                    <div className={styles.col}>
                      <label className={styles.label}>Origin (From)</label>
                      <select 
                        {...register('originCountry')} 
                        className={styles.select}
                      >
                        {countries.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>

                    <div className={styles.col}>
                      <label className={styles.label}>Destination (To)</label>
                      <select 
                        {...register('destinationCountry')} 
                        className={styles.select}
                      >
                        {countries.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className={styles.row}>
                    <div className={styles.col}>
                      <label className={styles.label}>Package Type</label>
                      <div className={styles.radioGroup}>
                        <label className={styles.radioLabel}>
                          <input 
                            type="radio" 
                            value="parcel" 
                            {...register('packageType')}
                            className={styles.radio}
                          />
                          <span>Parcel Cargo</span>
                        </label>
                        <label className={styles.radioLabel}>
                          <input 
                            type="radio" 
                            value="document" 
                            {...register('packageType')}
                            className={styles.radio}
                          />
                          <span>Letter/Doc</span>
                        </label>
                      </div>
                    </div>

                    <div className={styles.col}>
                      <label className={styles.label}>Weight (kg)</label>
                      <input 
                        type="number" 
                        step="0.1"
                        min="0.1"
                        {...register('weight', { required: true, min: 0.1 })} 
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <div className={styles.dimsHeader}>
                    <h4>DIMENSIONS (CM)</h4>
                  </div>

                  <div className={styles.dimsRow}>
                    <div className={styles.dimCol}>
                      <label className={styles.dimLabel}>Length</label>
                      <input 
                        type="number" 
                        min="1"
                        {...register('length', { required: true, min: 1 })} 
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.dimCol}>
                      <label className={styles.dimLabel}>Width</label>
                      <input 
                        type="number" 
                        min="1"
                        {...register('width', { required: true, min: 1 })} 
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.dimCol}>
                      <label className={styles.dimLabel}>Height</label>
                      <input 
                        type="number" 
                        min="1"
                        {...register('height', { required: true, min: 1 })} 
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? 'CALCULATING RATES...' : 'CALCULATE ESTIMATED RATES'}
                  </button>
                </form>
              </div>

              {/* Right Column: Dynamic Rates Display */}
              <div className={styles.ratesCol}>
                {loading && (
                  <div className={styles.loadingCard}>
                    <div className={styles.spinner}></div>
                    <h3>FETCHING LIVE MSW RATES...</h3>
                    <p>Accessing transport rate sheets and logistics routing matrix.</p>
                  </div>
                )}

                {!loading && !rates && (
                  <div className={styles.ratesPlaceholder}>
                    <Calculator className={styles.placeholderIcon} size={48} />
                    <h3>Awaiting Shipment Matrix</h3>
                    <p>Configure your package weights and transit nodes on the left to request live shipping options.</p>
                    <div className={styles.trustPillars}>
                      <div className={styles.pillar}>
                        <Check size={16} className={styles.checkIcon} />
                        <span>Instant automated processing</span>
                      </div>
                      <div className={styles.pillar}>
                        <Check size={16} className={styles.checkIcon} />
                        <span>MSW local developer stub integration</span>
                      </div>
                    </div>
                  </div>
                )}

                {!loading && rates && queryDetails && (
                  <div className={styles.ratesContainer}>
                    <div className={styles.querySummary}>
                      <div>
                        <span className={styles.sumLabel}>ROUTE</span>
                        <span className={styles.sumVal}>{queryDetails.origin} ➔ {queryDetails.destination}</span>
                      </div>
                      <div>
                        <span className={styles.sumLabel}>WEIGHT</span>
                        <span className={styles.sumVal}>{queryDetails.weight} kg</span>
                      </div>
                    </div>

                    <h3 className={styles.ratesTitle}>AVAILABLE SHIPPING OPTIONS</h3>
                    
                    <div className={styles.optionsList}>
                      {rates.map((option) => (
                        <div key={option.id} className={styles.optionCard}>
                          <div className={styles.optionHeader}>
                            <div>
                              <h4 className={styles.optionName}>{option.name}</h4>
                              <p className={styles.optionDesc}>{option.description}</p>
                            </div>
                            <div className={styles.priceTag}>
                              <span className={styles.currency}>{option.currency}</span>
                              <span className={styles.price}>{option.price}</span>
                            </div>
                          </div>

                          <div className={styles.optionMeta}>
                            <div className={styles.metaItem}>
                              <Clock size={16} className={styles.metaIcon} />
                              <span><strong>Transit:</strong> {option.deliveryDays}</span>
                            </div>
                            <div className={styles.metaItem}>
                              <Calendar size={16} className={styles.metaIcon} />
                              <span><strong>Est. Delivery:</strong> {option.estimatedDelivery}</span>
                            </div>
                          </div>

                          <button 
                            className={styles.bookBtn}
                            onClick={() => alert(`Thank you! Booking for ${option.name} initialized. A dispatch coordinator will follow up.`)}
                          >
                            BOOK SHIPMENT <ArrowRight size={14} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className={styles.rateNotice}>
                      <ShieldCheck size={20} className={styles.shieldIcon} />
                      <p>
                        Estimated rates are subject to actual parcel measurements and volumetric density weight checks at the collection depot.
                      </p>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
