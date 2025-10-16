
import AsyncStorage from '@react-native-async-storage/async-storage';

const COLLECTIONS_KEY = 'insect_collections';

// Obtiene todas las colecciones
export const getCollections = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(COLLECTIONS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error al obtener las colecciones:', e);
    return [];
  }
};

// Guarda una nueva identificación
export const saveIdentification = async (identificationData) => {
  // Si el objeto ya tiene un ID, es una actualización, no una creación.
  if (identificationData.id) {
    return await updateIdentification(identificationData.id, identificationData);
  }
  try {
    const existingCollections = await getCollections();
    const newIdentification = {
      id: `insect_${Date.now()}`,
      ...identificationData,
    };
    const updatedCollections = [...existingCollections, newIdentification];
    const jsonValue = JSON.stringify(updatedCollections);
    await AsyncStorage.setItem(COLLECTIONS_KEY, jsonValue);
    return newIdentification; // Devuelve el objeto nuevo con su ID
  } catch (e) {
    console.error('Error al guardar la identificación:', e);
    return false;
  }
};

// Actualiza una identificación existente
export const updateIdentification = async (id, updatedData) => {
  try {
    const existingCollections = await getCollections();
    const updatedCollections = existingCollections.map(item =>
      item.id === id ? { ...item, ...updatedData } : item
    );
    const jsonValue = JSON.stringify(updatedCollections);
    await AsyncStorage.setItem(COLLECTIONS_KEY, jsonValue);
    return true;
  } catch (e) {
    console.error('Error al actualizar la identificación:', e);
    return false;
  }
};

// Elimina una identificación por su ID
export const deleteIdentification = async (id) => {
  try {
    const existingCollections = await getCollections();
    const updatedCollections = existingCollections.filter(item => item.id !== id);
    const jsonValue = JSON.stringify(updatedCollections);
    await AsyncStorage.setItem(COLLECTIONS_KEY, jsonValue);
    return true;
  } catch (e) {
    console.error('Error al eliminar la identificación:', e);
    return false;
  }
};
