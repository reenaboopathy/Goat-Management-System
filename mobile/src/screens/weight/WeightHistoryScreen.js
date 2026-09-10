import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOWS, SPACING } from '../../constants/theme';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import EmptyState from '../../components/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { weightsApi } from '../../api';
import { formatWeight, formatDate, formatDateTime } from '../../utils/formatters';

export default function WeightHistoryScreen({ navigation }) {
  const [weights, setWeights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = useCallback(async () => {
    try {
      setError(null);
      const data = await weightsApi.getAll({ limit: 100 });
      if (Array.isArray(data)) {
        setWeights(data);
      }
    } catch (err) {
      console.warn('Weights history fetch error:', err);
      setError(err.message || 'Unable to load weight records');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchHistory();
  };

  const handleDelete = (id, goatName, weightKg) => {
    Alert.alert(
      'Delete Weight Record',
      `Delete weight entry of ${weightKg} kg for ${goatName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await weightsApi.delete(id);
              fetchHistory();
            } catch (err) {
              Alert.alert('Error', err.message || 'Failed to delete record');
            }
          },
        },
      ]
    );
  };

  const renderWeightItem = ({ item }) => {
    return (
      <Card style={styles.card}>
        <View style={styles.topRow}>
          <View style={styles.goatInfoCol}>
            <View style={styles.nameRow}>
              <Text style={styles.goatName}>{item.goatName}</Text>
              {item.goatTagNumber ? (
                <Text style={styles.tagNumber}>#{item.goatTagNumber}</Text>
              ) : null}
            </View>
            <Text style={styles.dateText}>{formatDateTime(item.recordedAt)}</Text>
          </View>

          <View style={styles.badgeCol}>
            <Badge
              label={
                item.gainLoss === 'Gain'
                  ? `+${item.difference} kg`
                  : item.gainLoss === 'Loss'
                  ? `${item.difference} kg`
                  : 'Stable'
              }
              type={item.gainLoss}
              size="small"
            />
            <TouchableOpacity
              onPress={() => handleDelete(item._id, item.goatName, item.weight)}
              style={styles.deleteBtn}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="trash-outline" size={16} color={COLORS.textFaint} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.weightsRow}>
          <View style={styles.weightBox}>
            <Text style={styles.weightBoxLabel}>NEW WEIGHT</Text>
            <Text style={styles.weightBoxValue}>{formatWeight(item.weight)}</Text>
          </View>

          <View style={styles.arrowBox}>
            <Ionicons name="arrow-forward" size={16} color={COLORS.textFaint} />
          </View>

          <View style={styles.weightBox}>
            <Text style={styles.weightBoxLabel}>PREVIOUS</Text>
            <Text style={styles.weightBoxSubValue}>
              {formatWeight(item.previousWeight)}
            </Text>
          </View>

          <View style={styles.weightBox}>
            <Text style={styles.weightBoxLabel}>SOURCE</Text>
            <Text style={styles.weightBoxSubValue}>{item.source || 'Scale'}</Text>
          </View>
        </View>

        {item.notes ? (
          <View style={styles.notesBox}>
            <Text style={styles.notesText}>{item.notes}</Text>
          </View>
        ) : null}
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Weight History"
        subtitle={`${weights.length} measurements recorded`}
        onBack={() => navigation.goBack()}
        rightActions={
          <TouchableOpacity
            onPress={() => navigation.navigate('WeightRecording')}
            style={styles.recordBtn}
          >
            <Ionicons name="add" size={20} color={COLORS.textWhite} />
            <Text style={styles.recordBtnText}>Weigh</Text>
          </TouchableOpacity>
        }
      />

      <View style={styles.container}>
        {error ? <ErrorMessage message={error} onRetry={fetchHistory} /> : null}

        {loading && !refreshing ? (
          <LoadingSpinner message="Loading weight records..." />
        ) : (
          <FlatList
            data={weights}
            keyExtractor={(item) => item._id}
            renderItem={renderWeightItem}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[COLORS.primary]}
                tintColor={COLORS.primary}
              />
            }
            ListEmptyComponent={
              <EmptyState
                iconName="scale-outline"
                title="No weight records available"
                description="Start weighing goats using the live scale to build weight history trends."
                actionLabel="Take Weight Measurement"
                onAction={() => navigation.navigate('WeightRecording')}
              />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },
  recordBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: RADIUS.md,
    gap: 4,
  },
  recordBtnText: {
    color: COLORS.textWhite,
    fontSize: 12.5,
    ...FONTS.bold,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    padding: SPACING.lg,
    paddingBottom: 60,
  },
  card: {
    padding: SPACING.md,
    marginBottom: 10,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  goatInfoCol: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  goatName: {
    fontSize: 15.5,
    color: COLORS.primaryDark,
    ...FONTS.heavy,
  },
  tagNumber: {
    fontSize: 12.5,
    color: COLORS.textMuted,
    ...FONTS.semibold,
  },
  dateText: {
    fontSize: 11.5,
    color: COLORS.textFaint,
    marginTop: 2,
  },
  badgeCol: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deleteBtn: {
    padding: 4,
  },
  weightsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surfaceSubtle,
    borderRadius: RADIUS.md,
    padding: 10,
    justifyContent: 'space-between',
  },
  weightBox: {
    alignItems: 'center',
  },
  weightBoxLabel: {
    fontSize: 9,
    color: COLORS.textMuted,
    ...FONTS.heavy,
    letterSpacing: 0.4,
  },
  weightBoxValue: {
    fontSize: 14.5,
    color: COLORS.primaryDark,
    ...FONTS.heavy,
    marginTop: 2,
  },
  weightBoxSubValue: {
    fontSize: 13,
    color: COLORS.text,
    ...FONTS.semibold,
    marginTop: 2,
  },
  arrowBox: {
    paddingHorizontal: 4,
  },
  notesBox: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  notesText: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontStyle: 'italic',
  },
});
