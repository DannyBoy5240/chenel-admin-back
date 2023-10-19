const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", // Change to 'live' for production
  client_id:
    "AYZ0iTkalNOyG1jUdTUVkyRY9N9_a80kYgF0kVWKAa4-ZopgGvM9J149DA5s929h-fvSnh2QycobFfWN",
  client_secret:
    "EH4uetPaSYA6C9-hPtDWkuaWs0hZGUORHEMPSm1mK80rZHq63__YpkLwYc69-YAccq_3Dsv_Z8gSN_Ck",
});

const FE_DOMAIN = "http://195.201.246.182:3000";
const paypalPayment = async (req, res) => {
  const method = req.body.method;
  if (method !== 1 && method !== 2 && method !== 3) {
    res.json({ error: "Invalid payment method" });
    return;
  }

  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `${FE_DOMAIN}/packages/?success=true`,
      cancel_url: `${FE_DOMAIN}/packages/?success=false`,
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: `${
                method === 1
                  ? "Serenity Shore Asylum"
                  : method === 2
                  ? "Tranquil Refuge Asylum"
                  : "Safe Haven Asylum"
              }`,
              sku: `${
                method === 1
                  ? "sku_serenity_shore"
                  : method === 2
                  ? "sku_tranquil_refuge"
                  : "sku_safe_haven"
              }`,
              price: `${
                method === 1 ? "999.99" : method === 2 ? "1499.99" : "1299.99"
              }`,
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: `${
            method === 1 ? "999.99" : method === 2 ? "1499.99" : "1299.99"
          }`,
        },
        description: "Item Description",
      },
    ],
    // payee: {
    //   email: 'chenelus@gmail.com', // Set the recipient's email address here
    // },
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          // res.redirect(payment.links[i].href);
          res.json({ url: payment.links[i].href });
        }
      }
    }
  });
};

const paypalPaymentSuccess = async (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        throw error;
      } else {
        res.send("Payment successful!");
      }
    }
  );
};

const paypalPaymentCancel = async (req, res) => {
  res.send("Payment canceled.");
};

module.exports = {
  paypalPayment,
  paypalPaymentSuccess,
  paypalPaymentCancel,
};
