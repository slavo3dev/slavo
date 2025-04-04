// pages/api/products.js
import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

if(!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined")
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: "2025-03-31.basil"})

export default async function handler(req: NextRequest, res: NextResponse) {
  try {
    // Fetch all products from Stripe
    const products = await stripe.products.list();

    // Fetch all prices for the products
    const prices = await stripe.prices.list();

    // Format the products and prices into a more useful structure
    const productsWithPrices = products.data.map((product) => {
      const productPrices = prices.data.filter(
        (price) => price.product === product.id
      );
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        images: product.images,
        prices: productPrices,
      };
    });

    res.status(200).json(productsWithPrices);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
}
