'use client';

import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './ReviewsStrip.module.css';

export default function ReviewsStrip() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const reviewsList = [
    {
      author: 'Marcus Vance',
      role: 'E-commerce Retail Manager',
      rating: 5,
      title: 'Frictionless international shipping',
      date: 'Yesterday',
      text: 'Outstanding transit speeds to North America. We sent 25 gift packages and all arrived well within estimated times. Fascord’s customs pre-clearance assistance was completely effortless and hassle-free!'
    },
    {
      author: 'Clara Sterling',
      role: 'Global Operations Director',
      rating: 5,
      title: 'Exceptional heavy freight handling',
      date: '4 days ago',
      text: 'Superb vehicle coordination for our 12-ton industrial bulk cargo payload. The real-time driver telemetry updates and proactive dispatcher alerts kept our operations fully aligned. Highly recommended.'
    },
    {
      author: 'David K. (L&P Partners)',
      role: 'Senior Corporate Law Partner',
      rating: 5,
      title: 'Flawless same-day courier dispatch',
      date: '1 week ago',
      text: 'Direct point-to-point same-day transit collected our urgent corporate deeds within 45 minutes of scheduling and handed them directly to the court before the noon deadline. Elite logistics execution.'
    }
  ];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % reviewsList.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + reviewsList.length) % reviewsList.length);
  };

  return (
    <section className={styles.section}>
      <div className={`container ${styles.container}`}>
        <div className={styles.ratingBox}>
          <div className={styles.stars}>
            <Star size={18} className={styles.starFilled} />
            <Star size={18} className={styles.starFilled} />
            <Star size={18} className={styles.starFilled} />
            <Star size={18} className={styles.starFilled} />
            <Star size={18} className={styles.starFilled} />
          </div>
          <span className={styles.ratingValue}>4.8 / 5</span>
          <span className={styles.divider}>|</span>
          <span className={styles.reviewsText}>Based on 120+ verified corporate and private logistics customer reviews</span>
        </div>

        {/* Only render the interactive toggle button after client hydration is complete */}
        {mounted && (
          <button 
            type="button" 
            onClick={() => setIsExpanded(!isExpanded)} 
            className={styles.toggleBtn}
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'CLOSE REVIEWS' : 'READ VERIFIED REVIEWS'}</span>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        )}
      </div>

      {/* Expandable Drawer Panel — also only rendered client-side */}
      {mounted && (
        <div className={`${styles.drawer} ${isExpanded ? styles.drawerOpen : ''}`}>
          <div className="container">
            <div className={styles.drawerInner}>
              <div className={styles.drawerHeader}>
                <span className={styles.badge}>VERIFIED FASCORD CUSTOMERS</span>
                <h3 className={styles.drawerTitle}>WHAT SENDER STAKEHOLDERS SAY</h3>
              </div>
              
              {/* Top Class Carousel Container */}
              <div className={styles.carouselContainer}>
                <button 
                  type="button" 
                  onClick={prevSlide} 
                  className={styles.carouselBtn} 
                  aria-label="Previous review"
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className={styles.carouselViewport}>
                  <div 
                    className={styles.carouselTrack} 
                    style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                  >
                    {reviewsList.map((rev, i) => (
                      <div key={i} className={styles.reviewSlide}>
                        <div className={styles.reviewCard}>
                          <div className={styles.reviewCardHeader}>
                            <div className={styles.ratingStars}>
                              {[...Array(rev.rating)].map((_, idx) => (
                                <Star key={idx} size={14} className={styles.starFilled} />
                              ))}
                            </div>
                            <span className={styles.date}>{rev.date}</span>
                          </div>
                          
                          <h4 className={styles.reviewTitle}>&ldquo;{rev.title}&rdquo;</h4>
                          <p className={styles.reviewText}>{rev.text}</p>
                          
                          <div className={styles.reviewerInfo}>
                            <div className={styles.authorBadge}>
                              <CheckCircle size={12} className={styles.verifiedIcon} />
                              <span>{rev.author}</span>
                            </div>
                            <span className={styles.role}>{rev.role}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button 
                  type="button" 
                  onClick={nextSlide} 
                  className={styles.carouselBtn} 
                  aria-label="Next review"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Carousel Dots */}
              <div className={styles.carouselDots}>
                {reviewsList.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIndex(i)}
                    className={`${styles.dot} ${activeIndex === i ? styles.dotActive : ''}`}
                    aria-label={`Go to review ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
