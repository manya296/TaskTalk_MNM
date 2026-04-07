const extractOrderData = (message) => {
    message = message.toLowerCase();

    // ----------------------
    // 1. Extract Quantity
    // ----------------------
    const quantityMatch = message.match(/\d+/);
    const quantity = quantityMatch ? parseInt(quantityMatch[0]) : 1;

    // ----------------------
    // 2. Extract Item
    // ----------------------
    let item = "item";
    if (message.includes("notebook")) item = "notebook";
    else if (message.includes("pen")) item = "pen";
    else if (message.includes("book")) item = "book";
    else if (message.includes("laptop")) item = "laptop";

    // ----------------------
    // 3. Extract Customer Name (IMPROVED)
    // ----------------------

    // Look for pattern: "to <name>"
    let customerName = "Customer";

    const nameMatch = message.match(/to\s+([a-z]+)/);

    if (nameMatch) {
        customerName = nameMatch[1];
    }

    // ----------------------
    // 4. Clean invalid names (IMPORTANT)
    // ----------------------

    const invalidWords = [
        "tomorrow", "today", "april", "may", "june",
        "july", "august", "september", "october",
        "november", "december"
    ];

    if (invalidWords.includes(customerName)) {
        customerName = "Customer";
    }

    // Capitalize name
    customerName =
        customerName.charAt(0).toUpperCase() +
        customerName.slice(1);

    return {
        customerName,
        item,
        quantity
    };
};

module.exports = { extractOrderData };