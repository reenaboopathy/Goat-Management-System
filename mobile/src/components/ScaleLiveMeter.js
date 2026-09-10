import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOWS, SPACING } from '../constants/theme';
import Button from './Button';

export default function ScaleLiveMeter({
  weight = 0,
  stable = false,
  connected = false,
  onConnect,
  onDisconnect,
  onTare,
  goatName,
}) {
  const displayWeight = Number(weight || 0).toFixed(2);

  return (
    <View style={styles.container}>
      {/* Header Status Bar */}
      <View style={styles.statusBar}>
        <View style={styles.scaleIdentity}>
          <Ionicons name="hardware-chip-outline" size={16} color={COLORS.primaryDark} />
          <Text style={styles.scaleTitle}>ESP32 + HX711 Scale</Text>
        </View>

        <View
          style={[
            styles.connectionPill,
            connected ? styles.pillConnected : styles.pillOffline,
          ]}
        >
          <View
            style={[
              styles.statusDot,
              connected ? styles.dotConnected : styles.dotOffline,
            ]}
          />
          <Text
            style={[
              styles.connectionText,
              connected ? styles.textConnected : styles.textOffline,
            ]}
          >
            {connected ? 'Scale Live' : 'Scale Offline'}
          </Text>
        </View>
      </View>

      {/* Digital LCD Scale Box */}
      <View style={styles.lcdBox}>
        <View style={styles.lcdHeader}>
          <Text style={styles.lcdLabel}>REAL-TIME WEIGHT</Text>
          {stable ? (
            <View style={styles.stabilityRow}>
              <Ionicons name="checkmark-circle" size={14} color="#10B981" />
              <Text style={styles.stabilityTextStable}>Stable</Text>
            </View>
          ) : (
            <View style={styles.stabilityRow}>
              <Ionicons name="sync" size={14} color="#F59E0B" />
              <Text style={styles.stabilityTextMeasuring}>Measuring...</Text>
            </View>
          )}
        </View>

        <View style={styles.lcdDigitsRow}>
          <Text style={styles.digits}>{displayWeight}</Text>
          <Text style={styles.unit}>kg</Text>
        </View>

        <Text style={styles.lcdSubtext}>
          {goatName
            ? `Place ${goatName} on platform`
            : 'Place goat on scale platform'}
        </Text>
      </View>

      {/* Visual Weighing Platform */}
      <View style={styles.platformContainer}>
        <View style={styles.platformSurface}>
          <Text style={styles.goatEmoji}>🐐</Text>
        </View>
        <View style={styles.platformFrame}>
          <View style={styles.loadCellBeam} />
        </View>
        <View style={styles.platformFeet}>
          <View style={styles.foot} />
          <View style={styles.foot} />
        </View>
      </View>

      {/* Scale Action Controls */}
      <View style={styles.controlsRow}>
        <Button
          title="Tare (Zero)"
          onPress={onTare}
          variant="secondary"
          size="small"
          iconName="refresh-outline"
          style={styles.controlBtn}
        />

        {!connected ? (
          <Button
            title="Connect Scale"
            onPress={onConnect}
            variant="outline"
            size="small"
            iconName="wifi-outline"
            style={styles.controlBtn}
          />
        ) : (
          <Button
            title="Disconnect"
            onPress={onDisconnect}
            variant="ghost"
            size="small"
            iconName="close-circle-outline"
            style={styles.controlBtn}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.md,
    marginBottom: SPACING.lg,
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  scaleIdentity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  scaleTitle: {
    fontSize: 13,
    color: COLORS.primaryDark,
    ...FONTS.bold,
  },
  connectionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: RADIUS.round,
    gap: 6,
  },
  pillConnected: {
    backgroundColor: '#DCFCE7',
  },
  pillDemo: {
    backgroundColor: '#FEF3C7',
  },
  pillOffline: {
    backgroundColor: '#F1F5F9',
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  dotConnected: {
    backgroundColor: '#16A34A',
  },
  dotDemo: {
    backgroundColor: '#D97706',
  },
  dotOffline: {
    backgroundColor: '#94A3B8',
  },
  connectionText: {
    fontSize: 11.5,
    ...FONTS.bold,
  },
  textConnected: {
    color: '#166534',
  },
  textDemo: {
    color: '#92400E',
  },
  textOffline: {
    color: '#64748B',
  },
  lcdBox: {
    backgroundColor: '#0F172A',
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.md,
  },
  lcdHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  lcdLabel: {
    color: '#94A3B8',
    fontSize: 10.5,
    ...FONTS.heavy,
    letterSpacing: 1,
  },
  stabilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stabilityTextStable: {
    color: '#34D399',
    fontSize: 11,
    ...FONTS.bold,
  },
  stabilityTextMeasuring: {
    color: '#FBBF24',
    fontSize: 11,
    ...FONTS.bold,
  },
  lcdDigitsRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: SPACING.xs,
  },
  digits: {
    fontFamily: 'monospace',
    fontSize: 52,
    color: '#34D399',
    ...FONTS.heavy,
    letterSpacing: 2,
  },
  unit: {
    fontSize: 20,
    color: '#34D399',
    marginLeft: 8,
    ...FONTS.bold,
  },
  lcdSubtext: {
    color: '#64748B',
    fontSize: 11.5,
    marginTop: 2,
  },
  platformContainer: {
    alignItems: 'center',
    marginVertical: SPACING.md,
  },
  platformSurface: {
    width: 200,
    height: 48,
    backgroundColor: '#E2E8F0',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 2,
    borderColor: '#94A3B8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goatEmoji: {
    fontSize: 26,
  },
  platformFrame: {
    width: 170,
    height: 16,
    backgroundColor: '#64748B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadCellBeam: {
    width: 120,
    height: 3,
    backgroundColor: '#CBD5E1',
  },
  platformFeet: {
    flexDirection: 'row',
    width: 150,
    justifyContent: 'space-between',
  },
  foot: {
    width: 14,
    height: 10,
    backgroundColor: '#334155',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  controlsRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  controlBtn: {
    flexGrow: 1,
  },
});
