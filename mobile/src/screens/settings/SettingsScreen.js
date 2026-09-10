import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SPACING } from '../../constants/theme';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import { useAuth } from '../../context/AuthContext';
import { useScale } from '../../context/ScaleContext';
import { getApiBaseUrl, setApiBaseUrl, apiRequest } from '../../api/client';

export default function SettingsScreen({ navigation }) {
  const { user, tenant, logout } = useAuth();
  const { connected, tareScale } = useScale();

  const [apiUrl, setApiUrl] = useState(getApiBaseUrl());
  const [pingStatus, setPingStatus] = useState(null);
  const [pinging, setPinging] = useState(false);

  const handleSaveApiUrl = () => {
    setApiBaseUrl(apiUrl.trim());
    Alert.alert('Saved', `API base URL updated to:\n${apiUrl.trim()}`);
  };

  const handlePingServer = async () => {
    setPinging(true);
    setPingStatus(null);
    try {
      const res = await apiRequest('/health');
      if (res && res.status === 'ok') {
        setPingStatus({
          ok: true,
          message: `Connected (${res.database === 'connected' ? 'MongoDB Connected' : 'Database Ready'})`,
        });
      } else {
        setPingStatus({ ok: false, message: 'Server responded with error' });
      }
    } catch (err) {
      setPingStatus({
        ok: false,
        message: err.message || 'Cannot reach server. Check IP & port.',
      });
    } finally {
      setPinging(false);
    }
  };

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out of your farm account?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => logout(),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryDark} />

      <Header title="Settings & Hardware" subtitle="Configure server, scale & farm account" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Account Info Card */}
        <Card>
          <Text style={styles.cardHeader}>Farm Account</Text>

          <View style={styles.accountRow}>
            <View style={styles.accountAvatar}>
              <Text style={styles.accountAvatarText}>
                {(user?.name || user?.username || 'F').charAt(0).toUpperCase()}
              </Text>
            </View>

            <View style={styles.accountTextCol}>
              <Text style={styles.accountName}>{user?.name || user?.username || 'Farmer'}</Text>
              <Text style={styles.accountFarm}>{tenant?.name || 'Farm Account'}</Text>
              <Text style={styles.accountRole}>Farm Manager · Online</Text>
            </View>

            <Badge label={tenant?.status || 'Active'} type={tenant?.status} size="small" />
          </View>
        </Card>

        {/* Backend API Connection Card */}
        <Card>
          <Text style={styles.cardHeader}>Backend API Connection</Text>
          <Text style={styles.cardHint}>
            Connect your phone to the same Wi-Fi as your computer running Node.js + MongoDB.
          </Text>

          <Input
            label="API Base URL *"
            placeholder="http://192.168.1.5:5000/api"
            value={apiUrl}
            onChangeText={setApiUrl}
            iconName="globe-outline"
            autoCapitalize="none"
          />

          <View style={styles.apiActionsRow}>
            <Button
              title="Save URL"
              onPress={handleSaveApiUrl}
              variant="outline"
              size="small"
              iconName="save-outline"
              style={{ flex: 1 }}
            />

            <Button
              title="Test Connection"
              onPress={handlePingServer}
              loading={pinging}
              variant="primary"
              size="small"
              iconName="pulse-outline"
              style={{ flex: 1 }}
            />
          </View>

          {pingStatus && (
            <View
              style={[
                styles.pingResultBox,
                pingStatus.ok ? styles.pingSuccess : styles.pingError,
              ]}
            >
              <Ionicons
                name={pingStatus.ok ? 'checkmark-circle' : 'alert-circle'}
                size={18}
                color={pingStatus.ok ? '#16A34A' : '#DC2626'}
              />
              <Text
                style={[
                  styles.pingText,
                  pingStatus.ok ? styles.pingSuccessText : styles.pingErrorText,
                ]}
              >
                {pingStatus.message}
              </Text>
            </View>
          )}
        </Card>

        {/* ESP32 Scale Hardware Settings */}
        <Card>
          <Text style={styles.cardHeader}>ESP32 Weighing Scale</Text>

          <View style={styles.scaleStatusRow}>
            <View style={styles.scaleStatusLeft}>
              <Ionicons name="hardware-chip-outline" size={24} color={COLORS.primaryDark} />
              <View>
                <Text style={styles.scaleStatusTitle}>HX711 Digital Platform</Text>
                <Text style={styles.scaleStatusSub}>
                  {connected ? 'Connected via local network' : 'Disconnected'}
                </Text>
              </View>
            </View>
            <Badge
              label={connected ? 'Live' : 'Offline'}
              type={connected ? 'active' : 'archived'}
              size="small"
            />
          </View>

          <View style={styles.scaleBtnRow}>
            <Button
              title="Tare Scale (Zero)"
              onPress={tareScale}
              variant="outline"
              size="small"
              iconName="refresh-outline"
              style={{ flex: 1 }}
            />
          </View>
        </Card>

        {/* Sign Out Button */}
        <Button
          title="Sign Out"
          onPress={handleLogout}
          variant="danger"
          size="large"
          iconName="log-out-outline"
          style={styles.logoutBtn}
        />
      </ScrollView>
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
    marginBottom: 6,
  },
  cardHint: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: SPACING.md,
    lineHeight: 16,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 12,
  },
  accountAvatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountAvatarText: {
    fontSize: 20,
    color: COLORS.primaryDark,
    ...FONTS.heavy,
  },
  accountTextCol: {
    flex: 1,
  },
  accountName: {
    fontSize: 15.5,
    color: COLORS.text,
    ...FONTS.heavy,
  },
  accountFarm: {
    fontSize: 12.5,
    color: COLORS.primary,
    ...FONTS.bold,
    marginTop: 2,
  },
  accountRole: {
    fontSize: 11.5,
    color: COLORS.textFaint,
    marginTop: 1,
  },
  apiActionsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  pingResultBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: RADIUS.md,
    marginTop: 10,
    gap: 8,
  },
  pingSuccess: {
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  pingError: {
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  pingText: {
    fontSize: 12.5,
    ...FONTS.semibold,
    flex: 1,
  },
  pingSuccessText: {
    color: '#166534',
  },
  pingErrorText: {
    color: '#991B1B',
  },
  scaleStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  scaleStatusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scaleStatusTitle: {
    fontSize: 14,
    color: COLORS.text,
    ...FONTS.bold,
  },
  scaleStatusSub: {
    fontSize: 11.5,
    color: COLORS.textMuted,
    marginTop: 2,
  },
  scaleBtnRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  logoutBtn: {
    marginTop: SPACING.md,
    marginBottom: SPACING.xl,
  },
});
