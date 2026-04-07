# 🚀 TaskTalk – Chat to Business Workflow Automation System

TaskTalk is a full-stack web application that converts natural language input into structured workflows and tracks execution step-by-step in real time.

---

## 🧠 Problem Statement

Businesses often receive instructions in unstructured formats (chat, messages, emails). Managing and tracking these manually leads to:

- ❌ Miscommunication
- ❌ Missed steps
- ❌ Lack of visibility

---

## 💡 Solution

TaskTalk transforms simple chat input like:

> *"Send 5 notebooks to Rahul tomorrow"*

into:

- ✅ Structured order
- ✅ Automated workflow
- ✅ Trackable task pipeline

---

## ⚙️ Features

### 💬 Chat-Based Order Input
- Enter business instructions in natural language
- Rule-based NLP extracts:
  - Customer name
  - Item
  - Quantity

### 🔄 Workflow Automation
Each order generates a workflow:
```
Confirm Order → Check Inventory → Generate Invoice → Dispatch → Confirmation
```

### 📊 Orders Dashboard
- Table view of all orders
- Current task status
- Click to view workflow

### ✅ Task Tracking
- Complete tasks step-by-step
- Real-time updates
- Progress tracking

### 🧠 NLP Engine
- Rule-based NLP (no API dependency)
- Handles edge cases like:
  - Dates (e.g., `"10 April"`)
  - Time words (e.g., `"tomorrow"`)
- Extracts clean structured data

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React (Vite), Axios, Custom CSS (dark dashboard UI) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Orders + Tasks collections) |

---

## 📂 Project Structure

```
MNM/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   ├── routes/
│   │   └── index.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ChatPanel.jsx
│   │   │   ├── AnalysisPanel.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── WorkflowStep.jsx
│   │   │   └── MessageBubble.jsx
│   │   ├── App.jsx
│   │   └── index.css
```

---

## 🔄 How It Works

```
User Input (Chat)
        ↓
Rule-Based NLP Extraction
        ↓
Order Created (MongoDB)
        ↓
Workflow Tasks Generated
        ↓
Dashboard Displays Orders
        ↓
User Completes Tasks
        ↓
Progress Updates in Real-Time
```

---

## 🗄️ Database Design

### Orders Collection
```json
{
  "orderId": "ORD1234",
  "customerName": "Rahul",
  "item": "notebook",
  "quantity": 5,
  "currentTask": "Confirm Order"
}
```

### Tasks Collection
```json
{
  "orderId": "ORD1234",
  "taskName": "Check Inventory",
  "taskOrder": 2,
  "status": "pending"
}
```

---

## 🚀 Getting Started

### 1. Clone Repo
```bash
git clone https://github.com/manya296/TaskTalk_MNM.git
cd TaskTalk_MNM
```

### 2. Backend Setup
```bash
cd backend
npm install
node src/index.js
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Open App
```
http://localhost:5173
```

---

## 🧪 Example Input

```
Send 10 pens to Nishtha on 10 April
```

**Output:**
| Field | Value |
|-------|-------|
| Customer | Nishtha |
| Item | Pens |
| Quantity | 10 |
| Workflow | Created automatically ✅ |

---

## 🏆 Key Highlights

- 🔥 Chat → Workflow pipeline
- 🔥 Real-time task tracking
- 🔥 Clean dashboard UI
- 🔥 No external AI dependency (cost-free NLP)
- 🔥 Scalable architecture

---

## 📌 Future Improvements

- [ ] AI-powered NLP (OpenAI / HuggingFace)
- [ ] Workflow customization
- [ ] Multi-user roles
- [ ] Notifications system
- [ ] Analytics dashboard

---

## 👥 Team

Developed by Team MNM as part of a hackathon project.
