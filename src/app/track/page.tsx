"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  ChevronRight,
  AlertTriangle,
  Truck,
  History,
  Box,
} from "lucide-react";
import TopBanner from "@/components/layout/TopBanner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useTrackParcel } from "@/hooks/useLogisticsQueries";
import { useLogisticsStore } from "@/store/useLogisticsStore";
import styles from "./track.module.css";

function TrackingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const trackingQuery = (searchParams.get("id") || "").trim().toUpperCase();

  const [inputVal, setInputVal] = useState(trackingQuery);
  const { recentTrackings, addRecentTracking } = useLogisticsStore();

  // TanStack Query for live tracking data
  const { data, isLoading, isError, error } = useTrackParcel(trackingQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      const cleanId = inputVal.trim().toUpperCase();
      addRecentTracking(cleanId);
      router.push(`/track?id=${encodeURIComponent(cleanId)}`);
    }
  };

  const handleQuickSelect = (id: string) => {
    setInputVal(id);
    addRecentTracking(id);
    router.push(`/track?id=${encodeURIComponent(id)}`);
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Delivered";
      case "in_transit":
        return "In Transit";
      case "pending":
        return "Pending Collection";
      case "customs_hold":
        return "Customs Inspection";
      default:
        return "Information Received";
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "delivered":
        return styles.statusDelivered;
      case "in_transit":
        return styles.statusTransit;
      default:
        return styles.statusPending;
    }
  };

  return (
    <div className={styles.pageContent}>
      <section className={styles.searchHero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1 className={styles.pageTitle}>PARCEL TRACKING</h1>
            <p className={styles.pageSubtitle}>
              Check real-time shipping events, delivery timelines, and transit
              checkpoints for your shipment.
            </p>

            <form onSubmit={handleSearch} className={styles.searchBar}>
              <Search className={styles.searchIcon} size={20} />
              <input
                type="text"
                placeholder="Enter Tracking ID (e.g. FAS-DELIVERED, FAS-INTRANSIT, FAS-PENDING)..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                className={styles.searchInput}
                required
              />
              <button type="submit" className={styles.searchButton}>
                SEARCH
              </button>
            </form>

            {recentTrackings.length > 0 && (
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  gap: "8px",
                  alignItems: "center",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.7)",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <History size={13} /> Quick Lookups:
                </span>
                {recentTrackings.slice(0, 5).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleQuickSelect(id)}
                    style={{
                      background:
                        trackingQuery === id
                          ? "var(--color-accent)"
                          : "rgba(255,255,255,0.15)",
                      color: "#fff",
                      border: "1px solid rgba(255,255,255,0.3)",
                      borderRadius: "4px",
                      padding: "3px 8px",
                      fontSize: "0.75rem",
                      fontFamily: "monospace",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                  >
                    {id}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.resultsSection}>
        <div className="container">
          {isLoading && (
            <div className={styles.loadingWrapper}>
              <div className={styles.spinner}></div>
              <p>Retrieving secure logistics ledger from Next.js backend...</p>
            </div>
          )}

          {isError && (
            <div className={styles.errorCard}>
              <AlertTriangle className={styles.errorIcon} size={32} />
              <div className={styles.errorContent}>
                <h3 className={styles.errorTitle}>SHIPMENT NOT FOUND</h3>
                <p className={styles.errorText}>
                  {error?.message ||
                    "Unable to find tracking records for this code. Please verify your tracking number."}
                </p>
              </div>
            </div>
          )}

          {!isLoading && !isError && data && (
            <div className={styles.resultsGrid}>
              {/* Left Column: Shipment Overview */}
              <div className={styles.overviewCol}>
                <div className={styles.overviewCard}>
                  <div className={styles.cardHeader}>
                    <div>
                      <span className={styles.trackingIdLabel}>
                        TRACKING NUMBER
                      </span>
                      <h2 className={styles.trackingId}>{data.trackingId}</h2>
                    </div>
                    <span
                      className={`${styles.statusBadge} ${getStatusClass(data.status)}`}
                    >
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
                        <span className={styles.metaLabel}>
                          TO (DESTINATION)
                        </span>
                        <span className={styles.metaVal}>
                          {data.destination}
                        </span>
                      </div>
                    </div>

                    <div className={styles.metaItem}>
                      <Calendar size={18} className={styles.metaIcon} />
                      <div>
                        <span className={styles.metaLabel}>
                          ESTIMATED DELIVERY
                        </span>
                        <span className={styles.metaVal}>
                          {new Date(data.estimatedDelivery).toLocaleDateString(
                            "en-GB",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>
                    </div>

                    <div className={styles.metaItem}>
                      <Box size={18} className={styles.metaIcon} />
                      <div>
                        <span className={styles.metaLabel}>
                          SERVICE & WEIGHT
                        </span>
                        <span className={styles.metaVal}>
                          {data.serviceType} ({data.weight || "Standard"})
                        </span>
                      </div>
                    </div>

                    <div
                      className={styles.metaItem}
                      style={{ gridColumn: "span 2" }}
                    >
                      <Clock size={18} className={styles.metaIcon} />
                      <div>
                        <span className={styles.metaLabel}>
                          SHIPPER DISPATCH
                        </span>
                        <span className={styles.metaVal}>{data.shipper}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.supportCard}>
                  <Truck className={styles.supportIcon} size={28} />
                  <div>
                    <h4 className={styles.supportTitle}>
                      Need Help With Your Package?
                    </h4>
                    <p className={styles.supportText}>
                      Our logistics coordinators are available 24/7. Call us or
                      submit a dispatch support inquiry.
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
                          className={`${styles.timelineStep} ${
                            isCompleted
                              ? styles.stepCompleted
                              : styles.stepPending
                          }`}
                        >
                          <div className={styles.markerWrapper}>
                            <div className={styles.markerDot}>
                              {isCompleted && (
                                <CheckCircle2
                                  size={16}
                                  className={styles.markerCheck}
                                />
                              )}
                            </div>
                            {index < data.steps.length - 1 && (
                              <div className={styles.markerLine}></div>
                            )}
                          </div>

                          <div className={styles.stepContent}>
                            <div className={styles.stepHeader}>
                              <h4 className={styles.stepStatus}>
                                {step.status}
                              </h4>
                              <span className={styles.stepTime}>
                                {step.timestamp !== "Pending"
                                  ? `${new Date(
                                      step.timestamp,
                                    ).toLocaleTimeString("en-GB", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })} ${new Date(
                                      step.timestamp,
                                    ).toLocaleDateString("en-GB", {
                                      day: "2-digit",
                                      month: "short",
                                    })}`
                                  : "Awaiting Checkpoint"}
                              </span>
                            </div>
                            <span className={styles.stepLocation}>
                              {step.location}
                            </span>
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

          {!isLoading && !isError && !data && (
            <div className={styles.emptyState}>
              <Truck className={styles.emptyIcon} size={48} />
              <h3>Awaiting Search Parameters</h3>
              <p>
                Please enter your Fascord Tracking ID above to check your
                package transit details.
              </p>
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
        <Suspense
          fallback={
            <div
              className="container"
              style={{ padding: "80px 20px", textAlign: "center" }}
            >
              <h2>Loading tracking search...</h2>
            </div>
          }
        >
          <TrackingContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
