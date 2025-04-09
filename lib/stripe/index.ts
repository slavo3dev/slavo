import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-03-31.basil"});


export async function getAllProducts() {
  const products = await stripe.products.list({
    expand: ['data.default_price'],
  });

  return products.data.map((product) => {
    const defaultPrice = product.default_price;

    // Type guard: check if it's an object and not null
    if (
      defaultPrice &&
      typeof defaultPrice === 'object' &&
      'unit_amount' in defaultPrice &&
      'currency' in defaultPrice
    ) {
      return {
        id: product.id,
        name: product.name,
        images: product.images,
        price: {
          amount: defaultPrice.unit_amount ?? 0,
          currency: defaultPrice.currency,
        },
      };
    }

    // Fallback if default_price is missing or invalid
    return {
      id: product.id,
      name: product.name,
      images: product.images,
      price: {
        amount: 0,
        currency: 'usd',
      },
    };
  });
}
