
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Image, ScrollView, ImageBackground, Alert, Modal, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { saveIdentification } from '../services/StorageService';

// --- CONFIGURACIÓN ---
const SERVER_IP = '192.168.100.145'; // La IP de tu PC
const ASK_URL = `http://${SERVER_IP}:3000/api/ask`;

// --- Iconos ---
const ArrowLeftIcon = () => <Svg width="24px" height="24px" fill="#111811" viewBox="0 0 256 256"><Path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></Path></Svg>;

// --- Componentes ---
const DetailRow = ({ label, value }) => (
    <View style={styles.detailRowContainer}>
        <Text style={styles.detailRowLabel}>{label}</Text>
        <Text style={styles.detailRowValue}>{value}</Text>
    </View>
);

const SimilarSpeciesCard = ({ name, scientificName, imageUrl }) => (
    <TouchableOpacity style={styles.similarCard}>
        <Image source={{ uri: imageUrl }} style={styles.similarCardImage} />
        <View>
            <Text style={styles.similarCardName}>{name}</Text>
            <Text style={styles.similarCardScientificName}>{scientificName}</Text>
        </View>
    </TouchableOpacity>
);

export default function ResultScreen({ route, navigation }) {
    const { analysis, imageUri } = route.params || {};
    const [data, setData] = useState(null);

    // Estados para la consulta a la IA
    const [isModalVisible, setModalVisible] = useState(false);
    const [question, setQuestion] = useState('');
    const [isAskingIA, setIsAskingIA] = useState(false);
    const [iaAnswer, setIaAnswer] = useState('');

    // Efecto para parsear datos y resetear la conversación
    useEffect(() => {
        if (analysis) {
            try {
                // Limpiar el estado de la conversación anterior
                setIaAnswer('');
                setQuestion('');

                const cleanedJsonString = analysis.replace(/```json|```/g, '');
                const parsedData = JSON.parse(cleanedJsonString);
                setData({ ...parsedData, imageUri });
            } catch (e) {
                console.error("Error al parsear el JSON de la IA:", e);
                setData({ nombreComun: "Error en el Análisis", descripcion: "La respuesta de la IA no tuvo el formato JSON esperado." });
            }
        }
    }, [analysis, imageUri]); // Se ejecuta si llega un nuevo `analysis`

    if (!data) {
        return <SafeAreaView style={styles.safeArea}><ActivityIndicator style={{flex: 1}} size="large" /></SafeAreaView>;
    }
    
    const confidencePercentage = String(data.confianza).replace('%', '');

    const handleDelete = () => {
        Alert.alert(
            "Eliminar Identificación",
            "¿Estás seguro de que quieres eliminar esta identificación? Los datos se perderán.",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Sí, eliminar", onPress: () => navigation.goBack(), style: "destructive" }
            ]
        );
    };

    const handleSave = async () => {
        const success = await saveIdentification(data);
        if (success) {
            Alert.alert(
                "Guardado",
                "La identificación ha sido guardada en tus Colecciones.",
                [
                    { text: "OK", onPress: () => navigation.navigate('Colecciones') }
                ]
            );
        } else {
            Alert.alert("Error", "No se pudo guardar la identificación.");
        }
    };

    const handleAskIA = async () => {
        if (!question.trim()) return;

        setModalVisible(false);
        setIsAskingIA(true);
        setIaAnswer('');

        try {
            const response = await fetch(ASK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: question,
                    context: data,
                }),
            });

            const responseJson = await response.json();

            if (!response.ok) {
                throw new Error(responseJson.error || 'Error desconocido del servidor');
            }

            setIaAnswer(responseJson.answer);

        } catch (error) {
            console.error("Error en handleAskIA:", error);
            Alert.alert('Error de IA', error.message || 'No se pudo conectar con el servidor.');
        } finally {
            setIsAskingIA(false);
            setQuestion('');
        }
    };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <StatusBar barStyle="dark-content" />

        <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Pregúntale a la IA</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Escribe tu pregunta sobre este insecto..."
                        multiline
                        value={question}
                        onChangeText={setQuestion}
                    />
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}><Text style={styles.footerButtonText}>Cancelar</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.modalButton, styles.saveButton]} onPress={handleAskIA}><Text style={styles.saveButtonText}>Enviar</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>

        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}><ArrowLeftIcon /></TouchableOpacity>
            <Text style={styles.headerTitle}>Identificación</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: data.imageUri }} style={styles.mainImage} />
            </View>
            
            <Text style={styles.mainTitle}>{data.nombreComun}</Text>
            <Text style={styles.scientificName}>{data.nombreCientifico}</Text>

            <View style={styles.confidenceContainer}>
                <Text style={styles.confidenceText}>Confianza: {data.confianza}</Text>
                <View style={styles.progressBarBackground}><View style={[styles.progressBarForeground, {width: `${confidencePercentage}%`}]} /></View>
            </View>

            <Text style={styles.description}>{data.descripcion}</Text>

            <Text style={styles.sectionTitle}>Información detallada</Text>
            <View style={styles.detailsContainer}>
                <DetailRow label="Tamaño" value={data.tamano} />
                <DetailRow label="Riesgo para humanos" value={data.peligrosidadHumanos} />
                <DetailRow label="Riesgo para plantas" value={data.peligrosidadPlantas} />
                <DetailRow label="Acción inmediata" value={data.accionInmediata} />
                <DetailRow label="Control de plagas" value={data.controlPlagas} />
            </View>

            <Text style={styles.sectionTitle}>Impacto ambiental</Text>
            <Text style={styles.description}>{data.impactoAmbiental}</Text>

            {data.especiesSimilares && data.especiesSimilares.length > 0 && (
                <>
                    <Text style={styles.sectionTitle}>Especies similares</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.similarSpeciesScroll}>
                        {data.especiesSimilares.map((species, index) => (
                            <SimilarSpeciesCard 
                                key={index} 
                                name={species.nombreComun || species} 
                                scientificName={species.nombreCientifico || '(No disponible)'} 
                                imageUrl={species.imageUrl || "https://via.placeholder.com/150"}
                            />
                        ))}
                    </ScrollView>
                </>
            )}

            <Text style={styles.sectionTitle}>Hábitat y alimentación</Text>
            <Text style={styles.description}>{data.habitatAlimentacion}</Text>

            <TouchableOpacity style={styles.aiCardContainer} onPress={() => setModalVisible(true)}>
                <ImageBackground 
                    source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6w0ddyJz5qh02-f_qqnMH1i1pv3rC57Uc3K11X2WlNC1tpX5_b2KYWdmWSPQ7zXoMpmuz8L9JO3mEGovdTZJBpwwHmDONMSRuaTOLNgN9GvHLwesSgX3l116g8N7H85MqfQT5j3zqU56IaWvBql-XDyBOMdCj_R7bE13ZVAOKlXMgezZIyW3dhIf2D98jdY2carTRt1yYqh8ZHmjsG3rZ5hu_qD1CuB2CIATinQQXcVofI9dgK-vBoYIjgkvq1YDCLvS_ePlRX08' }}
                    style={styles.aiCardBackground}
                    imageStyle={styles.aiCardImageStyle}
                >
                    <View style={styles.aiCardOverlay}>
                        <Text style={styles.aiCardTitle}>Respuesta de la IA</Text>
                        <Text style={styles.aiCardSubtitle}>Pregunta a la IA sobre este insecto</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>

            {isAskingIA && <ActivityIndicator size="large" color="#111811" style={{marginVertical: 20}} />}
            {iaAnswer && (
                <View style={styles.iaAnswerContainer}>
                    <Text style={styles.iaAnswerTitle}>Respuesta de la IA:</Text>
                    <Text style={styles.iaAnswerText}>{iaAnswer}</Text>
                </View>
            )}

            <View style={styles.footerButtonsContainer}>
                <TouchableOpacity style={styles.footerButton} onPress={handleDelete}><Text style={styles.footerButtonText}>Eliminar</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.footerButton, styles.saveButton]} onPress={handleSave}><Text style={styles.saveButtonText}>Guardar</Text></TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: 'white' },
    headerContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 8, height: 50 },
    headerIcon: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
    headerTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: 'bold', color: '#111811', marginRight: 48 },
    scrollContainer: { paddingBottom: 32 },
    imageContainer: { paddingHorizontal: 16 },
    mainImage: { width: '100%', aspectRatio: 3 / 2, borderRadius: 8, backgroundColor: '#f0f4f0' },
    mainTitle: { fontSize: 22, fontWeight: 'bold', color: '#111811', paddingHorizontal: 16, paddingTop: 20, paddingBottom: 12 },
    scientificName: { fontSize: 14, color: '#638863', paddingHorizontal: 16, paddingTop: 4, paddingBottom: 12 },
    confidenceContainer: { paddingHorizontal: 16, paddingVertical: 12, gap: 12 },
    confidenceText: { fontSize: 16, fontWeight: '500', color: '#111811' },
    progressBarBackground: { height: 8, backgroundColor: '#dce5dc', borderRadius: 8, overflow: 'hidden' },
    progressBarForeground: { height: '100%', backgroundColor: '#111811', borderRadius: 8 },
    description: { fontSize: 16, color: '#111811', paddingHorizontal: 16, paddingVertical: 12, lineHeight: 24 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#111811', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
    detailsContainer: { paddingHorizontal: 16 },
    detailRowContainer: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderColor: '#dce5dc', paddingVertical: 20 },
    detailRowLabel: { fontSize: 14, color: '#638863' },
    detailRowValue: { fontSize: 14, color: '#111811' },
    similarSpeciesScroll: { paddingHorizontal: 16, gap: 12 },
    similarCard: { width: 160, gap: 16 },
    similarCardImage: { width: '100%', aspectRatio: 1, borderRadius: 8, backgroundColor: '#f0f4f0' },
    similarCardName: { fontSize: 16, fontWeight: '500', color: '#111811' },
    similarCardScientificName: { fontSize: 14, color: '#638863' },
    aiCardContainer: { padding: 16 },
    aiCardBackground: { justifyContent: 'flex-end', borderRadius: 8, overflow: 'hidden', paddingTop: 132 },
    aiCardImageStyle: { borderRadius: 8 },
    aiCardOverlay: { backgroundColor: 'rgba(0, 0, 0, 0.4)', padding: 16, gap: 4 },
    aiCardTitle: { color: 'white', fontSize: 24, fontWeight: 'bold' },
    aiCardSubtitle: { color: 'white', fontSize: 16, fontWeight: '500' },
    footerButtonsContainer: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, paddingTop: 24 },
    footerButton: { flex: 1, height: 40, backgroundColor: '#f0f4f0', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
    footerButtonText: { fontSize: 14, fontWeight: 'bold', color: '#111811' },
    saveButton: { backgroundColor: '#17cf17' },
    saveButtonText: { color: '#111811', fontWeight: 'bold', fontSize: 14 },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    modalContent: { width: '90%', backgroundColor: 'white', borderRadius: 12, padding: 20, gap: 16 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
    textInput: { borderWidth: 1, borderColor: '#dce5dc', borderRadius: 8, padding: 12, minHeight: 100, textAlignVertical: 'top' },
    modalButtonContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
    modalButton: { flex: 1, height: 40, backgroundColor: '#f0f4f0', borderRadius: 8, justifyContent: 'center', alignItems: 'center' },
    iaAnswerContainer: { margin: 16, padding: 16, backgroundColor: '#f0f4f0', borderRadius: 8 },
    iaAnswerTitle: { fontWeight: 'bold', marginBottom: 8, color: '#111811' },
    iaAnswerText: { color: '#111811', lineHeight: 22 },
});
