
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  const reference = req.query.reference;

  if (!secretKey || !reference) {
    return res.status(400).json({
      error: "Missing payment reference"
    });
  }

  try {
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${secretKey}`
        }
      }
    );

    const result = await response.json();

    if (!response.ok || !result.status) {
      return res.status(400).json({
        error: "Unable to verify payment"
      });
    }

    const payment = result.data;

    if (
      payment.status !== "success" ||
      payment.amount !== 300000 ||
      payment.currency !== "NGN"
    ) {
      return res.status(400).json({
        error: "Payment not successful or amount incorrect"
      });
    }

    return res.status(200).json({
      verified: true,
      reference: payment.reference,
      amount: payment.amount,
      currency: payment.currency
    });
  } catch (error) {
    return res.status(500).json({
      error: "Payment verification failed"
    });
  }
}
