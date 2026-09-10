import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SPACING } from '../constants/theme';

export default function ErrorMessage({ message, onRetry, style }) {
  if (!message) return null;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.content}>
        <Ionicons name="alert-circle" size={20} color={COLORS.danger} />
        <Text style={styles.message} numberOfLines={3}>
          {message}
        </Text>
      </View>
      {onRetry && (
        <TouchableOpacity onPress={onRetry} style={styles.retryButton} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.dangerLight,
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    marginVertical: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  message: {
    color: '#991B1B',
    fontSize: 12.5,
    ...FONTS.semibold,
    flex: 1,
  },
  retryButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.sm,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  retryText: {
    color: COLORS.danger,
    fontSize: 12,
    ...FONTS.bold,
  },
});
