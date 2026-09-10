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
import { eventsApi } from '../../api';
import { EVENT_TYPES } from '../../constants/config';
import { formatDate } from '../../utils/formatters';

export default function EditEventScreen({ route, navigation }) {
  const { event } = route.params || {};

  const [type, setType] = useState(event?.type || 'Vaccination');
  const [title, setTitle] = useState(event?.title || '');
  const [eventDate, setEventDate] = useState(
    event?.eventDate ? new Date(event.eventDate).toISOString().slice(0, 10) : ''
  );
  const [medicine, setMedicine] = useState(event?.medicine || '');
  const [dosage, setDosage] = useState(event?.dosage || '');
  const [vet, setVet] = useState(event?.vet || '');
  const [cost, setCost] = useState(String(event?.cost || ''));
  const [notes, setNotes] = useState(event?.notes || '');

  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setError('');
    setLoading(true);

    try {
      const payload = {
        type,
        title: title.trim() || `${type} Event`,
        eventDate,
        medicine: medicine.trim(),
        dosage: dosage.trim(),
        vet: vet.trim(),
        cost: Number(cost) || 0,
        notes: notes.trim(),
      };

      await eventsApi.update(event._id, payload);

      Alert.alert('Updated', 'Event details updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      setError(err.message || 'Failed to update event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Edit Event"
        subtitle={`Editing ${event?.title || 'Event'}`}
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

          <Card>
            <Text style={styles.cardHeader}>Event Information</Text>

            <Text style={styles.inputLabel}>Event Type</Text>
            <TouchableOpacity
              onPress={() => setTypeModalVisible(true)}
              style={styles.selectBtn}
            >
              <Text style={styles.selectBtnText}>{type}</Text>
              <Ionicons name="chevron-down" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            <Input
              label="Event Title"
              value={title}
              onChangeText={setTitle}
              iconName="pricetag-outline"
            />

            <Input
              label="Event Date (YYYY-MM-DD)"
              value={eventDate}
              onChangeText={setEventDate}
              iconName="calendar-outline"
            />
          </Card>

          <Card>
            <Text style={styles.cardHeader}>Medical & Treatment Info</Text>

            <Input
              label="Medicine / Vaccine"
              value={medicine}
              onChangeText={setMedicine}
              iconName="medkit-outline"
            />

            <Input
              label="Dosage"
              value={dosage}
              onChangeText={setDosage}
              iconName="flask-outline"
            />

            <Input
              label="Attended By / Vet"
              value={vet}
              onChangeText={setVet}
              iconName="person-outline"
            />

            <Input
              label="Cost (₹)"
              value={cost}
              onChangeText={setCost}
              keyboardType="numeric"
              prefix="₹"
              iconName="cash-outline"
            />

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
        visible={typeModalVisible}
        title="Select Event Type"
        options={EVENT_TYPES.filter((t) => t !== 'All Event Types')}
        selectedOption={type}
        onSelect={setType}
        onClose={() => setTypeModalVisible(false)}
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
