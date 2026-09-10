import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOWS, SPACING } from '../../constants/theme';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import Input from '../../components/Input';
import ScaleLiveMeter from '../../components/ScaleLiveMeter';
import FilterModal from '../../components/FilterModal';
import ErrorMessage from '../../components/ErrorMessage';
import LoadingSpinner from '../../components/LoadingSpinner';
import { goatsApi, weightsApi } from '../../api';
import { useScale } from '../../context/ScaleContext';
import { formatWeight, calculateAge } from '../../utils/formatters';

export default function WeightRecordingScreen({ route, navigation }) {
  const initialGoatId = route.params?.initialGoatId || null;

  const [goats, setGoats] = useState([]);
  const [selectedGoatId, setSelectedGoatId] = useState(initialGoatId);
  const [goatPickerVisible, setGoatPickerVisible] = useState(false);
  const [manualWeightInput, setManualWeightInput] = useState('');
  const [useManualMode, setUseManualMode] = useState(false);
  const [notes, setNotes] = useState('');

  const [loadingGoats, setLoadingGoats] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [error, setError] = useState('');

  const {
    connected,
    liveWeight,
    isStable,
    tareOffset,
    connectScale,
    disconnectScale,
    tareScale,
  } = useScale();

  const fetchGoats = useCallback(async () => {
    try {
      const list = await goatsApi.getAll({ status: 'Active' });
      if (Array.isArray(list)) {
        setGoats(list);
        if (!selectedGoatId && list.length > 0) {
          setSelectedGoatId(list[0]._id);
        }
      }
    } catch (err) {
      console.warn('Goats fetch for scale error:', err);
    } finally {
      setLoadingGoats(false);
    }
  }, [selectedGoatId]);

  useEffect(() => {
    fetchGoats();
  }, [fetchGoats]);

  useEffect(() => {
    if (initialGoatId) {
      setSelectedGoatId(initialGoatId);
    }
  }, [initialGoatId]);

  const selectedGoat = goats.find((g) => g._id === selectedGoatId) || null;

  // Compute active weight (either from live scale or manual input)
  const currentMeasuredWeight = useManualMode
    ? Number(manualWeightInput) || 0
    : Number(liveWeight) || 0;

  const previousWeight = Number(selectedGoat?.currentWeight) || 0;
  const difference = currentMeasuredWeight > 0 ? Number((currentMeasuredWeight - previousWeight).toFixed(2)) : 0;
  const gainLoss = difference > 0 ? 'Gain' : difference < 0 ? 'Loss' : 'Stable';

  const handleSaveWeight = async () => {
    setError('');
    setSavedSuccess(false);

    if (!selectedGoatId) {
      setError('Please select a goat to weigh.');
      return;
    }

    if (!currentMeasuredWeight || currentMeasuredWeight <= 0) {
      setError('Please ensure a valid positive weight measurement before saving.');
      return;
    }

    setSaving(true);
    try {
      const payload = {
        goatId: selectedGoatId,
        weight: currentMeasuredWeight,
        notes: notes.trim(),
        source: useManualMode ? 'Manual' : 'ESP32_Scale',
      };

      const res = await weightsApi.record(payload);

      setSavedSuccess(true);
      // Refresh local goat's weight
      if (selectedGoat) {
        selectedGoat.currentWeight = currentMeasuredWeight;
      }

      Alert.alert(
        'Weight Recorded',
        `Successfully logged ${currentMeasuredWeight.toFixed(2)} kg for ${selectedGoat.name} (${gainLoss === 'Gain' ? '+' : ''}${difference} kg ${gainLoss}).`,
        [
          {
            text: 'View History',
            onPress: () => navigation.navigate('WeightHistory'),
          },
          { text: 'OK' },
        ]
      );
    } catch (err) {
      setError(err.message || 'Failed to save weight record');
    } finally {
      setSaving(false);
    }
  };

  const goatOptions = goats.map((g) => ({
    value: g._id,
    label: `${g.name} (#${g.tagNumber}) · ${g.breed} · ${formatWeight(g.currentWeight)}`,
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Weighing Scale"
        subtitle="Live ESP32 weight measurement & log"
        onBack={() => navigation.goBack()}
        rightActions={
          <TouchableOpacity
            onPress={() => navigation.navigate('WeightHistory')}
            style={styles.historyBtn}
          >
            <Ionicons name="time-outline" size={18} color={COLORS.textWhite} />
            <Text style={styles.historyBtnText}>History</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {error ? <ErrorMessage message={error} /> : null}

        {/* Selected Goat Selector Card */}
        <Card style={styles.goatSelectorCard}>
          <Text style={styles.cardHeader}>Target Goat</Text>

          {loadingGoats ? (
            <LoadingSpinner message="Loading goats..." />
          ) : selectedGoat ? (
            <TouchableOpacity
              onPress={() => setGoatPickerVisible(true)}
              style={styles.selectedGoatRow}
            >
              <View style={styles.goatAvatarBox}>
                <Text style={styles.goatAvatarEmoji}>🐐</Text>
              </View>

              <View style={styles.goatDetailsCol}>
                <Text style={styles.selectedGoatName}>{selectedGoat.name}</Text>
                <Text style={styles.selectedGoatMeta}>
                  Tag #{selectedGoat.tagNumber} · {selectedGoat.breed} · {selectedGoat.stage}
                </Text>
              </View>

              <View style={styles.changeGoatPill}>
                <Text style={styles.changeGoatText}>Change</Text>
                <Ionicons name="chevron-down" size={14} color={COLORS.primary} />
              </View>
            </TouchableOpacity>
          ) : (
            <Button
              title="Select a Goat"
              onPress={() => setGoatPickerVisible(true)}
              variant="outline"
            />
          )}

          {/* Previous vs New Weight Comparison Bar */}
          {selectedGoat && (
            <View style={styles.comparisonBar}>
              <View style={styles.compCol}>
                <Text style={styles.compLabel}>PREVIOUS WEIGHT</Text>
                <Text style={styles.compValue}>{formatWeight(previousWeight)}</Text>
              </View>

              <View style={styles.compDivider} />

              <View style={styles.compCol}>
                <Text style={styles.compLabel}>NEW MEASURED</Text>
                <Text style={[styles.compValue, { color: COLORS.primaryDark }]}>
                  {formatWeight(currentMeasuredWeight)}
                </Text>
              </View>

              <View style={styles.compDivider} />

              <View style={styles.compCol}>
                <Text style={styles.compLabel}>GAIN / LOSS</Text>
                {currentMeasuredWeight > 0 ? (
                  <Badge
                    label={
                      gainLoss === 'Gain'
                        ? `+${difference} kg`
                        : gainLoss === 'Loss'
                        ? `${difference} kg`
                        : '0.00 kg'
                    }
                    type={gainLoss}
                    size="small"
                  />
                ) : (
                  <Text style={styles.compPending}>Pending</Text>
                )}
              </View>
            </View>
          )}
        </Card>

        {/* Toggle Mode: Live Scale vs Manual Entry */}
        <View style={styles.modeToggleRow}>
          <TouchableOpacity
            style={[styles.modeTab, !useManualMode && styles.modeTabActive]}
            onPress={() => setUseManualMode(false)}
          >
            <Ionicons
              name="hardware-chip-outline"
              size={16}
              color={!useManualMode ? COLORS.primaryDark : COLORS.textMuted}
            />
            <Text style={[styles.modeTabText, !useManualMode && styles.modeTabTextActive]}>
              Live ESP32 Scale
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modeTab, useManualMode && styles.modeTabActive]}
            onPress={() => setUseManualMode(true)}
          >
            <Ionicons
              name="create-outline"
              size={16}
              color={useManualMode ? COLORS.primaryDark : COLORS.textMuted}
            />
            <Text style={[styles.modeTabText, useManualMode && styles.modeTabTextActive]}>
              Manual Weight Entry
            </Text>
          </TouchableOpacity>
        </View>

        {/* Live Scale Meter */}
        {!useManualMode ? (
          <ScaleLiveMeter
            weight={liveWeight}
            stable={isStable}
            connected={connected}
            onConnect={connectScale}
            onDisconnect={disconnectScale}
            onTare={tareScale}
            goatName={selectedGoat?.name}
          />
        ) : (
          <Card>
            <Text style={styles.cardHeader}>Manual Weight Input</Text>
            <Input
              label="Enter Measured Weight (kg) *"
              placeholder="e.g. 28.5"
              value={manualWeightInput}
              onChangeText={setManualWeightInput}
              keyboardType="numeric"
              suffix="kg"
              iconName="scale-outline"
            />
          </Card>
        )}

        {/* Notes & Save Section */}
        <Card>
          <Input
            label="Weight Check Notes (Optional)"
            placeholder="e.g. Post-milking, before feeding, healthy growth"
            value={notes}
            onChangeText={setNotes}
            iconName="document-text-outline"
          />

          <Button
            title={`Save ${currentMeasuredWeight > 0 ? currentMeasuredWeight.toFixed(2) + ' kg' : ''} Record`}
            onPress={handleSaveWeight}
            loading={saving}
            disabled={!selectedGoatId || currentMeasuredWeight <= 0}
            variant="primary"
            size="large"
            iconName="save-outline"
            style={styles.saveBtn}
          />
        </Card>
      </ScrollView>

      {/* Goat Picker Modal */}
      <FilterModal
        visible={goatPickerVisible}
        title="Select Goat to Weigh"
        options={goatOptions}
        selectedOption={selectedGoatId}
        onSelect={setSelectedGoatId}
        onClose={() => setGoatPickerVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },
  historyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.md,
    gap: 4,
  },
  historyBtnText: {
    color: COLORS.textWhite,
    fontSize: 12.5,
    ...FONTS.bold,
  },
  scrollContent: {
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    paddingBottom: 60,
  },
  cardHeader: {
    fontSize: 15,
    color: COLORS.primaryDark,
    ...FONTS.heavy,
    marginBottom: SPACING.sm,
  },
  goatSelectorCard: {
    marginBottom: SPACING.md,
  },
  selectedGoatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryLight,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    gap: 12,
  },
  goatAvatarBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goatAvatarEmoji: {
    fontSize: 24,
  },
  goatDetailsCol: {
    flex: 1,
  },
  selectedGoatName: {
    fontSize: 16,
    color: COLORS.primaryDark,
    ...FONTS.heavy,
  },
  selectedGoatMeta: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
    ...FONTS.medium,
  },
  changeGoatPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.round,
    gap: 4,
  },
  changeGoatText: {
    color: COLORS.primary,
    fontSize: 12,
    ...FONTS.bold,
  },
  comparisonBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.surfaceSubtle,
    borderRadius: RADIUS.md,
    paddingVertical: 10,
    marginTop: SPACING.md,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  compCol: {
    alignItems: 'center',
    flex: 1,
  },
  compDivider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.border,
  },
  compLabel: {
    fontSize: 9.5,
    color: COLORS.textMuted,
    ...FONTS.heavy,
    letterSpacing: 0.4,
  },
  compValue: {
    fontSize: 14,
    color: COLORS.text,
    ...FONTS.heavy,
    marginTop: 3,
  },
  compPending: {
    fontSize: 12,
    color: COLORS.textFaint,
    ...FONTS.medium,
    marginTop: 3,
  },
  modeToggleRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: 4,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  modeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: RADIUS.sm,
    gap: 6,
  },
  modeTabActive: {
    backgroundColor: COLORS.primaryLight,
  },
  modeTabText: {
    fontSize: 12.5,
    color: COLORS.textMuted,
    ...FONTS.semibold,
  },
  modeTabTextActive: {
    color: COLORS.primaryDark,
    ...FONTS.bold,
  },
  saveBtn: {
    marginTop: SPACING.xs,
  },
});
