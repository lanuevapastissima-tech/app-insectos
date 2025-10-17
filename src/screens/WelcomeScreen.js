import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const { i18n } = useTranslation();
  const navigation = useNavigation();

  const handleLanguageSelect = (lang) => {
    i18n.changeLanguage(lang);
    navigation.navigate('Onboarding');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Image 
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYVKlyGSS2gdJZxpMncnPsMheMs8mvnAlkEWGBvQWYFobO7KHq-8gEvLOZZaBhLn1ZkHrAUq7Q27Gy9Pk62zPJ_6iVTRw2fAm2sBy95ixlqa5c7804Ob4jaOAVcTDPMD3zwzGXIrHAvXTyuAXnL_4nqAb-QC0O0hPVYk5jilnbnlyjyyVtYPdLEeyBgOHW626E5sMhqcs4FhtewDjeuPxInb1osrAVQl9zXLPP-ZbJSdMNB5VP_1yHzlf_1K-vVxSTldN_vegCJUE' }}
          style={styles.mainImage}
        />
        <Text style={styles.title}>Bienvenido / Welcome</Text>
        <Text style={styles.subtitle}>Selecciona tu idioma / Select your language</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.spanishButton} onPress={() => handleLanguageSelect('es')}>
            <Text style={styles.buttonText}>🇪🇸 Español</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.englishButton} onPress={() => handleLanguageSelect('en')}>
            <Text style={styles.buttonText}>🇺🇸 English</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  mainImage: {
    width: '100%',
    aspectRatio: 2 / 2.5, // Ajustado para dar más espacio vertical
    borderRadius: 12,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111811',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#111811',
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 480,
  },
  spanishButton: {
    backgroundColor: '#17cf17',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  englishButton: {
    backgroundColor: '#f0f4f0',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111811',
  },
});