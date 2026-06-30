// app/api/stripe-webhook/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // <-- import Prisma client
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_for_build");
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "whsec_placeholder_for_build";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event: Stripe.Event;

  // Verify Stripe event is legit
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature || "",
      webhookSecret
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        await handleInvoicePaymentFailed(invoice);
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }
      // Add more event types as needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } catch (e: any) {
    console.error(`stripe error: ${e.message} | EVENT TYPE: ${event.type}`);
    return NextResponse.json({ error: e.message }, { status: 400 });
  }

  return NextResponse.json({});
}

// Handler for successful checkout sessions
const handleCheckoutSessionCompleted = async (
  session: Stripe.Checkout.Session
) => {
  const userId = session.metadata?.clerkUserId;

  if (!userId) {
    console.error("[Webhook] No userId found in session metadata.");
    return;
  }

  // Retrieve subscription ID from the session
  // Stripe's subscription property can be a string (ID) or an expanded Subscription object
  const subscription = (session as any).subscription;
  const subscriptionId = typeof subscription === 'string'
    ? subscription
    : subscription?.id;

  if (!subscriptionId) {
    console.error("[Webhook] No subscription ID found in session.");
    return;
  }
  // Update Prisma with subscription details
  try {
    await prisma.profile.update({
      where: { userId },
      data: {
        stripeSubscriptionId: subscriptionId,
        subscriptionActive: true,
        subscriptionTier: session.metadata?.planType || null,
      },
    });
    console.log(`[Webhook] Subscription activated for user: ${userId}`);
  } catch (error: any) {
    console.error("[Webhook] Prisma Update Error:", error.message);
    throw error; // Re-throw to signal webhook failure
  }
};

// Handler for failed invoice payments
const handleInvoicePaymentFailed = async (invoice: Stripe.Invoice) => {
  // Stripe's subscription property can be a string (ID) or an expanded Subscription object
  const subscription = (invoice as any).subscription;
  const subscriptionId = typeof subscription === 'string'
    ? subscription
    : subscription?.id;

  if (!subscriptionId) {
    console.error("[Webhook] No subscription ID found in invoice.");
    return;
  }

  // Retrieve userId from subscription ID
  let userId: string | undefined;
  try {
    const profile = await prisma.profile.findUnique({
      where: { stripeSubscriptionId: subscriptionId },
      select: { userId: true },
    });

    if (!profile?.userId) {
      console.error("No profile found for this subscription ID.");
      return;
    }

    userId = profile.userId;
  } catch (error: any) {
    console.error("Prisma Query Error:", error.message);
    return;
  }

  // Update Prisma with payment failure
  try {
    await prisma.profile.update({
      where: { userId },
      data: {
        subscriptionActive: false,
      },
    });
    console.log(`[Webhook] Subscription payment failed for user: ${userId}`);
  } catch (error: any) {
    console.error("[Webhook] Prisma Update Error:", error.message);
    throw error;
  }
};

// Handler for subscription deletions (e.g., cancellations)
const handleSubscriptionDeleted = async (subscription: Stripe.Subscription) => {
  const subscriptionId = subscription.id;

  // Retrieve userId from subscription ID
  let userId: string | undefined;
  try {
    const profile = await prisma.profile.findUnique({
      where: { stripeSubscriptionId: subscriptionId },
      select: { userId: true },
    });

    if (!profile?.userId) {
      console.error("[Webhook] No profile found for subscription deletion.");
      return;
    }

    userId = profile.userId;
  } catch (error: any) {
    console.error("[Webhook] Prisma Query Error (subscription deletion):", error.message);
    return;
  }

  // Update Prisma with subscription cancellation
  try {
    await prisma.profile.update({
      where: { userId },
      data: {
        subscriptionActive: false,
        stripeSubscriptionId: null,
      },
    });
    console.log(`[Webhook] Subscription canceled for user: ${userId}`);
  } catch (error: any) {
    console.error("[Webhook] Prisma Update Error:", error.message);
    throw error;
  }
};
