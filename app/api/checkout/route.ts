import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getPriceIdFromType } from "@/lib/plans";
import { ALLOWED_PLAN_TYPES, ERROR_CODES } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const { planType, userId, email } = await request.json();

    if (!planType || !userId || !email) {
      return NextResponse.json(
        { 
          error: "Plan type, User ID, and Email are required.",
          code: ERROR_CODES.MISSING_REQUIRED_FIELDS
        },
        { status: 400 }
      );
    }

    const allowedPlanTypes = ALLOWED_PLAN_TYPES;
    if (!allowedPlanTypes.includes(planType)) {
      return NextResponse.json(
        { 
          error: "Invalid plan type.",
          code: ERROR_CODES.INVALID_PLAN_TYPE
        },
        { status: 400 }
      );
    }

    const priceId = getPriceIdFromType(planType);
    if (!priceId) {
      return NextResponse.json(
        { 
          error: "Price ID for the selected plan not found. Please contact support.",
          code: ERROR_CODES.MISSING_PRICE_ID
        },
        { status: 500 }
      );
    }

    // Create Stripe Checkout Session
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
      `${request.headers.get("x-forwarded-proto") || "https"}://${request.headers.get("host")}`;
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: email,
      mode: "subscription",
      metadata: { clerkUserId: userId, planType },
      success_url: `${baseUrl}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/subscribe`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("[API] Checkout Error:", error.message);
    return NextResponse.json(
      { 
        error: error.message || "Internal Server Error",
        code: ERROR_CODES.STRIPE_ERROR
      },
      { status: 500 }
    );
  }
}
