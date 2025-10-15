
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView from 'react-native-maps';
import Svg, { Path } from 'react-native-svg';

const ArrowLeftIcon = () => <Svg width="24px" height="24px" fill="#111811" viewBox="0 0 256 256"><Path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></Path></Svg>;
const SearchIcon = () => <Svg width="24px" height="24px" fill="#638863" viewBox="0 0 256 256"><Path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></Path></Svg>;
const PlusIcon = () => <Svg width="24px" height="24px" fill="#111811" viewBox="0 0 256 256"><Path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></Path></Svg>;
const MinusIcon = () => <Svg width="24px" height="24px" fill="#111811" viewBox="0 0 256 256"><Path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128Z"></Path></Svg>;
const NavArrowIcon = () => <Svg width="24px" height="24px" fill="#111811" viewBox="0 0 256 256" transform="scale(-1, 1)"><Path d="M229.33,98.21,53.41,33l-.16-.05A16,16,0,0,0,32.9,53.25a1,1,0,0,0,.05.16L98.21,229.33A15.77,15.77,0,0,0,113.28,240h.3a15.77,15.77,0,0,0,15-11.29l23.56-76.56,76.56-23.56a16,16,0,0,0,.62-30.38ZM224,113.3l-76.56,23.56a16,16,0,0,0-10.58,10.58L113.3,224h0l-.06-.17L48,48l175.82,65.22.16.06Z"></Path></Svg>;
const ListIcon = () => <Svg width="24px" height="24px" fill="#111811" viewBox="0 0 256 256"><Path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></Path></Svg>;
const CaretDownIcon = () => <Svg width="20px" height="20px" fill="#111811" viewBox="0 0 256 256"><Path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></Path></Svg>;

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <MapView 
        style={StyleSheet.absoluteFill}
        initialRegion={{ latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
      />
      <SafeAreaView style={styles.uiContainer} edges={['top', 'bottom']} pointerEvents="box-none">
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.headerIcon}><ArrowLeftIcon /></TouchableOpacity>
          <Text style={styles.headerTitle}>Mapa</Text>
          <View style={styles.headerIcon} />
        </View>
        <View style={styles.overlayContainer} pointerEvents="box-none">
          <View style={styles.searchOverlay}>
              <View style={styles.searchInputWrapper}>
                  <View style={styles.searchIconContainer}><SearchIcon /></View>
                  <TextInput placeholder="Buscar ubicación" style={styles.searchInput} placeholderTextColor="#638863" />
              </View>
          </View>
          <View style={styles.controlsOverlay}>
              <View style={styles.zoomControls}>
                  <TouchableOpacity style={styles.zoomButtonTop}><PlusIcon /></TouchableOpacity>
                  <TouchableOpacity style={styles.zoomButtonBottom}><MinusIcon /></TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.locationButton}><NavArrowIcon /></TouchableOpacity>
          </View>
          <View style={styles.fabOverlay}>
              <TouchableOpacity style={styles.fab}><ListIcon /></TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheet}>
              <View style={styles.handleBar} />
              <Text style={styles.filterTitle}>Filtros</Text>
              <View style={styles.filtersContainer}>
                  <TouchableOpacity style={styles.filterButton}><Text style={styles.filterButtonText}>Riesgo</Text><CaretDownIcon /></TouchableOpacity>
                  <TouchableOpacity style={styles.filterButton}><Text style={styles.filterButtonText}>Especie</Text><CaretDownIcon /></TouchableOpacity>
                  <TouchableOpacity style={styles.filterButton}><Text style={styles.filterButtonText}>Rango de tiempo</Text><CaretDownIcon /></TouchableOpacity>
              </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  uiContainer: { ...StyleSheet.absoluteFillObject, justifyContent: 'space-between' },
  headerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16 },
  headerIcon: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#111811' },
  overlayContainer: { flex: 1 },
  searchOverlay: { position: 'absolute', top: 10, left: 16, right: 16 },
  searchInputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 8, height: 48, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  searchIconContainer: { paddingLeft: 16 },
  searchInput: { flex: 1, height: '100%', paddingHorizontal: 8, color: '#111811', fontSize: 16 },
  controlsOverlay: { position: 'absolute', top: 70, right: 16, gap: 12, alignItems: 'flex-end' },
  zoomControls: { backgroundColor: 'white', borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  zoomButtonTop: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 1, borderColor: '#f0f4f0' },
  zoomButtonBottom: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  locationButton: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  fabOverlay: { position: 'absolute', bottom: 180, right: 20 },
  fab: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#17cf17', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 5 },
  bottomSheetContainer: { justifyContent: 'flex-end' },
  bottomSheet: { backgroundColor: 'white', borderTopLeftRadius: 16, borderTopRightRadius: 16, paddingBottom: 24 },
  handleBar: { width: 36, height: 4, borderRadius: 2, backgroundColor: '#dce5dc', alignSelf: 'center', marginTop: 8, marginBottom: 8 },
  filterTitle: { fontSize: 18, fontWeight: 'bold', color: '#111811', paddingHorizontal: 16, paddingBottom: 8, paddingTop: 16 },
  filtersContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, paddingHorizontal: 12 },
  filterButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f4f0', borderRadius: 8, paddingLeft: 16, paddingRight: 8, height: 32 },
  filterButtonText: { color: '#111811', fontSize: 14, fontWeight: '500', marginRight: 8 },
});
