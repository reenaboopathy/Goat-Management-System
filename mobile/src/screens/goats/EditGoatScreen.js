import React, { useState } from 'react';
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
import { goatsApi } from '../../api';
import {
  BREED_OPTIONS,
  STAGE_OPTIONS,
  ORIGIN_OPTIONS,
  STATUS_OPTIONS,
} from '../../constants/config';

export default function EditGoatScreen({ route, navigation }) {
  const { goat } = route.params || {};

  const [name, setName] = useState(goat?.name || '');
  const [tagNumber, setTagNumber] = useState(goat?.tagNumber || '');
  const [breed, setBreed] = useState(goat?.breed || 'Tellicherry');
  const [gender, setGender] = useState(goat?.gender || 'Female');
  const [dob, setDob] = useState(goat?.dob || '');
  const [stage, setStage] = useState(goat?.stage || 'Doe');
  const [currentWeight, setCurrentWeight] = useState(String(goat?.currentWeight || ''));
  const [status, setStatus] = useState(goat?.status || 'Active');
  const [origin, setOrigin] = useState(goat?.origin || 'Born on farm');
  const [notes, setNotes] = useState(goat?.notes || '');

  const [breedModalVisible, setBreedModalVisible] = useState(false);
  const [stageModalVisible, setStageModalVisible] = useState(false);
  const [originModalVisible, setOriginModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setError('');

    if (!name.trim() || !tagNumber.trim()) {
      setError('Name and Tag Number are required.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: name.trim(),
        tagNumber: tagNumber.trim(),
        breed,
        gender,
        dob,
        stage,
        currentWeight: Number(currentWeight) || 0,
        status,
        origin,
        notes: notes.trim(),
      };

      await goatsApi.update(goat._id, payload);

      Alert.alert('Updated', 'Goat details updated successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (err) {
      setError(err.message || 'Failed to update goat');
    } finally {
      setLoading(false);
    }
  };

  const availableStages = STAGE_OPTIONS[gender] || STAGE_OPTIONS.Female;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Edit Goat" subtitle={`Editing ${goat?.name || 'Goat'}`} onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {error ? <ErrorMessage message={error} /> : null}

          <Card>
            <Text style={styles.cardHeader}>Profile Details</Text>

            <Input
              label="Goat Name *"
              value={name}
              onChangeText={setName}
              iconName="pricetag-outline"
            />

            <Input
              label="Tag Number *"
              value={tagNumber}
              onChangeText={setTagNumber}
              iconName="barcode-outline"
            />

            <Text style={styles.inputLabel}>Breed</Text>
            <TouchableOpacity
              onPress={() => setBreedModalVisible(true)}
              style={styles.selectBtn}
            >
              <Text style={styles.selectBtnText}>{breed}</Text>
              <Ionicons name="chevron-down" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            <Text style={styles.inputLabel}>Status</Text>
            <TouchableOpacity
              onPress={() => setStatusModalVisible(true)}
              style={styles.selectBtn}
            >
              <Text style={styles.selectBtnText}>{status}</Text>
              <Ionicons name="chevron-down" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            <Text style={styles.inputLabel}>Life Stage</Text>
            <TouchableOpacity
              onPress={() => setStageModalVisible(true)}
              style={styles.selectBtn}
            >
              <Text style={styles.selectBtnText}>{stage}</Text>
              <Ionicons name="chevron-down" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          </Card>

          <Card>
            <Text style={styles.cardHeader}>Weight & Notes</Text>

            <Input
              label="Current Weight (kg)"
              value={currentWeight}
              onChangeText={setCurrentWeight}
              keyboardType="numeric"
              suffix="kg"
              iconName="scale-outline"
            />

            <Input
              label="Date of Birth"
              value={dob}
              onChangeText={setDob}
              iconName="calendar-outline"
            />

            <Text style={styles.inputLabel}>Origin</Text>
            <TouchableOpacity
              onPress={() => setOriginModalVisible(true)}
              style={styles.selectBtn}
            >
              <Text style={styles.selectBtnText}>{origin}</Text>
              <Ionicons name="chevron-down" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            <Input
              label="Notes"
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
              iconName="document-text-outline"
            />
          </Card>

          <Button
            title="Save Changes"
            onPress={handleSave}
            loading={loading}
            variant="primary"
            size="large"
            iconName="save-outline"
            style={styles.submitBtn}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      <FilterModal
        visible={breedModalVisible}
        title="Select Breed"
        options={BREED_OPTIONS.filter((b) => b !== 'All Breeds')}
        selectedOption={breed}
        onSelect={setBreed}
        onClose={() => setBreedModalVisible(false)}
      />

      <FilterModal
        visible={statusModalVisible}
        title="Select Status"
        options={STATUS_OPTIONS.filter((s) => s !== 'All')}
        selectedOption={status}
        onSelect={setStatus}
        onClose={() => setStatusModalVisible(false)}
      />

      <FilterModal
        visible={stageModalVisible}
        title="Select Stage"
        options={availableStages}
        selectedOption={stage}
        onSelect={setStage}
        onClose={() => setStageModalVisible(false)}
      />

      <FilterModal
        visible={originModalVisible}
        title="Select Origin"
        options={ORIGIN_OPTIONS}
        selectedOption={origin}
        onSelect={setOrigin}
        onClose={() => setOriginModalVisible(false)}
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
