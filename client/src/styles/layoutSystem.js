/**
 * UNIFIED LAYOUT & ALIGNMENT SYSTEM
 * Single source of truth for all web pages
 * Ensures consistent spacing, padding, and structure across the entire project
 */

export const LAYOUT = {
  // Container Widths - FULL SCREEN (no max width, touches edges)
  maxWidth: '100%',
  headerMaxWidth: '100%',
  contentMaxWidth: '100%',

  // Padding (applied consistently)
  pagePadding: {
    horizontal: 20,  // Inside padding only
    vertical: 24,    // Top/Bottom padding for content sections
  },

  headerPadding: {
    horizontal: 20,
    vertical: 22,
  },

  // Spacing
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },

  // Card Styling (consistent across all pages)
  card: {
    padding: 20,
    borderRadius: 16,
    border: '1px solid',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },

  // Border Radius (consistent)
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    full: 999,
  },

  // Grid Layouts
  grid: {
    twoCol: 'repeat(2, minmax(0, 1fr))',
    threeCol: 'repeat(3, minmax(0, 1fr))',
    fourCol: 'repeat(4, minmax(0, 1fr))',
    autoFit: 'repeat(auto-fit, minmax(250px, 1fr))',
  },

  // Gap/Gap between elements
  gap: {
    section: 20,  // Between major sections
    card: 16,     // Between cards
    item: 12,     // Between list items
    field: 16,    // Between form fields
  },
};

// Color System (consistent across all pages)
export const COLORS = {
  // Primary
  primary: '#2F6FED',
  primaryDark: '#2355C9',
  primaryLight: '#EEF4FF',

  // Navy / Dark backgrounds
  navy: '#12336B',
  navyDark: '#0B2545',

  // Text colors
  text: '#16233D',
  textMuted: '#5A6B87',
  textFaint: '#8CA0C2',
  textWhite: '#FFFFFF',

  // Borders & backgrounds
  border: '#DCE6F9',
  borderLight: '#E4ECFB',
  bgSoft: '#F8FAFF',
  bgPage: '#F3F7FF',
  bgPage2: '#EAF1FD',

  // Status colors
  success: '#16A34A',
  successBg: '#DCFCE7',
  warning: '#FFC857',
  warningBg: '#FEF3C7',
  danger: '#DC2626',
  dangerDark: '#B91C1C',
  dangerBg: '#FEF2F2',

  // Info
  info: '#0284C7',
  infoBg: '#EEF4FF',
};

// Typography System
export const TYPOGRAPHY = {
  family: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Roboto, Helvetica, Arial, sans-serif",

  // Font sizes (consistent naming)
  size: {
    xs: 11,
    sm: 12,
    base: 13,
    md: 14,
    lg: 15,
    xl: 16,
    xxl: 18,
    xxxl: 20,
    huge: 24,
    massive: 32,
  },

  // Font weights
  weight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    heavy: 900,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Global Styles Generator
export const createGlobalStyles = () => `
  * {
    box-sizing: border-box;
  }

  body, html {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${TYPOGRAPHY.family};
    color: ${COLORS.text};
    background: linear-gradient(180deg, ${COLORS.bgPage} 0%, ${COLORS.bgPage2} 100%);
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  button, input, select, textarea {
    font-family: inherit;
  }

  button {
    cursor: pointer;
  }

  /* Container with consistent max-width */
  .page-container {
    max-width: 100%;
    width: 100%;
    margin: 0;
    padding: ${LAYOUT.pagePadding.vertical}px ${LAYOUT.pagePadding.horizontal}px;
  }

  /* Header with consistent styling */
  .page-header {
    background: linear-gradient(135deg, ${COLORS.navy}, ${COLORS.navyDark});
    color: ${COLORS.textWhite};
    padding: ${LAYOUT.headerPadding.vertical}px ${LAYOUT.headerPadding.horizontal}px;
    width: 100%;
    max-width: 100%;
  }

  .page-header-inner {
    max-width: 100%;
    width: 100%;
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: ${LAYOUT.spacing.md}px;
  }

  /* Card styling (consistent) */
  .card {
    background: ${COLORS.textWhite};
    border: ${LAYOUT.card.border} ${COLORS.borderLight};
    border-radius: ${LAYOUT.radius.lg}px;
    padding: ${LAYOUT.card.padding}px;
    box-shadow: ${LAYOUT.card.boxShadow};
  }

  /* Grid layouts */
  .grid-auto-fit {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: ${LAYOUT.gap.card}px;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: ${LAYOUT.gap.card}px;
  }

  .grid-3 {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: ${LAYOUT.gap.card}px;
  }

  /* Sections */
  .section {
    margin-bottom: ${LAYOUT.gap.section}px;
  }

  .section-title {
    font-size: ${TYPOGRAPHY.size.xl}px;
    font-weight: ${TYPOGRAPHY.weight.bold};
    color: ${COLORS.text};
    margin-bottom: ${LAYOUT.gap.card}px;
  }

  /* Form fields */
  .form-field {
    margin-bottom: ${LAYOUT.gap.field}px;
  }

  .form-label {
    font-size: ${TYPOGRAPHY.size.sm}px;
    font-weight: ${TYPOGRAPHY.weight.bold};
    color: ${COLORS.text};
    margin-bottom: ${LAYOUT.gap.item}px;
    display: block;
  }

  .form-input {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid ${COLORS.border};
    border-radius: ${LAYOUT.radius.md}px;
    font-size: ${TYPOGRAPHY.size.md}px;
    font-family: inherit;
    color: ${COLORS.text};
    background: ${COLORS.textWhite};
  }

  .form-input:focus {
    outline: none;
    border-color: ${COLORS.primary};
    box-shadow: 0 0 0 3px ${COLORS.primaryLight};
  }

  /* Buttons (consistent styling) */
  .btn {
    padding: 12px 20px;
    border-radius: ${LAYOUT.radius.md}px;
    border: none;
    font-weight: ${TYPOGRAPHY.weight.semibold};
    font-size: ${TYPOGRAPHY.size.md}px;
    cursor: pointer;
    transition: all 0.12s ease;
  }

  .btn-primary {
    background: linear-gradient(135deg, #3B7CF7, ${COLORS.primaryDark});
    color: ${COLORS.textWhite};
    box-shadow: 0 4px 12px rgba(47, 111, 237, 0.3);
  }

  .btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(47, 111, 237, 0.4);
  }

  .btn-secondary {
    background: ${COLORS.bgSoft};
    color: ${COLORS.text};
    border: 1px solid ${COLORS.border};
  }

  .btn-secondary:hover {
    background: ${COLORS.borderLight};
  }

  /* Empty states */
  .empty-state {
    min-height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: ${LAYOUT.spacing.xl}px;
    border-radius: ${LAYOUT.radius.lg}px;
    background: ${COLORS.textWhite};
    border: 1px solid ${COLORS.borderLight};
  }

  /* Error messages */
  .error-message {
    padding: ${LAYOUT.spacing.sm}px ${LAYOUT.spacing.md}px;
    border-radius: ${LAYOUT.radius.md}px;
    background: ${COLORS.dangerBg};
    border: 1px solid #FCA5A5;
    color: ${COLORS.dangerDark};
    font-size: ${TYPOGRAPHY.size.sm}px;
    font-weight: ${TYPOGRAPHY.weight.semibold};
  }

  /* Success messages */
  .success-message {
    padding: ${LAYOUT.spacing.sm}px ${LAYOUT.spacing.md}px;
    border-radius: ${LAYOUT.radius.md}px;
    background: ${COLORS.successBg};
    border: 1px solid #86EFAC;
    color: #166534;
    font-size: ${TYPOGRAPHY.size.sm}px;
    font-weight: ${TYPOGRAPHY.weight.semibold};
  }

  /* Responsive breakpoints */
  @media (max-width: 768px) {
    .page-container {
      padding: ${LAYOUT.pagePadding.vertical}px 12px;
    }

    .page-header {
      padding: 16px 12px;
    }

    .grid-2,
    .grid-3 {
      grid-template-columns: 1fr;
    }

    .grid-auto-fit {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    .page-container {
      padding: 16px 10px;
    }

    .page-header {
      padding: 14px 10px;
    }

    .card {
      padding: 16px;
    }

    .btn {
      padding: 10px 16px;
      font-size: ${TYPOGRAPHY.size.sm}px;
    }
  }
`;
