import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOWS, SPACING } from '../constants/theme';

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  iconName,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  style,
  textStyle,
  fullWidth = false,
}) {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isOutline = variant === 'outline';
  const isDanger = variant === 'danger';
  const isGhost = variant === 'ghost';

  let containerBg = COLORS.primary;
  let textColor = COLORS.textWhite;
  let borderColor = 'transparent';

  if (isSecondary) {
    containerBg = COLORS.primaryLight;
    textColor = COLORS.primaryDark;
  } else if (isOutline) {
    containerBg = 'transparent';
    textColor = COLORS.primaryDark;
    borderColor = COLORS.border;
  } else if (isDanger) {
    containerBg = COLORS.danger;
    textColor = COLORS.textWhite;
  } else if (isGhost) {
    containerBg = 'transparent';
    textColor = COLORS.textMuted;
  }

  const isSmall = size === 'small';
  const isLarge = size === 'large';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        {
          backgroundColor: containerBg,
          borderColor,
          borderWidth: isOutline ? 1 : 0,
          opacity: disabled ? 0.5 : 1,
        },
        isSmall && styles.buttonSmall,
        isLarge && styles.buttonLarge,
        isPrimary && SHADOWS.sm,
        fullWidth && styles.fullWidth,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={isOutline || isSecondary || isGhost ? COLORS.primary : COLORS.textWhite}
        />
      ) : (
        <View style={styles.contentRow}>
          {iconName && iconPosition === 'left' && (
            <Ionicons
              name={iconName}
              size={isSmall ? 16 : isLarge ? 20 : 18}
              color={textColor}
              style={{ marginRight: 6 }}
            />
          )}
          <Text
            style={[
              styles.text,
              { color: textColor },
              isSmall && styles.textSmall,
              isLarge && styles.textLarge,
              textStyle,
            ]}
          >
            {title}
          </Text>
          {iconName && iconPosition === 'right' && (
            <Ionicons
              name={iconName}
              size={isSmall ? 16 : isLarge ? 20 : 18}
              color={textColor}
              style={{ marginLeft: 6 }}
            />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
  },
  buttonSmall: {
    height: 36,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.sm,
  },
  buttonLarge: {
    height: 54,
    paddingHorizontal: SPACING.xl,
    borderRadius: RADIUS.lg,
  },
  fullWidth: {
    width: '100%',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 14.5,
    ...FONTS.bold,
  },
  textSmall: {
    fontSize: 12.5,
  },
  textLarge: {
    fontSize: 16,
  },
});
