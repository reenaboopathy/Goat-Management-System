import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, RADIUS, SPACING } from '../constants/theme';

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  iconName,
  rightIconName,
  onRightIconPress,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  editable = true,
  prefix,
  suffix,
  style,
  inputStyle,
}) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          multiline && styles.multilineContainer,
          error && styles.inputError,
          !editable && styles.disabledInput,
        ]}
      >
        {iconName && (
          <Ionicons
            name={iconName}
            size={18}
            color={COLORS.textMuted}
            style={styles.leftIcon}
          />
        )}

        {prefix && <Text style={styles.prefix}>{prefix}</Text>}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textFaint}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          editable={editable}
          style={[
            styles.input,
            multiline && styles.multilineInput,
            !editable && { color: COLORS.textMuted },
            inputStyle,
          ]}
        />

        {suffix && <Text style={styles.suffix}>{suffix}</Text>}

        {rightIconName && (
          <TouchableOpacity
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            style={styles.rightIcon}
          >
            <Ionicons name={rightIconName} size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 12.5,
    ...FONTS.bold,
    color: COLORS.textMuted,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    height: 48,
    paddingHorizontal: SPACING.md,
  },
  multilineContainer: {
    height: 'auto',
    minHeight: 80,
    alignItems: 'flex-start',
    paddingVertical: SPACING.sm,
  },
  disabledInput: {
    backgroundColor: COLORS.surfaceSubtle,
  },
  inputError: {
    borderColor: COLORS.danger,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  prefix: {
    fontSize: 14,
    ...FONTS.semibold,
    color: COLORS.textMuted,
    marginRight: 4,
  },
  suffix: {
    fontSize: 13,
    ...FONTS.semibold,
    color: COLORS.textMuted,
    marginLeft: 4,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    height: '100%',
    padding: 0,
  },
  multilineInput: {
    textAlignVertical: 'top',
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 11.5,
    marginTop: 4,
    ...FONTS.medium,
  },
});
