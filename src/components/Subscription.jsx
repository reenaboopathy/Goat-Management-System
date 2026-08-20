import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  Clock3,
  ShieldCheck,
  Sparkles,
  Lock,
  Zap,
  Crown,
  CalendarDays,
  RefreshCcw,
} from "lucide-react";

import {
  SUBSCRIPTION_PRICE,
  createPaidSubscription,
  getPaidDaysRemaining,
  getTrialDaysRemaining,
  isPaidSubscriptionActive,
  isTrialActive,
} from "../utils/subscription.js";

import "./Subscription.css";

export default function Subscription({
  tenant,
  onBack,
  onSubscriptionUpdated,
}) {
  const [processing, setProcessing] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");

  const subscription = tenant?.subscription || null;

  const trialActive = isTrialActive(subscription);

  const paidActive = isPaidSubscriptionActive(subscription);

  const trialDays = getTrialDaysRemaining(subscription);

  const paidDays = getPaidDaysRemaining(subscription);

  const currentStatus = useMemo(() => {
    if (paidActive) return "paid";
    if (trialActive) return "trial";
    return "expired";
  }, [paidActive, trialActive]);

  const statusDetails = {
    trial: {
      label: "FREE TRIAL",
      title: "Your free trial is active",
      days: trialDays,
      icon: Clock3,
      className: "status-trial",
    },

    paid: {
      label: "ACTIVE PLAN",
      title: "Your Farm Access is active",
      days: paidDays,
      icon: ShieldCheck,
      className: "status-paid",
    },

    expired: {
      label: "ACCESS EXPIRED",
      title: "Choose a plan to continue",
      days: 0,
      icon: Lock,
      className: "status-expired",
    },
  };

  const status = statusDetails[currentStatus];

  const StatusIcon = status.icon;

  function handleSubscribe() {
    if (processing) return;

    setProcessing(true);
    setPaymentMessage("");

    /*
      FRONTEND PAYMENT SIMULATION

      Tomorrow you can connect:
      Razorpay / Stripe / backend payment API here.

      Currently clicking the button activates
      a 2-month subscription locally.
    */

    setTimeout(() => {
      const updatedSubscription =
        createPaidSubscription(subscription);

      if (onSubscriptionUpdated) {
        onSubscriptionUpdated(updatedSubscription);
      }

      setPaymentMessage(
        `Payment successful! Your 2-month access is now active.`
      );

      setProcessing(false);
    }, 900);
  }

  return (
    <div className="subscription-page">
      <div className="subscription-container">

        {/* =========================================
            TOP BAR
        ========================================= */}

        <div className="subscription-topbar">

          <button
            className="subscription-back"
            onClick={onBack}
          >
            <ArrowLeft size={17} />
            <span>Back</span>
          </button>

          <div className="secure-label">
            <ShieldCheck size={15} />
            Secure Access
          </div>

        </div>

        {/* =========================================
            HERO
        ========================================= */}

        <section className="subscription-hero">

          <div className="hero-badge">
            <Sparkles size={14} />
            Simple • Affordable • No Auto Renewal
          </div>

          <h1>
            Keep your farm
            <span> running smoothly.</span>
          </h1>

          <p>
            Continue managing goats, weights, medical
            records, events and reports with one simple
            farm access plan.
          </p>

        </section>

        {/* =========================================
            STATUS CARD
        ========================================= */}

        <section className="subscription-status-card">

          <div className={`status-icon ${status.className}`}>
            <StatusIcon size={21} />
          </div>

          <div className="status-content">

            <div className="status-label">
              {status.label}
            </div>

            <div className="status-title">
              {status.title}
            </div>

            {currentStatus !== "expired" && (
              <div className="status-days">
                <CalendarDays size={14} />

                <span>
                  {status.days}{" "}
                  {status.days === 1 ? "day" : "days"} remaining
                </span>
              </div>
            )}

          </div>

          <div className={`status-pill ${status.className}`}>
            {currentStatus === "trial" && "FREE"}

            {currentStatus === "paid" && "ACTIVE"}

            {currentStatus === "expired" && "LOCKED"}
          </div>

        </section>

        {/* =========================================
            MAIN SUBSCRIPTION CARD
        ========================================= */}

        <section className="plan-wrapper">

          <div className="plan-glow" />

          <div className="plan-card">

            {/* PLAN HEADER */}

            <div className="plan-header">

              <div className="plan-header-left">

                <div className="plan-icon">
                  <Crown size={22} />
                </div>

                <div>
                  <div className="plan-small-title">
                    MY GOAT MANAGER
                  </div>

                  <h2>
                    Farm Access
                  </h2>

                  <p>
                    Full access for 2 months
                  </p>
                </div>

              </div>

              <div className="best-value">
                <Zap size={13} />
                Best Value
              </div>

            </div>

            {/* PRICE */}

            <div className="plan-body">

              <div className="price-section">

                <div className="price-row">

                  <span className="currency">
                    ₹
                  </span>

                  <span className="price">
                    {SUBSCRIPTION_PRICE}
                  </span>

                </div>

                <div className="price-period">
                  one-time payment
                </div>

              </div>

              <div className="price-note">
                <Check size={15} />
                Access for 2 full months
              </div>

              {/* FEATURE GRID */}

              <div className="feature-grid">

                {[
                  "Goat Management",
                  "Weight Tracking",
                  "Medical Records",
                  "Events & Breeding",
                  "Reports & Analytics",
                  "Farm Setup",
                  "Sales & Transactions",
                  "Full App Access",
                ].map((feature) => (
                  <div
                    className="feature-item"
                    key={feature}
                  >
                    <span className="feature-check">
                      <Check size={14} />
                    </span>

                    <span>
                      {feature}
                    </span>
                  </div>
                ))}

              </div>

              {/* PAYMENT MESSAGE */}

              {paymentMessage && (
                <div className="payment-success">
                  <Check size={18} />

                  <span>
                    {paymentMessage}
                  </span>
                </div>
              )}

              {/* CTA */}

              <button
                className={`subscribe-button ${
                  processing ? "processing" : ""
                }`}
                onClick={handleSubscribe}
                disabled={processing}
              >

                {processing ? (
                  <>
                    <span className="button-loader" />
                    Processing...
                  </>
                ) : paidActive ? (
                  <>
                    <RefreshCcw size={18} />
                    Renew for ₹{SUBSCRIPTION_PRICE}
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Get Full Access — ₹{SUBSCRIPTION_PRICE}
                  </>
                )}

              </button>

              <div className="payment-security">
                <Lock size={13} />

                <span>
                  Secure payment • No automatic renewal
                </span>
              </div>

            </div>

          </div>
        </section>

        {/* =========================================
            SIMPLE FLOW
        ========================================= */}

        <section className="access-summary">

          <div className="summary-header">

            <div>
              <span className="summary-kicker">
                YOUR ACCESS
              </span>

              <h3>
                Simple pricing. No surprises.
              </h3>
            </div>

          </div>

          <div className="summary-flow">

            <div className="summary-step">

              <div className="step-number">
                01
              </div>

              <div>
                <strong>
                  14 Days Free
                </strong>

                <span>
                  Try the complete app
                </span>
              </div>

            </div>

            <div className="flow-line" />

            <div className="summary-step">

              <div className="step-number">
                02
              </div>

              <div>
                <strong>
                  ₹{SUBSCRIPTION_PRICE}
                </strong>

                <span>
                  One-time payment
                </span>
              </div>

            </div>

            <div className="flow-line" />

            <div className="summary-step">

              <div className="step-number">
                03
              </div>

              <div>
                <strong>
                  2 Months
                </strong>

                <span>
                  Full farm access
                </span>
              </div>

            </div>

          </div>

        </section>

        {/* =========================================
            FOOTER NOTE
        ========================================= */}

        <div className="subscription-footer">

          <ShieldCheck size={15} />

          <span>
            Your access remains active until the
            subscription period ends. Renew only when
            you need it.
          </span>

        </div>

      </div>
    </div>
  );
}