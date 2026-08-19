import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  QuoteRequestInput,
  BookingRequestInput,
  ContactFormInput,
} from "@/lib/schemas";
import { QuoteResponse } from "@/lib/quote-calculator";
import { TrackingData } from "@/lib/tracking-store";

export function useGetQuote() {
  return useMutation<QuoteResponse, Error, QuoteRequestInput>({
    mutationFn: async (payload) => {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to calculate shipping quotes");
      }

      return result as QuoteResponse;
    },
  });
}

export function useTrackParcel(trackingId: string) {
  const cleanId = trackingId?.trim().toUpperCase();

  return useQuery<TrackingData, Error>({
    queryKey: ["tracking", cleanId],
    queryFn: async () => {
      if (!cleanId) throw new Error("Tracking ID is required");

      const response = await fetch(`/api/track/${encodeURIComponent(cleanId)}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || `Shipment ${cleanId} not found`);
      }

      return result as TrackingData;
    },
    enabled: Boolean(cleanId),
    retry: 1,
  });
}

export interface BookingResponse {
  success: boolean;
  trackingId: string;
  estimatedDelivery: string;
  shipment: TrackingData;
  message: string;
}

export function useBookShipment() {
  const queryClient = useQueryClient();

  return useMutation<BookingResponse, Error, BookingRequestInput>({
    mutationFn: async (payload) => {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to book shipment");
      }

      return result as BookingResponse;
    },
    onSuccess: (data) => {
      // Invalidate tracking queries so new shipment is immediately available
      queryClient.setQueryData(["tracking", data.trackingId], data.shipment);
    },
  });
}

export interface ContactResponse {
  success: boolean;
  referenceId: string;
  message: string;
}

export function useSendContactInquiry() {
  return useMutation<ContactResponse, Error, ContactFormInput>({
    mutationFn: async (payload) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to submit contact message");
      }

      return result as ContactResponse;
    },
  });
}
