import { create } from "zustand";
import { QuoteOption } from "@/lib/quote-calculator";

export interface QuoteFormState {
  originCountry: string;
  destinationCountry: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  packageType: "parcel" | "document";
}

interface LogisticsStore {
  // Quote State
  quoteFormData: QuoteFormState;
  selectedOption: QuoteOption | null;
  setQuoteFormData: (data: Partial<QuoteFormState>) => void;
  setSelectedOption: (option: QuoteOption | null) => void;

  // Booking Modal State
  isBookingModalOpen: boolean;
  openBookingModal: (option: QuoteOption) => void;
  closeBookingModal: () => void;
  lastBookedTrackingId: string | null;
  setLastBookedTrackingId: (id: string | null) => void;

  // Tracking History
  recentTrackings: string[];
  addRecentTracking: (trackingId: string) => void;
}

const DEFAULT_QUOTE_FORM: QuoteFormState = {
  originCountry: "United Kingdom",
  destinationCountry: "United States",
  weight: 1,
  length: 20,
  width: 15,
  height: 10,
  packageType: "parcel",
};

export const useLogisticsStore = create<LogisticsStore>((set) => ({
  quoteFormData: DEFAULT_QUOTE_FORM,
  selectedOption: null,
  setQuoteFormData: (data) =>
    set((state) => ({
      quoteFormData: { ...state.quoteFormData, ...data },
    })),
  setSelectedOption: (option) => set({ selectedOption: option }),

  isBookingModalOpen: false,
  openBookingModal: (option) =>
    set({
      selectedOption: option,
      isBookingModalOpen: true,
      lastBookedTrackingId: null,
    }),
  closeBookingModal: () =>
    set({
      isBookingModalOpen: false,
    }),
  lastBookedTrackingId: null,
  setLastBookedTrackingId: (id) => set({ lastBookedTrackingId: id }),

  recentTrackings: [],
  addRecentTracking: (trackingId) =>
    set((state) => {
      const clean = trackingId.toUpperCase().trim();
      if (!clean) return state;
      const filtered = state.recentTrackings.filter((id) => id !== clean);
      return {
        recentTrackings: [clean, ...filtered].slice(0, 8),
      };
    }),
}));
