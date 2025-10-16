import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, ActivityIndicator, Alert, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

// --- CONFIGURACIÓN ---
const SERVER_IP = '192.168.100.145'; // La IP de tu PC
const SERVER_URL = `http://${SERVER_IP}:3000/api/identify`;

// --- Iconos ---
const ArrowLeftIcon = () => <Svg width="24px" height="24px" fill="#111811" viewBox="0 0 256 256"><Path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></Path></Svg>;
const UploadIcon = () => <Svg width="28px" height="28px" fill="white" viewBox="0 0 256 256"><Path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,149.37V56ZM40,172l52-52,80,80H40Zm176,28H194.63l-36-36,20-20L216,181.38V200ZM144,100a12,12,0,1,1,12,12A12,12,0,0,1,144,100Z"></Path></Svg>;
const CameraIcon = () => <Svg width="28px" height="28px" fill="white" viewBox="0 0 256 256"><Path d="M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.71,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H80a8,8,0,0,0,6.66-3.56L100.28,48h55.43l13.63,20.44A8,8,0,0,0,176,72h32a8,8,0,0,1,8,8ZM128,88a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,88Zm0,72a28,28,0,1,1,28-28A28,28,0,0,1,128,160Z"></Path></Svg>;
const ScannerIcon = () => <Svg width="28px" height="28px" fill="white" viewBox="0 0 256 256"><Path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></Path></Svg>;

export default function HomeScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Efecto para limpiar el estado cuando la pantalla se enfoca
  useFocusEffect(
    useCallback(() => {
      setComment('');
      setDate(new Date());
      // No reseteamos isLoading aquí, se maneja en el flujo de subida
    }, [])
  );

  const uploadAndIdentify = async (imageUri) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', { uri: imageUri, name: `photo.jpg`, type: 'image/jpeg' });
    formData.append('comment', comment);
    formData.append('date', date.toISOString());

    try {
      const response = await fetch(SERVER_URL, { method: 'POST', body: formData, headers: { 'Content-Type': 'multipart/form-data' } });
      const responseJson = await response.json();
      if (!response.ok) throw new Error(responseJson.error || 'Error del servidor');
      navigation.navigate('Resultados', { analysis: JSON.stringify(responseJson), imageUri });
    } catch (error) {
      Alert.alert('Error de Identificación', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCameraPress = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (perm.status !== 'granted') return Alert.alert('Permiso denegado', 'Se necesita acceso a la cámara.');
    try {
        const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [3, 2], quality: 0.8 });
        if (!result.canceled) await uploadAndIdentify(result.assets[0].uri);
    } catch (error) {
        Alert.alert('Error', 'No se pudo iniciar la cámara.');
    }
  };

  const handleImagePick = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (perm.status !== 'granted') return Alert.alert('Permiso denegado', 'Se necesita acceso a la galería.');
    try {
        const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [3, 2], quality: 0.8 });
        if (!result.canceled) await uploadAndIdentify(result.assets[0].uri);
    } catch (error) {
        Alert.alert('Error', 'No se pudo abrir la galería.');
    }
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.headerIcon} onPress={() => { /* No action for now */ }}><ArrowLeftIcon /></TouchableOpacity>
        <Text style={styles.headerTitle}>Identificar</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.mapPlaceholder}>
            <Text style={styles.mapIcon}>🗺️</Text>
        </View>

        <View style={styles.fieldContainer}>
            <Text style={styles.label}>Notas del Avistamiento</Text>
            <TextInput 
                style={styles.textArea}
                placeholder="Añadir comentario..."
                placeholderTextColor="#638863"
                maxLength={220}
                multiline
                value={comment}
                onChangeText={setComment}
            />
        </View>

        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateIcon}>📅</Text>
            <Text style={styles.dateText}>{date.toLocaleDateString('es-ES')}</Text>
        </TouchableOpacity>

        {showDatePicker && (
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={'date'}
                is24Hour={true}
                display="default"
                onChange={onChangeDate}
            />
        )}

        <View style={styles.actionsContainer}>
            <ActionButton icon={<UploadIcon />} label="Subir" onPress={handleImagePick} />
            <ActionButton icon={<CameraIcon />} label="Cámara" onPress={handleCameraPress} />
            <ActionButton icon={<ScannerIcon />} label="Scanner" onPress={() => Alert.alert("Próximamente")} />
        </View>
      </View>

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
  <View style={styles.actionWrapper}>
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>{icon}</TouchableOpacity>
    <Text style={styles.actionLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  headerContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 8, height: 50 },
  headerIcon: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#111811', marginRight: 48 },
  contentContainer: { flex: 1, padding: 16, gap: 16 },
  mapPlaceholder: { flex: 1, minHeight: 250, backgroundColor: '#e0eedf', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
  mapIcon: { fontSize: 60, color: '#638863' },
  fieldContainer: { gap: 8 },
  label: { fontSize: 14, fontWeight: '500', color: '#111811' },
  textArea: { height: 80, borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12, textAlignVertical: 'top', fontSize: 16 },
  dateButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 16, gap: 8 },
  dateIcon: { fontSize: 20 },
  dateText: { fontSize: 16, fontWeight: '500', color: '#111811' },
  actionsContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingTop: 16 },
  actionWrapper: { alignItems: 'center', gap: 8 },
  actionButton: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#638863', justifyContent: 'center', alignItems: 'center' },
  actionLabel: { fontSize: 14, fontWeight: '500', color: '#111811' },
  loadingOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255, 255, 255, 0.8)', justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 10, fontSize: 16, fontWeight: 'bold', color: '#111811' },
});