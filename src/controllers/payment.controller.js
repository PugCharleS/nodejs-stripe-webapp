import Stripe from "stripe";
import { STRIPE_PRIVATE_KEY } from "../config.js";

const stripe = new Stripe(STRIPE_PRIVATE_KEY);

export const createSession = async (req, res) => {
  const { productName, productPrice } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            product_data: {
              name: productName,
            },
            currency: "usd",
            unit_amount: productPrice,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "https://pasarela-de-pago-production.up.railway.app/success",
      cancel_url: "https://pasarela-de-pago-production.up.railway.app/cancel",
    });

    console.log(session);
    return res.json({ url: session.url });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
