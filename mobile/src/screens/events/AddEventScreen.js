import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SPACING } from '../../constants/theme';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import FilterModal from '../../components/FilterModal';
import ErrorMessage from '../../components/ErrorMessage';
import { eventsApi, goatsApi } from '../../api';
import { EVENT_TYPES } from '../../constants/config';

export default function AddEventScreen({ route, navigation }) {
  const preselectedGoat = route.params?.preselectedGoat || null;

  const [mode, setMode] = useState('individual'); // 'individual' | 'mass'
  const [type, setType] = useState('Vaccination');
  const [title, setTitle] = useState('');
  const [selectedGoatId, setSelectedGoatId] = useState(preselectedGoat?._id || '');
  const [eventDate, setEventDate] = useState(new Date().toISOString().slice(0, 10));
  const [medicine, setMedicine] = useState('');
  const [dosage, setDosage] = useState('');
  const [vet, setVet] = useState('');
  const [cost, setCost] = useState('');
  const [notes, setNotes] = useState('');

  const [goats, setGoats] = useState([]);
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [goatModalVisible, setGoatModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchGoats = useCallback(async () => {
    try {
      const list = await goatsApi.getAll({ status: 'Active' });
      if (Array.isArray(list)) {
        setGoats(list);
        if (!selectedGoatId && list.length > 0 && !preselectedGoat) {
          setSelectedGoatId(list[0]._id);
        }
      }
    } catch (err) {
      console.warn('Failed to load goats for event form:', err);
    }
  }, [preselectedGoat, selectedGoatId]);

  useEffect(() => {
    fetchGoats();
  }, [fetchGoats]);

  const selectedGoat = goats.find((g) => g._id === selectedGoatId) || preselectedGoat;

  const handleSave = async () => {
    setError('');

    if (mode === 'individual' && !selectedGoatId && !selectedGoat) {
      setError('Please select a goat for this event.');
      return;
    }

    setLoading(true);
    try {
      const finalTitle =
        title.trim() ||
        `${type}${selectedGoat ? ' - ' + selectedGoat.name : ' (Herd)'}`;

      const payload = {
        mode,
        type,
        title: finalTitle,
        goatId: mode === 'individual' ? selectedGoat?._id : '',
        goatName: mode === 'individual' ? selectedGoat?.name : '',
        goatTagNumber: mode === 'individual' ? selectedGoat?.tagNumber : '',
        goats:
          mode === 'mass'
            ? goats.map((g) => ({ goatId: g._id, name: g.name, tagNumber: g.tagNumber }))
            : [],
        eventDate,
        medicine: medicine.trim(),
        dosage: dosage.trim(),
        vet: vet.trim(),
        cost: Number(cost) || 0,
        notes: notes.trim(),
        status: 'Completed',
      };

      await eventsApi.create(payload);

      Alert.alert('Event Logged', 'Herd event saved successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      setError(err.message || 'Failed to save event');
    } finally {
      setLoading(false);
    }
  };

  const goatOptions = goats.map((g) => ({
    value: g._id,
    label: `${g.name} (#${g.tagNumber}) · ${g.breed}`,
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Log Event"
        subtitle="Record health, breeding, or herd event"
        onBack={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {error ? <ErrorMessage message={error} /> : null}

          {/* Mode Switcher */}
          <View style={styles.modeToggleRow}>
            <TouchableOpacity
              style={[styles.modeTab, mode === 'individual' && styles.modeTabActive]}
              onPress={() => setMode('individual')}
            >
              <Ionicons
                name="person-outline"
                size={16}
                color={mode === 'individual' ? COLORS.primaryDark : COLORS.textMuted}
              />
              <Text
                style={[
                  styles.modeTabText,
                  mode === 'individual' && styles.modeTabTextActive,
                ]}
              >
                Individual Goat
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modeTab, mode === 'mass' && styles.modeTabActive]}
              onPress={() => setMode('mass')}
            >
              <Ionicons
                name="people-outline"
                size={16}
                color={mode === 'mass' ? COLORS.primaryDark : COLORS.textMuted}
              />
              <Text
                style={[
                  styles.modeTabText,
                  mode === 'mass' && styles.modeTabTextActive,
                ]}
              >
                Mass Event ({goats.length} Goats)
              </Text>
            </TouchableOpacity>
          </View>

          <Card>
            <Text style={styles.cardHeader}>Event Details</Text>

            {/* Event Type Picker */}
            <Text style={styles.inputLabel}>Event Type *</Text>
            <TouchableOpacity
              onPress={() => setTypeModalVisible(true)}
              style={styles.selectBtn}
            >
              <Text style={styles.selectBtnText}>{type}</Text>
              <Ionicons name="chevron-down" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            {/* Target Goat (if individual) */}
            {mode === 'individual' && (
              <>
                <Text style={styles.inputLabel}>Target Goat *</Text>
                <TouchableOpacity
                  onPress={() => setGoatModalVisible(true)}
                  style={styles.selectBtn}
                >
                  <Text style={styles.selectBtnText}>
                    {selectedGoat
                      ? `${selectedGoat.name} (#${selectedGoat.tagNumber})`
                      : 'Select a goat'}
                  </Text>
                  <Ionicons name="chevron-down" size={18} color={COLORS.textMuted} />
                </TouchableOpacity>
              </>
            )}

            <Input
              label="Event Title (Optional)"
              placeholder={`e.g. ${type} booster dose`}
              value={title}
              onChangeText={setTitle}
              iconName="pricetag-outline"
            />

            <Input
              label="Date (YYYY-MM-DD) *"
              value={eventDate}
              onChangeText={setEventDate}
              iconName="calendar-outline"
            />
          </Card>

          <Card>
            <Text style={styles.cardHeader}>Treatment & Cost Info</Text>

            <Input
              label="Medicine / Vaccine Name"
              placeholder="e.g. PPR Vaccine, Albendazole"
              value={medicine}
              onChangeText={setMedicine}
              iconName="medkit-outline"
            />

            <Input
              label="Dosage"
              placeholder="e.g. 1ml subcutaneous, 5ml oral"
              value={dosage}
              onChangeText={setDosage}
              iconName="flask-outline"
            />

            <Input
              label="Veterinarian / Attended By"
              placeholder="e.g. Dr. Kumar"
              value={vet}
              onChangeText={setVet}
              iconName="person-outline"
            />

            <Input
              label="Total Cost (₹)"
              placeholder="e.g. 250"
              value={cost}
              onChangeText={setCost}
              keyboardType="numeric"
              prefix="₹"
              iconName="cash-outline"
            />

            <Input
              label="Notes / Instructions"
              placeholder="Enter recovery details, reaction notes, etc."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
              iconName="document-text-outline"
            />
          </Card>

          <Button
            title="Log Event"
            onPress={handleSave}
            loading={loading}
            variant="primary"
            size="large"
            iconName="checkmark-circle-outline"
            style={styles.submitBtn}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Type Modal */}
      <FilterModal
        visible={typeModalVisible}
        title="Select Event Type"
        options={EVENT_TYPES.filter((t) => t !== 'All Event Types')}
        selectedOption={type}
        onSelect={setType}
        onClose={() => setTypeModalVisible(false)}
      />

      {/* Goat Modal */}
      <FilterModal
        visible={goatModalVisible}
        title="Select Target Goat"
        options={goatOptions}
        selectedOption={selectedGoatId}
        onSelect={setSelectedGoatId}
        onClose={() => setGoatModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },
  scrollContent: {
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    paddingBottom: 60,
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
  cardHeader: {
    fontSize: 15,
    color: COLORS.primaryDark,
    ...FONTS.heavy,
    marginBottom: SPACING.md,
  },
  inputLabel: {
    fontSize: 12.5,
    ...FONTS.bold,
    color: COLORS.textMuted,
    marginBottom: 6,
  },
  selectBtn: {
    height: 48,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  selectBtnText: {
    fontSize: 14,
    color: COLORS.text,
    ...FONTS.medium,
  },
  submitBtn: {
    marginTop: SPACING.sm,
    marginBottom: SPACING.xl,
  },
});
