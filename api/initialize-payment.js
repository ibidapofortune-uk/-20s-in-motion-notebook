
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;

  if (!secretKey) {
    return res.status(500).json({
      error: "Payment configuration missing"
    });
  }

  const { email, name, phone, referralCode } = req.body || {};

  if (!email || !name || !phone) {
    return res.status(400).json({
      error: "Please provide your name, email and phone number"
    });
  }

  try {
    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          amount: 300000,
          currency: "NGN",
          callback_url: process.env.APP_URL,
          metadata: {
            customer_name: name,
            customer_phone: phone,
            product: "20s in Motion Notebook",
            order_type: "Pre-order",
            referral_code: referralCode || ""
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok || !data.status) {
      return res.status(400).json({
        error: data.message || "Unable to initialize payment"
      });
    }

    return res.status(200).json({
      authorization_url: data.data.authorization_url,
      reference: data.data.reference
    });

  } catch (error) {
    return res.status(500).json({
      error: "Payment could not be initialized"
    });
  }
}
