const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");

// User Customer SignUp Handler
const FE_DOMAIN = "http://localhost:3000";
const stripePayment = async (req, res) => {
  const price = 100;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // price: price,
        price_data: {
          currency: "usd",
          product_data: {
            name: "purchase plan",
          },
          unit_amount: Math.ceil(price * 100), //stripe divides this number by 100 ------- they treat this number as cents
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${FE_DOMAIN}?success=true`,
    cancel_url: `${FE_DOMAIN}?canceled=true`,
  });
  res.redirect(303, session.url);
};

module.exports = {
  stripePayment,
};
