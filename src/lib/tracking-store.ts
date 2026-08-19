export interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  details: string;
  completed: boolean;
}

export interface TrackingData {
  trackingId: string;
  status: "delivered" | "in_transit" | "pending" | "customs_hold" | "failed";
  serviceType: string;
  shipper: string;
  recipient: string;
  origin: string;
  destination: string;
  estimatedDelivery: string;
  currentStep: number;
  weight?: string;
  packageType?: string;
  steps: TrackingEvent[];
  bookedAt?: string;
}

export interface BookingPayload {
  serviceId: string;
  serviceName: string;
  originCountry: string;
  destinationCountry: string;
  weight: number;
  length?: number;
  width?: number;
  height?: number;
  packageType: "parcel" | "document";
  senderName: string;
  senderEmail: string;
  senderAddress: string;
  recipientName: string;
  recipientEmail?: string;
  recipientAddress: string;
}

// In-memory shipment registry initialized with rich seeded tracking timelines
const shipmentsDatabase = new Map<string, TrackingData>();

function seedInitialShipments() {
  const now = new Date();

  const dMinus3 = new Date(now.getTime() - 3 * 86400000).toISOString();
  const dMinus2 = new Date(now.getTime() - 2 * 86400000).toISOString();
  const dMinus1 = new Date(now.getTime() - 1 * 86400000).toISOString();
  const dToday = now.toISOString();
  const dPlus1 = new Date(now.getTime() + 1 * 86400000).toISOString();
  const dPlus2 = new Date(now.getTime() + 2 * 86400000).toISOString();
  const dPlus3 = new Date(now.getTime() + 3 * 86400000).toISOString();

  // 1. Delivered Transatlantic Shipment
  shipmentsDatabase.set("FAS-DELIVERED", {
    trackingId: "FAS-DELIVERED",
    status: "delivered",
    serviceType: "Fascord Priority Express",
    shipper: "Apex Global Logistics Ltd (New York, USA)",
    recipient: "Fascord Corporate Office, London, UK",
    origin: "New York, United States",
    destination: "London, United Kingdom",
    estimatedDelivery: dMinus1,
    currentStep: 5,
    weight: "3.4 kg",
    packageType: "Commercial Parcel Cargo",
    bookedAt: dMinus3,
    steps: [
      {
        status: "Shipment Collected by Courier",
        location: "JFK Air Terminal, New York",
        timestamp: dMinus3,
        details:
          "Package picked up from shipper dock and barcoded into Fascord Global Ledger.",
        completed: true,
      },
      {
        status: "Sorted at International Gateway Facility",
        location: "Jamaica Sort Facility (JFK)",
        timestamp: dMinus2,
        details:
          "Consolidated into transatlantic direct air cargo container #FAS-8819.",
        completed: true,
      },
      {
        status: "Air Flight Departure & Atlantic Crossing",
        location: "Flight FAS-704 (JFK ➔ LHR)",
        timestamp: dMinus2,
        details:
          "Transatlantic flight en route to London Heathrow cargo terminals.",
        completed: true,
      },
      {
        status: "Customs Cleared & Arrived at London Sort Depot",
        location: "Heathrow International Hub, London",
        timestamp: dMinus1,
        details:
          "Import tax verified and handed to regional East London dispatch van.",
        completed: true,
      },
      {
        status: "Successfully Delivered & Signed",
        location: "London, UK",
        timestamp: dMinus1,
        details: "Signed and accepted by: A. Carter (Front Reception Desk).",
        completed: true,
      },
    ],
  });

  // 2. Active In-Transit Shipment
  shipmentsDatabase.set("FAS-INTRANSIT", {
    trackingId: "FAS-INTRANSIT",
    status: "in_transit",
    serviceType: "Fascord Standard Cargo",
    shipper: "Fascord Central Dispatch (Manchester)",
    recipient: "Midlands Industrial Supplies Ltd (Birmingham)",
    origin: "Manchester, United Kingdom",
    destination: "Birmingham, United Kingdom",
    estimatedDelivery: dPlus1,
    currentStep: 3,
    weight: "12.0 kg",
    packageType: "Heavy Parcel Cargo",
    bookedAt: dMinus1,
    steps: [
      {
        status: "Shipment Picked Up",
        location: "Manchester Sorting Hub",
        timestamp: dMinus1,
        details: "Collected and scanned into Fascord UK ground fleet.",
        completed: true,
      },
      {
        status: "Processed at Regional Depot",
        location: "Trafford Park Sort Centre, Manchester",
        timestamp: dToday,
        details:
          "Volumetric weight certified and loaded onto M6 linehaul transporter.",
        completed: true,
      },
      {
        status: "En Route to Destination Facility",
        location: "M6 Northbound Corridor",
        timestamp: dToday,
        details: "Transporter en route to Birmingham East Regional Depot.",
        completed: true,
      },
      {
        status: "Arrival at Delivery Depot",
        location: "Birmingham East Depot, UK",
        timestamp: "Pending",
        details: "Scheduled for regional depot cross-docking.",
        completed: false,
      },
      {
        status: "Out for Final Delivery",
        location: "Birmingham, UK",
        timestamp: "Pending",
        details: "Courier dispatch assignment pending morning route load.",
        completed: false,
      },
    ],
  });

  // 3. Newly Booked / Pending Shipment
  shipmentsDatabase.set("FAS-PENDING", {
    trackingId: "FAS-PENDING",
    status: "pending",
    serviceType: "Fascord Priority Express",
    shipper: "TechInnovate Solutions, London, UK",
    recipient: "Berlin Ventures GmbH, Germany",
    origin: "London, United Kingdom",
    destination: "Berlin, Germany",
    estimatedDelivery: dPlus2,
    currentStep: 1,
    weight: "2.1 kg",
    packageType: "Express Parcel",
    bookedAt: dToday,
    steps: [
      {
        status: "Electronic Shipping Order Received",
        location: "Fascord Digital Portal",
        timestamp: dToday,
        details:
          "Shipment booking confirmed. Collection order assigned to East London depot courier.",
        completed: true,
      },
      {
        status: "Courier Collection Pending",
        location: "London, UK",
        timestamp: "Pending",
        details: "Fascord driver scheduled for 60-minute pickup window.",
        completed: false,
      },
      {
        status: "Heathrow Air Hub Sorting",
        location: "London Heathrow (LHR)",
        timestamp: "Pending",
        details: "Awaiting containerization for Frankfurt/Berlin flight.",
        completed: false,
      },
      {
        status: "EU Customs Clearance",
        location: "Frankfurt Air Cargo Terminal",
        timestamp: "Pending",
        details: "Automated electronic customs declaration pending arrival.",
        completed: false,
      },
      {
        status: "Out for Final Delivery",
        location: "Berlin, Germany",
        timestamp: "Pending",
        details: "Last mile local courier delivery.",
        completed: false,
      },
    ],
  });

  // 4. Customs Hold / Clearance Checkpoint
  shipmentsDatabase.set("FAS-CUSTOMS", {
    trackingId: "FAS-CUSTOMS",
    status: "in_transit",
    serviceType: "Fascord Priority Express",
    shipper: "Tokyo Precision Electronics, Japan",
    recipient: "Cambridge Quantum Labs, Cambridge, UK",
    origin: "Tokyo, Japan",
    destination: "Cambridge, United Kingdom",
    estimatedDelivery: dPlus2,
    currentStep: 3,
    weight: "8.5 kg",
    packageType: "High-Value Technology Cargo",
    bookedAt: dMinus2,
    steps: [
      {
        status: "Export Clearance & Departure",
        location: "Narita International Airport (NRT)",
        timestamp: dMinus2,
        details: "Handled by Fascord Asian Air Freight Division.",
        completed: true,
      },
      {
        status: "Transcontinental Flight Transit",
        location: "Global Cargo Flight FAS-902",
        timestamp: dMinus1,
        details: "Flight arrived at London Stansted Airport terminal.",
        completed: true,
      },
      {
        status: "UK Customs & Border Clearance Underway",
        location: "Stansted Cargo Customs Area",
        timestamp: dToday,
        details:
          "Commercial invoice documentation presented to HMRC customs officers.",
        completed: true,
      },
      {
        status: "Regional Linehaul Dispatch",
        location: "Stansted Depot",
        timestamp: "Pending",
        details: "Awaiting clearance release stamp.",
        completed: false,
      },
      {
        status: "Delivered to Recipient",
        location: "Cambridge, UK",
        timestamp: "Pending",
        details: "Courier signature verification required upon handover.",
        completed: false,
      },
    ],
  });

  // 5. Popular Nigerian Cargo Corridor
  shipmentsDatabase.set("FAS-EXP-7729", {
    trackingId: "FAS-EXP-7729",
    status: "in_transit",
    serviceType: "Fascord Priority Express",
    shipper: "Chidi Import Services (London, UK)",
    recipient: "Victoria Island Logistics Hub (Lagos, Nigeria)",
    origin: "London, United Kingdom",
    destination: "Lagos, Nigeria",
    estimatedDelivery: dPlus3,
    currentStep: 2,
    weight: "15.0 kg",
    packageType: "International Air Freight",
    bookedAt: dMinus1,
    steps: [
      {
        status: "Shipment Collected at East London Depot",
        location: "London, UK",
        timestamp: dMinus1,
        details: "Package sealed and loaded onto Gatwick linehaul link.",
        completed: true,
      },
      {
        status: "Processed at International Air Gateway",
        location: "Gatwick Airport (LGW)",
        timestamp: dToday,
        details:
          "Security screened and manifested onto direct flight to Murtala Muhammed Airport (LOS).",
        completed: true,
      },
      {
        status: "International Flight in Transit",
        location: "Flight FAS-510",
        timestamp: "Pending",
        details: "En route to West Africa air freight hub.",
        completed: false,
      },
      {
        status: "Lagos Customs Clearance",
        location: "Murtala Muhammed Int. Airport (LOS)",
        timestamp: "Pending",
        details:
          "Import duty verification and sorting to Victoria Island local hub.",
        completed: false,
      },
      {
        status: "Delivered",
        location: "Lagos, Nigeria",
        timestamp: "Pending",
        details: "Final delivery handover.",
        completed: false,
      },
    ],
  });

  // Aliases for common sample queries
  const deliveredRef = shipmentsDatabase.get("FAS-DELIVERED");
  if (deliveredRef) {
    shipmentsDatabase.set("FAS-12345", {
      ...deliveredRef,
      trackingId: "FAS-12345",
    });
    shipmentsDatabase.set("FAS-998877", {
      ...deliveredRef,
      trackingId: "FAS-998877",
    });
  }
}

// Initialize seed data immediately
seedInitialShipments();

/**
 * Generate a deterministic realistic tracking timeline for any unrecognized tracking ID
 */
function generateDeterministicShipment(trackingId: string): TrackingData {
  const cleanId = trackingId.toUpperCase().trim();
  const hash = Array.from(cleanId).reduce(
    (acc, char) => acc + char.charCodeAt(0),
    0,
  );

  const now = new Date();
  const dMinus2 = new Date(now.getTime() - 2 * 86400000).toISOString();
  const dMinus1 = new Date(now.getTime() - 1 * 86400000).toISOString();
  const dToday = now.toISOString();
  const dPlus2 = new Date(now.getTime() + 2 * 86400000).toISOString();

  const isDelivered = cleanId.includes("DEL") || hash % 4 === 0;
  const isPending = cleanId.includes("PEN") || hash % 4 === 3;

  const status: TrackingData["status"] = isDelivered
    ? "delivered"
    : isPending
      ? "pending"
      : "in_transit";

  return {
    trackingId: cleanId,
    status,
    serviceType: "Fascord Express Network",
    shipper: "Fascord Commercial Client Portal",
    recipient: "Authorized Consignee",
    origin: "London Gateway, United Kingdom",
    destination: "Global Destination Facility",
    estimatedDelivery: isDelivered ? dMinus1 : dPlus2,
    currentStep: isDelivered ? 4 : isPending ? 1 : 2,
    weight: `${((hash % 15) + 1.2).toFixed(1)} kg`,
    packageType: "Express Verified Parcel",
    bookedAt: dMinus2,
    steps: [
      {
        status: "Shipment Manifest Created & Barcoded",
        location: "Fascord Central Dispatch Hub",
        timestamp: dMinus2,
        details: `Shipment order registered under reference ${cleanId}. Tracking enabled on global ledger.`,
        completed: true,
      },
      {
        status: "Collected & Ingested into Sort Network",
        location: "London East Logistics Depot",
        timestamp: dMinus1,
        details:
          "Package security-scanned, measured, and verified for linehaul transport.",
        completed: !isPending,
      },
      {
        status: "In Transit along Inter-City Freight Route",
        location: "Regional Distribution Corridor",
        timestamp: !isPending ? dToday : "Pending",
        details: "Cargo en route to local delivery station.",
        completed: isDelivered,
      },
      {
        status: isDelivered
          ? "Delivered & Completed"
          : "Out for Final Delivery",
        location: "Destination Station",
        timestamp: isDelivered ? dMinus1 : "Pending",
        details: isDelivered
          ? "Delivered to registered delivery address and signed."
          : "Scheduled for local courier dispatch.",
        completed: isDelivered,
      },
    ],
  };
}

/**
 * Retrieve tracking data by tracking ID
 */
export function getShipmentByTrackingId(
  trackingId: string,
): TrackingData | null {
  if (!trackingId || typeof trackingId !== "string") {
    return null;
  }

  const cleanId = trackingId.toUpperCase().trim();

  // Known special error case for testing
  if (cleanId === "FAS-ERROR" || cleanId === "INVALID") {
    return null;
  }

  if (shipmentsDatabase.has(cleanId)) {
    return shipmentsDatabase.get(cleanId)!;
  }

  // If valid format (e.g. starts with FAS- or has alphanumeric code of 6+ chars), create dynamic shipment
  if (cleanId.startsWith("FAS-") || cleanId.length >= 6) {
    const generated = generateDeterministicShipment(cleanId);
    shipmentsDatabase.set(cleanId, generated);
    return generated;
  }

  return null;
}

/**
 * Create a new live shipment from user booking
 */
export function registerNewShipment(booking: BookingPayload): TrackingData {
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const countryCode = booking.destinationCountry
    .slice(0, 3)
    .toUpperCase()
    .replace(/[^A-Z]/g, "INT");
  const trackingId = `FAS-${countryCode}-${randomSuffix}`;

  const now = new Date();
  const bookedAt = now.toISOString();

  // Delivery estimation (1 to 4 days based on destination)
  const isDomestic =
    booking.originCountry.toLowerCase() ===
    booking.destinationCountry.toLowerCase();
  const transitDays = isDomestic ? 1 : 3;
  const estimatedDelivery = new Date(
    now.getTime() + transitDays * 86400000,
  ).toISOString();

  const newShipment: TrackingData = {
    trackingId,
    status: "pending",
    serviceType: booking.serviceName || "Fascord Priority Express",
    shipper: `${booking.senderName} (${booking.senderAddress || booking.originCountry})`,
    recipient: `${booking.recipientName} (${booking.recipientAddress || booking.destinationCountry})`,
    origin: booking.originCountry,
    destination: booking.destinationCountry,
    estimatedDelivery,
    currentStep: 1,
    weight: `${booking.weight} kg`,
    packageType:
      booking.packageType === "document" ? "Letter / Document" : "Parcel Cargo",
    bookedAt,
    steps: [
      {
        status: "Shipment Booked & Confirmed Online",
        location: "Fascord Client Dispatch Portal",
        timestamp: bookedAt,
        details: `Online booking confirmed under Tracking ID ${trackingId}. Courier collection order scheduled.`,
        completed: true,
      },
      {
        status: "Courier Pickup & Label Barcode Verification",
        location: `${booking.originCountry} Collection Hub`,
        timestamp: "Pending",
        details: `Assigned to local driver for collection at ${booking.senderAddress || booking.originCountry}.`,
        completed: false,
      },
      {
        status: "Hub Sorting & Air/Road Freight Transit",
        location: "Fascord International Gateway Hub",
        timestamp: "Pending",
        details: `Security inspection, volumetric weight validation, and route manifestation to ${booking.destinationCountry}.`,
        completed: false,
      },
      {
        status: "Arrival at Destination Depot & Customs Clearance",
        location: `${booking.destinationCountry} Customs Terminal`,
        timestamp: "Pending",
        details:
          "Customs declaration filing and local delivery courier assignment.",
        completed: false,
      },
      {
        status: "Final Delivery to Consignee",
        location: `${booking.destinationCountry}`,
        timestamp: "Pending",
        details: `Direct handover to ${booking.recipientName} at ${booking.recipientAddress || booking.destinationCountry}. Signature required.`,
        completed: false,
      },
    ],
  };

  shipmentsDatabase.set(trackingId, newShipment);
  return newShipment;
}

// In-memory contact inquiries store
export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
}

const contactInquiries: ContactInquiry[] = [];

export function recordContactInquiry(
  data: Omit<ContactInquiry, "id" | "createdAt">,
): { id: string; message: string } {
  const id = `INQ-${Math.floor(100000 + Math.random() * 900000)}`;
  const inquiry: ContactInquiry = {
    ...data,
    id,
    createdAt: new Date().toISOString(),
  };
  contactInquiries.push(inquiry);

  return {
    id,
    message: `Thank you, ${data.name}! Your message has been received (Ref: ${id}). A Fascord logistics coordinator will contact you at ${data.email} within 2 hours.`,
  };
}
