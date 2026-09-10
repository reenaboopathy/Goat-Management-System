import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOWS, SPACING } from '../../constants/theme';
import Header from '../../components/Header';
import Card from '../../components/Card';
import StatCard from '../../components/StatCard';
import Badge from '../../components/Badge';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { reportsApi, dashboardApi } from '../../api';
import {
  formatCurrency,
  formatWeight,
  formatDate,
  formatDateTime,
} from '../../utils/formatters';

const REPORT_TABS = [
  { key: 'summary', label: 'Summary', icon: 'pie-chart-outline' },
  { key: 'weights', label: 'Weight Gains', icon: 'scale-outline' },
  { key: 'sales', label: 'Revenue', icon: 'cash-outline' },
  { key: 'events', label: 'Health & Events', icon: 'medkit-outline' },
];

export default function ReportsScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('summary');
  const [summaryData, setSummaryData] = useState(null);
  const [weightsData, setWeightsData] = useState(null);
  const [salesData, setSalesData] = useState(null);
  const [eventsData, setEventsData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchReports = useCallback(async () => {
    try {
      setError(null);
      const [sumRes, weightRes, salesRes, eventsRes] = await Promise.all([
        reportsApi.getSummary().catch(() => null),
        reportsApi.getWeights().catch(() => null),
        reportsApi.getSales().catch(() => null),
        reportsApi.getEvents().catch(() => null),
      ]);

      if (sumRes) setSummaryData(sumRes);
      if (weightRes) setWeightsData(weightRes);
      if (salesRes) setSalesData(salesRes);
      if (eventsRes) setEventsData(eventsRes);
    } catch (err) {
      console.warn('Reports fetch error:', err);
      setError(err.message || 'Unable to load reports');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchReports();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />

      <Header title="Farm Reports" subtitle="Analytics, weight trends & financial metrics" />

      {/* Tabs Navigation */}
      <View style={styles.tabsRow}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScroll}>
          {REPORT_TABS.map((t) => {
            const isSelected = activeTab === t.key;
            return (
              <TouchableOpacity
                key={t.key}
                onPress={() => setActiveTab(t.key)}
                style={[styles.tabBtn, isSelected && styles.tabBtnActive]}
              >
                <Ionicons
                  name={t.icon}
                  size={16}
                  color={isSelected ? COLORS.primaryDark : COLORS.textMuted}
                />
                <Text style={[styles.tabText, isSelected && styles.tabTextActive]}>
                  {t.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      >
        {error ? <ErrorMessage message={error} onRetry={fetchReports} /> : null}

        {loading && !refreshing ? (
          <LoadingSpinner message="Generating farm reports..." />
        ) : (
          <>
            {/* SUMMARY TAB */}
            {activeTab === 'summary' && (
              <>
                <Text style={styles.sectionHeader}>Herd Overview Metrics</Text>
                <View style={styles.statsGrid}>
                  <StatCard
                    title="Total Goats"
                    value={String(summaryData?.herd?.total || 0)}
                    subtitle={`${summaryData?.herd?.active || 0} Active In Herd`}
                    iconName="paw"
                    accentColor={COLORS.primary}
                    bgColor={COLORS.primaryLight}
                    style={styles.statCol}
                  />

                  <StatCard
                    title="Total Herd Weight"
                    value={formatWeight(summaryData?.herd?.totalWeight)}
                    subtitle={`Avg: ${summaryData?.herd?.avgWeight || 0} kg`}
                    iconName="scale"
                    accentColor="#8B5CF6"
                    bgColor="#F3E8FF"
                    style={styles.statCol}
                  />

                  <StatCard
                    title="Gross Revenue"
                    value={formatCurrency(summaryData?.finance?.totalRevenue)}
                    subtitle="From goat sales"
                    iconName="trending-up"
                    accentColor="#10B981"
                    bgColor="#E8F8EE"
                    style={styles.statCol}
                  />

                  <StatCard
                    title="Net Profit"
                    value={formatCurrency(summaryData?.finance?.netProfit)}
                    subtitle="Revenue minus purchases"
                    iconName="wallet"
                    accentColor="#F59E0B"
                    bgColor="#FEF3C7"
                    style={styles.statCol}
                  />
                </View>

                <Card>
                  <Text style={styles.cardTitle}>Activity Counts</Text>
                  <View style={styles.metricRow}>
                    <Text style={styles.metricLabel}>Total Weight Measurements</Text>
                    <Text style={styles.metricValue}>{summaryData?.counts?.weights || 0}</Text>
                  </View>
                  <View style={styles.metricRow}>
                    <Text style={styles.metricLabel}>Health & Management Events</Text>
                    <Text style={styles.metricValue}>{summaryData?.counts?.events || 0}</Text>
                  </View>
                  <View style={[styles.metricRow, { borderBottomWidth: 0 }]}>
                    <Text style={styles.metricLabel}>Total Sales & Purchases</Text>
                    <Text style={styles.metricValue}>{summaryData?.counts?.sales || 0}</Text>
                  </View>
                </Card>
              </>
            )}

            {/* WEIGHT GAINS TAB */}
            {activeTab === 'weights' && (
              <>
                <Text style={styles.sectionHeader}>Weight Analysis</Text>
                <View style={styles.statsGrid}>
                  <StatCard
                    title="Total Gain"
                    value={`+${weightsData?.stats?.totalGainKg || 0} kg`}
                    subtitle="Cumulative herd gain"
                    iconName="trending-up"
                    accentColor="#10B981"
                    bgColor="#E8F8EE"
                    style={styles.statCol}
                  />

                  <StatCard
                    title="Logged Weighed"
                    value={String(weightsData?.stats?.totalRecords || 0)}
                    subtitle={`${weightsData?.stats?.gainsCount || 0} Gains, ${weightsData?.stats?.lossesCount || 0} Losses`}
                    iconName="analytics"
                    accentColor={COLORS.primary}
                    bgColor={COLORS.primaryLight}
                    style={styles.statCol}
                  />
                </View>

                <Card>
                  <Text style={styles.cardTitle}>Recent Weight Logs</Text>
                  {(weightsData?.weights || []).slice(0, 10).map((w, idx) => (
                    <View
                      key={w._id || String(idx)}
                      style={[styles.historyRow, idx > 0 && styles.historyRowBorder]}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={styles.historyGoatName}>{w.goatName}</Text>
                        <Text style={styles.historyDate}>{formatDate(w.recordedAt)}</Text>
                      </View>
                      <View style={{ alignItems: 'flex-end', gap: 2 }}>
                        <Text style={styles.historyWeight}>{formatWeight(w.weight)}</Text>
                        <Badge
                          label={
                            w.gainLoss === 'Gain'
                              ? `+${w.difference} kg`
                              : w.gainLoss === 'Loss'
                              ? `${w.difference} kg`
                              : 'Stable'
                          }
                          type={w.gainLoss}
                          size="small"
                        />
                      </View>
                    </View>
                  ))}
                </Card>
              </>
            )}

            {/* SALES & REVENUE TAB */}
            {activeTab === 'sales' && (
              <>
                <Text style={styles.sectionHeader}>Financial Performance</Text>
                <View style={styles.statsGrid}>
                  <StatCard
                    title="Sales Revenue"
                    value={formatCurrency(salesData?.stats?.totalSalesRevenue)}
                    subtitle="Paid transactions"
                    iconName="cash"
                    accentColor="#10B981"
                    bgColor="#E8F8EE"
                    style={styles.statCol}
                  />

                  <StatCard
                    title="Purchase Costs"
                    value={formatCurrency(salesData?.stats?.totalPurchasesCost)}
                    subtitle="Livestock acquired"
                    iconName="cart"
                    accentColor="#EF4444"
                    bgColor="#FEE2E2"
                    style={styles.statCol}
                  />
                </View>

                <Card>
                  <Text style={styles.cardTitle}>Sales Breakdown</Text>
                  {(salesData?.sales || []).slice(0, 10).map((s, idx) => (
                    <View
                      key={s._id || String(idx)}
                      style={[styles.historyRow, idx > 0 && styles.historyRowBorder]}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={styles.historyGoatName}>
                          {s.goatName} ({s.type})
                        </Text>
                        <Text style={styles.historyDate}>
                          {formatDate(s.saleDate)} · {s.buyer || s.person || 'Direct'}
                        </Text>
                      </View>
                      <View style={{ alignItems: 'flex-end', gap: 2 }}>
                        <Text style={styles.historySalesAmount}>
                          {formatCurrency(s.amount)}
                        </Text>
                        <Badge label={s.status || 'Paid'} size="small" type={s.status} />
                      </View>
                    </View>
                  ))}
                </Card>
              </>
            )}

            {/* HEALTH & EVENTS TAB */}
            {activeTab === 'events' && (
              <>
                <Text style={styles.sectionHeader}>Herd Events Breakdown</Text>
                <View style={styles.statsGrid}>
                  <StatCard
                    title="Total Events"
                    value={String(eventsData?.stats?.totalEvents || 0)}
                    subtitle="Recorded herd operations"
                    iconName="calendar"
                    accentColor={COLORS.primary}
                    bgColor={COLORS.primaryLight}
                    style={styles.statCol}
                  />

                  <StatCard
                    title="Veterinary Cost"
                    value={formatCurrency(eventsData?.stats?.totalCost)}
                    subtitle="Medicines & treatment"
                    iconName="medkit"
                    accentColor="#8B5CF6"
                    bgColor="#F3E8FF"
                    style={styles.statCol}
                  />
                </View>

                <Card>
                  <Text style={styles.cardTitle}>Events by Type</Text>
                  {Object.entries(eventsData?.stats?.breakdownByType || {}).map(
                    ([type, count], idx) => (
                      <View
                        key={type}
                        style={[styles.metricRow, idx === 0 && { borderTopWidth: 0 }]}
                      >
                        <Text style={styles.metricLabel}>{type}</Text>
                        <Badge label={`${count} recorded`} size="small" type="primary" />
                      </View>
                    )
                  )}
                </Card>
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },
  tabsRow: {
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  tabsScroll: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 8,
    gap: 8,
  },
  tabBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.round,
    backgroundColor: COLORS.surfaceSubtle,
    gap: 6,
  },
  tabBtnActive: {
    backgroundColor: COLORS.primaryLight,
  },
  tabText: {
    fontSize: 13,
    color: COLORS.textMuted,
    ...FONTS.semibold,
  },
  tabTextActive: {
    color: COLORS.primaryDark,
    ...FONTS.bold,
  },
  scrollContent: {
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
    paddingBottom: 60,
  },
  sectionHeader: {
    fontSize: 15,
    color: COLORS.primaryDark,
    ...FONTS.heavy,
    marginBottom: SPACING.sm,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: SPACING.md,
  },
  statCol: {
    width: '48.5%',
  },
  cardTitle: {
    fontSize: 15,
    color: COLORS.primaryDark,
    ...FONTS.heavy,
    marginBottom: SPACING.md,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  metricLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
    ...FONTS.medium,
  },
  metricValue: {
    fontSize: 14,
    color: COLORS.text,
    ...FONTS.bold,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  historyRowBorder: {
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  historyGoatName: {
    fontSize: 13.5,
    color: COLORS.primaryDark,
    ...FONTS.bold,
  },
  historyDate: {
    fontSize: 11.5,
    color: COLORS.textFaint,
    marginTop: 2,
  },
  historyWeight: {
    fontSize: 13.5,
    color: COLORS.text,
    ...FONTS.heavy,
  },
  historySalesAmount: {
    fontSize: 14,
    color: '#059669',
    ...FONTS.heavy,
  },
});
