import React from "react";
import {
  BarChart3,
  CreditCard,
  Settings,
  Users,
} from "lucide-react";
import { useLocation } from "react-router-dom";

const pageInfo = {
  "/owner/users": {
    title: "Users",
    eyebrow: "USER MANAGEMENT",
    description:
      "User information available through the SelSolve tenant data.",
    icon: Users,
  },

  "/owner/subscriptions": {
    title: "Subscriptions",
    eyebrow: "SUBSCRIPTION MANAGEMENT",
    description:
      "Subscription information will appear here when the corresponding SelSolve backend data source is available.",
    icon: CreditCard,
  },

  "/owner/analytics": {
    title: "Analytics",
    eyebrow: "PLATFORM ANALYTICS",
    description:
      "Analytics will use only actual SelSolve records once the required backend data source is available.",
    icon: BarChart3,
  },

  "/owner/settings": {
    title: "Settings",
    eyebrow: "SYSTEM SETTINGS",
    description:
      "Owner settings will be connected to the actual SelSolve configuration data.",
    icon: Settings,
  },
};

function OwnerPlaceholder() {
  const location = useLocation();

  const info =
    pageInfo[location.pathname] ||
    pageInfo["/owner/settings"];

  const Icon = info.icon;

  return (
    <div className="owner-section-page">
      <div className="section-page-heading">
        <div>
          <div className="dashboard-eyebrow">
            {info.eyebrow}
          </div>

          <h2>{info.title}</h2>

          <p>{info.description}</p>
        </div>
      </div>

      <div className="placeholder-modern">
        <div className="placeholder-modern-icon">
          <Icon size={26} />
        </div>

        <h3>
          No additional data source connected
        </h3>

        <p>
          This section is intentionally showing no
          demo data. Once the original SelSolve
          backend endpoint/model for this section is
          available, only that real data will be
          displayed here.
        </p>
      </div>
    </div>
  );
}

export default OwnerPlaceholder;