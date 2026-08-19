import { NextResponse } from "next/server";
import { ContactFormSchema } from "@/lib/schemas";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const parseResult = ContactFormSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: parseResult.error.issues,
        },
        { status: 400 },
      );
    }

    const { name, email, phone, subject, message } = parseResult.data;
    const referenceId = `INQ-${Math.floor(100000 + Math.random() * 900000)}`;

    await prisma.contactInquiry.create({
      data: {
        referenceId,
        name,
        email,
        phone: phone || "",
        subject: subject || "General Inquiry",
        message,
      },
    });

    return NextResponse.json({
      success: true,
      referenceId,
      message: `Thank you, ${name}! Your inquiry has been submitted (Ref: ${referenceId}). A Fascord coordinator will contact you at ${email} shortly.`,
    });
  } catch (error) {
    console.error("Error saving contact inquiry in Prisma SQLite:", error);
    return NextResponse.json(
      { error: "Internal database error processing contact message" },
      { status: 500 },
    );
  }
}
