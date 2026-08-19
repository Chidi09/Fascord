export interface QuoteRequest {
  originCountry: string;
  destinationCountry: string;
  weight: number;
  length?: number;
  width?: number;
  height?: number;
  packageType?: "parcel" | "document";
}

export interface QuoteOption {
  id: string;
  name: string;
  price: string;
  currency: string;
  deliveryDays: string;
  estimatedDelivery: string;
  description: string;
  badge?: string;
}

export interface QuoteResponse {
  success: boolean;
  origin: string;
  destination: string;
  actualWeight: number;
  volumetricWeight: number;
  chargeableWeight: number;
  packageType: string;
  options: QuoteOption[];
}

const EUROPEAN_COUNTRIES = new Set([
  "Austria",
  "Belgium",
  "Bulgaria",
  "Croatia",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "Hungary",
  "Ireland",
  "Italy",
  "Latvia",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Netherlands",
  "Poland",
  "Portugal",
  "Romania",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
  "Switzerland",
  "Norway",
  "Iceland",
  "Monaco",
  "Andorra",
  "Gibraltar",
]);

const NORTH_AMERICA = new Set([
  "United States",
  "Canada",
  "Mexico",
  "Puerto Rico",
  "Bermuda",
]);

const ASIA_MIDDLE_EAST = new Set([
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "China",
  "Hong Kong",
  "Japan",
  "South Korea",
  "Singapore",
  "India",
  "Taiwan",
  "Malaysia",
  "Thailand",
  "Vietnam",
  "Indonesia",
  "Philippines",
  "Israel",
  "Turkey",
]);

const AFRICA = new Set([
  "Nigeria",
  "South Africa",
  "Ghana",
  "Kenya",
  "Egypt",
  "Morocco",
  "Ethiopia",
  "Tanzania",
  "Uganda",
  "Algeria",
  "Tunisia",
  "Rwanda",
  "Senegal",
  "Cameroon",
  "Ivory Coast",
  "Zambia",
  "Zimbabwe",
]);

/**
 * Add business days to a date (skipping Saturday and Sunday)
 */
function addBusinessDays(startDate: Date, daysToAdd: number): Date {
  const result = new Date(startDate);
  let added = 0;
  while (added < daysToAdd) {
    result.setDate(result.getDate() + 1);
    const dayOfWeek = result.getDay();
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // 0 = Sunday, 6 = Saturday
      added++;
    }
  }
  return result;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function calculateLogisticsQuotes(input: QuoteRequest): QuoteResponse {
  const origin = input.originCountry?.trim() || "United Kingdom";
  const destination = input.destinationCountry?.trim() || "United States";
  const weight = Math.max(0.1, Number(input.weight) || 1);
  const length = Math.max(1, Number(input.length) || 20);
  const width = Math.max(1, Number(input.width) || 15);
  const height = Math.max(1, Number(input.height) || 10);
  const packageType = input.packageType === "document" ? "document" : "parcel";

  // IATA standard volumetric calculation: (L x W x H in cm) / 5000
  const volumetricWeight =
    Math.round(((length * width * height) / 5000) * 10) / 10;
  const chargeableWeight = Math.max(
    weight,
    packageType === "document" ? weight : volumetricWeight,
  );

  const isDomestic =
    origin.toLowerCase() === destination.toLowerCase() &&
    origin.toLowerCase() === "united kingdom";
  const isDestinationEurope = EUROPEAN_COUNTRIES.has(destination);
  const isDestinationNA = NORTH_AMERICA.has(destination);
  const isDestinationAsiaME = ASIA_MIDDLE_EAST.has(destination);
  const isDestinationAfrica = AFRICA.has(destination);

  // Determine base zone pricing and transit multipliers
  let baseExpressRate = 38.0;
  let perKgRate = 5.2;
  let expressDays = 3;
  let standardDays = 6;
  let economyDays = 9;

  if (isDomestic) {
    baseExpressRate = 8.5;
    perKgRate = 1.4;
    expressDays = 1;
    standardDays = 2;
    economyDays = 3;
  } else if (isDestinationEurope) {
    baseExpressRate = 22.0;
    perKgRate = 3.2;
    expressDays = 1;
    standardDays = 3;
    economyDays = 5;
  } else if (isDestinationNA) {
    baseExpressRate = 32.0;
    perKgRate = 4.8;
    expressDays = 2;
    standardDays = 4;
    economyDays = 7;
  } else if (isDestinationAsiaME) {
    baseExpressRate = 36.0;
    perKgRate = 5.5;
    expressDays = 2;
    standardDays = 5;
    economyDays = 8;
  } else if (isDestinationAfrica) {
    baseExpressRate = 34.0;
    perKgRate = 5.1;
    expressDays = 3;
    standardDays = 5;
    economyDays = 8;
  } else {
    // Rest of world / Oceania / South America
    baseExpressRate = 42.0;
    perKgRate = 6.4;
    expressDays = 4;
    standardDays = 7;
    economyDays = 11;
  }

  // Document discount
  const docMultiplier = packageType === "document" ? 0.75 : 1.0;

  const expressTotal = Math.max(
    7.99,
    (baseExpressRate + chargeableWeight * perKgRate) * docMultiplier,
  );
  const standardTotal = Math.max(5.99, expressTotal * 0.72);
  const economyTotal = Math.max(4.99, expressTotal * 0.55);

  const now = new Date();
  const options: QuoteOption[] = [
    {
      id: "fascord-express",
      name: "Fascord Priority Express",
      price: expressTotal.toFixed(2),
      currency: "GBP",
      deliveryDays:
        expressDays === 1
          ? "1 Working Day"
          : `${expressDays - 1}-${expressDays} Working Days`,
      estimatedDelivery: formatDate(addBusinessDays(now, expressDays)),
      description:
        "Fastest priority air/ground linehaul transit. End-to-end telemetry and guaranteed delivery schedule.",
      badge: "FASTEST",
    },
    {
      id: "fascord-standard",
      name: "Fascord Standard Cargo",
      price: standardTotal.toFixed(2),
      currency: "GBP",
      deliveryDays: `${standardDays - 1}-${standardDays} Working Days`,
      estimatedDelivery: formatDate(addBusinessDays(now, standardDays)),
      description:
        "Reliable consolidated freight transit with customs assistance and full milestone tracking.",
      badge: "POPULAR",
    },
    {
      id: "fascord-economy",
      name: "Fascord Economy Saver",
      price: economyTotal.toFixed(2),
      currency: "GBP",
      deliveryDays: `${economyDays - 2}-${economyDays} Working Days`,
      estimatedDelivery: formatDate(addBusinessDays(now, economyDays)),
      description:
        "Cost-effective logistics for non-urgent parcels. Standard checkpoint tracking included.",
      badge: "BEST VALUE",
    },
  ];

  // If domestic UK, add same day option
  if (isDomestic) {
    const sameDayPrice = Math.max(35.0, 35.0 + chargeableWeight * 2.5);
    options.unshift({
      id: "fascord-sameday",
      name: "Fascord Same-Day Courier Direct",
      price: sameDayPrice.toFixed(2),
      currency: "GBP",
      deliveryDays: "Today (by 18:00)",
      estimatedDelivery: `${formatDate(now)} (Today)`,
      description:
        "Dedicated vehicle dispatched directly from pickup to delivery address without depot cross-docking.",
      badge: "SAME DAY",
    });
  }

  return {
    success: true,
    origin,
    destination,
    actualWeight: weight,
    volumetricWeight,
    chargeableWeight,
    packageType:
      packageType === "document" ? "Letter / Document" : "Parcel Cargo",
    options,
  };
}
