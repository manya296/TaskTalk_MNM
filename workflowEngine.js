// ============================================================
// Workflow Engine
// Based on detected intent, triggers the right business actions
// ORDER  → check inventory → create order → generate invoice
// QUERY  → look up inventory/order status
// TASK   → log task
// CANCEL → update order status
// ============================================================

const {
  findInventoryItem,
  reduceStock,
  createOrder,
  getOrderById,
  getAllOrders,
  generateInvoice,
} = require('./dataStore');

/**
 * Main workflow dispatcher.
 * @param {string} intent - Detected intent from AI
 * @param {Object} entities - Extracted entities from AI
 * @returns {Object} Workflow result with all triggered actions
 */
async function runWorkflow(intent, entities) {
  switch (intent) {
    case 'ORDER':
      return await handleOrder(entities);
    case 'QUERY':
      return await handleQuery(entities);
    case 'TASK':
      return await handleTask(entities);
    case 'CANCEL':
      return await handleCancel(entities);
    default:
      return {
        type: 'UNKNOWN',
        message: 'No workflow triggered. Intent not recognized.',
        actions: [],
      };
  }
}

// ── ORDER Workflow ────────────────────────────────────────────
async function handleOrder(entities) {
  const { item, quantity = 1, customer = 'Walk-in Customer', date } = entities;
  const actions = [];

  // Step 1: Check inventory
  const inventoryItem = findInventoryItem(item);
  let unitPrice = 0;
  let stockStatus = 'unknown';
  let stockSufficient = false;

  if (inventoryItem) {
    unitPrice = inventoryItem.price;
    stockStatus = inventoryItem.stock >= quantity ? 'sufficient' : 'low';
    stockSufficient = inventoryItem.stock >= quantity;

    actions.push({
      step: 1,
      action: 'INVENTORY_CHECK',
      status: stockSufficient ? 'passed' : 'warning',
      details: {
        item: inventoryItem.item,
        requested: quantity,
        available: inventoryItem.stock,
        sufficient: stockSufficient,
      },
    });

    // Step 2: Deduct stock if sufficient
    if (stockSufficient) {
      const stockResult = reduceStock(inventoryItem.id, quantity);
      actions.push({
        step: 2,
        action: 'STOCK_UPDATE',
        status: 'completed',
        details: {
          reduced: quantity,
          remaining: stockResult.remaining,
        },
      });
    }
  } else {
    actions.push({
      step: 1,
      action: 'INVENTORY_CHECK',
      status: 'not_found',
      details: { item, message: 'Item not found in inventory — order still created' },
    });
  }

  // Step 3: Create order record
  const totalAmount = unitPrice * quantity;
  const order = createOrder({
    customer,
    item: item || 'Unknown Item',
    quantity,
    unitPrice,
    totalAmount,
    deliveryDate: date,
    stockStatus,
  });

  actions.push({
    step: inventoryItem ? 3 : 2,
    action: 'ORDER_CREATED',
    status: 'completed',
    details: { orderId: order.id, customer, item, quantity, totalAmount },
  });

  // Step 4: Generate invoice
  const invoice = generateInvoice(order);
  actions.push({
    step: inventoryItem ? 4 : 3,
    action: 'INVOICE_GENERATED',
    status: 'completed',
    details: invoice,
  });

  // Step 5: Dispatch confirmation (simulated)
  actions.push({
    step: inventoryItem ? 5 : 4,
    action: 'CONFIRMATION_SENT',
    status: 'completed',
    details: {
      channel: 'chat',
      message: `Order ${order.id} confirmed for ${customer}`,
    },
  });

  return {
    type: 'ORDER',
    success: true,
    order,
    invoice,
    actions,
    summary: `Order ${order.id} created for ${quantity}x ${item} → ${customer} | ₹${totalAmount} | Delivery: ${date || 'ASAP'}`,
  };
}

// ── QUERY Workflow ────────────────────────────────────────────
async function handleQuery(entities) {
  const { item, customer } = entities;
  const actions = [];

  // Try to look up recent orders for customer
  const allOrders = getAllOrders();
  let relevantOrders = allOrders;

  if (customer) {
    relevantOrders = allOrders.filter(o =>
      o.customer?.toLowerCase().includes(customer.toLowerCase())
    );
  }
  if (item) {
    relevantOrders = relevantOrders.filter(o =>
      o.item?.toLowerCase().includes(item.toLowerCase())
    );
  }

  actions.push({
    step: 1,
    action: 'QUERY_RESOLVED',
    status: 'completed',
    details: {
      found: relevantOrders.length,
      orders: relevantOrders.slice(0, 5), // Return max 5
    },
  });

  return {
    type: 'QUERY',
    success: true,
    results: relevantOrders.slice(0, 5),
    actions,
    summary: `Found ${relevantOrders.length} matching record(s)`,
  };
}

// ── TASK Workflow ─────────────────────────────────────────────
async function handleTask(entities) {
  const { notes, customer, date } = entities;
  const taskId = `TSK-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

  return {
    type: 'TASK',
    success: true,
    task: {
      id: taskId,
      description: notes || 'No description',
      assignedTo: customer,
      dueDate: date,
      status: 'pending',
      createdAt: new Date().toISOString(),
    },
    actions: [
      {
        step: 1,
        action: 'TASK_LOGGED',
        status: 'completed',
        details: { taskId },
      },
    ],
    summary: `Task ${taskId} logged successfully`,
  };
}

// ── CANCEL Workflow ───────────────────────────────────────────
async function handleCancel(entities) {
  return {
    type: 'CANCEL',
    success: true,
    actions: [
      {
        step: 1,
        action: 'CANCEL_PROCESSED',
        status: 'completed',
        details: { message: 'Cancellation request recorded' },
      },
    ],
    summary: 'Cancellation recorded. Team will process it shortly.',
  };
}

module.exports = { runWorkflow };
