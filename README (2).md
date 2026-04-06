# ChatFlow — Chat-to-Business Workflow Automation
### Hackathon Edition | Team MNM

---

## System Architecture

```
User (Chat Input)
       │
       ▼
┌─────────────────────────────────────────────────────┐
│  FRONTEND  (React + Tailwind, Vercel)               │
│  • Chat UI  • Structured Data Viewer  • Workflow    │
└──────────────────────┬──────────────────────────────┘
                       │  POST /api/chat/process
                       ▼
┌─────────────────────────────────────────────────────┐
│  BACKEND  (Node.js + Express, Render)               │
│                                                     │
│  ┌─────────────┐   ┌────────────┐   ┌───────────┐  │
│  │ Chat Route  │──▶│ AI Service │──▶│ Workflow  │  │
│  │ /api/chat   │   │ (OpenAI)   │   │  Engine   │  │
│  └─────────────┘   └────────────┘   └─────┬─────┘  │
│                                           │        │
│                              ┌────────────▼──────┐ │
│                              │  Data Store       │ │
│                              │ (MongoDB / Mock)  │ │
│                              └───────────────────┘ │
└─────────────────────────────────────────────────────┘
```

**Data Flow:**
1. User types: "Send 5 notebooks to Rahul tomorrow"
2. Frontend POSTs to `/api/chat/process`
3. Backend calls OpenAI with structured extraction prompt
4. OpenAI returns: intent=ORDER, entities={item, qty, customer, date}
5. Workflow Engine triggers: inventory check → order create → invoice → confirm
6. Frontend displays structured data + workflow steps + invoice

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | React.js + Tailwind CSS | Fast, modern, looks great |
| Backend | Node.js + Express | Simple, fast REST API |
| AI/NLP | OpenAI GPT-4o-mini | Best intent+entity extraction |
| Database | MongoDB (mock in-memory for demo) | Flexible, schema-less |
| Hosting | Vercel (FE) + Render (BE) | Free tiers, easy deploy |

---

## Project Structure

```
chatflow/
├── chatflow-backend/
│   ├── src/
│   │   ├── index.js                  # Express server entry point
│   │   ├── routes/
│   │   │   ├── chat.js               # POST /api/chat/process (MAIN ENDPOINT)
│   │   │   ├── orders.js             # GET /api/orders
│   │   │   └── inventory.js          # GET /api/inventory
│   │   └── services/
│   │       ├── aiService.js          # OpenAI call + prompt
│   │       ├── workflowEngine.js     # Intent → business actions
│   │       └── dataStore.js          # In-memory DB (swap for MongoDB)
│   ├── package.json
│   └── .env.example
│
└── chatflow-frontend/
    ├── src/
    │   ├── App.jsx                   # Root component
    │   ├── components/
    │   │   ├── ChatWindow.jsx        # Message bubbles + input
    │   │   ├── StructuredData.jsx    # Entity display card
    │   │   ├── WorkflowPanel.jsx     # Step-by-step actions
    │   │   ├── InvoiceCard.jsx       # Invoice display
    │   │   └── PipelineViz.jsx       # Animated pipeline
    │   └── services/
    │       └── api.js                # Axios calls to backend
    ├── package.json
    └── tailwind.config.js
```

---

## Backend API Endpoints

### `POST /api/chat/process`
**The main endpoint.** Receives a message, returns structured data + workflow result.

**Request:**
```json
{ "message": "Send 5 notebooks to Rahul tomorrow" }
```

**Response:**
```json
{
  "success": true,
  "input": "Send 5 notebooks to Rahul tomorrow",
  "ai": {
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
    "reply": "Order confirmed for 5 notebooks to Rahul, delivery tomorrow! ✅"
  },
  "workflow": {
    "type": "ORDER",
    "success": true,
    "order": { "id": "ORD-A3F7B2", "status": "confirmed", "totalAmount": 225 },
    "invoice": { "invoiceId": "INV-C9D1E4", "totalAmount": 225 },
    "actions": [
      { "step": 1, "action": "INVENTORY_CHECK", "status": "passed" },
      { "step": 2, "action": "STOCK_UPDATE", "status": "completed" },
      { "step": 3, "action": "ORDER_CREATED", "status": "completed" },
      { "step": 4, "action": "INVOICE_GENERATED", "status": "completed" },
      { "step": 5, "action": "CONFIRMATION_SENT", "status": "completed" }
    ]
  }
}
```

### `POST /api/chat/demo`
Same as above but uses hardcoded mock data. **Use this if no OpenAI key.**

### `GET /api/inventory`
Returns current inventory with stock levels.

### `GET /api/orders`
Returns all created orders (most recent first).

---

## AI Prompt Design

The system prompt is the core intelligence:

```
You are a business workflow AI assistant. Analyze chat messages from 
small business owners and extract:
1. intent: "ORDER" | "QUERY" | "TASK" | "CANCEL" | "UPDATE" | "UNKNOWN"
2. entities: { item, quantity, customer, date, price, location, notes }
3. confidence: 0.0 to 1.0
4. reply: friendly confirmation message

Respond ONLY with valid JSON. No markdown, no preamble.
```

**Example inputs → outputs:**

| Input | Intent | Key Entities |
|-------|--------|-------------|
| "Send 5 notebooks to Rahul tomorrow" | ORDER | item:notebooks, qty:5, customer:Rahul, date:tomorrow |
| "How many pens do we have?" | QUERY | item:pens |
| "Remind Priya to call Arjun on Monday" | TASK | customer:Priya, date:Monday |
| "Cancel last order for Sneha" | CANCEL | customer:Sneha |

---

## Hackathon Strategy: Real vs Mocked

| Feature | Status | Why |
|---------|--------|-----|
| Chat UI | ✅ REAL | Easy to build, always works |
| AI extraction (OpenAI) | ✅ REAL | The "wow" factor |
| Intent + entity parsing | ✅ REAL | Core differentiator |
| Order creation | ✅ REAL | Works with mock DB |
| Invoice generation | ✅ REAL | Simple data transformation |
| Inventory deduction | ✅ REAL | Simple in-memory operation |
| MongoDB persistence | 🔶 MOCKED | Use in-memory for demo |
| Email/WhatsApp notifications | 🔶 MOCKED | Show "sent" in UI |
| Billing system integration | 🔶 MOCKED | Show invoice card |
| Multi-tenant auth | ❌ SKIP | Not needed for hackathon |

**Key Insight:** The AI + workflow pipeline is 100% real. The data persistence is mocked, but the *output looks identical* to a real system.

---

## Deployment Guide

### Step 1 — Run Backend Locally
```bash
cd chatflow-backend
npm install
cp .env.example .env
# Add your OpenAI key to .env (or leave blank for demo mode)
npm run dev
# → Server starts at http://localhost:5000
# → Test: GET http://localhost:5000/api/health
```

### Step 2 — Run Frontend Locally
```bash
cd chatflow-frontend
npm install
npm run dev
# → Opens at http://localhost:5173
```

### Step 3 — Deploy Backend to Render
1. Push code to GitHub
2. Go to render.com → New Web Service
3. Connect your repo, select `chatflow-backend`
4. Build command: `npm install`
5. Start command: `npm start`
6. Add environment variable: `OPENAI_API_KEY=sk-...`
7. Deploy → copy your Render URL

### Step 4 — Deploy Frontend to Vercel
1. Go to vercel.com → New Project
2. Import your GitHub repo
3. Set root directory to `chatflow-frontend`
4. Add env variable: `VITE_API_URL=https://your-render-url.com`
5. Deploy → get your live URL

---

## 2-Minute Demo Script (WOW Factor)

### Opening (15 sec)
*"Every day, thousands of businesses manage orders through WhatsApp and chat. But every message has to be manually re-entered into systems. We built ChatFlow to eliminate that gap entirely."*

### Demo 1 — Order (45 sec)
Type: **"Send 5 notebooks to Rahul tomorrow"**

Point to screen:
- *"Watch the AI extract: item, quantity, customer, delivery date — in real time"*
- *"The pipeline fires: inventory checked ✓ stock updated ✓ order created ✓ invoice generated ✓"*
- *"That's a full business workflow triggered from one chat message"*

### Demo 2 — Query (20 sec)
Type: **"Check stock status for notebooks"**
- *"Different intent, different workflow — it queries instead of ordering"*

### Demo 3 — Task (20 sec)
Type: **"Remind Priya to follow up with Arjun on Monday"**
- *"Three different intents, three different workflows — all from natural language"*

### Close (20 sec)
*"No forms. No data entry. No switching between tools. Just chat — and the system handles the rest. This is built on React, Node.js, and OpenAI. The architecture is modular and ready to plug into any existing system via API."*

---

## Bonus Feature: Context-Aware Chat

The system can be extended to handle multi-turn context:

```
User: "Send 10 notebooks to Rahul"
Bot:  "Got it! Which date?"
User: "Tomorrow"
Bot:  "Order confirmed — 10 notebooks → Rahul, tomorrow ✅"
```

**Implementation:** Store last extracted entities in session state and merge follow-up messages with previous context before sending to AI.

---

## MongoDB Schemas (Production)

```javascript
// Orders
{ orderId, customer, item, quantity, unitPrice, totalAmount,
  deliveryDate, status, createdAt }

// Inventory  
{ itemId, name, stock, unit, price, lastUpdated }

// Users
{ userId, name, email, phone, role, createdAt }

// ChatLog (bonus)
{ sessionId, userId, messages: [{ role, text, timestamp }],
  intents: [], createdAt }
```

---

*Built for hackathon by Team MNM | ChatFlow v1.0*
