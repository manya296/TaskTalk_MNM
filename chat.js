// ============================================================
// Chat Route — POST /api/chat/process
// The core endpoint: receives a message, runs AI + workflow
// ============================================================

const express = require('express');
const router = express.Router();
const { parseMessage } = require('../services/aiService');
const { runWorkflow } = require('../services/workflowEngine');

/**
 * POST /api/chat/process
 * Body: { message: "Send 5 notebooks to Rahul tomorrow" }
 * Returns: structured data + workflow result
 */
router.post('/process', async (req, res) => {
  const { message } = req.body;

  if (!message || !message.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Message is required',
    });
  }

  console.log(`\n📨 Incoming message: "${message}"`);

  try {
    // ── Step 1: AI parses the message ─────────────────────────
    console.log('🤖 Running AI extraction...');
    const aiResult = await parseMessage(message);
    const { intent, entities, confidence, reply } = aiResult.data;

    console.log(`✅ Intent: ${intent} | Confidence: ${(confidence * 100).toFixed(0)}%`);
    console.log('📦 Entities:', entities);

    // ── Step 2: Workflow engine triggers business actions ─────
    console.log(`⚙️  Running workflow for intent: ${intent}`);
    const workflowResult = await runWorkflow(intent, entities);

    console.log(`🎯 Workflow result: ${workflowResult.summary}`);

    // ── Step 3: Return everything to frontend ─────────────────
    res.json({
      success: true,
      input: message,
      ai: {
        intent,
        entities,
        confidence,
        reply,
      },
      workflow: workflowResult,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Processing error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process message',
      details: error.message,
    });
  }
});

/**
 * POST /api/chat/demo
 * Returns a hardcoded demo response — useful if no OpenAI key
 */
router.post('/demo', async (req, res) => {
  const { message } = req.body;

  // Simulate processing delay
  await new Promise(r => setTimeout(r, 800));

  const demoResponse = getDemoResponse(message || '');
  res.json(demoResponse);
});

// ── Demo Response Generator (no API key needed) ───────────────
function getDemoResponse(message) {
  const lower = message.toLowerCase();

  if (lower.includes('notebook') || lower.includes('pen') || lower.includes('send') || lower.includes('order')) {
    const item = lower.includes('pen') ? 'pens' : lower.includes('paper') ? 'paper ream' : 'notebooks';
    const qty = parseInt(message.match(/\d+/)?.[0]) || 5;
    const customer = message.match(/to\s+([A-Z][a-z]+)/)?.[1] || 'Rahul';
    const orderId = `ORD-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
    const invoiceId = `INV-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    return {
      success: true,
      input: message,
      ai: {
        intent: 'ORDER',
        entities: { item, quantity: qty, customer, date: 'tomorrow', price: null, location: null, notes: null },
        confidence: 0.96,
        reply: `Got it! Order for ${qty} ${item} to ${customer} confirmed for tomorrow delivery. ✅`,
      },
      workflow: {
        type: 'ORDER',
        success: true,
        order: { id: orderId, customer, item, quantity: qty, unitPrice: 45, totalAmount: qty * 45, deliveryDate: 'tomorrow', status: 'confirmed' },
        invoice: { invoiceId, orderId, customer, item, quantity: qty, unitPrice: 45, totalAmount: qty * 45, status: 'generated' },
        actions: [
          { step: 1, action: 'INVENTORY_CHECK', status: 'passed', details: { item, requested: qty, available: 120, sufficient: true } },
          { step: 2, action: 'STOCK_UPDATE', status: 'completed', details: { reduced: qty, remaining: 120 - qty } },
          { step: 3, action: 'ORDER_CREATED', status: 'completed', details: { orderId, customer, item, quantity: qty, totalAmount: qty * 45 } },
          { step: 4, action: 'INVOICE_GENERATED', status: 'completed', details: { invoiceId } },
          { step: 5, action: 'CONFIRMATION_SENT', status: 'completed', details: { channel: 'chat' } },
        ],
        summary: `Order ${orderId} created for ${qty}x ${item} → ${customer} | ₹${qty * 45}`,
      },
      timestamp: new Date().toISOString(),
    };
  }

  if (lower.includes('check') || lower.includes('status') || lower.includes('how many') || lower.includes('stock')) {
    return {
      success: true,
      input: message,
      ai: {
        intent: 'QUERY',
        entities: { item: 'notebooks', quantity: null, customer: null, date: null, price: null, location: null, notes: null },
        confidence: 0.88,
        reply: 'Here's the current stock information for notebooks. 📊',
      },
      workflow: {
        type: 'QUERY',
        success: true,
        results: [{ id: 'ORD-DEMO1', customer: 'Rahul', item: 'notebooks', quantity: 5, status: 'confirmed', createdAt: new Date().toISOString() }],
        actions: [{ step: 1, action: 'QUERY_RESOLVED', status: 'completed', details: { found: 1 } }],
        summary: 'Found 1 matching record',
      },
      timestamp: new Date().toISOString(),
    };
  }

  return {
    success: true,
    input: message,
    ai: {
      intent: 'TASK',
      entities: { item: null, quantity: null, customer: null, date: 'tomorrow', price: null, location: null, notes: message },
      confidence: 0.72,
      reply: 'Task noted! I\'ve logged this for the team. 📝',
    },
    workflow: {
      type: 'TASK',
      success: true,
      task: { id: `TSK-DEMO${Date.now().toString().slice(-4)}`, description: message, status: 'pending' },
      actions: [{ step: 1, action: 'TASK_LOGGED', status: 'completed', details: {} }],
      summary: 'Task logged successfully',
    },
    timestamp: new Date().toISOString(),
  };
}

module.exports = router;
