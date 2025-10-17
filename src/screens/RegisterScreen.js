import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { supabase } from '../services/supabase';
import Svg, { Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

// Icono para el checkbox y la flecha de retroceso
const CheckIcon = () => <Svg width="16px" height="16px" fill="#111811" viewBox="0 0 256 256"><Path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></Path></Svg>;
const ArrowLeftIcon = () => <Svg width="24px" height="24px" fill="#111811" viewBox="0 0 256 256"><Path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></Path></Svg>;

export default function RegisterScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (loading) return;
    if (!username || !email || !password || !confirmPassword) {
      return Alert.alert(t('auth.alerts.errorTitle'), t('auth.alerts.fillAllFields'));
    }
    if (password !== confirmPassword) {
      return Alert.alert(t('auth.alerts.errorTitle'), t('auth.alerts.passwordsDoNotMatch'));
    }
    if (!agreedToTerms) {
      return Alert.alert(t('auth.alerts.errorTitle'), t('auth.alerts.mustAcceptTerms'));
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: { 
          username: username,
        }
      }
    });

    if (error) {
      Alert.alert(t('auth.alerts.registrationError'), error.message);
    } else if (data.user && data.user.identities && data.user.identities.length === 0) {
        Alert.alert(t('auth.alerts.userAlreadyRegistered'), t('auth.alerts.userAlreadyRegistered'));
    } else {
      Alert.alert(t('auth.alerts.registrationSuccessTitle'), t('auth.alerts.registrationSuccessMessage'));
      navigation.navigate('Login');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{flex: 1}}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeftIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('auth.registerTitle')}</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.label}>{t('auth.usernameLabel')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('auth.usernamePlaceholder')}
              placeholderTextColor="#638863"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />

            <Text style={styles.label}>{t('auth.emailLabel')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('auth.emailPlaceholder')}
              placeholderTextColor="#638863"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>{t('auth.passwordLabel')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('auth.passwordPlaceholder')}
              placeholderTextColor="#638863"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Text style={styles.label}>{t('auth.confirmPasswordLabel')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('auth.confirmPasswordPlaceholder')}
              placeholderTextColor="#638863"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <View style={styles.checkboxContainer}>
              <TouchableOpacity style={styles.checkbox} onPress={() => setAgreedToTerms(!agreedToTerms)}>
                {agreedToTerms && <CheckIcon />}
              </TouchableOpacity>
              <Text style={styles.checkboxLabel}>{t('auth.agreeToTerms')}</Text>
            </View>

            <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
              {loading ? <ActivityIndicator color="#111811" /> : <Text style={styles.registerButtonText}>{t('auth.registerButton')}</Text>}
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.footer}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.footerText}>{t('auth.alreadyHaveAccount')}</Text>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, height: 60 },
  backButton: { padding: 8 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#111811', marginRight: 40 },
  scrollContainer: { flexGrow: 1, justifyContent: 'center' },
  formContainer: { padding: 24, gap: 16 },
  label: { fontSize: 16, fontWeight: '500', color: '#111811' },
  input: { backgroundColor: '#f0f4f0', height: 56, borderRadius: 8, paddingHorizontal: 16, fontSize: 16, color: '#111811' },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', gap: 12, marginVertical: 8 },
  checkbox: { width: 24, height: 24, borderWidth: 2, borderColor: '#dce5dc', borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
  checkboxLabel: { flex: 1, fontSize: 16, color: '#111811' },
  registerButton: { backgroundColor: '#17cf17', height: 52, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginTop: 8 },
  registerButtonText: { fontSize: 16, fontWeight: 'bold', color: '#111811' },
  footer: { padding: 24, alignItems: 'center' },
  footerText: { color: '#638863', fontSize: 14, textDecorationLine: 'underline' },
});