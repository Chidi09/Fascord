import { NextResponse } from "next/server";
import { QuoteRequestSchema } from "@/lib/schemas";
import { calculateLogisticsQuotes } from "@/lib/quote-calculator";

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const parseResult = QuoteRequestSchema.safeParse(rawBody);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: parseResult.error.issues,
        },
        { status: 400 },
      );
    }

    const quotes = calculateLogisticsQuotes(parseResult.data);
    return NextResponse.json(quotes);
  } catch (error) {
    console.error("Error calculating quotes in API route:", error);
    return NextResponse.json(
      { error: "Internal server error calculating logistics rates" },
      { status: 500 },
    );
  }
}
