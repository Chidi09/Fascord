import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Tracking ID is required" },
        { status: 400 },
      );
    }

    const cleanId = id.trim().toUpperCase();

    const shipment = await prisma.shipment.findUnique({
      where: { trackingId: cleanId },
      include: {
        steps: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!shipment) {
      return NextResponse.json(
        {
          error: `Shipment with tracking number "${cleanId}" not found in database.`,
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      trackingId: shipment.trackingId,
      status: shipment.status,
      serviceType: shipment.serviceType,
      shipper: shipment.shipper,
      recipient: shipment.recipient,
      origin: shipment.origin,
      destination: shipment.destination,
      estimatedDelivery: shipment.estimatedDelivery,
      currentStep: shipment.currentStep,
      weight: shipment.weight || "Standard",
      packageType: shipment.packageType || "Parcel Cargo",
      bookedAt: shipment.bookedAt,
      steps: shipment.steps.map((s) => ({
        status: s.status,
        location: s.location,
        timestamp: s.timestamp,
        details: s.details,
        completed: s.completed,
      })),
    });
  } catch (error) {
    console.error("Error fetching tracking data from Prisma SQLite:", error);
    return NextResponse.json(
      { error: "Internal database error while retrieving shipment" },
      { status: 500 },
    );
  }
}
