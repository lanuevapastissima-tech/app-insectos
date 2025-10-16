
import AsyncStorage from '@react-native-async-storage/async-storage';

const COLLECTIONS_KEY = 'insect_collections';

/**
 * Guarda una nueva identificación en la colección.
 * @param {object} identificationData - Los datos del insecto a guardar.
 */
export const saveIdentification = async (identificationData) => {
  try {
    // 1. Obtener la colección actual
    const existingCollections = await getCollections();

    // 2. Añadir la nueva identificación (añadiendo un ID único basado en la fecha)
    const newIdentification = { 
      id: `insect_${Date.now()}`,
      ...identificationData, 
    };
    const updatedCollections = [...existingCollections, newIdentification];

    // 3. Guardar la colección actualizada
    const jsonValue = JSON.stringify(updatedCollections);
    await AsyncStorage.setItem(COLLECTIONS_KEY, jsonValue);
    return true;
  } catch (e) {
    console.error('Error al guardar la identificación:', e);
    return false;
  }
};

/**
 * Obtiene todas las identificaciones guardadas.
 * @returns {Promise<Array>} - Una promesa que resuelve a un array de colecciones.
 */
export const getCollections = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(COLLECTIONS_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error al obtener las colecciones:', e);
    return [];
  }
};

/**
 * (Futuro) Elimina una identificación específica por su ID.
 */
export const deleteIdentification = async (id) => {
    // Lógica para eliminar un elemento específico
};

/**
 * (Futuro) Limpia toda la colección.
 */
export const clearAllCollections = async () => {
    try {
        await AsyncStorage.removeItem(COLLECTIONS_KEY);
    } catch(e) {
        console.error('Error al limpiar las colecciones:', e);
    }
}
