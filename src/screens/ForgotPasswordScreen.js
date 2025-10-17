import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { supabase } from '../services/supabase';

const ArrowLeftIcon = () => <Svg width="24px" height="24px" fill="#111811" viewBox="0 0 256 256"><Path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></Path></Svg>;

export default function ForgotPasswordScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    if (loading) return;
    if (!email) {
      return Alert.alert('Error', 'Por favor, ingresa tu correo electrónico.');
    }

    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: '' // Opcional: puedes añadir un link de redirección aquí
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Revisa tu correo', 'Se han enviado las instrucciones para restablecer tu contraseña a tu correo electrónico.');
      navigation.goBack();
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex_1}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeftIcon />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t('auth.forgotPasswordTitle')}</Text>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{t('auth.forgotPasswordSubtitle')}</Text>
          <Text style={styles.instructions}>{t('auth.forgotPasswordInstructions')}</Text>
          
          <TextInput
            style={styles.input}
            placeholder={t('auth.emailPlaceholder')}
            placeholderTextColor="#638863"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.button} onPress={handlePasswordReset} disabled={loading}>
            {loading ? <ActivityIndicator color="#111811" /> : <Text style={styles.buttonText}>{t('auth.sendInstructionsButton')}</Text>}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  flex_1: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, height: 60 },
  backButton: { padding: 8 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#111811', marginRight: 40 },
  contentContainer: { flex: 1, justifyContent: 'center', padding: 24, gap: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111811' },
  instructions: { fontSize: 16, color: '#111811', marginBottom: 16 },
  input: { backgroundColor: '#f0f4f0', height: 56, borderRadius: 8, paddingHorizontal: 16, fontSize: 16, color: '#111811' },
  footer: { padding: 24, paddingBottom: 40 },
  button: { backgroundColor: '#17cf17', height: 52, borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: '#111811' },
});