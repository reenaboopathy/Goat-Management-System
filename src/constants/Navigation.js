import {
  LayoutGrid,
  Tag,
  Scale,
  Heart,
  Syringe,
  Stethoscope,
  ShoppingCart,
  BarChart3,
  Activity,
  Droplet,
  Calendar,
  DollarSign,
  Wrench,
} from "lucide-react";

// =====================================================
// SIDEBAR
// =====================================================

export const NAV_ITEMS = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: LayoutGrid,
  },

  {
    key: "goats",
    label: "Goats",
    icon: Tag,
  },

  {
    key: "weightlog",
    label: "Weight Log",
    icon: Scale,
  },

  {
    key: "breeding",
    label: "Breeding",
    icon: Heart,
  },

  {
    key: "vaccinations",
    label: "Vaccinations",
    icon: Syringe,
  },

  // 🩺 MEDICAL
  {
    key: "medical",
    label: "Medical",
    icon: Stethoscope,
  },

  {
    key: "sales",
    label: "Sales / Purchase",
    icon: ShoppingCart,
  },

  {
    key: "reports",
    label: "Reports",
    icon: BarChart3,
  },

  {
    key: "farmsetup",
    label: "Farm Setup",
    icon: Wrench,
  },
];

// =====================================================
// DASHBOARD CARDS
// =====================================================

export const DASHBOARD_CARDS = [
  {
    key: "goats",
    label: "Goats",
    icon: Activity,
    accent: "#E0F2FE",
  },

  {
    key: "milk",
    label: "Milk Records",
    icon: Droplet,
    accent: "#FEF3C7",
  },

  {
    key: "events",
    label: "Events",
    icon: Calendar,
    accent: "#E9D5FF",
  },

  {
    key: "sales",
    label: "Transactions",
    icon: DollarSign,
    accent: "#FEF9C3",
  },

  // 🩺 MEDICAL
  {
    key: "medical",
    label: "Medical",
    icon: Stethoscope,
    accent: "#FCE7F3",
  },

  {
    key: "farmsetup",
    label: "Farm Setup",
    icon: Wrench,
    accent: "#DCFCE7",
  },

  {
    key: "reports",
    label: "Reports",
    icon: BarChart3,
    accent: "#F3E8FF",
  },
];