import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { currentUser } from "@clerk/nextjs/server";

export async function POST() {
  try {
    const clerkUser = await currentUser();
    if (!clerkUser?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch the user's current subscription record via Prisma
    const profile = await prisma.profile.findUnique({
      where: { userId: clerkUser.id },
    });

    if (!profile?.stripeSubscriptionId) {
      return NextResponse.json(
        { error: "No active subscription found." },
        { status: 400 }
      );
    }

    const subscriptionId = profile.stripeSubscriptionId;

    // Cancel the subscription in Stripe (at end of billing period)
    const canceledSubscription = await stripe.subscriptions.update(
      subscriptionId,
      {
        cancel_at_period_end: true,
      }
    );

    // Note: Keep subscriptionActive: true until webhook confirms cancellation
    // The subscription remains active until the end of the billing period
    // The webhook will handle setting subscriptionActive to false when it actually ends

    return NextResponse.json({ subscription: canceledSubscription });
  } catch (error: any) {
    console.error("[API] Error unsubscribing:", error);
    return NextResponse.json(
      { error: error.message || "Failed to unsubscribe." },
      { status: 500 }
    );
  }
}
