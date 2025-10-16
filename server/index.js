

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const OpenAI = require('openai');

const app = express();
const port = 3000;

if (!process.env.OPENAI_API_KEY) {
  console.error('Error Crítico: La variable de entorno OPENAI_API_KEY no está definida.');
  process.exit(1);
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

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

app.get('/', (req, res) => {
  res.send('¡El servidor de identificación de insectos está funcionando!');
});

app.post('/api/identify', upload.any(), async (req, res) => {
  const { comment, date } = req.body;
  console.log(`Petición recibida con: Comentario - \"${comment}\", Fecha - ${date}`);
  
  const imageFile = req.files && req.files[0];
  if (!imageFile) {
    return res.status(400).json({ error: 'No se proporcionó ninguna imagen.' });
  }

  try {
    const base64Image = imageFile.buffer.toString('base64');
    const dataUrl = `data:${imageFile.mimetype};base64,${base64Image}`;

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

    const analysisResult = JSON.parse(response.choices[0].message.content);

    const finalResult = {
      ...analysisResult,
      comment: comment || '',
      date: date || new Date().toISOString(),
    };

    res.status(200).json(finalResult);

  } catch (error) {
    console.error('Error en /api/identify:', error);
    res.status(500).json({ error: 'Hubo un error en el servidor al analizar la imagen.' });
  }
});

app.post('/api/ask', async (req, res) => {
    const { question, context } = req.body;
    if (!question || !context) return res.status(400).json({ error: 'Faltan datos.' });
    try {
        const userMessage = `El insecto es ${context.nombreComun} (${context.nombreCientifico}). Mi pregunta es: ${question}`;
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                { role: 'system', content: conversationSystemPrompt },
                { role: 'user', content: userMessage }
            ],
            max_tokens: 300,
        });
        res.status(200).json({ answer: response.choices[0].message.content });
    } catch (error) {
        console.error('Error en /api/ask:', error);
        res.status(500).json({ error: 'Error al procesar la pregunta.' });
    }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
