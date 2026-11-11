
import React from "react";

function App() {
  return (
    <main className="site">
      <nav className="navbar">
        <a href="#" className="brand">20s<span>in</span>Motion.</a>
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
        <a href="#product" className="cta">DISCOVER THE NOTEBOOK ↓</a>
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
          <a href="#order" className="cta">PRE-ORDER YOUR COPY ↗</a>
        </div>
      </section>

      <section className="order" id="order">
        <p className="eyebrow">YOUR NEXT CHAPTER</p>
        <h2>Something worth writing down.</h2>
        <p>
          Pre-orders are open. Get ready to put your ideas into motion.
        </p>
        <a href="https://wa.me/23490772637667" className="cta">
          ENQUIRE ON WHATSAPP ↗
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
