const orderList = document.getElementById("orderList");
const voiceAssistantBtn = document.getElementById("voiceAssistantBtn");

// Sample Order Data (Replace with actual backend orders)
let orders = JSON.parse(localStorage.getItem("orders")) || [
    { name: "Gaming Laptop", price: "499", status: "Shipped" },
    { name: "Casual Shirt", price: "29", status: "Out for Delivery" }
];

// Load Orders
function loadOrders() {
    orderList.innerHTML = "";
    
    orders.forEach((order, index) => {
        let li = document.createElement("li");
        li.textContent = `${order.name} - $${order.price} (Status: ${order.status})`;
        li.setAttribute("tabindex", "0"); // Allow keyboard focus
        li.dataset.index = index;
        orderList.appendChild(li);
    });

    speak("You have " + orders.length + " orders. Say 'Where is my order?' to track.");
}

// Enable Voice Assistant
voiceAssistantBtn.addEventListener("click", () => {
    speak("You are on the orders page. Say 'Where is my order?' to check your delivery status.");
});

// Function to Speak Order Status
orderList.addEventListener("focusin", (event) => {
    if (event.target.tagName === "LI") {
        let index = event.target.dataset.index;
        let order = orders[index];
        speak(`${order.name} is currently ${order.status}.`);
    }
});

// Text-to-Speech Function
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speechSynthesis.speak(speech);
}

// Load orders when page loads
loadOrders();
