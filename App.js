import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Svg, { Path } from 'react-native-svg';

// Importamos los componentes de pantalla
import HomeScreen from './src/screens/HomeScreen';
import CollectionsScreen from './src/screens/CollectionsScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import MapScreen from './src/screens/MapScreen';
import ResultScreen from './src/screens/ResultScreen'; // <-- Pantalla de Resultados importada

const Tab = createBottomTabNavigator();

// --- Iconos para la barra de navegación ---
const HomeIcon = ({ color }) => <Svg width="24px" height="24px" fill={color} viewBox="0 0 256 256"><Path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></Path></Svg>;
const CollectionsIcon = ({ color }) => <Svg width="24px" height="24px" fill={color} viewBox="0 0 256 256"><Path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,16V161.57l-51.77-32.35a8,8,0,0,0-8.48,0L72,161.56V48ZM132.23,177.22a8,8,0,0,0-8.48,0L72,209.57V180.43l56-35,56,35v29.14Z"></Path></Svg>;
const CommunityIcon = ({ color }) => <Svg width="24px" height="24px" fill={color} viewBox="0 0 256 256"><Path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></Path></Svg>;
const MapIcon = ({ color }) => <Svg width="24px" height="24px" fill={color} viewBox="0 0 256 256"><Path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></Path></Svg>;

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#111811',
          tabBarInactiveTintColor: '#638863',
        }}
      >
        <Tab.Screen name="Inicio" component={HomeScreen} options={{ tabBarIcon: ({ color }) => <HomeIcon color={color} /> }} />
        <Tab.Screen name="Colecciones" component={CollectionsScreen} options={{ tabBarIcon: ({ color }) => <CollectionsIcon color={color} /> }} />
        <Tab.Screen name="Comunidad" component={CommunityScreen} options={{ tabBarIcon: ({ color }) => <CommunityIcon color={color} /> }} />
        <Tab.Screen name="Mapa" component={MapScreen} options={{ tabBarIcon: ({ color }) => <MapIcon color={color} /> }} />
        
        {/* Pantalla oculta para los resultados */}
        <Tab.Screen 
          name="Resultados" 
          component={ResultScreen} 
          options={{ tabBarButton: () => null }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}