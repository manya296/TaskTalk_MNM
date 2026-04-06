// ============================================================
// AI/NLP Service — Intent Detection & Entity Extraction
// Uses OpenAI GPT-4o to parse natural language chat messages
// ============================================================

const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ── System Prompt ─────────────────────────────────────────────
// This prompt is the heart of the AI layer. It instructs the
// model to extract structured data from free-form chat input.
const SYSTEM_PROMPT = `
You are a business workflow AI assistant. Your job is to analyze chat messages from small business owners or their customers and extract structured information from them.

From each message, you must identify:
1. **intent**: One of "ORDER", "QUERY", "TASK", "CANCEL", "UPDATE", "UNKNOWN"
2. **entities**: Extract as many of these as present:
   - item: product/service name (string or null)
   - quantity: number (integer or null)
   - customer: customer/recipient name (string or null)
   - date: delivery/due date in natural language (string or null)
   - price: any price mentioned (number or null)
   - location: delivery address or area (string or null)
   - notes: any special instructions (string or null)
3. **confidence**: Your confidence in the extraction (0.0 to 1.0)
4. **reply**: A short, friendly business confirmation/response message to send back to the user

Respond ONLY with a valid JSON object. No markdown, no explanation.

Example input: "Send 5 notebooks to Rahul tomorrow"
Example output:
{
  "intent": "ORDER",
  "entities": {
    "item": "notebooks",
    "quantity": 5,
    "customer": "Rahul",
    "date": "tomorrow",
    "price": null,
    "location": null,
    "notes": null
  },
  "confidence": 0.97,
  "reply": "Got it! Order for 5 notebooks to Rahul has been placed for tomorrow delivery. ✅"
}
`;

// ── Parse Message ─────────────────────────────────────────────
/**
 * Sends a chat message to OpenAI and returns structured data.
 * @param {string} message - Raw natural language input
 * @returns {Object} Parsed intent, entities, confidence, reply
 */
async function parseMessage(message) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Fast + cheap for hackathon demos
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: message }
      ],
      temperature: 0.1, // Low temp = more consistent extraction
      max_tokens: 400,
    });

    const rawText = completion.choices[0].message.content.trim();

    // Strip markdown code blocks if model adds them
    const cleaned = rawText.replace(/```json|```/g, '').trim();
    const parsed = JSON.parse(cleaned);

    return {
      success: true,
      data: parsed,
    };
  } catch (error) {
    console.error('AI parsing error:', error.message);

    // Fallback: return a graceful degraded response
    return {
      success: false,
      data: {
        intent: 'UNKNOWN',
        entities: {
          item: null,
          quantity: null,
          customer: null,
          date: null,
          price: null,
          location: null,
          notes: null,
        },
        confidence: 0,
        reply: "I couldn't fully understand that message. Could you rephrase it?",
      },
      error: error.message,
    };
  }
}

module.exports = { parseMessage };
