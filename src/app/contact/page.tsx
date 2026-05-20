'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Phone, MapPin, Send, HelpCircle, CheckCircle2 } from 'lucide-react';
import TopBanner from '@/components/layout/TopBanner';
import Navbar from '@/components/layout/Navbar';
import CTASection from '@/components/home/CTASection';
import ReviewsStrip from '@/components/home/ReviewsStrip';
import Footer from '@/components/layout/Footer';
import styles from './contact.module.css';

interface ContactFormInput {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormInput>();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const onSubmit = async (data: ContactFormInput) => {
    setLoading(true);
    setSuccessMsg(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setSuccessMsg(result.message);
        reset();
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
    } finally {
      setLoading(false);
    }
  };

  const offices = [
    { city: 'London (HQ)', address: '100 Logistics Blvd, East London, EC2A 4AX', phone: '+44 (0) 20 7946 0888' },
    { city: 'Manchester Depot', address: 'Sort Centre 4, Trafford Park, Manchester, M17 1UP', phone: '+44 (0) 161 496 0222' },
    { city: 'New York Branch', address: 'JFK Airport Cargo Terminals, Jamaica, NY 11430', phone: '+1 718-555-0199' },
  ];

  return (
    <>
      <TopBanner />
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroContent}>
              <h1 className={styles.pageTitle}>CONTACT FASCORD</h1>
              <p className={styles.pageSubtitle}>
                Get in touch with our global dispatch, account management, and customer support desks 24/7.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.contentSection}>
          <div className="container">
            <div className={styles.layout}>
              
              {/* Left Column: Contact Form */}
              <div className={styles.formCard}>
                <div className={styles.formHeader}>
                  <Send className={styles.headerIcon} size={24} />
                  <h3 className={styles.formTitle}>SEND A MESSAGE</h3>
                </div>

                {successMsg ? (
                  <div className={styles.successCard}>
                    <CheckCircle2 className={styles.successIcon} size={48} />
                    <h3>MESSAGE TRANSMITTED</h3>
                    <p>{successMsg}</p>
                    <button onClick={() => setSuccessMsg(null)} className={styles.resetBtn}>
                      SEND ANOTHER MESSAGE
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                    <div className={styles.row}>
                      <div className={styles.col}>
                        <label className={styles.label}>Your Name</label>
                        <input 
                          type="text" 
                          {...register('name', { required: 'Name is required' })} 
                          className={styles.input}
                          placeholder="John Smith"
                        />
                        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
                      </div>

                      <div className={styles.col}>
                        <label className={styles.label}>Email Address</label>
                        <input 
                          type="email" 
                          {...register('email', { 
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' }
                          })} 
                          className={styles.input}
                          placeholder="john@example.com"
                        />
                        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                      </div>
                    </div>

                    <div className={styles.row}>
                      <div className={styles.col}>
                        <label className={styles.label}>Phone Number</label>
                        <input 
                          type="tel" 
                          {...register('phone')} 
                          className={styles.input}
                          placeholder="+44 (0) 7700 900077"
                        />
                      </div>

                      <div className={styles.col}>
                        <label className={styles.label}>Subject</label>
                        <select 
                          {...register('subject', { required: 'Please select a subject' })} 
                          className={styles.select}
                        >
                          <option value="">-- Choose Subject --</option>
                          <option value="quote">General Pricing/Quote Inquiries</option>
                          <option value="tracking">Parcel Tracking Support</option>
                          <option value="account">Corporate Account Opening</option>
                          <option value="feedback">Feedback & Complaints</option>
                        </select>
                        {errors.subject && <span className={styles.error}>{errors.subject.message}</span>}
                      </div>
                    </div>

                    <div className={styles.col}>
                      <label className={styles.label}>Message Details</label>
                      <textarea 
                        rows={6}
                        {...register('message', { required: 'Message is required' })} 
                        className={styles.textarea}
                        placeholder="Write your dispatch or shipping query details here..."
                      />
                      {errors.message && <span className={styles.error}>{errors.message.message}</span>}
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                      {loading ? 'TRANSMITTING MESSAGE...' : 'SEND MESSAGE'}
                    </button>
                  </form>
                )}
              </div>

              {/* Right Column: Office Directories */}
              <div className={styles.detailsCol}>
                <div className={styles.officesCard}>
                  <h3 className={styles.colTitle}>DEPOT DIRECTORY</h3>
                  <div className={styles.officesList}>
                    {offices.map((office, idx) => (
                      <div key={idx} className={styles.officeCard}>
                        <h4 className={styles.officeCity}>{office.city}</h4>
                        <div className={styles.officeDetail}>
                          <MapPin size={16} className={styles.detailIcon} />
                          <span>{office.address}</span>
                        </div>
                        <div className={styles.officeDetail}>
                          <Phone size={16} className={styles.detailIcon} />
                          <span>{office.phone}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.helpCard}>
                  <HelpCircle className={styles.helpIcon} size={28} />
                  <div>
                    <h4 className={styles.helpTitle}>Quick Solutions</h4>
                    <p className={styles.helpText}>
                      Check our tracking timelines or service specifications immediately without sending a message.
                    </p>
                    <div className={styles.helpLinks}>
                      <a href="/track">Live Track ➔</a>
                      <a href="/services">Matrix Rates ➔</a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <CTASection />
      <ReviewsStrip />
      <Footer />
    </>
  );
}
