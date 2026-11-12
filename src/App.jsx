
import React, { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference");

    if (!reference) return;

    window.history.replaceState({}, "", window.location.pathname);

    async function verifyPayment() {
      setLoading(true);
      setPaymentMessage("Verifying your payment...");

      try {
        const response = await fetch(
          `/api/verify-payment?reference=${encodeURIComponent(reference)}`
        );

        const result = await response.json();

        if (response.ok && result.verified) {
          setPaymentMessage(
            "Payment successful! Thank you for pre-ordering your notebook."
          );
        } else {
          setPaymentMessage(
            "We could not confirm this payment. Please contact us with your payment reference: " +
              reference
          );
        }
      } catch {
        setPaymentMessage(
          "Payment verification could not be completed. Please contact us with your reference: " +
            reference
        );
      } finally {
        setLoading(false);
      }
    }
    
  useEffect(() => {
    function handlePageShow() {
      const params = new URLSearchParams(window.location.search);

      if (!params.get("reference")) {
        setLoading(false);
      }
    }

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);
    

    verifyPayment();
  }, []);

  async function handleCheckout(event) {
    event.preventDefault();
    setLoading(true);
    setPaymentMessage("");

    try {
      const response = await fetch("/api/initialize-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          phone
        })
      });

      const result = await response.json();

      if (!response.ok || !result.authorization_url) {
        throw new Error(result.error || "Unable to start payment.");
      }

      window.location.href = result.authorization_url;
    } catch (error) {
      setPaymentMessage(
        error.message || "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  }

  return (
    <main className="site">
      <nav className="navbar">
        <a href="#" className="brand">
          20s<span>in</span>Motion.
        </a>
        <span className="nav-label">THE NOTEBOOK EDITION</span>
      </nav>

      <section className="hero">
        <p className="eyebrow">A NEW CHAPTER BEGINS</p>
        <h1>
          More than a notebook.
          <br />
          <span>A mindset in motion.</span>
        </h1>
        <p className="intro">
          Ideas deserve a place to live. Thoughts deserve to be explored.
          This is your space to think, create and move differently.
        </p>
        <a href="#product" className="cta">
          DISCOVER THE NOTEBOOK ↓
        </a>
      </section>

      <section className="product" id="product">
        <div className="product-heading">
          <p className="eyebrow">THE FIRST EDITION</p>
          <h2>Made for your next idea.</h2>
          <p>A notebook for everything you're becoming.</p>
        </div>

        <div className="covers">
          <div className="cover">
            <span>01 / FRONT COVER</span>
            <img
              src="/IMG-20261109-WA0037.jpg"
              alt="20s in Motion notebook front cover"
            />
          </div>

          <div className="cover">
            <span>02 / BACK COVER</span>
            <img
              src="/IMG-20261109-WA0038.jpg"
              alt="20s in Motion notebook back cover"
            />
          </div>
        </div>

        <div className="purchase">
          <p className="eyebrow">PRE-ORDER NOW</p>
          <h2>₦3,000</h2>
          <p className="old-price">
            Resumption sale price: ₦3,500
          </p>
          <p className="purchase-note">
            Secure your copy with full payment during the pre-order period.
          </p>
          <a href="#checkout" className="cta">
            PRE-ORDER YOUR COPY ↗
          </a>
        </div>
      </section>

      <section className="order" id="checkout">
        <p className="eyebrow">SECURE YOUR COPY</p>
        <h2>Let's get your notebook.</h2>
        <p>Enter your details below to continue to secure Paystack checkout.</p>

        <form onSubmit={handleCheckout} className="checkout-form">
          <label>
            Full name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </label>

          <label>
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>

          <label>
            Phone number
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone number"
              required
            />
          </label>

          <div className="checkout-total">
            <span>Pre-order total</span>
            <strong>₦3,000</strong>
          </div>

          <button type="submit" className="cta" disabled={loading}>
            {loading ? "PLEASE WAIT..." : "PAY ₦3,000 WITH PAYSTACK ↗"}
          </button>

          {paymentMessage && (
            <p role="status" className="payment-message">
              {paymentMessage}
            </p>
          )}
        </form>

        <p className="secure-note">
          Payments are processed securely by Paystack.
        </p>

        <a
          href="https://wa.me/23490772637667"
          className="contact-link"
        >
          Questions? Contact us on WhatsApp ↗
        </a>
      </section>

      <footer>
        <span>20s in Motion.</span>
        <span>MORE THAN MOVEMENT. IT'S A MINDSET.</span>
        <span>© 2026</span>
      </footer>
    </main>
  );
}

export default App;
      
