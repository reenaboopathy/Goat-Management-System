import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOWS, SPACING } from '../../constants/theme';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import EmptyState from '../../components/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import FilterModal from '../../components/FilterModal';
import { goatsApi } from '../../api';
import { BREED_OPTIONS, STATUS_OPTIONS } from '../../constants/config';
import { formatWeight, calculateAge } from '../../utils/formatters';

export default function GoatListScreen({ navigation }) {
  const [goats, setGoats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('All Breeds');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const [breedModalVisible, setBreedModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);

  const fetchGoats = useCallback(async () => {
    try {
      setError(null);
      const data = await goatsApi.getAll({
        search: search.trim(),
        breed: selectedBreed,
        status: selectedStatus,
      });
      if (Array.isArray(data)) {
        setGoats(data);
      }
    } catch (err) {
      console.warn('Goats fetch error:', err);
      setError(err.message || 'Unable to load goats');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [search, selectedBreed, selectedStatus]);

  useEffect(() => {
    fetchGoats();
  }, [fetchGoats]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchGoats();
  };

  const filteredGoats = useMemo(() => {
    return goats.filter((goat) => {
      const matchesBreed =
        selectedBreed === 'All Breeds' || goat.breed === selectedBreed;
      const matchesStatus =
        selectedStatus === 'All' || goat.status === selectedStatus;

      const q = search.trim().toLowerCase();
      if (!q) return matchesBreed && matchesStatus;

      const searchable = `${goat.name} ${goat.tagNumber} ${goat.breed} ${goat.notes || ''}`.toLowerCase();
      return matchesBreed && matchesStatus && searchable.includes(q);
    });
  }, [goats, selectedBreed, selectedStatus, search]);

  const renderGoatCard = ({ item }) => {
    const isMale = item.gender === 'Male';
    return (
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => navigation.navigate('GoatDetail', { goatId: item._id, goatName: item.name })}
        style={styles.card}
      >
        <View style={styles.cardLeft}>
          <View style={[styles.avatarBox, isMale ? styles.avatarMale : styles.avatarFemale]}>
            <Text style={styles.avatarEmoji}>🐐</Text>
          </View>
        </View>

        <View style={styles.cardMiddle}>
          <View style={styles.nameRow}>
            <Text style={styles.goatName} numberOfLines={1}>
              {item.name}
            </Text>
            <Badge label={item.status || 'Active'} type={item.status} size="small" />
          </View>

          <Text style={styles.tagNumberText}>Tag #{item.tagNumber || '—'}</Text>

          <View style={styles.metaRow}>
            <Text style={styles.breedText}>{item.breed || 'Tellicherry'}</Text>
            <Text style={styles.metaDot}>•</Text>
            <Text style={styles.stageText}>{item.stage || (isMale ? 'Buck' : 'Doe')}</Text>
            {item.dob ? (
              <>
                <Text style={styles.metaDot}>•</Text>
                <Text style={styles.ageText}>{calculateAge(item.dob)}</Text>
              </>
            ) : null}
          </View>
        </View>

        <View style={styles.cardRight}>
          <Text style={styles.weightValue}>
            {formatWeight(item.currentWeight)}
          </Text>
          <Text style={styles.weightLabel}>Weight</Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={COLORS.textFaint}
            style={{ marginTop: 4 }}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Goat Herd</Text>
            <Text style={styles.headerSubtitle}>
              {filteredGoats.length} goat{filteredGoats.length !== 1 ? 's' : ''} listed
            </Text>
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('AddGoat')}
            accessibilityLabel="Add new goat"
          >
            <Ionicons name="add" size={20} color={COLORS.textWhite} />
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={COLORS.textMuted} style={styles.searchIcon} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search by name, tag #, breed..."
            placeholderTextColor={COLORS.textFaint}
            style={styles.searchInput}
          />
          {search ? (
            <TouchableOpacity onPress={() => setSearch('')} style={styles.clearSearchBtn}>
              <Ionicons name="close-circle" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Filter Pills */}
        <View style={styles.filterPillsRow}>
          <TouchableOpacity
            style={[
              styles.filterPill,
              selectedBreed !== 'All Breeds' && styles.filterPillActive,
            ]}
            onPress={() => setBreedModalVisible(true)}
          >
            <Ionicons
              name="paw-outline"
              size={14}
              color={selectedBreed !== 'All Breeds' ? COLORS.primaryDark : COLORS.textMuted}
            />
            <Text
              style={[
                styles.filterPillText,
                selectedBreed !== 'All Breeds' && styles.filterPillTextActive,
              ]}
              numberOfLines={1}
            >
              {selectedBreed}
            </Text>
            <Ionicons
              name="chevron-down"
              size={14}
              color={selectedBreed !== 'All Breeds' ? COLORS.primaryDark : COLORS.textMuted}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filterPill,
              selectedStatus !== 'All' && styles.filterPillActive,
            ]}
            onPress={() => setStatusModalVisible(true)}
          >
            <Ionicons
              name="funnel-outline"
              size={14}
              color={selectedStatus !== 'All' ? COLORS.primaryDark : COLORS.textMuted}
            />
            <Text
              style={[
                styles.filterPillText,
                selectedStatus !== 'All' && styles.filterPillTextActive,
              ]}
              numberOfLines={1}
            >
              {selectedStatus === 'All' ? 'Status: All' : selectedStatus}
            </Text>
            <Ionicons
              name="chevron-down"
              size={14}
              color={selectedStatus !== 'All' ? COLORS.primaryDark : COLORS.textMuted}
            />
          </TouchableOpacity>

          {(selectedBreed !== 'All Breeds' || selectedStatus !== 'All' || search) && (
            <TouchableOpacity
              style={styles.resetFilterBtn}
              onPress={() => {
                setSelectedBreed('All Breeds');
                setSelectedStatus('All');
                setSearch('');
              }}
            >
              <Ionicons name="refresh" size={14} color={COLORS.danger} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Main Goat List */}
      <View style={styles.listContainer}>
        {error ? <ErrorMessage message={error} onRetry={fetchGoats} /> : null}

        {loading && !refreshing ? (
          <LoadingSpinner message="Loading goat herd..." />
        ) : (
          <FlatList
            data={filteredGoats}
            keyExtractor={(item) => item._id || item.tagNumber}
            renderItem={renderGoatCard}
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
                iconName="paw-outline"
                title="No goats found"
                description={
                  search || selectedBreed !== 'All Breeds'
                    ? 'No goats match the selected search and filter criteria.'
                    : 'Your farm currently has no registered goats. Click Add to create your first goat profile!'
                }
                actionLabel={search || selectedBreed !== 'All Breeds' ? 'Clear Filters' : 'Register New Goat'}
                onAction={
                  search || selectedBreed !== 'All Breeds'
                    ? () => {
                        setSelectedBreed('All Breeds');
                        setSelectedStatus('All');
                        setSearch('');
                      }
                    : () => navigation.navigate('AddGoat')
                }
              />
            }
          />
        )}
      </View>

      {/* Filter Modals */}
      <FilterModal
        visible={breedModalVisible}
        title="Filter by Breed"
        options={BREED_OPTIONS}
        selectedOption={selectedBreed}
        onSelect={setSelectedBreed}
        onClose={() => setBreedModalVisible(false)}
      />

      <FilterModal
        visible={statusModalVisible}
        title="Filter by Status"
        options={STATUS_OPTIONS}
        selectedOption={selectedStatus}
        onSelect={setSelectedStatus}
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
  header: {
    backgroundColor: COLORS.primaryDark,
    paddingTop: 12,
    paddingBottom: 16,
    paddingHorizontal: SPACING.lg,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 22,
    color: COLORS.textWhite,
    ...FONTS.heavy,
  },
  headerSubtitle: {
    fontSize: 12.5,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    gap: 4,
    ...SHADOWS.sm,
  },
  addButtonText: {
    color: COLORS.textWhite,
    fontSize: 13.5,
    ...FONTS.bold,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: RADIUS.md,
    paddingHorizontal: 12,
    height: 42,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13.5,
    color: COLORS.textWhite,
    padding: 0,
  },
  clearSearchBtn: {
    padding: 4,
  },
  filterPillsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.round,
    gap: 6,
    flexShrink: 1,
  },
  filterPillActive: {
    backgroundColor: '#FFFFFF',
  },
  filterPillText: {
    color: COLORS.textWhite,
    fontSize: 12,
    ...FONTS.semibold,
  },
  filterPillTextActive: {
    color: COLORS.primaryDark,
    ...FONTS.bold,
  },
  resetFilterBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.sm,
    gap: 12,
  },
  cardLeft: {
    alignItems: 'center',
  },
  avatarBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarFemale: {
    backgroundColor: '#FCE7F3',
  },
  avatarMale: {
    backgroundColor: '#E0F2FE',
  },
  avatarEmoji: {
    fontSize: 26,
  },
  cardMiddle: {
    flex: 1,
    minWidth: 0,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  goatName: {
    fontSize: 15.5,
    color: COLORS.primaryDark,
    ...FONTS.heavy,
    flex: 1,
  },
  tagNumberText: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 2,
    ...FONTS.semibold,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 5,
  },
  breedText: {
    fontSize: 11.5,
    color: COLORS.primary,
    ...FONTS.bold,
  },
  metaDot: {
    fontSize: 11,
    color: COLORS.textFaint,
  },
  stageText: {
    fontSize: 11.5,
    color: COLORS.textMuted,
  },
  ageText: {
    fontSize: 11.5,
    color: COLORS.textMuted,
  },
  cardRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  weightValue: {
    fontSize: 14.5,
    color: COLORS.primaryDark,
    ...FONTS.heavy,
  },
  weightLabel: {
    fontSize: 10.5,
    color: COLORS.textFaint,
    ...FONTS.medium,
  },
});
