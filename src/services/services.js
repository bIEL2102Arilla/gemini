import axios from 'axios';

// Endpoint v1 per al model 'gemini-2.5-flash'
const API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';

export const generateTripPlan = async (tripDetails, apiKey) => {
  if (!apiKey) throw new Error('Falta API Key');

  const { destination, duration, budget, interests, travelStyle } = tripDetails;

  const prompt = `Actua com un expert en planificació de viatges i crea un itinerari detallat per a:
  
  Destinació: ${destination}
  Durada: ${duration} dies
  Pressupost: ${budget}
  Interessos: ${interests}
  Estil de viatge: ${travelStyle}
  
  Proporciona un itinerari dia per dia amb:
  1. Activitats recomanades
  2. Llocs per menjar
  3. Allotjament suggerit
  4. Tips locals
  5. Estimació de costos aproximats
  
  Formata la resposta amb markdown.`;

  try {
    const response = await axios.post(
      `${API_URL}?key=${apiKey}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
      },
      { headers: { 'Content-Type': 'application/json' } },
    );

    const c0 = response.data?.candidates?.[0];
    const text = c0?.content?.parts?.[0]?.text ?? c0?.text ?? '';
    if (!text) throw new Error('Format de resposta inesperat');
    return text;
  } catch (error) {
    if (error.response) {
      throw new Error(`Error API (${error.response.status}): ${JSON.stringify(error.response.data)}`);
    }
    if (error.request) {
      throw new Error('No s’ha rebut resposta del servidor.');
    }
    throw new Error(`Error en la sol·licitud: ${error.message}`);
  }
};
