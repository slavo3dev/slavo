// pages/api/products.ts
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const products = await stripe.products.list({
      active: true,
      expand: ['data.default_price'],
    });

    console.log(products)

    const simplifiedProducts = products.data.map((product) => {
      const price = product.default_price as Stripe.Price;

      return {
        id: product.id,
        name: product.name,
        priceId: product.default_price,
        price: {
          amount: price?.unit_amount ?? 0,
          currency: price?.currency ?? 'usd',
        }
      }
    })

    res.status(200).json(simplifiedProducts);
  } catch (error: any) {
    console.error("Stripe Error", error)
    res.status(500).json({ message: 'Failed to fetch products', error: error.message });
  }
}
 export default handler;