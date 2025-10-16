
import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StatusBar, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import * as ImagePicker from 'expo-image-picker';

// --- CONFIGURACIÓN ---
const SERVER_IP = '192.168.100.145'; // La IP de tu PC
const SERVER_URL = `http://${SERVER_IP}:3000/api/identify`;

// --- Iconos ---
const ImagePickerIcon = () => <Svg width="24px" height="24px" fill="#111811" viewBox="0 0 256 256"><Path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"></Path></Svg>;
const CameraIcon = () => <Svg width="24px" height="24px" fill="#111811" viewBox="0 0 256 256"><Path d="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.71,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H80a8,8,0,0,0,6.66-3.56L100.28,48h55.43l13.63,20.44A8,8,0,0,0,176,72h32a8,8,0,0,1,8,8ZM128,88a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,88Zm0,72a28,28,0,1,1,28-28A28,28,0,0,1,128,160Z"></Path></Svg>;
const ScannerIcon = () => <Svg width="24px" height="24px" fill="#111811" viewBox="0 0 256 256"><Path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></Path></Svg>;

export default function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);

  const uploadAndIdentify = async (imageUri) => {
    console.log("Iniciando subida para la imagen:", imageUri);
    
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      name: `photo_${Date.now()}.jpg`,
      type: 'image/jpeg',
    });

    try {
      const response = await fetch(SERVER_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const responseJson = await response.json();

      if (!response.ok) {
        throw new Error(responseJson.error || 'Error desconocido del servidor');
      }

      console.log("Navegando a resultados con datos reales de la IA.");
      navigation.navigate('Resultados', { analysis: JSON.stringify(responseJson), imageUri });

    } catch (error) {
      console.error("Error en uploadAndIdentify:", error);
      Alert.alert('Error de Identificación', error.message || 'No se pudo conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCameraPress = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita acceso a la cámara para identificar insectos.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [3, 2],
        quality: 0.8, 
      });

      if (!result.canceled) {
        await uploadAndIdentify(result.assets[0].uri);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
        console.error("Error al usar la cámara: ", error);
        Alert.alert('Error', 'No se pudo iniciar la cámara.');
        setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <View style={styles.headerIcon} />
        <Text style={styles.headerTitle}>Identificar</Text>
      </View>
      <View style={styles.imageContainer}>
        <ImageBackground 
          style={styles.image}
          imageStyle={styles.imageInner}
          source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCM_OoG5461g9ko32Z6HxhNlIXVG8j2SUMhmSniQWxfQT5SAwMNWyj77t3Vb1nZZLpwCSj4T34Z6iY3oNRbmvOVjjWs8lq5rlElxmtQOe-0moKJmxjbk6YtUDFWaVdPZ4xLMOWQLQRUdppInmXs8veQYXaAiNRsn90_AtnJ7-SyZkGnwQhEyt7Qi_1oAQQVZmCSqjD4Ne6YbZ5nPoutbElToTyAc0Xr-Ln4JO9JLSIKFd2r0Neyg7JHU63mQaQgnpDUq-w467WtySA' }}
          resizeMode="cover"
        />
      </View>
      <View style={styles.actionsContainer}>
        <ActionButton icon={<ImagePickerIcon />} label="Subir" onPress={() => Alert.alert("Próximamente", "Esta función se implementará en el futuro.")} />
        <ActionButton icon={<CameraIcon />} label="Cámara" onPress={handleCameraPress} />
        <ActionButton icon={<ScannerIcon />} label="Scanner" onPress={() => Alert.alert("Próximamente", "Esta función se implementará en el futuro.")} />
      </View>
      <View style={{ flex: 1 }} />
      {isLoading && (
        <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#111811" />
            <Text style={styles.loadingText}>Identificando...</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const ActionButton = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <View style={styles.actionButtonIconContainer}>{icon}</View>
    <Text style={styles.actionButtonLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  headerContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 8, height: 50 },
  headerIcon: { width: 48, height: 48 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#111811', marginRight: 48 },
  imageContainer: { paddingHorizontal: 16, paddingTop: 8 },
  image: { backgroundColor: '#f0f4f0', width: '100%', aspectRatio: 3 / 2 },
  imageInner: { borderRadius: 12 },
  actionsContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 16, paddingVertical: 24 },
  actionButton: { alignItems: 'center' },
  actionButtonIconContainer: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#f0f4f0', marginBottom: 8, justifyContent: 'center', alignItems: 'center' },
  actionButtonLabel: { fontSize: 14, fontWeight: '500', color: '#111811' },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111811'
  }
});
