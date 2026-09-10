import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, RADIUS } from '../constants/theme';

export default function Badge({ label, type = 'default', size = 'medium', style }) {
  let bg = COLORS.surfaceSubtle;
  let textColor = COLORS.text;

  const normalized = String(type || label || '').toLowerCase();

  if (normalized === 'active' || normalized === 'done' || normalized === 'completed' || normalized === 'paid' || normalized === 'gain') {
    bg = COLORS.statusActiveBg;
    textColor = COLORS.statusActiveText;
  } else if (normalized === 'sold' || normalized === 'pending' || normalized === 'warning') {
    bg = COLORS.statusSoldBg;
    textColor = COLORS.statusSoldText;
  } else if (normalized === 'dead' || normalized === 'loss' || normalized === 'danger' || normalized === 'sick') {
    bg = COLORS.statusDeadBg;
    textColor = COLORS.statusDeadText;
  } else if (normalized === 'archived' || normalized === 'stable') {
    bg = COLORS.statusArchivedBg;
    textColor = COLORS.statusArchivedText;
  } else if (normalized === 'male') {
    bg = '#E0F2FE';
    textColor = '#0369A1';
  } else if (normalized === 'female') {
    bg = '#FCE7F3';
    textColor = '#BE185D';
  } else if (normalized === 'primary' || normalized === 'info') {
    bg = COLORS.primaryLight;
    textColor = COLORS.primaryDark;
  }

  const isSmall = size === 'small';

  return (
    <View style={[styles.badge, { backgroundColor: bg }, isSmall && styles.badgeSmall, style]}>
      <Text style={[styles.text, { color: textColor }, isSmall && styles.textSmall]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.round,
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeSmall: {
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  text: {
    fontSize: 12,
    ...FONTS.bold,
  },
  textSmall: {
    fontSize: 10.5,
  },
});
