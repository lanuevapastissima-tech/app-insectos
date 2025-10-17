import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { supabase } from '../services/supabase';

export default function LoginScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) return;
    if (!email || !password) {
      return Alert.alert('Error', 'Por favor, ingresa tu correo y contraseña.');
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert('Error al iniciar sesión', error.message);
    }
    // Si el login es exitoso, el listener en App.js se encargará de la navegación.
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex_1}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{t('auth.appTitle')}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.title}>{t('auth.loginTitle')}</Text>
          
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder={t('auth.emailPlaceholder')}
              placeholderTextColor="#638863"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder={t('auth.passwordPlaceholder')}
              placeholderTextColor="#638863"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
              {loading ? <ActivityIndicator color="#111811" /> : <Text style={styles.buttonText}>{t('auth.loginButton')}</Text>}
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{t('auth.dontHaveAccount')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.footerText, styles.underline]}>{t('auth.signUpLink')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={[styles.footerText, styles.underline, styles.marginTop]}>{t('auth.forgotPasswordLink')}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  flex_1: { flex: 1 },
  header: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#f0f4f0' },
  headerTitle: { textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#111811' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#111811', textAlign: 'center', marginBottom: 24 },
  formContainer: { gap: 16 },
  input: { backgroundColor: '#f0f4f0', height: 56, borderRadius: 8, paddingHorizontal: 16, fontSize: 16, color: '#111811' },
  loginButton: { backgroundColor: '#17cf17', height: 52, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: '#111811' },
  footer: { padding: 24, alignItems: 'center', gap: 8 },
  footerText: { color: '#638863', fontSize: 14 },
  underline: { textDecorationLine: 'underline' },
  marginTop: { marginTop: 16 },
});