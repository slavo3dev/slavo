import { stripePromise } from "../stripe/loadStripe";

interface CheckoutParams {
  priceId: string;
  userId: string;
  email: string;
}

export const handleCheckout = async ({ priceId, userId, email }: CheckoutParams) => {
  if (!userId || !email) {
    alert("Please log in to continue.");
    return;
  }

  try {
    const response = await fetch("/api/checkout-sessions/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId, userId, email }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Checkout error:", error);
      alert("Failed to initiate checkout.");
      return;
    }

    const { sessionId } = await response.json();
    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe.js failed to load.");
      return;
    }

    await stripe.redirectToCheckout({ sessionId });
  } catch (err) {
    console.error("Unexpected error during checkout:", err);
    alert("Something went wrong during checkout.");
  }
};
