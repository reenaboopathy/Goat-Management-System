import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOWS, SPACING } from '../constants/theme';

export default function StatCard({
  title,
  value,
  subtitle,
  iconName,
  accentColor = COLORS.primary,
  bgColor = COLORS.primaryLight,
  onPress,
  style,
}) {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.75 : 1}
      onPress={onPress}
      style={[styles.container, style]}
      disabled={!onPress}
    >
      <View style={styles.topRow}>
        <View style={[styles.iconBox, { backgroundColor: bgColor }]}>
          <Ionicons name={iconName || 'stats-chart'} size={20} color={accentColor} />
        </View>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit>
        {value}
      </Text>

      {subtitle && (
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.sm,
    justifyContent: 'space-between',
    minHeight: 115,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: COLORS.textMuted,
    fontSize: 12.5,
    ...FONTS.semibold,
    flex: 1,
  },
  value: {
    color: COLORS.primaryDark,
    fontSize: 22,
    ...FONTS.heavy,
    marginTop: 6,
  },
  subtitle: {
    color: COLORS.textFaint,
    fontSize: 11,
    marginTop: 2,
    ...FONTS.medium,
  },
});
