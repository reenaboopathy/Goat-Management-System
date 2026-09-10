import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SHADOWS, SPACING } from '../../constants/theme';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Badge from '../../components/Badge';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { goatsApi } from '../../api';
import {
  formatWeight,
  formatDate,
  formatDateTime,
  calculateAge,
  formatCurrency,
} from '../../utils/formatters';

export default function GoatDetailScreen({ route, navigation }) {
  const { goatId } = route.params || {};

  const [goat, setGoat] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'weights' | 'events' | 'sales'
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const fetchGoatDetails = useCallback(async () => {
    if (!goatId) return;
    try {
      setError(null);
      const data = await goatsApi.getById(goatId);
      if (data) {
        setGoat(data);
      }
    } catch (err) {
      console.warn('Goat detail fetch error:', err);
      setError(err.message || 'Failed to load goat profile');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [goatId]);

  useEffect(() => {
    fetchGoatDetails();
  }, [fetchGoatDetails]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchGoatDetails();
  };

  const handleStatusChange = (status) => {
    Alert.alert(
      `Mark as ${status}?`,
      `Are you sure you want to change ${goat?.name}'s status to ${status}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: `Mark ${status}`,
          style: status === 'Dead' ? 'destructive' : 'default',
          onPress: async () => {
            try {
              await goatsApi.updateStatus(goatId, status, `Changed status to ${status}`);
              fetchGoatDetails();
            } catch (err) {
              Alert.alert('Error', err.message || 'Failed to update status');
            }
          },
        },
      ]
    );
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Goat',
      `Are you sure you want to permanently remove ${goat?.name} (#${goat?.tagNumber})? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await goatsApi.delete(goatId);
              navigation.goBack();
            } catch (err) {
              Alert.alert('Error', err.message || 'Failed to delete goat');
            }
          },
        },
      ]
    );
  };

  if (loading && !refreshing) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Header title="Goat Profile" onBack={() => navigation.goBack()} />
        <LoadingSpinner message="Loading goat profile..." fullScreen />
      </SafeAreaView>
    );
  }

  const weights = goat?.weights || [];
  const events = goat?.events || [];
  const sales = goat?.sales || [];
  const isMale = goat?.gender === 'Male';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />

      {/* Hero Banner Header */}
      <View style={styles.heroBanner}>
        <View style={styles.heroTopRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.heroBackBtn}
          >
            <Ionicons name="arrow-back" size={22} color={COLORS.textWhite} />
          </TouchableOpacity>

          <View style={styles.heroActionBtns}>
            <TouchableOpacity
              onPress={() => navigation.navigate('EditGoat', { goat })}
              style={styles.heroBackBtn}
            >
              <Ionicons name="pencil" size={18} color={COLORS.textWhite} />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleDelete} style={styles.heroBackBtn}>
              <Ionicons name="trash-outline" size={18} color="#FCA5A5" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.heroProfileRow}>
          <View style={[styles.heroAvatarBox, isMale ? styles.avatarMale : styles.avatarFemale]}>
            <Text style={styles.heroAvatarEmoji}>🐐</Text>
          </View>

          <View style={styles.heroTextCol}>
            <View style={styles.heroNameRow}>
              <Text style={styles.heroName}>{goat?.name || 'Goat Details'}</Text>
              <Badge label={goat?.status || 'Active'} type={goat?.status} size="small" />
            </View>
            <Text style={styles.heroTagNumber}>Tag #{goat?.tagNumber || '—'}</Text>
            <Text style={styles.heroMeta}>
              {goat?.breed} · {goat?.gender} · {goat?.stage}
            </Text>
          </View>
        </View>

        {/* Current Weight Quick Pill */}
        <View style={styles.weightPillBar}>
          <View style={styles.weightPillItem}>
            <Text style={styles.weightPillLabel}>CURRENT WEIGHT</Text>
            <Text style={styles.weightPillValue}>{formatWeight(goat?.currentWeight)}</Text>
          </View>
          <View style={styles.weightPillDivider} />
          <View style={styles.weightPillItem}>
            <Text style={styles.weightPillLabel}>AGE</Text>
            <Text style={styles.weightPillValue}>{calculateAge(goat?.dob)}</Text>
          </View>
          <View style={styles.weightPillDivider} />
          <View style={styles.weightPillItem}>
            <Text style={styles.weightPillLabel}>ORIGIN</Text>
            <Text style={styles.weightPillValue}>{goat?.origin || 'Born on farm'}</Text>
          </View>
        </View>
      </View>

      {/* Action Buttons Row */}
      <View style={styles.actionButtonsRow}>
        <Button
          title="Weigh"
          variant="primary"
          size="small"
          iconName="scale-outline"
          onPress={() =>
            navigation.navigate('WeightTab', {
              screen: 'WeightRecording',
              params: { initialGoatId: goat?._id },
            })
          }
          style={styles.actionBtn}
        />

        <Button
          title="Log Event"
          variant="secondary"
          size="small"
          iconName="calendar-outline"
          onPress={() =>
            navigation.navigate('EventsTab', {
              screen: 'AddEvent',
              params: { preselectedGoat: goat },
            })
          }
          style={styles.actionBtn}
        />

        {goat?.status !== 'Sold' && (
          <Button
            title="Sell"
            variant="outline"
            size="small"
            iconName="cart-outline"
            onPress={() =>
              navigation.navigate('SalesTab', {
                screen: 'AddSale',
                params: { preselectedGoat: goat },
              })
            }
            style={styles.actionBtn}
          />
        )}
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabsContainer}>
        {[
          { key: 'overview', label: 'Overview', count: null },
          { key: 'weights', label: 'Weights', count: weights.length },
          { key: 'events', label: 'Events', count: events.length },
          { key: 'sales', label: 'Sales', count: sales.length },
        ].map((t) => (
          <TouchableOpacity
            key={t.key}
            onPress={() => setActiveTab(t.key)}
            style={[styles.tabBtn, activeTab === t.key && styles.tabBtnActive]}
          >
            <Text style={[styles.tabLabel, activeTab === t.key && styles.tabLabelActive]}>
              {t.label}
              {t.count !== null ? ` (${t.count})` : ''}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Tab Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
        }
      >
        {error ? <ErrorMessage message={error} onRetry={fetchGoatDetails} /> : null}

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <>
            <Card>
              <Text style={styles.cardHeader}>Goat Information</Text>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Tag Number</Text>
                <Text style={styles.detailValue}>#{goat?.tagNumber || '—'}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Name</Text>
                <Text style={styles.detailValue}>{goat?.name || '—'}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Breed</Text>
                <Text style={styles.detailValue}>{goat?.breed || '—'}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Gender</Text>
                <Badge label={goat?.gender || 'Female'} type={goat?.gender} size="small" />
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Life Stage</Text>
                <Text style={styles.detailValue}>{goat?.stage || '—'}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date of Birth</Text>
                <Text style={styles.detailValue}>
                  {formatDate(goat?.dob)} ({calculateAge(goat?.dob)})
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Origin</Text>
                <Text style={styles.detailValue}>{goat?.origin || 'Born on farm'}</Text>
              </View>

              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Group / Herd</Text>
                <Text style={styles.detailValue}>{goat?.group || 'All Groups'}</Text>
              </View>

              <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
                <Text style={styles.detailLabel}>Status</Text>
                <Badge label={goat?.status || 'Active'} type={goat?.status} size="small" />
              </View>
            </Card>

            {goat?.notes ? (
              <Card>
                <Text style={styles.cardHeader}>Notes & Observations</Text>
                <Text style={styles.notesBody}>{goat.notes}</Text>
              </Card>
            ) : null}

            {/* Status Management Card */}
            <Card>
              <Text style={styles.cardHeader}>Status Management</Text>
              <View style={styles.statusButtonsGrid}>
                {goat?.status !== 'Active' && (
                  <Button
                    title="Mark Active"
                    variant="outline"
                    size="small"
                    onPress={() => handleStatusChange('Active')}
                    style={styles.statusChangeBtn}
                  />
                )}
                {goat?.status !== 'Archived' && (
                  <Button
                    title="Archive"
                    variant="outline"
                    size="small"
                    onPress={() => handleStatusChange('Archived')}
                    style={styles.statusChangeBtn}
                  />
                )}
                {goat?.status !== 'Dead' && (
                  <Button
                    title="Mark Dead"
                    variant="danger"
                    size="small"
                    onPress={() => handleStatusChange('Dead')}
                    style={styles.statusChangeBtn}
                  />
                )}
              </View>
            </Card>
          </>
        )}

        {/* WEIGHT HISTORY TAB */}
        {activeTab === 'weights' && (
          <>
            {weights.length === 0 ? (
              <Card style={styles.emptyTabCard}>
                <Ionicons name="scale-outline" size={32} color={COLORS.textFaint} />
                <Text style={styles.emptyTabText}>No weight records available</Text>
                <Button
                  title="Take Weight Measurement"
                  variant="primary"
                  size="small"
                  iconName="scale-outline"
                  onPress={() =>
                    navigation.navigate('WeightTab', {
                      screen: 'WeightRecording',
                      params: { initialGoatId: goat?._id },
                    })
                  }
                  style={{ marginTop: 10 }}
                />
              </Card>
            ) : (
              weights.map((w, idx) => (
                <Card key={w._id || String(idx)} style={styles.logCard}>
                  <View style={styles.logRow}>
                    <View style={styles.logIconBox}>
                      <Ionicons name="scale" size={20} color={COLORS.primary} />
                    </View>
                    <View style={styles.logMetaCol}>
                      <Text style={styles.logTitle}>{w.weight} kg</Text>
                      <Text style={styles.logDate}>{formatDateTime(w.recordedAt)}</Text>
                      {w.notes ? <Text style={styles.logNotes}>{w.notes}</Text> : null}
                    </View>
                    <View style={styles.logBadgeCol}>
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
                      <Text style={styles.sourceText}>{w.source || 'Scale'}</Text>
                    </View>
                  </View>
                </Card>
              ))
            )}
          </>
        )}

        {/* EVENTS TAB */}
        {activeTab === 'events' && (
          <>
            {events.length === 0 ? (
              <Card style={styles.emptyTabCard}>
                <Ionicons name="calendar-outline" size={32} color={COLORS.textFaint} />
                <Text style={styles.emptyTabText}>No events logged for this goat</Text>
                <Button
                  title="Log First Event"
                  variant="primary"
                  size="small"
                  iconName="add"
                  onPress={() =>
                    navigation.navigate('EventsTab', {
                      screen: 'AddEvent',
                      params: { preselectedGoat: goat },
                    })
                  }
                  style={{ marginTop: 10 }}
                />
              </Card>
            ) : (
              events.map((ev, idx) => (
                <Card key={ev._id || String(idx)} style={styles.logCard}>
                  <View style={styles.logRow}>
                    <View style={[styles.logIconBox, { backgroundColor: '#F3E8FF' }]}>
                      <Ionicons name="medical-outline" size={20} color="#9333EA" />
                    </View>
                    <View style={styles.logMetaCol}>
                      <Text style={styles.logTitle}>{ev.title}</Text>
                      <Text style={styles.logDate}>{formatDate(ev.eventDate)}</Text>
                      {ev.medicine ? (
                        <Text style={styles.logNotes}>Medicine: {ev.medicine}</Text>
                      ) : null}
                      {ev.vet ? (
                        <Text style={styles.logNotes}>Attended by: {ev.vet}</Text>
                      ) : null}
                      {ev.notes ? <Text style={styles.logNotes}>{ev.notes}</Text> : null}
                    </View>
                    <Badge label={ev.type} size="small" type="primary" />
                  </View>
                </Card>
              ))
            )}
          </>
        )}

        {/* SALES TAB */}
        {activeTab === 'sales' && (
          <>
            {sales.length === 0 ? (
              <Card style={styles.emptyTabCard}>
                <Ionicons name="cart-outline" size={32} color={COLORS.textFaint} />
                <Text style={styles.emptyTabText}>No sales transactions for this goat</Text>
                {goat?.status !== 'Sold' && (
                  <Button
                    title="Record Sale"
                    variant="primary"
                    size="small"
                    iconName="cart-outline"
                    onPress={() =>
                      navigation.navigate('SalesTab', {
                        screen: 'AddSale',
                        params: { preselectedGoat: goat },
                      })
                    }
                    style={{ marginTop: 10 }}
                  />
                )}
              </Card>
            ) : (
              sales.map((s, idx) => (
                <Card key={s._id || String(idx)} style={styles.logCard}>
                  <View style={styles.logRow}>
                    <View style={[styles.logIconBox, { backgroundColor: '#FEF3C7' }]}>
                      <Ionicons name="cash-outline" size={20} color="#D97706" />
                    </View>
                    <View style={styles.logMetaCol}>
                      <Text style={styles.logTitle}>{formatCurrency(s.amount)}</Text>
                      <Text style={styles.logDate}>
                        {formatDate(s.saleDate)} · Buyer: {s.buyer || s.person || 'Direct'}
                      </Text>
                      <Text style={styles.logNotes}>Method: {s.method || 'Cash'}</Text>
                    </View>
                    <Badge label={s.status || 'Paid'} size="small" type={s.status} />
                  </View>
                </Card>
              ))
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
  heroBanner: {
    backgroundColor: COLORS.primaryDark,
    paddingHorizontal: SPACING.lg,
    paddingTop: 10,
    paddingBottom: 18,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  heroBackBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroActionBtns: {
    flexDirection: 'row',
    gap: 8,
  },
  heroProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  heroAvatarBox: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.md,
  },
  avatarFemale: {
    backgroundColor: '#FCE7F3',
  },
  avatarMale: {
    backgroundColor: '#E0F2FE',
  },
  heroAvatarEmoji: {
    fontSize: 34,
  },
  heroTextCol: {
    flex: 1,
  },
  heroNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroName: {
    fontSize: 20,
    color: COLORS.textWhite,
    ...FONTS.heavy,
  },
  heroTagNumber: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
    ...FONTS.semibold,
  },
  heroMeta: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  weightPillBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: RADIUS.md,
    paddingVertical: 10,
    marginTop: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  weightPillItem: {
    alignItems: 'center',
    flex: 1,
  },
  weightPillDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  weightPillLabel: {
    fontSize: 9.5,
    color: 'rgba(255, 255, 255, 0.7)',
    ...FONTS.heavy,
    letterSpacing: 0.5,
  },
  weightPillValue: {
    fontSize: 14,
    color: COLORS.textWhite,
    ...FONTS.heavy,
    marginTop: 2,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    paddingHorizontal: SPACING.lg,
    paddingVertical: 10,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  actionBtn: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabBtnActive: {
    borderBottomColor: COLORS.primary,
  },
  tabLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
    ...FONTS.bold,
  },
  tabLabelActive: {
    color: COLORS.primary,
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
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  detailLabel: {
    fontSize: 13,
    color: COLORS.textMuted,
    ...FONTS.medium,
  },
  detailValue: {
    fontSize: 13.5,
    color: COLORS.text,
    ...FONTS.bold,
  },
  notesBody: {
    fontSize: 13.5,
    color: COLORS.text,
    lineHeight: 20,
  },
  statusButtonsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  statusChangeBtn: {
    flex: 1,
  },
  emptyTabCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    gap: 6,
  },
  emptyTabText: {
    fontSize: 14,
    color: COLORS.textFaint,
    ...FONTS.bold,
    marginTop: 4,
  },
  logCard: {
    marginBottom: 8,
    padding: SPACING.md,
  },
  logRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logMetaCol: {
    flex: 1,
  },
  logTitle: {
    fontSize: 14.5,
    color: COLORS.primaryDark,
    ...FONTS.bold,
  },
  logDate: {
    fontSize: 11.5,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  logNotes: {
    fontSize: 11.5,
    color: COLORS.text,
    marginTop: 3,
  },
  logBadgeCol: {
    alignItems: 'flex-end',
    gap: 4,
  },
  sourceText: {
    fontSize: 10.5,
    color: COLORS.textFaint,
  },
});
