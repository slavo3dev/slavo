import { stripe } from "../stripe";
import type Stripe from "stripe";

export async function getAllProducts() {
  const products = await stripe.products.list({
    active: true,
    expand: ['data.default_price'],
  });


  return products.data.map((product) => {
    const defaultPrice = product.default_price as Stripe.Price;

  const recurring = defaultPrice?.recurring?.interval ?? null;

  console.log("Product:", product.name, "| Recurring:", recurring);

   // Get features from metadata keys like feature1, feature2, etc.
    const featureKeys = Object.keys(product.metadata || {}).filter((key) =>
    key.startsWith("feature")
   );

   const features = featureKeys
    .sort() // ensure they're in order: feature1, feature2, ...
    .map((key) => product.metadata[key]);

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
        priceId: defaultPrice.id,
        price: {
          amount: defaultPrice.unit_amount ?? 0,
          currency: defaultPrice.currency,
          recurring,
        },
        features,
      };
    }

    // Fallback if default_price is missing or invalid
    return {
      id: product.id,
      name: product.name,
      images: product.images,
      priceId: null,
      price: {
        amount: 0,
        currency: 'usd',
        recurring: null
      },
      features, 
    };
  });
}
