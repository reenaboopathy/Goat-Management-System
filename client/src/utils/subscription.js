// ============================================================
// SUBSCRIPTION CONFIGURATION
// ============================================================

export const TRIAL_DAYS = 14;

export const SUBSCRIPTION_MONTHS = 2;

export const SUBSCRIPTION_PRICE = 199;

export const SUBSCRIPTION_PLAN = "2 Months";


// ============================================================
// CREATE FREE TRIAL
// Called when a new farm account is created
// or when an existing account logs in for the first time.
// ============================================================

export function createTrialSubscription() {
  const startedAt = new Date();

  const endsAt = new Date(startedAt);

  endsAt.setDate(
    endsAt.getDate() + TRIAL_DAYS
  );

  return {
    status: "trial",

    trialStartedAt:
      startedAt.toISOString(),

    trialEndsAt:
      endsAt.toISOString(),

    subscriptionStartedAt: null,

    subscriptionEndsAt: null,

    plan: null,

    amount: 0,

    paymentStatus: null,

    paymentId: null,
  };
}


// ============================================================
// GET TRIAL DAYS REMAINING
// ============================================================

export function getTrialDaysRemaining(
  subscription
) {
  if (
    !subscription ||
    !subscription.trialEndsAt
  ) {
    return 0;
  }

  const now = new Date();

  const end = new Date(
    subscription.trialEndsAt
  );

  const difference =
    end.getTime() -
    now.getTime();

  if (difference <= 0) {
    return 0;
  }

  return Math.ceil(
    difference /
      (1000 * 60 * 60 * 24)
  );
}


// ============================================================
// CHECK FREE TRIAL ACTIVE
// ============================================================

export function isTrialActive(
  subscription
) {
  if (
    !subscription ||
    !subscription.trialEndsAt
  ) {
    return false;
  }

  const now = new Date();

  const end = new Date(
    subscription.trialEndsAt
  );

  return now < end;
}


// ============================================================
// CHECK FREE TRIAL EXPIRED
// ============================================================

export function isTrialExpired(
  subscription
) {
  if (
    !subscription ||
    !subscription.trialEndsAt
  ) {
    return true;
  }

  const now = new Date();

  const end = new Date(
    subscription.trialEndsAt
  );

  return now >= end;
}


// ============================================================
// TRIAL REMINDER
// Only shows when 1 day remains
// ============================================================

export function shouldShowTrialReminder(
  subscription
) {
  const days =
    getTrialDaysRemaining(
      subscription
    );

  return (
    days === 1 &&
    isTrialActive(subscription)
  );
}


// ============================================================
// CHECK PAID SUBSCRIPTION ACTIVE
// ============================================================

export function hasActiveSubscription(
  subscription
) {
  if (
    !subscription ||
    subscription.status !== "active"
  ) {
    return false;
  }

  if (
    !subscription.subscriptionEndsAt
  ) {
    return false;
  }

  const now = new Date();

  const end = new Date(
    subscription.subscriptionEndsAt
  );

  return now < end;
}


// ============================================================
// SAME CHECK USED BY Subscription.jsx
// ============================================================

export function isPaidSubscriptionActive(
  subscription
) {
  return hasActiveSubscription(
    subscription
  );
}


// ============================================================
// GET PAID SUBSCRIPTION DAYS REMAINING
// ============================================================

export function getSubscriptionDaysRemaining(
  subscription
) {
  if (
    !hasActiveSubscription(
      subscription
    )
  ) {
    return 0;
  }

  const now = new Date();

  const end = new Date(
    subscription.subscriptionEndsAt
  );

  const difference =
    end.getTime() -
    now.getTime();

  if (difference <= 0) {
    return 0;
  }

  return Math.ceil(
    difference /
      (1000 * 60 * 60 * 24)
  );
}


// ============================================================
// EXACT NAME USED BY Subscription.jsx
// ============================================================

export function getPaidDaysRemaining(
  subscription
) {
  return getSubscriptionDaysRemaining(
    subscription
  );
}


// ============================================================
// CHECK FULL APP ACCESS
// ============================================================

export function hasAppAccess(
  subscription
) {
  if (
    isTrialActive(subscription)
  ) {
    return true;
  }

  if (
    isPaidSubscriptionActive(
      subscription
    )
  ) {
    return true;
  }

  return false;
}


// ============================================================
// CREATE PAID SUBSCRIPTION
// 2 MONTH ACCESS
// ============================================================

export function createPaidSubscription(
  subscription = null
) {
  const startedAt =
    new Date();

  const endsAt =
    new Date(startedAt);

  endsAt.setMonth(
    endsAt.getMonth() +
      SUBSCRIPTION_MONTHS
  );

  return {
    status: "active",

    trialStartedAt:
      subscription?.trialStartedAt ||
      null,

    trialEndsAt:
      subscription?.trialEndsAt ||
      null,

    subscriptionStartedAt:
      startedAt.toISOString(),

    subscriptionEndsAt:
      endsAt.toISOString(),

    plan:
      SUBSCRIPTION_PLAN,

    amount:
      SUBSCRIPTION_PRICE,

    paymentStatus:
      "paid",

    paymentId:
      null,
  };
}


// ============================================================
// CHECK PAID SUBSCRIPTION EXPIRED
// ============================================================

export function isSubscriptionExpired(
  subscription
) {
  if (
    !subscription ||
    subscription.status !== "active"
  ) {
    return true;
  }

  if (
    !subscription.subscriptionEndsAt
  ) {
    return true;
  }

  const now = new Date();

  const end = new Date(
    subscription.subscriptionEndsAt
  );

  return now >= end;
}


// ============================================================
// GET CURRENT STATUS
// ============================================================

export function getSubscriptionStatus(
  subscription
) {
  if (
    isTrialActive(subscription)
  ) {
    return "trial";
  }

  if (
    isPaidSubscriptionActive(
      subscription
    )
  ) {
    return "paid";
  }

  return "expired";
}


// ============================================================
// GET COMPLETE SUBSCRIPTION INFO
// ============================================================

export function getSubscriptionInfo(
  subscription
) {
  const status =
    getSubscriptionStatus(
      subscription
    );

  const trialDays =
    getTrialDaysRemaining(
      subscription
    );

  const paidDays =
    getPaidDaysRemaining(
      subscription
    );

  return {
    status,

    trialDaysRemaining:
      trialDays,

    paidDaysRemaining:
      paidDays,

    subscriptionDaysRemaining:
      paidDays,

    price:
      SUBSCRIPTION_PRICE,

    plan:
      SUBSCRIPTION_PLAN,

    durationMonths:
      SUBSCRIPTION_MONTHS,

    trialDuration:
      TRIAL_DAYS,

    hasAccess:
      hasAppAccess(
        subscription
      ),
  };
}