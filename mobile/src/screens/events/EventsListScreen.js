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
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOWS, SPACING } from '../../constants/theme';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import EmptyState from '../../components/EmptyState';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import FilterModal from '../../components/FilterModal';
import { eventsApi } from '../../api';
import { EVENT_TYPES } from '../../constants/config';
import { formatDate, formatCurrency } from '../../utils/formatters';

export default function EventsListScreen({ navigation }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All Event Types');
  const [typeModalVisible, setTypeModalVisible] = useState(false);

  const fetchEvents = useCallback(async () => {
    try {
      setError(null);
      const data = await eventsApi.getAll({
        type: selectedType,
        search: search.trim(),
      });
      if (Array.isArray(data)) {
        setEvents(data);
      }
    } catch (err) {
      console.warn('Events fetch error:', err);
      setError(err.message || 'Unable to load events');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [search, selectedType]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents();
  };

  const handleDelete = (id, title) => {
    Alert.alert('Delete Event', `Are you sure you want to delete "${title}"?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await eventsApi.delete(id);
            fetchEvents();
          } catch (err) {
            Alert.alert('Error', err.message || 'Failed to delete event');
          }
        },
      },
    ]);
  };

  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchesType =
        selectedType === 'All Event Types' || ev.type === selectedType;
      const q = search.trim().toLowerCase();
      if (!q) return matchesType;

      const massNames = Array.isArray(ev.goats)
        ? ev.goats.map((g) => g?.name).join(' ')
        : '';
      const text = `${ev.title} ${ev.goatName || ''} ${ev.goatTagNumber || ''} ${ev.type} ${ev.notes || ''} ${massNames}`.toLowerCase();
      return matchesType && text.includes(q);
    });
  }, [events, selectedType, search]);

  const getEventIcon = (type) => {
    switch (type) {
      case 'Vaccination':
        return { name: 'shield-checkmark', color: '#16A34A', bg: '#DCFCE7' };
      case 'Health Check':
        return { name: 'medkit', color: '#0284C7', bg: '#E0F2FE' };
      case 'Mating':
        return { name: 'heart', color: '#E11D48', bg: '#FFE4E6' };
      case 'Birth':
        return { name: 'egg', color: '#D97706', bg: '#FEF3C7' };
      case 'Purchase':
      case 'Sale':
        return { name: 'cash', color: '#2563EB', bg: '#DBEAFE' };
      case 'Weight Check':
        return { name: 'scale', color: '#7C3AED', bg: '#EDE9FE' };
      case 'Milking':
        return { name: 'water', color: '#0891B2', bg: '#CFFAFE' };
      default:
        return { name: 'calendar', color: '#475569', bg: '#F1F5F9' };
    }
  };

  const renderEventItem = ({ item }) => {
    const icon = getEventIcon(item.type);
    const isMass = item.mode === 'mass' || (item.goats && item.goats.length > 1);

    return (
      <Card style={styles.card}>
        <View style={styles.eventRow}>
          <View style={[styles.iconCircle, { backgroundColor: icon.bg }]}>
            <Ionicons name={icon.name} size={22} color={icon.color} />
          </View>

          <View style={styles.metaCol}>
            <View style={styles.titleRow}>
              <Text style={styles.eventTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <Badge label={item.type} size="small" type="primary" />
            </View>

            <View style={styles.subMetaRow}>
              <Text style={styles.eventDate}>{formatDate(item.eventDate)}</Text>
              {item.goatName ? (
                <>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.goatTag}>
                    {item.goatName} {item.goatTagNumber ? `(#${item.goatTagNumber})` : ''}
                  </Text>
                </>
              ) : isMass ? (
                <>
                  <Text style={styles.dot}>•</Text>
                  <Text style={styles.massTag}>Mass Event ({item.goats?.length || 0} goats)</Text>
                </>
              ) : null}
            </View>

            {item.medicine ? (
              <Text style={styles.eventNote} numberOfLines={1}>
                Medicine: {item.medicine} {item.dosage ? `(${item.dosage})` : ''}
              </Text>
            ) : null}

            {item.cost ? (
              <Text style={styles.costText}>Cost: {formatCurrency(item.cost)}</Text>
            ) : null}

            {item.notes ? (
              <Text style={styles.eventNote} numberOfLines={2}>
                {item.notes}
              </Text>
            ) : null}
          </View>

          <View style={styles.actionCol}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditEvent', { event: item })}
              style={styles.actionBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="pencil" size={16} color={COLORS.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleDelete(item._id, item.title)}
              style={styles.actionBtn}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="trash-outline" size={16} color={COLORS.textFaint} />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Herd Events</Text>
            <Text style={styles.headerSubtitle}>
              {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} logged
            </Text>
          </View>

          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => navigation.navigate('AddEvent')}
            accessibilityLabel="Log new event"
          >
            <Ionicons name="add" size={20} color={COLORS.textWhite} />
            <Text style={styles.addBtnText}>Log Event</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={COLORS.textMuted} style={styles.searchIcon} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search events, vaccines, goats..."
            placeholderTextColor={COLORS.textFaint}
            style={styles.searchInput}
          />
          {search ? (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Filter Row */}
        <View style={styles.filterRow}>
          <TouchableOpacity
            style={[
              styles.filterPill,
              selectedType !== 'All Event Types' && styles.filterPillActive,
            ]}
            onPress={() => setTypeModalVisible(true)}
          >
            <Ionicons
              name="filter"
              size={14}
              color={selectedType !== 'All Event Types' ? COLORS.primaryDark : COLORS.textMuted}
            />
            <Text
              style={[
                styles.filterPillText,
                selectedType !== 'All Event Types' && styles.filterPillTextActive,
              ]}
              numberOfLines={1}
            >
              {selectedType}
            </Text>
            <Ionicons
              name="chevron-down"
              size={14}
              color={selectedType !== 'All Event Types' ? COLORS.primaryDark : COLORS.textMuted}
            />
          </TouchableOpacity>

          {(selectedType !== 'All Event Types' || search) && (
            <TouchableOpacity
              style={styles.resetBtn}
              onPress={() => {
                setSelectedType('All Event Types');
                setSearch('');
              }}
            >
              <Ionicons name="refresh" size={14} color={COLORS.danger} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Main List */}
      <View style={styles.container}>
        {error ? <ErrorMessage message={error} onRetry={fetchEvents} /> : null}

        {loading && !refreshing ? (
          <LoadingSpinner message="Loading events..." />
        ) : (
          <FlatList
            data={filteredEvents}
            keyExtractor={(item) => item._id}
            renderItem={renderEventItem}
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
                iconName="calendar-outline"
                title="No events found"
                description={
                  search || selectedType !== 'All Event Types'
                    ? 'No events match the selected search or filter.'
                    : 'Track vaccinations, breeding, medical treatments and checkups.'
                }
                actionLabel="Log New Event"
                onAction={() => navigation.navigate('AddEvent')}
              />
            }
          />
        )}
      </View>

      {/* Type Filter Modal */}
      <FilterModal
        visible={typeModalVisible}
        title="Filter by Event Type"
        options={EVENT_TYPES}
        selectedOption={selectedType}
        onSelect={setSelectedType}
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
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    gap: 4,
    ...SHADOWS.sm,
  },
  addBtnText: {
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
  filterRow: {
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
  resetBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
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
  eventRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaCol: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  eventTitle: {
    fontSize: 15,
    color: COLORS.primaryDark,
    ...FONTS.heavy,
    flex: 1,
  },
  subMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
    gap: 6,
  },
  eventDate: {
    fontSize: 12,
    color: COLORS.textMuted,
  },
  dot: {
    fontSize: 11,
    color: COLORS.textFaint,
  },
  goatTag: {
    fontSize: 12,
    color: COLORS.primary,
    ...FONTS.bold,
  },
  massTag: {
    fontSize: 12,
    color: '#D97706',
    ...FONTS.bold,
  },
  eventNote: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 4,
  },
  costText: {
    fontSize: 12,
    color: '#059669',
    ...FONTS.bold,
    marginTop: 2,
  },
  actionCol: {
    alignItems: 'center',
    gap: 8,
  },
  actionBtn: {
    padding: 4,
  },
});
