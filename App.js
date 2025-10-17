import React, { useState, useEffect } from 'react';
import './src/services/i18n'; // Importar configuración de i18n
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Svg, { Path } from 'react-native-svg';
import { supabase } from './src/services/supabase';

// Importamos los componentes de pantalla
import HomeScreen from './src/screens/HomeScreen';
import CollectionsScreen from './src/screens/CollectionsScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import MapScreen from './src/screens/MapScreen';
import ResultScreen from './src/screens/ResultScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Configuración de Deep Linking
const linking = {
  prefixes: ['io.supabase.insectapp://'],
  config: {
    screens: {
      ResetPassword: 'reset-password',
    },
  },
};

// --- Iconos para la barra de navegación ---
const HomeIcon = ({ color }) => <Svg width="24px" height="24px" fill={color} viewBox="0 0 256 256"><Path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></Path></Svg>;
const CollectionsIcon = ({ color }) => <Svg width="24px" height="24px" fill={color} viewBox="0 0 256 256"><Path d="M184,32H72A16,16,0,0,0,56,48V224a8,8,0,0,0,12.24,6.78L128,193.43l59.77,37.35A8,8,0,0,0,200,224V48A16,16,0,0,0,184,32Zm0,16V161.57l-51.77-32.35a8,8,0,0,0-8.48,0L72,161.56V48ZM132.23,177.22a8,8,0,0,0-8.48,0L72,209.57V180.43l56-35,56,35v29.14Z"></Path></Svg>;
const CommunityIcon = ({ color }) => <Svg width="24px" height="24px" fill={color} viewBox="0 0 256 256"><Path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"></Path></Svg>;
const MapIcon = ({ color }) => <Svg width="24px" height="24px" fill={color} viewBox="0 0 256 256"><Path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,38.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,200.25c27.45-31.57,42-64.85,42-96.25A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,0,1,144,0C200,161.23,144.53,209,128,222Z"></Path></Svg>;

// Flujo principal de la app (cuando el usuario está logueado)
function AppStack() {
  return (
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
  );
}

// Flujo de autenticación (cuando el usuario no está logueado)
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [session, setSession] = useState(null);
  const navigationRef = React.useRef();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === 'PASSWORD_RECOVERY') {
        // No cambies la sesión, solo navega a la pantalla de reseteo.
        // El token de recuperación está en la URL que abrió la app.
        if (navigationRef.current) {
          navigationRef.current.navigate('ResetPassword');
        }
      } else {
        setSession(session);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      {session && session.user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}