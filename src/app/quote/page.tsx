"use client";

import React, { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {
  Calendar,
  ArrowRight,
  ShieldCheck,
  Calculator,
  Clock,
  Check,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import TopBanner from "@/components/layout/TopBanner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { COUNTRIES } from "@/data/countries";
import { QuoteRequestInput, BookingRequestInput } from "@/lib/schemas";
import { useGetQuote, useBookShipment } from "@/hooks/useLogisticsQueries";
import { useLogisticsStore } from "@/store/useLogisticsStore";
import styles from "./quote.module.css";

function QuoteFormContent() {
  const searchParams = useSearchParams();
  const initialTo =
    searchParams.get("to") ||
    searchParams.get("destination") ||
    "United States";
  const initialFrom =
    searchParams.get("from") || searchParams.get("origin") || "United Kingdom";
  const initialWeight = parseFloat(searchParams.get("weight") || "1") || 1;

  // Zustand Store
  const {
    setQuoteFormData,
    selectedOption,
    isBookingModalOpen,
    openBookingModal,
    closeBookingModal,
    lastBookedTrackingId,
    setLastBookedTrackingId,
    addRecentTracking,
  } = useLogisticsStore();

  // React Hook Form for Quote
  const { register, handleSubmit, setValue, getValues } =
    useForm<QuoteRequestInput>({
      defaultValues: {
        originCountry: initialFrom,
        destinationCountry: initialTo,
        weight: initialWeight,
        length: 20,
        width: 15,
        height: 10,
        packageType: "parcel",
      },
    });

  const currentValues = getValues();

  // React Hook Form for Booking Modal
  const {
    register: registerBooking,
    handleSubmit: handleBookingSubmit,
    reset: resetBooking,
    formState: { errors: bookingErrors },
  } = useForm<BookingRequestInput>();

  // TanStack Query Mutations
  const quoteMutation = useGetQuote();
  const bookMutation = useBookShipment();

  useEffect(() => {
    const to = searchParams.get("to") || searchParams.get("destination");
    const from = searchParams.get("from") || searchParams.get("origin");
    const wt = searchParams.get("weight");
    if (to) setValue("destinationCountry", to);
    if (from) setValue("originCountry", from);
    if (wt) setValue("weight", parseFloat(wt) || 1);
  }, [searchParams, setValue]);

  const onCalculateQuote = (data: QuoteRequestInput) => {
    setQuoteFormData(data);
    quoteMutation.mutate(data);
  };

  const onConfirmBooking = (bookingData: BookingRequestInput) => {
    if (!selectedOption) return;

    const currentValues = getValues();
    const payload: BookingRequestInput = {
      ...bookingData,
      serviceId: selectedOption.id,
      serviceName: selectedOption.name,
      originCountry: currentValues.originCountry,
      destinationCountry: currentValues.destinationCountry,
      weight: currentValues.weight,
      length: currentValues.length,
      width: currentValues.width,
      height: currentValues.height,
      packageType: currentValues.packageType,
    };

    bookMutation.mutate(payload, {
      onSuccess: (res) => {
        setLastBookedTrackingId(res.trackingId);
        addRecentTracking(res.trackingId);
        resetBooking();
      },
    });
  };

  const ratesData = quoteMutation.data;
  const loading = quoteMutation.isPending;

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
                Calculate instant transit rates, custom estimates, and cargo
                delivery schedules across the global Fascord network.
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

                <form
                  onSubmit={handleSubmit(onCalculateQuote)}
                  className={styles.form}
                >
                  <div className={styles.row}>
                    <div className={styles.col}>
                      <label className={styles.label}>Origin (From)</label>
                      <select
                        {...register("originCountry")}
                        className={styles.select}
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.col}>
                      <label className={styles.label}>Destination (To)</label>
                      <select
                        {...register("destinationCountry")}
                        className={styles.select}
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
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
                            {...register("packageType")}
                            className={styles.radio}
                          />
                          <span>Parcel Cargo</span>
                        </label>
                        <label className={styles.radioLabel}>
                          <input
                            type="radio"
                            value="document"
                            {...register("packageType")}
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
                        {...register("weight", { required: true, min: 0.1 })}
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <div className={styles.dimsHeader}>
                    <h4>DIMENSIONS (CM) — IATA VOLUMETRIC METRIC</h4>
                  </div>

                  <div className={styles.dimsRow}>
                    <div className={styles.dimCol}>
                      <label className={styles.dimLabel}>Length</label>
                      <input
                        type="number"
                        min="1"
                        {...register("length", { required: true, min: 1 })}
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.dimCol}>
                      <label className={styles.dimLabel}>Width</label>
                      <input
                        type="number"
                        min="1"
                        {...register("width", { required: true, min: 1 })}
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.dimCol}>
                      <label className={styles.dimLabel}>Height</label>
                      <input
                        type="number"
                        min="1"
                        {...register("height", { required: true, min: 1 })}
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={loading}
                  >
                    {loading
                      ? "CALCULATING RATES..."
                      : "CALCULATE ESTIMATED RATES"}
                  </button>
                </form>
              </div>

              {/* Right Column: Dynamic Rates Display */}
              <div className={styles.ratesCol}>
                {loading && (
                  <div className={styles.loadingCard}>
                    <div className={styles.spinner}></div>
                    <h3>CALCULATING LIVE LOGISTICS MATRIX...</h3>
                    <p>
                      Executing IATA volumetric weight algorithms and regional
                      route tariffs.
                    </p>
                  </div>
                )}

                {quoteMutation.isError && (
                  <div className={styles.ratesPlaceholder}>
                    <AlertCircle className={styles.placeholderIcon} size={48} />
                    <h3>Error Calculating Rates</h3>
                    <p>
                      {quoteMutation.error?.message ||
                        "Unable to connect to logistics API."}
                    </p>
                  </div>
                )}

                {!loading && !ratesData && !quoteMutation.isError && (
                  <div className={styles.ratesPlaceholder}>
                    <Calculator className={styles.placeholderIcon} size={48} />
                    <h3>Awaiting Shipment Parameters</h3>
                    <p>
                      Configure package weights, destination country, and
                      dimensions on the left to request live shipping options.
                    </p>
                    <div className={styles.trustPillars}>
                      <div className={styles.pillar}>
                        <Check size={16} className={styles.checkIcon} />
                        <span>
                          Real-time IATA volumetric weight calculation
                        </span>
                      </div>
                      <div className={styles.pillar}>
                        <Check size={16} className={styles.checkIcon} />
                        <span>
                          Instant online booking with live tracking ID
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {!loading && ratesData && (
                  <div className={styles.ratesContainer}>
                    <div className={styles.querySummary}>
                      <div>
                        <span className={styles.sumLabel}>ROUTE</span>
                        <span className={styles.sumVal}>
                          {ratesData.origin} ➔ {ratesData.destination}
                        </span>
                      </div>
                      <div>
                        <span className={styles.sumLabel}>
                          ACTUAL / VOLUMETRIC
                        </span>
                        <span className={styles.sumVal}>
                          {ratesData.actualWeight} kg /{" "}
                          {ratesData.volumetricWeight} kg
                        </span>
                      </div>
                      <div>
                        <span className={styles.sumLabel}>
                          CHARGEABLE WEIGHT
                        </span>
                        <span className={styles.sumVal}>
                          {ratesData.chargeableWeight} kg
                        </span>
                      </div>
                    </div>

                    <h3 className={styles.ratesTitle}>
                      AVAILABLE SHIPPING OPTIONS
                    </h3>

                    <div className={styles.optionsList}>
                      {ratesData.options.map((option) => (
                        <div key={option.id} className={styles.optionCard}>
                          <div className={styles.optionHeader}>
                            <div>
                              {option.badge && (
                                <span className={styles.optionBadge}>
                                  {option.badge}
                                </span>
                              )}
                              <h4 className={styles.optionName}>
                                {option.name}
                              </h4>
                              <p className={styles.optionDesc}>
                                {option.description}
                              </p>
                            </div>
                            <div className={styles.priceTag}>
                              <span className={styles.currency}>
                                {option.currency === "GBP"
                                  ? "£"
                                  : option.currency}
                              </span>
                              <span className={styles.price}>
                                {option.price}
                              </span>
                            </div>
                          </div>

                          <div className={styles.optionMeta}>
                            <div className={styles.metaItem}>
                              <Clock size={16} className={styles.metaIcon} />
                              <span>
                                <strong>Transit:</strong> {option.deliveryDays}
                              </span>
                            </div>
                            <div className={styles.metaItem}>
                              <Calendar size={16} className={styles.metaIcon} />
                              <span>
                                <strong>Est. Delivery:</strong>{" "}
                                {option.estimatedDelivery}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            className={styles.bookBtn}
                            onClick={() => openBookingModal(option)}
                          >
                            BOOK SHIPMENT <ArrowRight size={14} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className={styles.rateNotice}>
                      <ShieldCheck size={20} className={styles.shieldIcon} />
                      <p>
                        Estimated rates are calculated based on{" "}
                        {ratesData.chargeableWeight} kg chargeable weight.
                        Includes standard customs clearance paperwork.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Interactive Booking Modal */}
      {isBookingModalOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={(e) => e.target === e.currentTarget && closeBookingModal()}
        >
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {lastBookedTrackingId
                  ? "BOOKING CONFIRMED"
                  : "COMPLETE SHIPMENT BOOKING"}
              </h3>
              <button
                type="button"
                className={styles.modalClose}
                onClick={closeBookingModal}
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {lastBookedTrackingId ? (
              <div className={styles.successModalContent}>
                <CheckCircle2 size={56} className={styles.successIcon} />
                <h3 className={styles.successTitle}>Shipment Registered!</h3>
                <p>
                  Your parcel collection has been logged in the Fascord Dispatch
                  Ledger.
                </p>
                <div className={styles.trackingNumberBox}>
                  <span className={styles.trackingLabel}>
                    Your Live Tracking Number
                  </span>
                  <span className={styles.trackingCode}>
                    {lastBookedTrackingId}
                  </span>
                </div>
                <Link
                  href={`/track?id=${encodeURIComponent(lastBookedTrackingId)}`}
                  className={styles.trackNowBtn}
                  onClick={closeBookingModal}
                >
                  TRACK PARCEL NOW <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className={styles.modalBody}>
                {selectedOption && (
                  <div className={styles.modalServiceSummary}>
                    <div>
                      <span className={styles.modalServiceTitle}>
                        {selectedOption.name}
                      </span>
                      <p
                        style={{
                          margin: "2px 0 0",
                          fontSize: "0.85rem",
                          color: "var(--color-text-muted)",
                        }}
                      >
                        Route: {currentValues.originCountry} ➔{" "}
                        {currentValues.destinationCountry} |{" "}
                        {currentValues.weight} kg
                      </p>
                    </div>
                    <span className={styles.modalServiceRate}>
                      {selectedOption.currency === "GBP" ? "£" : ""}
                      {selectedOption.price}
                    </span>
                  </div>
                )}

                <form
                  onSubmit={handleBookingSubmit(onConfirmBooking)}
                  className={styles.modalForm}
                >
                  <h4 className={styles.modalSectionTitle}>
                    1. Sender Information (Collection)
                  </h4>
                  <div className={styles.row}>
                    <div className={styles.col}>
                      <label className={styles.label}>Sender Full Name</label>
                      <input
                        type="text"
                        placeholder="John Smith"
                        {...registerBooking("senderName", {
                          required: "Sender name is required",
                        })}
                        className={styles.input}
                      />
                      {bookingErrors.senderName && (
                        <span style={{ color: "red", fontSize: "0.75rem" }}>
                          {bookingErrors.senderName.message}
                        </span>
                      )}
                    </div>
                    <div className={styles.col}>
                      <label className={styles.label}>Sender Email</label>
                      <input
                        type="email"
                        placeholder="sender@example.com"
                        {...registerBooking("senderEmail", {
                          required: "Sender email is required",
                        })}
                        className={styles.input}
                      />
                      {bookingErrors.senderEmail && (
                        <span style={{ color: "red", fontSize: "0.75rem" }}>
                          {bookingErrors.senderEmail.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.col}>
                    <label className={styles.label}>
                      Collection Address ({currentValues.originCountry})
                    </label>
                    <input
                      type="text"
                      placeholder="123 Fleet Street, Building B"
                      {...registerBooking("senderAddress", {
                        required: "Collection address is required",
                      })}
                      className={styles.input}
                    />
                    {bookingErrors.senderAddress && (
                      <span style={{ color: "red", fontSize: "0.75rem" }}>
                        {bookingErrors.senderAddress.message}
                      </span>
                    )}
                  </div>

                  <h4 className={styles.modalSectionTitle}>
                    2. Recipient Information (Delivery)
                  </h4>
                  <div className={styles.row}>
                    <div className={styles.col}>
                      <label className={styles.label}>
                        Recipient Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Jane Doe"
                        {...registerBooking("recipientName", {
                          required: "Recipient name is required",
                        })}
                        className={styles.input}
                      />
                      {bookingErrors.recipientName && (
                        <span style={{ color: "red", fontSize: "0.75rem" }}>
                          {bookingErrors.recipientName.message}
                        </span>
                      )}
                    </div>
                    <div className={styles.col}>
                      <label className={styles.label}>
                        Recipient Email (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="recipient@example.com"
                        {...registerBooking("recipientEmail")}
                        className={styles.input}
                      />
                    </div>
                  </div>

                  <div className={styles.col}>
                    <label className={styles.label}>
                      Delivery Address ({currentValues.destinationCountry})
                    </label>
                    <input
                      type="text"
                      placeholder="456 Commerce Way, Suite 100"
                      {...registerBooking("recipientAddress", {
                        required: "Delivery address is required",
                      })}
                      className={styles.input}
                    />
                    {bookingErrors.recipientAddress && (
                      <span style={{ color: "red", fontSize: "0.75rem" }}>
                        {bookingErrors.recipientAddress.message}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={styles.modalSubmitBtn}
                    disabled={bookMutation.isPending}
                  >
                    {bookMutation.isPending
                      ? "PROCESSING BOOKING..."
                      : "CONFIRM & GENERATE TRACKING CODE"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={<div>Loading shipping quote...</div>}>
      <QuoteFormContent />
    </Suspense>
  );
}
