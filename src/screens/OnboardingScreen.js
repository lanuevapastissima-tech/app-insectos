import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const { width } = Dimensions.get('window');

// Las imágenes se pueden mantener aquí o mover a la data si fueran diferentes por idioma
const slideImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD92OTfn8xUPwcOiOOgWqOzjvxXAQJdxfAdK8lXvltxyeeVH-bpYkTmBohL7eTkOqKQOikjacjxc8GaAksdQDQrj7BxHiXyGUh6zrQCx0oRcYFE61kNY8aJhOFLTZCnxrzjn_HB6v5v9gqKseg3XwyKoywbl7fwk9889IJpF1DjAwM_3hBuX-jTx6gnjIWVUjm1qHuKC3RmBEv5eIAK2e5lBANqUMv6nk1isoly4wD6AMItMf8CpWaQRwp7PUaxdxG6hGPjkyS7vT8',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBQKjpJ6cWkZXgGTOwtscRIs7tpIUV7mS60MC-QNkb6XUl4y02ccyEukU-WqfOqZhrON1vjkaKScQ_ioUp-qrmJnhoPkSPsr43otZZPd4PxcX7SjirGDPn2mWqeRLTp2TUf47CgtOlWxC2mJdDrscP_v7y7PNxMFzuM-GN2a90GRC4G_38cHappPBLAPNEeXyG0dBxPEq77VRuFRRu9rhZWR3r3I4mPYRjO-M1zwTd2uYbryBo5k7F3qowVY9eNeVzXWkL0gi0mv0E',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB-_mK8SXxqU5SHEQDZaEO-rc60YhH9Upr1sEb6ZOrpgnzlQQHXCEiJk0_OBsqPlqdxBN9i_JrutkNcwEzbO2xVeIAAh3s6bK5NCeNTjhzMF9MQoulBnItiyIqHsB4Rayqtfm9SHn116g8N7H85MqfQT5j3zqU56IaWvBql-XDyBOMdCj_R7bE13ZVAOKlXMgezZIyW3dhIf2D98jdY2carTRt1yYqh8ZHmjsG3rZ5hu_qD1CuB2CIATinQQXcVofI9dgK-vBoYIjgkvq1YDCLvS_ePlRX08',
];

const OnboardingSlide = ({ item }) => {
  return (
    <View style={styles.slideContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );
};

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const slides = [
    {
      key: '1',
      title: t('onboarding.slide1.title'),
      text: t('onboarding.slide1.text'),
      image: slideImages[0],
    },
    {
      key: '2',
      title: t('onboarding.slide2.title'),
      text: t('onboarding.slide2.text'),
      image: slideImages[1],
    },
    {
      key: '3',
      title: t('onboarding.slide3.title'),
      text: t('onboarding.slide3.text'),
      image: slideImages[2],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const slidesRef = useRef(null);

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const handleSkip = () => {
    navigation.navigate('Login');
  };

  const handleGetStarted = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>{t('common.skip')}</Text>
      </TouchableOpacity>

      <FlatList
        ref={slidesRef}
        data={slides}
        renderItem={({ item }) => <OnboardingSlide item={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.key}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        bounces={false}
      />

      <View style={styles.footer}>
        <View style={styles.paginationContainer}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, index === currentIndex ? styles.dotActive : styles.dotInactive]}
            />
          ))}
        </View>

        <View style={styles.footerButtonContainer}>
          {currentIndex < slides.length - 1 ? (
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>{t('common.next')}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
              <Text style={styles.buttonText}>{t('common.getStarted')}</Text>
            </TouchableOpacity>
          )}
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
  skipButton: {
    position: 'absolute',
    top: 60, // Ajustado para SafeAreaView
    right: 16,
    zIndex: 10,
    padding: 8,
  },
  skipButtonText: {
    color: '#638863',
    fontSize: 16,
    fontWeight: 'bold',
  },
  slideContainer: {
    width: width,
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40, // Espacio para el botón de saltar
  },
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1, // Cuadrada para un look moderno
    borderRadius: 12,
    marginBottom: 40,
    minHeight: 80, // Como en el HTML
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111811',
    textAlign: 'center',
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: '#111811',
    textAlign: 'center',
    paddingHorizontal: 16, // Para que no llegue a los bordes
  },
  footer: {
    paddingHorizontal: 16,
    paddingBottom: 40, // Espacio seguro en la parte inferior
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#111811',
  },
  dotInactive: {
    backgroundColor: '#dce5dc',
  },
  footerButtonContainer: {
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: '#17cf17',
    borderRadius: 12,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    minWidth: 120,
  },
  buttonText: {
    color: '#111811',
    fontSize: 16,
    fontWeight: 'bold',
  },
});