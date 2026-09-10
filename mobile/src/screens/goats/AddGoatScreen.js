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
  GENDER_OPTIONS,
  STAGE_OPTIONS,
  ORIGIN_OPTIONS,
} from '../../constants/config';

export default function AddGoatScreen({ navigation }) {
  const [name, setName] = useState('');
  const [tagNumber, setTagNumber] = useState('');
  const [breed, setBreed] = useState('Tellicherry');
  const [gender, setGender] = useState('Female');
  const [dob, setDob] = useState(new Date().toISOString().slice(0, 10));
  const [stage, setStage] = useState('Doe');
  const [currentWeight, setCurrentWeight] = useState('');
  const [origin, setOrigin] = useState('Born on farm');
  const [group, setGroup] = useState('All Groups');
  const [notes, setNotes] = useState('');

  const [breedModalVisible, setBreedModalVisible] = useState(false);
  const [stageModalVisible, setStageModalVisible] = useState(false);
  const [originModalVisible, setOriginModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenderChange = (selectedGender) => {
    setGender(selectedGender);
    // Update stage default for gender
    if (selectedGender === 'Female') {
      setStage('Doe');
    } else {
      setStage('Buck');
    }
  };

  const handleSave = async () => {
    setError('');

    if (!name.trim()) {
      setError('Please enter a goat name.');
      return;
    }
    if (!tagNumber.trim()) {
      setError('Please enter a tag number.');
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
        origin,
        group,
        notes: notes.trim(),
      };

      const createdGoat = await goatsApi.create(payload);

      Alert.alert(
        'Goat Registered',
        `${name} (#${tagNumber}) was added successfully!`,
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]
      );
    } catch (err) {
      setError(err.message || 'Failed to register goat');
    } finally {
      setLoading(false);
    }
  };

  const availableStages = STAGE_OPTIONS[gender] || STAGE_OPTIONS.Female;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Add New Goat" subtitle="Register a new goat profile" onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {error ? <ErrorMessage message={error} /> : null}

          {/* Goat Identity Card */}
          <Card>
            <Text style={styles.cardHeader}>Identity & Basic Info</Text>

            <Input
              label="Goat Name *"
              placeholder="e.g. Karuppi, Vellai, Raja"
              value={name}
              onChangeText={setName}
              iconName="pricetag-outline"
            />

            <Input
              label="Tag Number *"
              placeholder="e.g. TN-001 or 1042"
              value={tagNumber}
              onChangeText={setTagNumber}
              iconName="barcode-outline"
            />

            {/* Gender Toggle */}
            <Text style={styles.inputLabel}>Gender *</Text>
            <View style={styles.genderRow}>
              {['Female', 'Male'].map((g) => {
                const isSelected = gender === g;
                return (
                  <TouchableOpacity
                    key={g}
                    onPress={() => handleGenderChange(g)}
                    style={[
                      styles.genderBtn,
                      isSelected && styles.genderBtnActive,
                      isSelected && g === 'Female' && styles.genderBtnFemaleActive,
                    ]}
                  >
                    <Ionicons
                      name={g === 'Female' ? 'female' : 'male'}
                      size={18}
                      color={isSelected ? (g === 'Female' ? '#BE185D' : '#0369A1') : COLORS.textMuted}
                    />
                    <Text
                      style={[
                        styles.genderBtnText,
                        isSelected && styles.genderBtnTextActive,
                      ]}
                    >
                      {g}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Breed Selector */}
            <Text style={styles.inputLabel}>Breed *</Text>
            <TouchableOpacity
              onPress={() => setBreedModalVisible(true)}
              style={styles.selectBtn}
            >
              <Text style={styles.selectBtnText}>{breed}</Text>
              <Ionicons name="chevron-down" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            {/* Stage Selector */}
            <Text style={styles.inputLabel}>Stage *</Text>
            <TouchableOpacity
              onPress={() => setStageModalVisible(true)}
              style={styles.selectBtn}
            >
              <Text style={styles.selectBtnText}>{stage}</Text>
              <Ionicons name="chevron-down" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          </Card>

          {/* Measurements & Origin Card */}
          <Card>
            <Text style={styles.cardHeader}>Metrics & Origin</Text>

            <Input
              label="Starting / Current Weight (kg)"
              placeholder="e.g. 24.5"
              value={currentWeight}
              onChangeText={setCurrentWeight}
              keyboardType="numeric"
              suffix="kg"
              iconName="scale-outline"
            />

            <Input
              label="Date of Birth (YYYY-MM-DD)"
              placeholder="YYYY-MM-DD"
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
              label="Notes / Health Observations"
              placeholder="Enter markings, temper, vaccination details, etc."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
              iconName="document-text-outline"
            />
          </Card>

          {/* Submit Button */}
          <Button
            title="Register Goat"
            onPress={handleSave}
            loading={loading}
            variant="primary"
            size="large"
            iconName="checkmark-circle-outline"
            style={styles.submitBtn}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modals */}
      <FilterModal
        visible={breedModalVisible}
        title="Select Breed"
        options={BREED_OPTIONS.filter((b) => b !== 'All Breeds')}
        selectedOption={breed}
        onSelect={setBreed}
        onClose={() => setBreedModalVisible(false)}
      />

      <FilterModal
        visible={stageModalVisible}
        title="Select Life Stage"
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
  genderRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: SPACING.md,
  },
  genderBtn: {
    flex: 1,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceSubtle,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  genderBtnActive: {
    backgroundColor: '#E0F2FE',
    borderColor: '#38BDF8',
  },
  genderBtnFemaleActive: {
    backgroundColor: '#FCE7F3',
    borderColor: '#F472B6',
  },
  genderBtnText: {
    fontSize: 13.5,
    color: COLORS.textMuted,
    ...FONTS.semibold,
  },
  genderBtnTextActive: {
    color: COLORS.text,
    ...FONTS.bold,
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
