import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import { getCollections } from '../services/StorageService';

const PlusIcon = () => <Svg width="24px" height="24px" fill="#111811" viewBox="0 0 256 256"><Path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></Path></Svg>;
const SearchIcon = () => <Svg width="24px" height="24px" fill="#638863" viewBox="0 0 256 256"><Path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></Path></Svg>;
const CaretDownIcon = () => <Svg width="20px" height="20px" fill="#111811" viewBox="0 0 256 256"><Path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></Path></Svg>;

const FilterButton = ({ label }) => (
  <TouchableOpacity style={styles.filterButton}>
    <Text style={styles.filterButtonText}>{label}</Text>
    <CaretDownIcon />
  </TouchableOpacity>
);

const CollectionItem = ({ item, navigation }) => {
  const risk = item.peligrosidadHumanos?.toLowerCase();
  let riskColor = '#638863';
  if (risk === 'alto') riskColor = '#D92D20';
  if (risk === 'medio') riskColor = '#F79009';

  const handlePress = () => {
    navigation.navigate('Resultados', { 
        analysis: JSON.stringify(item),
        imageUri: item.imageUri 
    });
  };

  const displayDate = item.date && !isNaN(new Date(item.date)) 
    ? new Date(item.date).toLocaleDateString('es-ES') 
    : '';

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={handlePress}>
      <View style={styles.itemContent}>
        <Image source={{ uri: item.imageUri }} style={styles.itemImage} />
        <View style={styles.itemTextContainer}>
          <Text style={styles.itemName}>{item.nombreComun}</Text>
          <Text style={styles.itemDate}>{displayDate}</Text>
          <Text style={styles.itemRiskText}>Riesgo: {item.peligrosidadHumanos || 'N/A'}</Text>
        </View>
      </View>
      <View style={styles.itemRiskIndicatorContainer}>
          <View style={[styles.itemRiskIndicator, { backgroundColor: riskColor }]} />
      </View>
    </TouchableOpacity>
  );
};

export default function CollectionsScreen({ navigation }) {
  const [collections, setCollections] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadCollections = async () => {
        const data = await getCollections();
        setCollections(data.reverse());
      };

      loadCollections();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Mis Colecciones</Text>
        <TouchableOpacity style={styles.headerIcon}><PlusIcon /></TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
            <View style={styles.searchIconContainer}><SearchIcon /></View>
            <TextInput placeholder="Buscar en tus colecciones..." style={styles.searchInput} placeholderTextColor="#638863" />
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <FilterButton label="Riesgo" />
        <FilterButton label="Fecha" />
      </View>

      <FlatList
        data={collections}
        renderItem={({ item }) => <CollectionItem item={item} navigation={navigation} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContentContainer}
        ListEmptyComponent={() => (
            <View style={styles.emptyListContainer}>
                <Text style={styles.emptyListText}>Tu colección está vacía.</Text>
                <Text style={styles.emptyListSubText}>¡Usa la cámara para identificar y guardar tu primer insecto!</Text>
            </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: 'white' },
  headerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 8, height: 50 },
  headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#111811', marginLeft: 48 },
  headerIcon: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  searchContainer: { paddingHorizontal: 16, paddingVertical: 12 },
  searchInputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f4f0', borderRadius: 8, height: 48 },
  searchIconContainer: { paddingLeft: 16 },
  searchInput: { flex: 1, height: '100%', paddingHorizontal: 8, color: '#111811', fontSize: 16 },
  filtersContainer: { flexDirection: 'row', gap: 12, paddingHorizontal: 12, paddingBottom: 8 },
  filterButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f4f0', borderRadius: 8, paddingLeft: 16, paddingRight: 8, height: 32 },
  filterButtonText: { color: '#111811', fontSize: 14, fontWeight: '500', marginRight: 8 },
  listContentContainer: { paddingTop: 8, flexGrow: 1 },
  itemContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', paddingHorizontal: 16, minHeight: 72, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#f0f4f0' },
  itemContent: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  itemImage: { width: 56, height: 56, borderRadius: 8, backgroundColor: '#f0f4f0' },
  itemTextContainer: { justifyContent: 'center' },
  itemName: { color: '#111811', fontSize: 16, fontWeight: '500' },
  itemDate: { color: '#638863', fontSize: 14 },
  itemRiskText: { color: '#638863', fontSize: 12, fontStyle: 'italic' },
  itemRiskIndicatorContainer: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
  itemRiskIndicator: { width: 12, height: 12, borderRadius: 6 },
  emptyListContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  emptyListText: { fontSize: 18, fontWeight: 'bold', color: '#111811' },
  emptyListSubText: { fontSize: 14, color: '#638863', textAlign: 'center', marginTop: 8 },
});