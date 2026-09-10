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
} from 'react-native';
import { COLORS, FONTS, RADIUS, SHADOWS, SPACING } from '../../constants/theme';
import Input from '../../components/Input';
import Button from '../../components/Button';
import ErrorMessage from '../../components/ErrorMessage';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);

  const [farmId, setFarmId] = useState('');
  const [farmName, setFarmName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleAuth() {
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        if (!farmName.trim() || !username.trim() || !password.trim()) {
          setError('Please fill in farm name, username, and password.');
          setLoading(false);
          return;
        }
        const res = await register(farmName.trim(), username.trim(), email.trim(), password);
        if (!res.success) {
          setError(res.error || 'Failed to create farm account');
        }
      } else {
        if (!username.trim() || !password.trim()) {
          setError('Please enter your username and password.');
          setLoading(false);
          return;
        }
        const res = await login(farmId.trim(), username.trim(), password);
        if (!res.success) {
          setError(res.error || 'Invalid credentials. Check farm name, username and password.');
        }
      }
    } catch (err) {
      setError(err.message || 'Authentication error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Brand Header */}
          <View style={styles.brandContainer}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>🐐</Text>
            </View>
            <Text style={styles.appName}>SelSolve</Text>
            <Text style={styles.appTagline}>Smart Goat Farm Management</Text>
          </View>

          {/* Auth Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              {isRegister ? 'Register New Farm' : 'Sign in to your Farm'}
            </Text>
            <Text style={styles.cardSubtitle}>
              {isRegister
                ? 'Create a unified account for Web & Mobile'
                : 'Access your goats, weights, scale & records'}
            </Text>

            {error ? <ErrorMessage message={error} /> : null}

            {isRegister ? (
              <>
                <Input
                  label="Farm Name"
                  placeholder="e.g. Green Valley Farm"
                  value={farmName}
                  onChangeText={setFarmName}
                  iconName="business-outline"
                />
                <Input
                  label="Username"
                  placeholder="e.g. farmer"
                  value={username}
                  onChangeText={setUsername}
                  iconName="person-outline"
                  autoCapitalize="none"
                />
                <Input
                  label="Email (Optional)"
                  placeholder="e.g. farmer@example.com"
                  value={email}
                  onChangeText={setEmail}
                  iconName="mail-outline"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Input
                  label="Password"
                  placeholder="Create password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  iconName="lock-closed-outline"
                />
              </>
            ) : (
              <>
                <Input
                  label="Farm Slug / Name"
                  placeholder="e.g. your-farm-slug"
                  value={farmId}
                  onChangeText={setFarmId}
                  iconName="business-outline"
                  autoCapitalize="none"
                />
                <Input
                  label="Username or Email"
                  placeholder="e.g. farmer"
                  value={username}
                  onChangeText={setUsername}
                  iconName="person-outline"
                  autoCapitalize="none"
                />
                <Input
                  label="Password"
                  placeholder="Enter password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  iconName="lock-closed-outline"
                />
              </>
            )}

            <Button
              title={isRegister ? 'Create Farm Account' : 'Sign In'}
              onPress={handleAuth}
              loading={loading}
              variant="primary"
              size="large"
              fullWidth
              style={styles.submitBtn}
            />

            <TouchableOpacity
              onPress={() => {
                setIsRegister(!isRegister);
                setError('');
              }}
              style={styles.toggleAuthRow}
            >
              <Text style={styles.toggleAuthText}>
                {isRegister
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Register Farm"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: SPACING.xl,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.md,
    ...SHADOWS.md,
  },
  logoEmoji: {
    fontSize: 44,
  },
  appName: {
    fontSize: 28,
    color: COLORS.textWhite,
    ...FONTS.heavy,
    letterSpacing: 0.5,
  },
  appTagline: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
    ...FONTS.medium,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.xl,
    padding: SPACING.xl,
    ...SHADOWS.lg,
  },
  cardTitle: {
    fontSize: 20,
    color: COLORS.primaryDark,
    ...FONTS.heavy,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12.5,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: SPACING.lg,
  },
  submitBtn: {
    marginTop: SPACING.sm,
  },
  demoFillBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    marginTop: SPACING.sm,
  },
  demoFillText: {
    fontSize: 12,
    color: COLORS.primary,
    ...FONTS.bold,
  },
  toggleAuthRow: {
    alignItems: 'center',
    marginTop: SPACING.sm,
    paddingVertical: 8,
  },
  toggleAuthText: {
    fontSize: 13,
    color: COLORS.primary,
    ...FONTS.bold,
  },
});
