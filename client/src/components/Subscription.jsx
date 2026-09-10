import React, {
  useMemo,
  useState,
} from "react";

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
  QrCode,
  X,
  Copy,
  Building2,
  CreditCard,
} from "lucide-react";

import {
  getPaidDaysRemaining,
  getTrialDaysRemaining,
  isPaidSubscriptionActive,
  isTrialActive,
} from "../utils/subscription.js";

import {
  createPaymentRequest,
  isSubscriptionError,
} from "../api.js";

import "./Subscription.css";

import qrImage from "./qr.jpeg";


/* =========================================================
   SUBSCRIPTION PLANS
========================================================= */

const PLANS = {
  monthly: {
    id: "monthly",
    name: "Monthly Plan",
    price: 350,
    durationDays: 30,
    durationText: "1 month",
    periodText: "per month",
  },

  yearly: {
    id: "yearly",
    name: "Yearly Plan",
    price: 2500,
    durationDays: 365,
    durationText: "1 year",
    periodText: "per year",
  },
};


/* =========================================================
   OWNER PAYMENT DETAILS
========================================================= */

const OWNER_UPI_ID =
  "gnanavelpandian129-4@okicici";

const BANK_DETAILS = {
  accountNumber: "066702000010430",
  accountName: "M/S NEW SELVAM SCALES",
  accountType: "CAA - GOLD",
  ifscCode: "IOBA0000797",
  status: "Active",
};


/* =========================================================
   COMPONENT
========================================================= */

export default function Subscription({
  tenant,
  onBack,
  onSubscriptionUpdated,
}) {

  const [processing, setProcessing] =
    useState(false);

  const [paymentMessage, setPaymentMessage] =
    useState("");

  const [paymentError, setPaymentError] =
    useState("");

  const [showQr, setShowQr] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  const [selectedPlan, setSelectedPlan] =
    useState("monthly");


  /* =========================================================
     SUBSCRIPTION
  ========================================================= */

  const subscription =
    tenant?.subscription || null;

  const trialActive =
    isTrialActive(subscription);

  const paidActive =
    isPaidSubscriptionActive(subscription);

  const trialDays =
    getTrialDaysRemaining(subscription);

  const paidDays =
    getPaidDaysRemaining(subscription);

  const selectedPlanDetails =
    PLANS[selectedPlan];


  /* =========================================================
     CURRENT STATUS
  ========================================================= */

  const currentStatus = useMemo(() => {

    if (paidActive) {
      return "paid";
    }

    if (trialActive) {
      return "trial";
    }

    return "expired";

  }, [
    paidActive,
    trialActive,
  ]);


  const statusDetails = {

    trial: {
      label: "FREE TRIAL",

      title:
        "Your free trial is active",

      days: trialDays,

      icon: Clock3,

      className:
        "status-trial",
    },

    paid: {
      label: "ACTIVE PLAN",

      title:
        "Your Farm Access is active",

      days: paidDays,

      icon: ShieldCheck,

      className:
        "status-paid",
    },

    expired: {
      label: "ACCESS EXPIRED",

      title:
        "Choose a plan to continue",

      days: 0,

      icon: Lock,

      className:
        "status-expired",
    },

  };


  const status =
    statusDetails[currentStatus];

  const StatusIcon =
    status.icon;


  /* =========================================================
     OPEN QR PAYMENT
  ========================================================= */

  function openQrPayment() {

    setPaymentMessage("");

    setPaymentError("");

    setCopied(false);

    setShowQr(true);
  }


  /* =========================================================
     BUILD UPI URL
  ========================================================= */

  function getUpiUrl() {

    const amount =
      selectedPlanDetails.price;

    const transactionNote =
      `SelSolve ${selectedPlanDetails.name}`;

    return (
      `upi://pay?` +
      `pa=${encodeURIComponent(
        OWNER_UPI_ID
      )}` +
      `&pn=${encodeURIComponent(
        BANK_DETAILS.accountName
      )}` +
      `&am=${encodeURIComponent(
        amount
      )}` +
      `&cu=INR` +
      `&tn=${encodeURIComponent(
        transactionNote
      )}`
    );
  }


  /* =========================================================
     OPEN UPI APP
     
     IMPORTANT:
     Works when the device/browser has a
     registered UPI handler.

     On desktop, it may not work.
     QR remains the fallback.
  ========================================================= */

  function openUpiPayment() {

    setPaymentMessage("");

    setPaymentError("");

    const upiUrl =
      getUpiUrl();

    console.log(
      "Opening UPI:",
      upiUrl
    );


    /*
      Try to open the UPI application.

      Mobile:
      Google Pay / PhonePe / Paytm / BHIM
      may handle this URL.

      Desktop:
      Browser may show:
      "scheme does not have a registered handler"
    */

    try {

      window.location.assign(
        upiUrl
      );


      /*
        If the device does not have a
        UPI handler, show fallback message.
      */

      setTimeout(() => {

        setPaymentError(
          "UPI app could not be opened on this device. Please scan the QR code using Google Pay, PhonePe, Paytm or another UPI app."
        );

      }, 1200);

    } catch (error) {

      console.error(
        "UPI app opening failed:",
        error
      );

      setPaymentError(
        "Unable to open UPI app. Please use the QR code or copy the UPI ID."
      );

    }
  }


  /* =========================================================
     CLOSE QR
  ========================================================= */

  function closeQrPayment() {

    if (processing) {
      return;
    }

    setShowQr(false);

    setPaymentError("");
  }


  /* =========================================================
     COPY UPI ID
  ========================================================= */

  async function copyUpiId() {

    try {

      await navigator.clipboard.writeText(
        OWNER_UPI_ID
      );

      setCopied(true);

      setPaymentError("");

      setTimeout(() => {

        setCopied(false);

      }, 1800);

    } catch (error) {

      console.error(
        "Unable to copy UPI ID:",
        error
      );

      setPaymentError(
        "Unable to copy UPI ID. Please copy it manually."
      );

    }
  }


  /* =========================================================
     PAYMENT REQUEST
     
     IMPORTANT:
     Creates PENDING request only.

     It DOES NOT activate subscription.

     Owner must approve payment.
  ========================================================= */

  async function handlePaymentCompleted() {

    if (processing) {
      return;
    }


    setProcessing(true);

    setPaymentMessage("");

    setPaymentError("");


    try {

      const data =
        await createPaymentRequest({

          plan:
            selectedPlan,

          amount:
            selectedPlanDetails.price,

          paymentMethod:
            "UPI",

          paymentReceiver:
            OWNER_UPI_ID,

        });


      console.log(
        "PAYMENT REQUEST CREATED:",
        data
      );


      setShowQr(false);


      setPaymentMessage(
        "Payment request submitted successfully. Your subscription will be activated after owner verification."
      );


      /*
        IMPORTANT:

        Do NOT activate automatically.

        Only update parent when backend
        actually returns a subscription.
      */

      if (
        onSubscriptionUpdated &&
        data?.subscription
      ) {

        onSubscriptionUpdated(
          data.subscription
        );

      }

    } catch (error) {

      console.error(
        "Payment request error:",
        error
      );


      /* =====================================================
         DUPLICATE PAYMENT REQUEST
      ===================================================== */

      if (
        error?.status === 409
      ) {

        setPaymentError(
          "You already have a pending payment request. Please wait for the owner to verify it."
        );

        setShowQr(false);

        return;
      }


      /* =====================================================
         SUBSCRIPTION ERROR
      ===================================================== */

      if (
        isSubscriptionError(
          error
        )
      ) {

        setPaymentError(
          error?.message ||
          "Subscription access needs to be renewed."
        );

        return;
      }


      /* =====================================================
         AUTH ERROR
      ===================================================== */

      if (
        error?.status === 401
      ) {

        setPaymentError(
          "Your session has expired. Please log in again."
        );

        return;
      }


      /* =====================================================
         NETWORK ERROR
      ===================================================== */

      if (
        error?.status === 0 ||
        error?.code === "NETWORK_ERROR"
      ) {

        setPaymentError(
          "Unable to connect to the backend server. Please check whether the server is running."
        );

        return;
      }


      /* =====================================================
         OTHER ERROR
      ===================================================== */

      setPaymentError(
        error?.message ||
        "Something went wrong while submitting your payment."
      );

    } finally {

      setProcessing(false);

    }
  }


  /* =========================================================
     UI
  ========================================================= */

  return (

    <div className="subscription-page">

      <div className="subscription-container">


        {/* =====================================================
            TOP BAR
        ===================================================== */}

        <div className="subscription-topbar">

          <button
            className="subscription-back"
            onClick={onBack}
            type="button"
          >

            <ArrowLeft size={17} />

            <span>
              Back
            </span>

          </button>


          <div className="secure-label">

            <ShieldCheck size={15} />

            Secure Access

          </div>

        </div>


        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="subscription-hero">

          <div className="hero-badge">

            <Sparkles size={14} />

            Simple • Affordable • No Auto Renewal

          </div>


          <h1>

            Keep your farm

            <span>
              {" "}running smoothly.
            </span>

          </h1>


          <p>

            Continue managing goats, weights, medical
            records, events and reports with one simple
            farm access plan.

          </p>

        </section>


        {/* =====================================================
            STATUS CARD
        ===================================================== */}

        <section className="subscription-status-card">

          <div
            className={`status-icon ${status.className}`}
          >

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

                  {status.days}

                  {" "}

                  {status.days === 1
                    ? "day"
                    : "days"}

                  {" "}remaining

                </span>

              </div>

            )}

          </div>


          <div
            className={`status-pill ${status.className}`}
          >

            {currentStatus === "trial" &&
              "FREE"}

            {currentStatus === "paid" &&
              "ACTIVE"}

            {currentStatus === "expired" &&
              "LOCKED"}

          </div>

        </section>


        {/* =====================================================
            PLAN CARD
        ===================================================== */}

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

                    Choose the plan that works for you

                  </p>

                </div>

              </div>


              <div className="best-value">

                <Zap size={13} />

                Best Value

              </div>

            </div>


            {/* =================================================
                PLAN SELECTOR
            ================================================= */}

            <div className="plan-selector">


              {/* MONTHLY */}

              <button
                type="button"
                className={`plan-option ${
                  selectedPlan === "monthly"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setSelectedPlan(
                    "monthly"
                  )
                }
              >

                <div className="plan-option-radio">

                  {selectedPlan ===
                    "monthly" && (
                    <span />
                  )}

                </div>


                <div className="plan-option-content">

                  <strong>

                    Monthly

                  </strong>

                  <span>

                    ₹350 / month

                  </span>

                </div>

              </button>


              {/* YEARLY */}

              <button
                type="button"
                className={`plan-option ${
                  selectedPlan === "yearly"
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setSelectedPlan(
                    "yearly"
                  )
                }
              >

                <div className="plan-option-radio">

                  {selectedPlan ===
                    "yearly" && (
                    <span />
                  )}

                </div>


                <div className="plan-option-content">

                  <strong>

                    Yearly

                  </strong>

                  <span>

                    ₹2,500 / year

                  </span>

                </div>


                <small>

                  Save ₹1,700

                </small>

              </button>

            </div>


            {/* =================================================
                PRICE
            ================================================= */}

            <div className="plan-body">

              <div className="price-section">

                <div className="price-row">

                  <span className="currency">

                    ₹

                  </span>

                  <span className="price">

                    {
                      selectedPlanDetails.price
                    }

                  </span>

                </div>


                <div className="price-period">

                  {
                    selectedPlanDetails.periodText
                  }

                </div>

              </div>


              <div className="price-note">

                <Check size={15} />

                <span>

                  Full farm access for{" "}

                  {
                    selectedPlanDetails.durationText
                  }

                </span>

              </div>


              {/* =================================================
                  FEATURES
              ================================================= */}

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
                ].map(
                  (feature) => (

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

                  )
                )}

              </div>


              {/* =================================================
                  SUCCESS MESSAGE
              ================================================= */}

              {paymentMessage && (

                <div className="payment-success">

                  <Check size={18} />

                  <span>

                    {paymentMessage}

                  </span>

                </div>

              )}


              {/* =================================================
                  ERROR MESSAGE
              ================================================= */}

              {paymentError && !showQr && (

                <div className="payment-error">

                  <X size={18} />

                  <span>

                    {paymentError}

                  </span>

                </div>

              )}


              {/* =================================================
                  MAIN PAYMENT BUTTON
              ================================================= */}

              <button
                className={`subscribe-button ${
                  processing
                    ? "processing"
                    : ""
                }`}
                onClick={openQrPayment}
                disabled={processing}
                type="button"
              >

                {paidActive ? (

                  <>

                    <RefreshCcw size={18} />

                    Renew for ₹
                    {
                      selectedPlanDetails.price
                    }

                  </>

                ) : (

                  <>

                    <CreditCard size={18} />

                    Pay ₹
                    {
                      selectedPlanDetails.price
                    }

                    {" "}via UPI

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


        {/* =====================================================
            ACCESS SUMMARY
        ===================================================== */}

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

                  Choose Plan

                </strong>

                <span>

                  ₹350 monthly / ₹2,500 yearly

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

                  Full Access

                </strong>

                <span>

                  After payment verification

                </span>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            FOOTER
        ===================================================== */}

        <div className="subscription-footer">

          <ShieldCheck size={15} />

          <span>

            Your subscription is activated only after
            payment verification.

          </span>

        </div>

      </div>


      {/* =======================================================
          QR PAYMENT MODAL
      ======================================================= */}

      {showQr && (

        <div
          className="qr-overlay"
          onClick={closeQrPayment}
        >

          <div
            className="qr-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >


            {/* MODAL HEADER */}

            <div className="qr-modal-header">

              <div>

                <div className="qr-kicker">

                  SECURE PAYMENT

                </div>

                <h2>

                  Scan & Pay

                </h2>

                <p>

                  {
                    selectedPlanDetails.name
                  }

                </p>

              </div>


              <button
                className="qr-close"
                onClick={closeQrPayment}
                disabled={processing}
                type="button"
              >

                <X size={19} />

              </button>

            </div>


            {/* =================================================
                MOBILE UPI PAYMENT
            ================================================= */}

            <button
              type="button"
              onClick={openUpiPayment}
              disabled={processing}
              className="upi-app-button"
            >

              <CreditCard size={18} />

              Pay ₹
              {selectedPlanDetails.price}
              {" "}via UPI App

            </button>


            <div className="upi-app-help">

              This works on mobile devices with a
              UPI app installed. On laptop, please use
              the QR code below.

            </div>


            {/* =================================================
                UPI ERROR / FALLBACK
            ================================================= */}

            {paymentError && showQr && (

              <div className="payment-error qr-upi-error">

                <X size={18} />

                <span>

                  {paymentError}

                </span>

              </div>

            )}


            <div
              style={{
                textAlign: "center",
                marginBottom: "12px",
                fontSize: "12px",
                fontWeight: 700,
                color: "#64748b",
                letterSpacing: "0.04em",
              }}
            >

              OR SCAN QR CODE

            </div>


            {/* =================================================
                QR
            ================================================= */}

            <div className="qr-payment-area">

              <div className="qr-box">

                <img
                  src={qrImage}
                  alt="UPI Payment QR"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    display: "block",
                  }}
                />

              </div>


              <div className="qr-scan-text">

                <QrCode size={17} />

                <span>

                  Scan this QR using Google Pay,
                  PhonePe, Paytm or BHIM.

                </span>

              </div>

            </div>


            {/* =================================================
                AMOUNT
            ================================================= */}

            <div className="qr-amount-card">

              <div>

                <span>

                  Selected plan

                </span>

                <strong>

                  {
                    selectedPlanDetails.name
                  }

                </strong>

              </div>


              <strong>

                ₹
                {
                  selectedPlanDetails.price
                }

              </strong>

            </div>


            {/* =================================================
                UPI ID
            ================================================= */}

            <div className="upi-id-box">

              <div>

                <span>

                  UPI ID

                </span>

                <strong>

                  {OWNER_UPI_ID}

                </strong>

              </div>


              <button
                onClick={copyUpiId}
                type="button"
              >

                {copied ? (
                  <Check size={17} />
                ) : (
                  <Copy size={17} />
                )}


                <span>

                  {
                    copied
                      ? "Copied"
                      : "Copy"
                  }

                </span>

              </button>

            </div>


            {/* =================================================
                BANK DETAILS
            ================================================= */}

            <div className="bank-details-box">

              <div className="bank-details-header">

                <div>

                  <div className="qr-kicker">

                    BANK TRANSFER

                  </div>

                  <h3>

                    Account Details

                  </h3>

                </div>

                <Building2 size={19} />

              </div>


              <div className="bank-details-list">


                <div className="bank-detail-row">

                  <span>

                    Account Number

                  </span>

                  <strong>

                    {
                      BANK_DETAILS.accountNumber
                    }

                  </strong>

                </div>


                <div className="bank-detail-row">

                  <span>

                    Account Name

                  </span>

                  <strong>

                    {
                      BANK_DETAILS.accountName
                    }

                  </strong>

                </div>


                <div className="bank-detail-row">

                  <span>

                    IFSC Code

                  </span>

                  <strong>

                    {
                      BANK_DETAILS.ifscCode
                    }

                  </strong>

                </div>


                <div className="bank-detail-row">

                  <span>

                    Account Type

                  </span>

                  <strong>

                    {
                      BANK_DETAILS.accountType
                    }

                  </strong>

                </div>


                <div className="bank-detail-row">

                  <span>

                    Status

                  </span>

                  <strong>

                    {
                      BANK_DETAILS.status
                    }

                  </strong>

                </div>

              </div>

            </div>


            {/* =================================================
                ALTERNATIVE PAYMENT
            ================================================= */}

            <div className="payment-alternative">

              <CreditCard size={16} />

              <div>

                <span>

                  Can't scan the QR?

                </span>

                <strong>

                  Transfer ₹
                  {
                    selectedPlanDetails.price
                  }

                  {" "}using the bank details above.

                </strong>

              </div>

            </div>


            {/* =================================================
                PAYMENT STEPS
            ================================================= */}

            <div className="qr-steps">


              <div className="qr-step">

                <span>

                  1

                </span>

                <div>

                  <strong>

                    Make payment

                  </strong>

                  <small>

                    Pay exactly ₹
                    {
                      selectedPlanDetails.price
                    }

                  </small>

                </div>

              </div>


              <div className="qr-step">

                <span>

                  2

                </span>

                <div>

                  <strong>

                    Complete payment

                  </strong>

                  <small>

                    Use UPI or bank transfer

                  </small>

                </div>

              </div>


              <div className="qr-step">

                <span>

                  3

                </span>

                <div>

                  <strong>

                    Submit confirmation

                  </strong>

                  <small>

                    Owner will verify the payment

                  </small>

                </div>

              </div>

            </div>


            {/* =================================================
                CONFIRM BUTTON
            ================================================= */}

            <button
              className="qr-confirm-button"
              onClick={
                handlePaymentCompleted
              }
              disabled={processing}
              type="button"
            >

              {processing ? (

                <>

                  <span className="button-loader" />

                  Submitting...

                </>

              ) : (

                <>

                  <Check size={18} />

                  I've Completed the Payment

                </>

              )}

            </button>


            <div className="qr-security">

              <ShieldCheck size={14} />

              <span>

                Your subscription will not activate
                automatically. Payment must be verified
                by the owner.

              </span>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}