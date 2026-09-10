import React, { useState } from "react";
import "./PaymentPage.css";

const UPI_ID = "yourupi@upi"; // 👈 YOUR ACTUAL UPI ID HERE
const BUSINESS_NAME = "SelSolve";
const AMOUNT = 350;

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);

  const payWithUPI = () => {
    setLoading(true);

    const upiUrl =
      `upi://pay?` +
      `pa=${encodeURIComponent(UPI_ID)}` +
      `&pn=${encodeURIComponent(BUSINESS_NAME)}` +
      `&am=${AMOUNT}` +
      `&cu=INR` +
      `&tn=${encodeURIComponent("SelSolve Subscription Payment")}`;

    // Open installed UPI application
    window.location.href = upiUrl;

    // Reset button after a short delay
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="payment-page">
      <div className="payment-card">

        <div className="payment-icon">
          ₹
        </div>

        <h1>Subscription Payment</h1>

        <p className="payment-description">
          Complete your subscription payment securely using any UPI app.
        </p>

        <div className="amount-box">
          <span>Amount</span>
          <strong>₹{AMOUNT}</strong>
        </div>

        <div className="upi-info">
          <span>UPI ID</span>
          <strong>{UPI_ID}</strong>
        </div>

        <button
          type="button"
          className="upi-pay-button"
          onClick={payWithUPI}
          disabled={loading}
        >
          {loading ? "Opening UPI App..." : `Pay ₹${AMOUNT} via UPI App`}
        </button>

        <p className="upi-note">
          📱 Google Pay, PhonePe, Paytm or other UPI apps
        </p>

        <p className="secure-text">
          🔒 Secure UPI Payment
        </p>

      </div>
    </div>
  );
}