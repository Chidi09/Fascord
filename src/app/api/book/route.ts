import { NextResponse } from "next/server";
import { BookingRequestSchema } from "@/lib/schemas";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const parseResult = BookingRequestSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Booking validation failed",
          issues: parseResult.error.issues,
        },
        { status: 400 },
      );
    }

    const booking = parseResult.data;
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const countryCode = booking.destinationCountry
      .slice(0, 3)
      .toUpperCase()
      .replace(/[^A-Z]/g, "INT");
    const trackingId = `FAS-${countryCode}-${randomSuffix}`;

    const now = new Date();
    const bookedAt = now.toISOString();

    const isDomestic =
      booking.originCountry.toLowerCase() ===
      booking.destinationCountry.toLowerCase();
    const transitDays = isDomestic ? 1 : 3;
    const estimatedDelivery = new Date(
      now.getTime() + transitDays * 86400000,
    ).toISOString();

    const newShipment = await prisma.shipment.create({
      data: {
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
          booking.packageType === "document"
            ? "Letter / Document"
            : "Parcel Cargo",
        bookedAt,
        steps: {
          create: [
            {
              status: "Shipment Booked & Confirmed Online",
              location: "Fascord Client Dispatch Portal",
              timestamp: bookedAt,
              details: `Online booking confirmed under Tracking ID ${trackingId}. Courier collection order scheduled.`,
              completed: true,
              order: 1,
            },
            {
              status: "Courier Pickup & Label Barcode Verification",
              location: `${booking.originCountry} Collection Hub`,
              timestamp: "Pending",
              details: `Assigned to local driver for collection at ${booking.senderAddress || booking.originCountry}.`,
              completed: false,
              order: 2,
            },
            {
              status: "Hub Sorting & Air/Road Freight Transit",
              location: "Fascord International Gateway Hub",
              timestamp: "Pending",
              details: `Security inspection, volumetric weight validation, and route manifestation to ${booking.destinationCountry}.`,
              completed: false,
              order: 3,
            },
            {
              status: "Arrival at Destination Depot & Customs Clearance",
              location: `${booking.destinationCountry} Customs Terminal`,
              timestamp: "Pending",
              details:
                "Customs declaration filing and local delivery courier assignment.",
              completed: false,
              order: 4,
            },
            {
              status: "Final Delivery to Consignee",
              location: `${booking.destinationCountry}`,
              timestamp: "Pending",
              details: `Direct handover to ${booking.recipientName} at ${booking.recipientAddress || booking.destinationCountry}. Signature required.`,
              completed: false,
              order: 5,
            },
          ],
        },
      },
      include: {
        steps: {
          orderBy: { order: "asc" },
        },
      },
    });

    return NextResponse.json({
      success: true,
      trackingId: newShipment.trackingId,
      estimatedDelivery: newShipment.estimatedDelivery,
      shipment: {
        trackingId: newShipment.trackingId,
        status: newShipment.status,
        serviceType: newShipment.serviceType,
        shipper: newShipment.shipper,
        recipient: newShipment.recipient,
        origin: newShipment.origin,
        destination: newShipment.destination,
        estimatedDelivery: newShipment.estimatedDelivery,
        currentStep: newShipment.currentStep,
        weight: newShipment.weight,
        packageType: newShipment.packageType,
        bookedAt: newShipment.bookedAt,
        steps: newShipment.steps.map((s) => ({
          status: s.status,
          location: s.location,
          timestamp: s.timestamp,
          details: s.details,
          completed: s.completed,
        })),
      },
      message: `Shipment booked successfully! Your tracking number is ${newShipment.trackingId}.`,
    });
  } catch (error) {
    console.error("Error booking shipment with Prisma SQLite:", error);
    return NextResponse.json(
      { error: "Internal database error creating shipment booking" },
      { status: 500 },
    );
  }
}
