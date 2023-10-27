// const stripe = require("stripe")("sk_test_4eC39HqLyjWDarjtT1zdp7dc");
const stripe = require("stripe")("sk_test_51MTajBDswrOD1TWsZCM84GyUUPlmWR5ZpFWLDvfl4bSRbDwGXR0YzS3Tgiew3wPAfHsovRbcRzpxu6T05xPO0MQv008RiT4Zon")

// User Customer SignUp Handler
const FE_DOMAIN = "http://195.201.246.182:3000";
// const FE_DOMAIN = "http://chenelsuperservice.com";
const stripePayment = async (req, res) => {
  const mode =  req.body.method;
  const price = (mode === 1) ? 799 : ((mode === 2) ? 999 : (mode === 3 ? 1299 : 0));
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
    success_url: `${FE_DOMAIN}/packages/?success=true`,
    cancel_url: `${FE_DOMAIN}/packages?success=false`,
  });
  // res.redirect(303, session.url);
  res.json({url: session.url})
};

module.exports = {
  stripePayment,
};
