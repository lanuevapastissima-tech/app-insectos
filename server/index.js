
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const OpenAI = require('openai');

// --- Inicialización y Configuración ---
const app = express();
const port = 3000;

if (!process.env.OPENAI_API_KEY) {
  console.error('Error Crítico: La variable de entorno OPENAI_API_KEY no está definida.');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// --- Middlewares ---
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// --- Prompts de Sistema para la IA ---
const identificationPrompt = `
  Eres un experto entomólogo y biólogo de clase mundial. Tu tarea es identificar el insecto en la imagen proporcionada por el usuario.
  Debes responder únicamente con un objeto JSON, sin texto adicional antes o después.
  El objeto JSON debe tener la siguiente estructura y tipos de datos:
  {
    "nombreComun": "string",
    "nombreCientifico": "string",
    "descripcion": "string (párrafo conciso de 2-3 frases sobre el insecto)",
    "confianza": "string (un porcentaje, ej: '95%')",
    "tamano": "string (un rango, ej: '10-12 mm')",
    "peligrosidadHumanos": "string ('Bajo', 'Medio', 'Alto', 'Nulo')",
    "peligrosidadPlantas": "string ('Bajo', 'Medio', 'Alto', 'Nulo', 'Beneficioso')",
    "accionInmediata": "string (una recomendación corta y directa, ej: 'Inspeccionar cultivos', 'No se requiere acción')",
    "controlPlagas": "string (método de control si aplica, ej: 'Insecticidas', 'Control biológico', 'No aplica')",
    "impactoAmbiental": "string (párrafo corto sobre su rol en el ecosistema)",
    "especiesSimilares": [
      { "nombreComun": "string", "nombreCientifico": "string" },
      { "nombreComun": "string", "nombreCientifico": "string" }
    ],
    "habitatAlimentacion": "string (párrafo corto sobre dónde vive y qué come)"
  }
  Si no puedes identificar el insecto o la imagen no es clara, devuelve un JSON con el campo "nombreComun" como "Desconocido" y una "descripcion" explicando el problema.
`;

const conversationSystemPrompt = `
  Eres un experto entomólogo y biólogo de clase mundial. Responde a la pregunta del usuario de forma clara, concisa y amigable, como si estuvieras explicando a un aficionado curioso.
  Limita tu respuesta a uno o dos párrafos.
`;

// --- Rutas ---
app.get('/', (req, res) => {
  res.send('¡El servidor de identificación de insectos está funcionando!');
});

app.post('/api/identify', upload.single('image'), async (req, res) => {
  console.log('Petición recibida en /api/identify');
  if (!req.file) {
    return res.status(400).json({ error: 'No se proporcionó ninguna imagen.' });
  }

  try {
    const base64Image = req.file.buffer.toString('base64');
    const dataUrl = `data:${req.file.mimetype};base64,${base64Image}`;
    console.log('Enviando imagen a OpenAI para análisis...');

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: identificationPrompt },
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Identifica el insecto en esta imagen y responde únicamente con el formato JSON solicitado.' },
            { type: 'image_url', image_url: { url: dataUrl } },
          ],
        },
      ],
      max_tokens: 1500,
      response_format: { type: "json_object" },
    });

    console.log('Análisis de OpenAI recibido exitosamente.');
    const analysisResult = JSON.parse(response.choices[0].message.content);
    res.status(200).json(analysisResult);

  } catch (error) {
    console.error('Error al procesar con OpenAI en /api/identify:', error);
    res.status(500).json({ error: 'Hubo un error en el servidor al analizar la imagen.' });
  }
});

app.post('/api/ask', async (req, res) => {
    const { question, context } = req.body;
    console.log(`Petición recibida en /api/ask con la pregunta: "${question}"`);

    if (!question || !context) {
        return res.status(400).json({ error: 'Faltan la pregunta o el contexto del insecto.' });
    }

    try {
        const userMessage = `El insecto en cuestión es ${context.nombreComun} (${context.nombreCientifico}). Mi pregunta es: ${question}`;

        console.log('Enviando pregunta de seguimiento a OpenAI...');

        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: conversationSystemPrompt },
                { role: 'user', content: userMessage }
            ],
            max_tokens: 300,
        });

        const answer = response.choices[0].message.content;
        console.log('Respuesta de seguimiento recibida.');
        res.status(200).json({ answer });

    } catch (error) {
        console.error('Error al procesar con OpenAI en /api/ask:', error);
        res.status(500).json({ error: 'Hubo un error en el servidor al procesar la pregunta.' });
    }
});

// --- Puesta en Marcha ---
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
