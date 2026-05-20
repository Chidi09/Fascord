'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Gift, AlertTriangle, ShieldCheck, HelpCircle, Truck, Package, Landmark, CheckCircle, Info } from 'lucide-react';
import TopBanner from '@/components/layout/TopBanner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './sending-gifts.module.css';

export default function SendingGiftsPage() {
  const commonProhibited = [
    { name: 'No Cash / Money', desc: 'Sovereign coins, paper currency, checks, bank drafts or monetary instruments.' },
    { name: 'No Jewellery > £4,000', desc: 'Precious metals, stones, or high-value personal jewelry over the set threshold.' },
    { name: 'No Liquid Perfume', desc: 'Flammable perfumes, aftershaves, and aerosols are classified as hazardous cargo.' },
    { name: 'No Narcotics / CBD', desc: 'Illegal drugs, cannabis-derived goods, CBD oils, or counterfeit substances.' },
    { name: 'No Cigarettes / Tobacco', desc: 'Strict import duties and transport regulations apply to all tobacco goods.' },
    { name: 'No Fresh Flowers / Plants', desc: 'Perishable organic matters and plant biosecurity hazards.' }
  ];

  const descriptionsExample = [
    { unacceptable: 'Gift / Present', acceptable: '1x Knitted Woollen Sweater (£45.00)' },
    { unacceptable: 'Electronics', acceptable: '1x Refurbished Apple iPhone 13 (Value: £350.00)' },
    { unacceptable: 'Toiletries', acceptable: '2x Organic Shea Butter Hand Creams (£12.50 each)' }
  ];

  const faqs = [
    {
      q: 'How do I send a gift internationally with Fascord Express?',
      a: 'To send a gift, you can drop your package off at your nearest Fascord Express Service Point, book a courier parcel collection online via our Quote Tool, or contact our team by phone. Be sure to check customs rules and declare contents accurately.'
    },
    {
      q: 'What items are strictly prohibited as gifts internationally?',
      a: 'Sovereign cash, gold/precious jewellery exceeding £4,000, flammable perfumes, fresh plants, tobacco, counterfeit goods, and CBD products are strictly prohibited and cannot be transported.'
    },
    {
      q: 'Can I send gift-wrapped items?',
      a: 'No, we strongly recommend using open gift bags. In line with UK Aviation Security Regulations, all parcels (including gift-wrapped boxes, cards, and sealed envelopes) will be opened for manual inspection by a qualified employee, and then resealed as carefully as possible.'
    },
    {
      q: 'Will my gift parcel be opened for customs inspection?',
      a: 'Yes. Fascord Express prioritises safety. All parcels, gifts, documents, and cards are subject to manual inspection and/or X-ray imaging by trained airport or depot personnel to ensure they do not contain restricted or hazardous items.'
    },
    {
      q: 'Who pays customs duties and taxes for gift parcels?',
      a: 'Customs duties and tax fees are always payable by the receiver, even when sent as a gift. Please check the recipient country’s tax-free threshold to see if the value falls below the duty-exempt limit.'
    },
    {
      q: 'How many electronic devices can I send in one parcel?',
      a: 'You can send a maximum of 2 electronic devices per parcel (such as mobile phones, tablets, or laptops). They must be powered off, secured against internal movement, and packaged in a strong, rigid outer box to prevent short circuits.'
    },
    {
      q: 'What happens if I send a prohibited item as a gift?',
      a: 'Parcels containing prohibited items will be refused at collection, confiscated at the depot, or in some regulatory cases, destroyed. You may also be subject to fines or carriage holds.'
    },
    {
      q: 'How do I avoid customs clearance delays when sending a gift?',
      a: 'Avoid vague single-word descriptions like "present" or "gift". Provide an exact itemised list with quantities, material compositions (e.g. "1x 100% Cotton Shirt"), and correct replacement values.'
    },
    {
      q: 'Are there size or weight limits for gift shipments?',
      a: 'Yes, standard courier parcels have a weight limit of 30kg per individual item. For oversized, heavy, or palletised shipments, please consult our Large & Heavy Cargo desk.'
    },
    {
      q: 'Can the receiver track the gift shipment online?',
      a: 'Absolutely. Once booked, a 10-digit tracking code (e.g. FAS-12345678) is generated. Both you and the receiver can monitor live courier transit status in real-time on our home tracking page.'
    }
  ];

  return (
    <>
      <TopBanner />
      <Navbar />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroBg}>
            <Image 
              src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=1200&auto=format&fit=crop"
              alt="Sending International Gifts"
              fill
              priority
              className={styles.heroImg}
            />
            <div className={styles.heroOverlay}></div>
          </div>
          
          <div className={`container ${styles.heroContainer}`}>
            <span className={styles.badge}><Gift size={14} /> FASCORD GUIDANCE HUB</span>
            <h1 className={styles.title}>SENDING GIFTS INTERNATIONALLY</h1>
            <p className={styles.subtitle}>
              What you need to know when sending gifts abroad with Fascord Express. Avoid customs delays, understand inspection rules, and secure frictionless delivery.
            </p>
          </div>
        </section>

        {/* Warning Banner */}
        <section className={styles.warningStrip}>
          <div className="container">
            <div className={styles.warningBox}>
              <AlertTriangle className={styles.warnIcon} size={28} />
              <div className={styles.warnText}>
                <strong>CRITICAL CUSTOMS NOTICE:</strong> Standard descriptions like "Gift" or "Present" are no longer accepted by global customs authorities. Accurately list all items to prevent severe shipment hold-ups or confiscations.
              </div>
            </div>
          </div>
        </section>

        {/* Core Info Cards */}
        <section className={styles.infoSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.tag}>ESSENTIAL KNOWLEDGE</span>
              <h2 className={styles.sectionTitle}>WHEN SENDING GIFTS ABROAD, KEEP THIS IN MIND</h2>
              <p className={styles.sectionSubtitle}>
                Please check what items you cannot send to avoid disappointment. Parcels containing prohibited goods will be refused or returned at your expense.
              </p>
            </div>

            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <div className={styles.cardHeader}>
                  <ShieldCheck size={28} className={styles.cardIcon} />
                  <h3>GIFT-WRAPPED ITEMS ARE OPENED</h3>
                </div>
                <p>
                  In line with UK Aviation Security Regulations, all parcels, including gift-wrapped boxes, sealed cards, envelopes, and documents will be opened for manual inspection by a qualified Fascord employee, then resealed as carefully as possible. We strongly recommend using open gift bags.
                </p>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.cardHeader}>
                  <Package size={28} className={styles.cardIcon} />
                  <h3>MULTIPLE ELECTRONIC DEVICES</h3>
                </div>
                <p>
                  You can send a maximum of 2 electronic devices per parcel (such as mobile phones, laptops, or battery-operated toys). These items must be powered down, secured against movement, and packed in strong, rigid packaging to prevent short circuits or accidental activation.
                </p>
              </div>

              <div className={styles.infoCard}>
                <div className={styles.cardHeader}>
                  <Landmark size={28} className={styles.cardIcon} />
                  <h3>RECEIVER PAYS DUTIES & TAXES</h3>
                </div>
                <p>
                  Customs, duties, and import taxes are always payable by the receiver, even when sending gifts. Check with Fascord Customer Support, as some gifts may be delivered tax-free if the total contents value falls below the receiving country's specific duty-free threshold.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Prohibited items grid */}
        <section className={styles.prohibitedSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.tag}>COMPLIANCE REGULATION</span>
              <h2 className={styles.sectionTitle}>MOST COMMON PROHIBITED ITEMS</h2>
              <p className={styles.sectionSubtitle}>
                These popular gift items are either dangerous goods under international transport legislation, or compromise the safety of our air courier network.
              </p>
            </div>

            <div className={styles.prohibitedGrid}>
              {commonProhibited.map((item, i) => (
                <div key={i} className={styles.prohibitedCard}>
                  <div className={styles.prohibitedMarker}>✕</div>
                  <div>
                    <h4 className={styles.prohibitedTitle}>{item.name}</h4>
                    <p className={styles.prohibitedDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Content descriptions table */}
        <section className={styles.descSection}>
          <div className="container">
            <div className={styles.descContainer}>
              <div className={styles.descInfo}>
                <span className={styles.tag}>CUSTOMS DECLARATION</span>
                <h2 className={styles.sectionTitle}>CONTENT DESCRIPTIONS MATTER</h2>
                <p className={styles.descText}>
                  We cannot accept vague descriptions. All items inside your parcel need to be listed with exact quantities and the replacement value of each. Study these examples to guarantee standard customs clearance:
                </p>
              </div>

              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Unacceptable Content Label</th>
                      <th>Acceptable Declaration Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {descriptionsExample.map((row, i) => (
                      <tr key={i}>
                        <td className={styles.unacc}>✕ &ldquo;{row.unacceptable}&rdquo;</td>
                        <td className={styles.acc}>✓ &ldquo;{row.acceptable}&rdquo;</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Accordion FAQ section */}
        <section className={styles.faqSection}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <span className={styles.tag}>SUPPORT CENTER</span>
              <h2 className={styles.sectionTitle}>FREQUENTLY ASKED QUESTIONS</h2>
              <p className={styles.sectionSubtitle}>
                Everything you need to know about packing, duties, courier inspections, and timing for international gifts.
              </p>
            </div>

            <div className={styles.faqAccordion}>
              {faqs.map((faq, i) => (
                <details key={i} className={styles.faqItem}>
                  <summary className={styles.faqSummary}>
                    <span className={styles.summaryText}>{faq.q}</span>
                    <HelpCircle size={18} className={styles.faqSummaryIcon} />
                  </summary>
                  <div className={styles.faqContent}>
                    <p>{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Area */}
        <section className={styles.cta}>
          <div className={`container ${styles.ctaContainer}`}>
            <h2 className={styles.ctaTitle}>Ready to Send Your Gift?</h2>
            <p className={styles.ctaDesc}>
              Calculate custom courier rates, select a convenient local Drop-Off Point, or book collection at your office.
            </p>
            <div className={styles.ctaActions}>
              <Link href="/quote" className={styles.ctaPrimary}>
                GET A QUOTE NOW
              </Link>
              <Link href="/contact" className={styles.ctaSecondary}>
                CONTACT CUSTOMER SERVICE
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
