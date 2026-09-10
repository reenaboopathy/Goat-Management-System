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
import { salesApi } from '../../api';
import { formatCurrency, formatDate, formatWeight } from '../../utils/formatters';

export default function SalesListScreen({ navigation }) {
  const [salesData, setSalesData] = useState([]);
  const [stats, setStats] = useState({
    totalSalesRevenue: 0,
    totalPurchasesCost: 0,
    netBalance: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState('All'); // 'All' | 'Sale' | 'Purchase'
  const [typeModalVisible, setTypeModalVisible] = useState(false);

  const fetchSales = useCallback(async () => {
    try {
      setError(null);
      const res = await salesApi.getAll({
        type: selectedType,
        search: search.trim(),
      });
      if (res && res.sales) {
        setSalesData(res.sales);
        if (res.stats) setStats(res.stats);
      } else if (Array.isArray(res)) {
        setSalesData(res);
      }
    } catch (err) {
      console.warn('Sales fetch error:', err);
      setError(err.message || 'Unable to load sales transactions');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [search, selectedType]);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchSales();
  };

  const handleDelete = (id, goatName, amount) => {
    Alert.alert(
      'Delete Transaction',
      `Are you sure you want to delete transaction for ${goatName} (${formatCurrency(amount)})?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await salesApi.delete(id);
              fetchSales();
            } catch (err) {
              Alert.alert('Error', err.message || 'Failed to delete transaction');
            }
          },
        },
      ]
    );
  };

  const filteredSales = useMemo(() => {
    return salesData.filter((item) => {
      const matchType = selectedType === 'All' || item.type === selectedType;
      const q = search.trim().toLowerCase();
      if (!q) return matchType;

      const searchable = `${item.goatName} ${item.goatTagNumber || ''} ${item.buyer || item.person || ''} ${item.notes || ''}`.toLowerCase();
      return matchType && searchable.includes(q);
    });
  }, [salesData, selectedType, search]);

  const renderSaleCard = ({ item }) => {
    const isSale = item.type === 'Sale';

    return (
      <Card style={styles.card}>
        <View style={styles.cardTopRow}>
          <View style={styles.goatCol}>
            <View style={styles.nameRow}>
              <Text style={styles.goatName}>{item.goatName}</Text>
              {item.goatTagNumber ? (
                <Text style={styles.tagNumber}>#{item.goatTagNumber}</Text>
              ) : null}
            </View>
            <Text style={styles.dateText}>{formatDate(item.saleDate)}</Text>
          </View>

          <View style={styles.amountCol}>
            <Text style={[styles.amountText, !isSale && styles.purchaseAmountText]}>
              {isSale ? '+' : '-'}
              {formatCurrency(item.amount)}
            </Text>
            <Badge label={item.type || 'Sale'} type={isSale ? 'gain' : 'warning'} size="small" />
          </View>
        </View>

        <View style={styles.detailsRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>{isSale ? 'BUYER' : 'SELLER'}</Text>
            <Text style={styles.detailValue} numberOfLines={1}>
              {item.buyer || item.person || 'Direct Customer'}
            </Text>
          </View>

          {item.weight ? (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>WEIGHT</Text>
              <Text style={styles.detailValue}>{formatWeight(item.weight)}</Text>
            </View>
          ) : null}

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>PAYMENT</Text>
            <Text style={styles.detailValue}>{item.method || 'Cash'}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>STATUS</Text>
            <Badge label={item.status || 'Paid'} size="small" type={item.status} />
          </View>
        </View>

        <View style={styles.cardFooterRow}>
          <Text style={styles.notesText} numberOfLines={1}>
            {item.notes || 'No extra notes recorded.'}
          </Text>
          <TouchableOpacity
            onPress={() => handleDelete(item._id, item.goatName, item.amount)}
            style={styles.deleteBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons name="trash-outline" size={16} color={COLORS.textFaint} />
          </TouchableOpacity>
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
            <Text style={styles.headerTitle}>Sales & Purchases</Text>
            <Text style={styles.headerSubtitle}>
              {filteredSales.length} transaction{filteredSales.length !== 1 ? 's' : ''} recorded
            </Text>
          </View>

          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => navigation.navigate('AddSale')}
            accessibilityLabel="Record new transaction"
          >
            <Ionicons name="add" size={20} color={COLORS.textWhite} />
            <Text style={styles.addBtnText}>Sell Goat</Text>
          </TouchableOpacity>
        </View>

        {/* Revenue Summary Bar */}
        <View style={styles.summaryBar}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>TOTAL SALES</Text>
            <Text style={[styles.summaryValue, { color: '#34D399' }]}>
              {formatCurrency(stats.totalSalesRevenue)}
            </Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>PURCHASES</Text>
            <Text style={[styles.summaryValue, { color: '#F87171' }]}>
              {formatCurrency(stats.totalPurchasesCost)}
            </Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>NET REVENUE</Text>
            <Text style={styles.summaryValue}>{formatCurrency(stats.netBalance)}</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={COLORS.textMuted} style={styles.searchIcon} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search goat name, buyer, tag #..."
            placeholderTextColor={COLORS.textFaint}
            style={styles.searchInput}
          />
          {search ? (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Filter Type Pills */}
        <View style={styles.filterRow}>
          {['All', 'Sale', 'Purchase'].map((t) => {
            const isSelected = selectedType === t;
            return (
              <TouchableOpacity
                key={t}
                onPress={() => setSelectedType(t)}
                style={[styles.filterPill, isSelected && styles.filterPillActive]}
              >
                <Text style={[styles.filterPillText, isSelected && styles.filterPillTextActive]}>
                  {t === 'All' ? 'All Types' : t + 's'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Main List */}
      <View style={styles.container}>
        {error ? <ErrorMessage message={error} onRetry={fetchSales} /> : null}

        {loading && !refreshing ? (
          <LoadingSpinner message="Loading sales records..." />
        ) : (
          <FlatList
            data={filteredSales}
            keyExtractor={(item) => item._id}
            renderItem={renderSaleCard}
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
                iconName="cart-outline"
                title="No sales transactions found"
                description={
                  search || selectedType !== 'All'
                    ? 'No sales match the search or filter criteria.'
                    : 'Record goat sales and purchase transactions with live customer and price tracking.'
                }
                actionLabel="Record New Sale"
                onAction={() => navigation.navigate('AddSale')}
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
  summaryBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: RADIUS.md,
    paddingVertical: 10,
    marginBottom: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  summaryLabel: {
    fontSize: 9.5,
    color: 'rgba(255, 255, 255, 0.7)',
    ...FONTS.heavy,
    letterSpacing: 0.4,
  },
  summaryValue: {
    fontSize: 14,
    color: COLORS.textWhite,
    ...FONTS.heavy,
    marginTop: 2,
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
    gap: 8,
  },
  filterPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: RADIUS.round,
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
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  goatCol: {
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
  amountCol: {
    alignItems: 'flex-end',
    gap: 4,
  },
  amountText: {
    fontSize: 16,
    color: '#059669',
    ...FONTS.heavy,
  },
  purchaseAmountText: {
    color: '#DC2626',
  },
  detailsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surfaceSubtle,
    borderRadius: RADIUS.md,
    padding: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 9,
    color: COLORS.textMuted,
    ...FONTS.heavy,
    letterSpacing: 0.3,
  },
  detailValue: {
    fontSize: 12.5,
    color: COLORS.text,
    ...FONTS.bold,
    marginTop: 2,
  },
  cardFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  notesText: {
    fontSize: 11.5,
    color: COLORS.textMuted,
    flex: 1,
    fontStyle: 'italic',
  },
  deleteBtn: {
    padding: 4,
    marginLeft: 8,
  },
});
