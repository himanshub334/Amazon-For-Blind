const orderList = document.getElementById("orderList");
const totalAmount = document.getElementById("totalAmount");
const confirmPaymentBtn = document.getElementById("confirmPaymentBtn");
const voiceAssistantBtn = document.getElementById("voiceAssistantBtn");
const paymentOptions = document.querySelectorAll(".paymentOption");

let selectedPaymentMethod = "";

// Load Order Summary from Local Storage
function loadOrderSummary() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    orderList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price}`;
        orderList.appendChild(li);
        total += parseFloat(item.price);
    });

    totalAmount.textContent = `Total: $${total.toFixed(2)}`;
    speak(`Your total is $${total.toFixed(2)}. Say 'Pay with Credit Card' or 'Pay with UPI'.`);
}

// Enable Voice Assistant
voiceAssistantBtn.addEventListener("click", () => {
    speak("You are on the checkout page. Your total is " + totalAmount.textContent + ". Say 'Pay with Credit Card', 'Pay with UPI', or 'Cash on Delivery'.");
});

// Handle Payment Selection
paymentOptions.forEach(button => {
    button.addEventListener("click", () => {
        selectedPaymentMethod = button.getAttribute("data-method");
        speak(`You selected ${selectedPaymentMethod}. Click Confirm Payment to proceed.`);
    });
});

// Confirm Payment
confirmPaymentBtn.addEventListener("click", () => {
    if (!selectedPaymentMethod) {
        speak("Please select a payment method first.");
        return;
    }

    speak(`Payment confirmed using ${selectedPaymentMethod}. Your order has been placed.`);
    localStorage.removeItem("cart"); // Clear Cart after order
    window.location.href = "orders.html"; // Redirect to Orders Page
});

// Text-to-Speech Function
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speechSynthesis.speak(speech);
}

// Load order summary when page loads
loadOrderSummary();
