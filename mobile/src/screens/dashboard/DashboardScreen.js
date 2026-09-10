import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOWS, SPACING } from '../../constants/theme';
import StatCard from '../../components/StatCard';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { dashboardApi } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency, formatWeight, formatDate, formatDateTime } from '../../utils/formatters';

export default function DashboardScreen({ navigation }) {
  const { user, tenant } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setError(null);
      const data = await dashboardApi.getStats();
      if (data) {
        setStats(data);
      }
    } catch (err) {
      console.warn('Dashboard fetch error:', err);
      setError(err.message || 'Unable to load dashboard data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDashboardData();
  };

  const cards = stats?.cards || {
    totalGoats: 0,
    activeGoats: 0,
    soldGoats: 0,
    totalWeight: 0,
    averageWeight: 0,
    totalSales: 0,
  };

  const recentWeights = stats?.recentWeightRecords || [];
  const recentActivities = stats?.recentActivities || [];
  const recentSales = stats?.recentSales || [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.farmTitle}>{tenant?.name || 'Green Valley Farm'}</Text>
            <Text style={styles.welcomeText}>
              Hello, {user?.name || user?.username || 'Farmer'} 👋
            </Text>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SettingsTab')}
              style={styles.iconButton}
              accessibilityLabel="Settings"
            >
              <Ionicons name="settings-outline" size={20} color={COLORS.textWhite} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statusPillRow}>
          <View style={styles.livePill}>
            <View style={styles.pulseDot} />
            <Text style={styles.liveText}>Farm System Live</Text>
          </View>
          <Text style={styles.timestampText}>
            Updated {stats?.lastUpdated ? new Date(stats.lastUpdated).toLocaleTimeString() : 'now'}
          </Text>
        </View>
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
        {error ? <ErrorMessage message={error} onRetry={fetchDashboardData} /> : null}

        {loading && !refreshing ? (
          <LoadingSpinner message="Loading dashboard stats..." />
        ) : (
          <>
            {/* Quick Action Bar */}
            <View style={styles.quickActionsContainer}>
              <Text style={styles.sectionHeading}>Quick Actions</Text>
              <View style={styles.actionGrid}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => navigation.navigate('GoatsTab', { screen: 'AddGoat' })}
                >
                  <View style={[styles.actionIconCircle, { backgroundColor: '#E0F2FE' }]}>
                    <Ionicons name="add-circle" size={22} color="#0284C7" />
                  </View>
                  <Text style={styles.actionLabel}>Add Goat</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => navigation.navigate('WeightTab', { screen: 'WeightRecording' })}
                >
                  <View style={[styles.actionIconCircle, { backgroundColor: '#DCFCE7' }]}>
                    <Ionicons name="scale" size={22} color="#16A34A" />
                  </View>
                  <Text style={styles.actionLabel}>Weigh Scale</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => navigation.navigate('EventsTab', { screen: 'AddEvent' })}
                >
                  <View style={[styles.actionIconCircle, { backgroundColor: '#F3E8FF' }]}>
                    <Ionicons name="calendar" size={22} color="#9333EA" />
                  </View>
                  <Text style={styles.actionLabel}>Log Event</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => navigation.navigate('SalesTab', { screen: 'AddSale' })}
                >
                  <View style={[styles.actionIconCircle, { backgroundColor: '#FEF3C7' }]}>
                    <Ionicons name="cart" size={22} color="#D97706" />
                  </View>
                  <Text style={styles.actionLabel}>Sell Goat</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* KPI Statistics Grid */}
            <Text style={styles.sectionHeading}>Herd Overview</Text>
            <View style={styles.statsGrid}>
              <StatCard
                title="Total Goats"
                value={String(cards.totalGoats)}
                subtitle={`${cards.activeGoats} Active Herd`}
                iconName="paw"
                accentColor={COLORS.primary}
                bgColor={COLORS.primaryLight}
                onPress={() => navigation.navigate('GoatsTab')}
                style={styles.statCol}
              />

              <StatCard
                title="Active Herd"
                value={String(cards.activeGoats)}
                subtitle={`${cards.soldGoats} Sold`}
                iconName="shield-checkmark"
                accentColor="#10B981"
                bgColor="#E8F8EE"
                onPress={() => navigation.navigate('GoatsTab')}
                style={styles.statCol}
              />

              <StatCard
                title="Total Herd Weight"
                value={formatWeight(cards.totalWeight)}
                subtitle={`Avg: ${cards.averageWeight} kg / goat`}
                iconName="scale"
                accentColor="#8B5CF6"
                bgColor="#F3E8FF"
                onPress={() => navigation.navigate('WeightTab')}
                style={styles.statCol}
              />

              <StatCard
                title="Total Sales"
                value={formatCurrency(cards.totalSales)}
                subtitle="From completed sales"
                iconName="cash"
                accentColor="#F59E0B"
                bgColor="#FEF3C7"
                onPress={() => navigation.navigate('SalesTab')}
                style={styles.statCol}
              />
            </View>

            {/* Recent Weight Measurements */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeading}>Recent Weight Records</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('WeightTab', { screen: 'WeightHistory' })}
              >
                <Text style={styles.viewAllText}>View All ›</Text>
              </TouchableOpacity>
            </View>

            {recentWeights.length === 0 ? (
              <Card style={styles.emptyCard}>
                <Ionicons name="scale-outline" size={28} color={COLORS.textFaint} />
                <Text style={styles.emptyCardText}>No recent weight records</Text>
                <Button
                  title="Weigh First Goat"
                  size="small"
                  variant="outline"
                  onPress={() => navigation.navigate('WeightTab', { screen: 'WeightRecording' })}
                  style={{ marginTop: 8 }}
                />
              </Card>
            ) : (
              <Card style={styles.listCard}>
                {recentWeights.map((w, i) => (
                  <View
                    key={w._id || String(i)}
                    style={[styles.listItem, i > 0 && styles.listItemBorder]}
                  >
                    <View style={styles.weightIconBox}>
                      <Ionicons name="scale" size={18} color={COLORS.primary} />
                    </View>
                    <View style={styles.listFlex}>
                      <Text style={styles.listPrimaryText}>
                        {w.goatName} {w.goatTagNumber ? `(#${w.goatTagNumber})` : ''}
                      </Text>
                      <Text style={styles.listSecondaryText}>
                        {formatDateTime(w.recordedAt)} · {w.source || 'Scale'}
                      </Text>
                    </View>
                    <View style={styles.listEndCol}>
                      <Text style={styles.weightNumberText}>{w.weight} kg</Text>
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
            )}

            {/* Recent Activities & Events */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeading}>Recent Herd Events</Text>
              <TouchableOpacity onPress={() => navigation.navigate('EventsTab')}>
                <Text style={styles.viewAllText}>View All ›</Text>
              </TouchableOpacity>
            </View>

            {recentActivities.length === 0 ? (
              <Card style={styles.emptyCard}>
                <Ionicons name="calendar-outline" size={28} color={COLORS.textFaint} />
                <Text style={styles.emptyCardText}>No recent herd events</Text>
              </Card>
            ) : (
              <Card style={styles.listCard}>
                {recentActivities.map((ev, i) => (
                  <View
                    key={ev._id || String(i)}
                    style={[styles.listItem, i > 0 && styles.listItemBorder]}
                  >
                    <View style={[styles.weightIconBox, { backgroundColor: '#F3E8FF' }]}>
                      <Ionicons name="medical" size={16} color="#9333EA" />
                    </View>
                    <View style={styles.listFlex}>
                      <Text style={styles.listPrimaryText}>{ev.title}</Text>
                      <Text style={styles.listSecondaryText}>
                        {formatDate(ev.eventDate)} · {ev.type}
                      </Text>
                    </View>
                    <Badge label={ev.type} size="small" type="primary" />
                  </View>
                ))}
              </Card>
            )}

            {/* Recent Sales */}
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeading}>Recent Transactions</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SalesTab')}>
                <Text style={styles.viewAllText}>View All ›</Text>
              </TouchableOpacity>
            </View>

            {recentSales.length === 0 ? (
              <Card style={styles.emptyCard}>
                <Ionicons name="cart-outline" size={28} color={COLORS.textFaint} />
                <Text style={styles.emptyCardText}>No recent sales records</Text>
              </Card>
            ) : (
              <Card style={styles.listCard}>
                {recentSales.map((s, i) => (
                  <View
                    key={s._id || String(i)}
                    style={[styles.listItem, i > 0 && styles.listItemBorder]}
                  >
                    <View style={[styles.weightIconBox, { backgroundColor: '#FEF3C7' }]}>
                      <Ionicons name="cash" size={16} color="#D97706" />
                    </View>
                    <View style={styles.listFlex}>
                      <Text style={styles.listPrimaryText}>
                        {s.goatName} · {s.type || 'Sale'}
                      </Text>
                      <Text style={styles.listSecondaryText}>
                        {formatDate(s.saleDate)} · Buyer: {s.buyer || s.person || 'Direct'}
                      </Text>
                    </View>
                    <View style={styles.listEndCol}>
                      <Text style={styles.salesAmountText}>{formatCurrency(s.amount)}</Text>
                      <Badge label={s.status || 'Paid'} size="small" type={s.status} />
                    </View>
                  </View>
                ))}
              </Card>
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
  header: {
    backgroundColor: COLORS.primaryDark,
    paddingTop: 12,
    paddingBottom: 20,
    paddingHorizontal: SPACING.lg,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  farmTitle: {
    fontSize: 22,
    color: COLORS.textWhite,
    ...FONTS.heavy,
    letterSpacing: 0.3,
  },
  welcomeText: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
    ...FONTS.medium,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusPillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.round,
    gap: 6,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34D399',
  },
  liveText: {
    color: COLORS.textWhite,
    fontSize: 12,
    ...FONTS.bold,
  },
  timestampText: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 11,
    ...FONTS.medium,
  },
  scrollContent: {
    backgroundColor: COLORS.background,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: 40,
  },
  sectionHeading: {
    fontSize: 15,
    color: COLORS.primaryDark,
    ...FONTS.heavy,
    marginVertical: SPACING.sm,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
  },
  viewAllText: {
    fontSize: 12.5,
    color: COLORS.primary,
    ...FONTS.bold,
  },
  quickActionsContainer: {
    marginBottom: SPACING.sm,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.lg,
    paddingVertical: 12,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...SHADOWS.sm,
  },
  actionIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  actionLabel: {
    fontSize: 11.5,
    color: COLORS.text,
    ...FONTS.bold,
    textAlign: 'center',
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
  listCard: {
    padding: 0,
    overflow: 'hidden',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    gap: 12,
  },
  listItemBorder: {
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
  },
  weightIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listFlex: {
    flex: 1,
  },
  listPrimaryText: {
    fontSize: 13.5,
    color: COLORS.text,
    ...FONTS.bold,
  },
  listSecondaryText: {
    fontSize: 11.5,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  listEndCol: {
    alignItems: 'flex-end',
    gap: 4,
  },
  weightNumberText: {
    fontSize: 14,
    color: COLORS.primaryDark,
    ...FONTS.heavy,
  },
  salesAmountText: {
    fontSize: 14,
    color: '#059669',
    ...FONTS.heavy,
  },
  emptyCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 24,
    gap: 6,
  },
  emptyCardText: {
    fontSize: 13,
    color: COLORS.textFaint,
    ...FONTS.semibold,
  },
});
