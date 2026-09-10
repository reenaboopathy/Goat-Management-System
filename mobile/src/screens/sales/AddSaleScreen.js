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
import { salesApi, goatsApi } from '../../api';
import { formatWeight } from '../../utils/formatters';

const PAYMENT_METHODS = ['Cash', 'UPI', 'Bank Transfer'];
const TRANSACTION_TYPES = ['Sale', 'Purchase'];
const PAYMENT_STATUSES = ['Paid', 'Pending', 'Partial'];

export default function AddSaleScreen({ route, navigation }) {
  const preselectedGoat = route.params?.preselectedGoat || null;

  const [type, setType] = useState('Sale'); // 'Sale' | 'Purchase'
  const [selectedGoatId, setSelectedGoatId] = useState(preselectedGoat?._id || '');
  const [buyer, setBuyer] = useState('');
  const [contact, setContact] = useState('');
  const [saleDate, setSaleDate] = useState(new Date().toISOString().slice(0, 10));
  const [weight, setWeight] = useState(preselectedGoat ? String(preselectedGoat.currentWeight || '') : '');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('Cash');
  const [status, setStatus] = useState('Paid');
  const [notes, setNotes] = useState('');

  const [goats, setGoats] = useState([]);
  const [goatModalVisible, setGoatModalVisible] = useState(false);
  const [methodModalVisible, setMethodModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchActiveGoats = useCallback(async () => {
    try {
      const list = await goatsApi.getAll({ status: 'Active' });
      if (Array.isArray(list)) {
        setGoats(list);
        if (!selectedGoatId && list.length > 0 && !preselectedGoat) {
          setSelectedGoatId(list[0]._id);
          setWeight(String(list[0].currentWeight || ''));
        }
      }
    } catch (err) {
      console.warn('Failed to load active goats for sale:', err);
    }
  }, [preselectedGoat, selectedGoatId]);

  useEffect(() => {
    fetchActiveGoats();
  }, [fetchActiveGoats]);

  const selectedGoat = goats.find((g) => g._id === selectedGoatId) || preselectedGoat;

  const handleSelectGoat = (id) => {
    setSelectedGoatId(id);
    const g = goats.find((x) => x._id === id);
    if (g) {
      setWeight(String(g.currentWeight || ''));
    }
  };

  const handleSave = async () => {
    setError('');

    if (type === 'Sale' && !selectedGoatId && !selectedGoat) {
      setError('Please select an active goat to sell.');
      return;
    }

    if (!buyer.trim()) {
      setError(`Please enter the ${type === 'Sale' ? 'buyer' : 'seller'} name.`);
      return;
    }

    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      setError('Please enter a valid amount in ₹.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        type,
        goatId: selectedGoat?._id || '',
        goatName: selectedGoat?.name || 'Herd Goat',
        goatTagNumber: selectedGoat?.tagNumber || '',
        breed: selectedGoat?.breed || '',
        buyer: buyer.trim(),
        person: buyer.trim(),
        contact: contact.trim(),
        saleDate,
        weight: Number(weight) || 0,
        amount: numAmount,
        price: numAmount,
        method,
        status,
        notes: notes.trim(),
      };

      await salesApi.create(payload);

      Alert.alert(
        `${type} Recorded`,
        type === 'Sale'
          ? `${selectedGoat?.name} was sold for ₹${numAmount.toLocaleString('en-IN')}. Status set to 'Sold'.`
          : `Purchase of ₹${numAmount.toLocaleString('en-IN')} recorded successfully.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (err) {
      setError(err.message || 'Failed to record transaction');
    } finally {
      setLoading(false);
    }
  };

  const goatOptions = goats.map((g) => ({
    value: g._id,
    label: `${g.name} (#${g.tagNumber}) · ${g.breed} · ${formatWeight(g.currentWeight)}`,
  }));

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title={type === 'Sale' ? 'Sell Goat' : 'Record Purchase'}
        subtitle="Record transaction & update herd status"
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

          {/* Transaction Type Toggle */}
          <View style={styles.typeToggleRow}>
            {TRANSACTION_TYPES.map((t) => {
              const isSelected = type === t;
              return (
                <TouchableOpacity
                  key={t}
                  onPress={() => setType(t)}
                  style={[styles.typeTab, isSelected && styles.typeTabActive]}
                >
                  <Ionicons
                    name={t === 'Sale' ? 'cash-outline' : 'cart-outline'}
                    size={16}
                    color={isSelected ? COLORS.primaryDark : COLORS.textMuted}
                  />
                  <Text
                    style={[
                      styles.typeTabText,
                      isSelected && styles.typeTabTextActive,
                    ]}
                  >
                    {t === 'Sale' ? 'Goat Sale' : 'Goat Purchase'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Card>
            <Text style={styles.cardHeader}>Goat & Customer</Text>

            {/* Target Goat */}
            <Text style={styles.inputLabel}>Select Goat *</Text>
            <TouchableOpacity
              onPress={() => setGoatModalVisible(true)}
              style={styles.selectBtn}
            >
              <Text style={styles.selectBtnText}>
                {selectedGoat
                  ? `${selectedGoat.name} (#${selectedGoat.tagNumber}) · ${formatWeight(selectedGoat.currentWeight)}`
                  : 'Select an active goat'}
              </Text>
              <Ionicons name="chevron-down" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            <Input
              label={type === 'Sale' ? 'Buyer Name *' : 'Seller / Farm Name *'}
              placeholder="e.g. Murugan, Chennai Meat Mart"
              value={buyer}
              onChangeText={setBuyer}
              iconName="person-outline"
            />

            <Input
              label="Contact Number (Optional)"
              placeholder="e.g. 9840123456"
              value={contact}
              onChangeText={setContact}
              keyboardType="phone-pad"
              iconName="call-outline"
            />

            <Input
              label="Transaction Date (YYYY-MM-DD) *"
              value={saleDate}
              onChangeText={setSaleDate}
              iconName="calendar-outline"
            />
          </Card>

          <Card>
            <Text style={styles.cardHeader}>Financial Details</Text>

            <Input
              label="Weight at Sale (kg)"
              placeholder="e.g. 34.5"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              suffix="kg"
              iconName="scale-outline"
            />

            <Input
              label="Total Sale Amount (₹) *"
              placeholder="e.g. 12500"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              prefix="₹"
              iconName="cash-outline"
            />

            <Text style={styles.inputLabel}>Payment Method</Text>
            <TouchableOpacity
              onPress={() => setMethodModalVisible(true)}
              style={styles.selectBtn}
            >
              <Text style={styles.selectBtnText}>{method}</Text>
              <Ionicons name="chevron-down" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            <Text style={styles.inputLabel}>Payment Status</Text>
            <TouchableOpacity
              onPress={() => setStatusModalVisible(true)}
              style={styles.selectBtn}
            >
              <Text style={styles.selectBtnText}>{status}</Text>
              <Ionicons name="chevron-down" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            <Input
              label="Notes"
              placeholder="e.g. Festival sale, transport arranged by buyer"
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
              iconName="document-text-outline"
            />
          </Card>

          <Button
            title={`Complete ${type}`}
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
        visible={goatModalVisible}
        title="Select Active Goat to Sell"
        options={goatOptions}
        selectedOption={selectedGoatId}
        onSelect={handleSelectGoat}
        onClose={() => setGoatModalVisible(false)}
      />

      <FilterModal
        visible={methodModalVisible}
        title="Select Payment Method"
        options={PAYMENT_METHODS}
        selectedOption={method}
        onSelect={setMethod}
        onClose={() => setMethodModalVisible(false)}
      />

      <FilterModal
        visible={statusModalVisible}
        title="Select Payment Status"
        options={PAYMENT_STATUSES}
        selectedOption={status}
        onSelect={setStatus}
        onClose={() => setStatusModalVisible(false)}
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
  typeToggleRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.md,
    padding: 4,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  typeTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: RADIUS.sm,
    gap: 6,
  },
  typeTabActive: {
    backgroundColor: COLORS.primaryLight,
  },
  typeTabText: {
    fontSize: 12.5,
    color: COLORS.textMuted,
    ...FONTS.semibold,
  },
  typeTabTextActive: {
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
