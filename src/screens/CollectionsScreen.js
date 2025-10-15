
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const sightingsData = [
  { id: '1', name: 'Avispa asiática', date: '2024-07-26 14:30', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6TbDiWYFK04PpfXYwqn5RAT33QsMhxkbr_mY1Pf68F3Raur6EvxG0SurDeB14Mh92DBcFiF-Fq2DomP2tkiX_A239Z915EQTJqebgxzZjgL6XyzBFBdjHnh1Qe4IRky5u2Ri9pxp626rua7kstLbdr3swGN6Yl3n3iIXXNnGAmHy-OPuO2Vm6NjoAuCsHOCUSdn0TL-oC9TediHaPB9hDwIlOWTW3DpR1G3rqJcKs09r9Z2ptA67RCaP_Omt1ppDoVJ6DI9uyRQA', risk: 'high' },
  { id: '2', name: 'Mariposa monarca', date: '2024-07-25 11:15', imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTracgEDej9PC2hEEOH-HTuI6IHxNxk3_w3z3EeYnlUDoVynadHemxspTo3wtSCMZO7JyRAvANhYfh32QM7E4qRsEwLQTzHpjvHeR1I5fIPzeEnAzDm4MvRr9T0-3OVH15nZJ0YRLSUrCLKZ-uGtqhoHf40a6EnsVKt04X5P5UABnsPnYMPF2WWOtY9VFQHTNlVpRwo7vbCBmwyE2cMe08cvsYHqprL7XQ7ONIoOcZO0xEYCFhcklz_7EF42GM5rHGHiM_cNPl7U4', risk: 'low' },
];

const PlusIcon = () => <Svg width="24px" height="24px" fill="#111811" viewBox="0 0 256 256"><Path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></Path></Svg>;
const SearchIcon = () => <Svg width="24px" height="24px" fill="#638863" viewBox="0 0 256 256"><Path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></Path></Svg>;
const CaretDownIcon = () => <Svg width="20px" height="20px" fill="#111811" viewBox="0 0 256 256"><Path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></Path></Svg>;

const FilterButton = ({ label }) => (
  <TouchableOpacity style={styles.filterButton}>
    <Text style={styles.filterButtonText}>{label}</Text>
    <CaretDownIcon />
  </TouchableOpacity>
);

const SightingItem = ({ item }) => (
  <TouchableOpacity style={styles.itemContainer}>
    <View style={styles.itemContent}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <View style={styles.itemTextContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDate}>{item.date}</Text>
      </View>
    </View>
    <View style={styles.itemRiskIndicatorContainer}>
        <View style={[styles.itemRiskIndicator, { backgroundColor: item.risk === 'high' ? '#D92D20' : '#078823'}]} />
    </View>
  </TouchableOpacity>
);

export default function CollectionsScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Mis avistamientos</Text>
        <TouchableOpacity style={styles.headerIcon}><PlusIcon /></TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
            <View style={styles.searchIconContainer}><SearchIcon /></View>
            <TextInput placeholder="Buscar por especie, fecha o ubicación" style={styles.searchInput} placeholderTextColor="#638863" />
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <FilterButton label="Riesgo" />
        <FilterButton label="Fecha" />
      </View>

      <FlatList
        data={sightingsData}
        renderItem={({ item }) => <SightingItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContentContainer}
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
  listContentContainer: { paddingTop: 8 },
  itemContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', paddingHorizontal: 16, minHeight: 72, paddingVertical: 8 },
  itemContent: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  itemImage: { width: 56, height: 56, borderRadius: 8 },
  itemTextContainer: { justifyContent: 'center' },
  itemName: { color: '#111811', fontSize: 16, fontWeight: '500' },
  itemDate: { color: '#638863', fontSize: 14 },
  itemRiskIndicatorContainer: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
  itemRiskIndicator: { width: 12, height: 12, borderRadius: 6 },
});
