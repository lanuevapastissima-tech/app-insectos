import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { supabase } from '../services/supabase';

export default function ResetPasswordScreen({ navigation }) {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (loading) return;
    if (!password || !confirmPassword) {
      return Alert.alert(t('auth.alerts.errorTitle'), t('auth.alerts.fillAllFields'));
    }
    if (password.length < 6) {
        return Alert.alert(t('auth.alerts.errorTitle'), t('auth.resetPasswordInstruction'));
    }
    if (password !== confirmPassword) {
      return Alert.alert(t('auth.alerts.errorTitle'), t('auth.alerts.passwordsDoNotMatch'));
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: password });

    if (error) {
      Alert.alert(t('auth.alerts.errorTitle'), error.message);
    } else {
      Alert.alert(t('auth.alerts.successTitle'), t('auth.alerts.passwordUpdatedSuccess'));
      // El listener en App.js debería detectar el cambio de sesión y navegar al AppStack
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex_1}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('auth.resetPasswordTitle')}</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.instructions}>{t('auth.resetPasswordInstruction')}</Text>
          
          <TextInput
            style={styles.input}
            placeholder={t('auth.newPasswordPlaceholder')}
            placeholderTextColor="#638863"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder={t('auth.confirmNewPasswordPlaceholder')}
            placeholderTextColor="#638863"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />

          <TouchableOpacity style={styles.button} onPress={handleResetPassword} disabled={loading}>
            {loading ? <ActivityIndicator color="#111811" /> : <Text style={styles.buttonText}>{t('auth.resetPasswordButton')}</Text>}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  flex_1: { flex: 1 },
  header: { padding: 16, height: 60, justifyContent: 'center' },
  headerTitle: { textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#111811' },
  contentContainer: { flex: 1, justifyContent: 'center', padding: 24, gap: 16 },
  instructions: { fontSize: 16, color: '#111811', textAlign: 'center', marginBottom: 16 },
  input: { backgroundColor: '#f0f4f0', height: 56, borderRadius: 8, paddingHorizontal: 16, fontSize: 16, color: '#111811' },
  button: { backgroundColor: '#17cf17', height: 52, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: '#111811' },
});
