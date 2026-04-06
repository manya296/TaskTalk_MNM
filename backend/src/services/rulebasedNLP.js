// Simple rule-based NLP for extracting order details

const extractOrderData = (message) => {
    message = message.toLowerCase();

    // Extract quantity (number)
    const quantityMatch = message.match(/\d+/);
    const quantity = quantityMatch ? parseInt(quantityMatch[0]) : 1;

    // Extract item (basic keywords)
    let item = "item";
    if (message.includes("notebook")) item = "notebook";
    else if (message.includes("book")) item = "book";
    else if (message.includes("pen")) item = "pen";
    else if (message.includes("laptop")) item = "laptop";

    // Extract customer name (simple assumption: last word)
    let customerName = "Customer";
    const words = message.split(" ");
    if (words.length > 0) {
        customerName = words[words.length - 1];
        // Capitalize first letter
        customerName =
            customerName.charAt(0).toUpperCase() +
            customerName.slice(1);
    }

    return {
        customerName,
        item,
        quantity
    };
};

module.exports = { extractOrderData };