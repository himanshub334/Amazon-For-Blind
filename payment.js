// Order Details (Mock Data)
const orderDetails = document.getElementById("orderDetails");
const paymentMethods = document.getElementsByName("paymentMethod");
const confirmPaymentBtn = document.getElementById("confirmPaymentBtn");
const voiceAssistantBtn = document.getElementById("voiceAssistantBtn");

const order = {
    product: "Wireless Headphones",
    price: 59.99,
    status: "Pending"
};

// Load Order Summary
function loadOrderSummary() {
    orderDetails.textContent = `You are purchasing ${order.product} for $${order.price}.`;
    speak(orderDetails.textContent + " Please select a payment method and confirm.");
}

// Confirm Payment
confirmPaymentBtn.addEventListener("click", confirmPayment);

function confirmPayment() {
    let selectedMethod = getSelectedPaymentMethod();
    order.status = "Paid";
    speak(`Payment successful using ${selectedMethod}. Redirecting to Orders.`);
    setTimeout(() => window.location.href = "orders.html", 3000);
}

// Get Selected Payment Method
function getSelectedPaymentMethod() {
    for (let method of paymentMethods) {
        if (method.checked) return method.value;
    }
    return "UPI";
}

// Voice Assistant
if ("webkitSpeechRecognition" in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";

    voiceAssistantBtn.addEventListener("click", () => {
        speak("Say 'Confirm my payment' to proceed or 'Cancel my payment' to abort.");
        recognition.start();
    });

    recognition.onresult = (event) => {
        let command = event.results[0][0].transcript.toLowerCase();
        console.log("Voice Command:", command);
        processVoiceCommand(command);
    };

    function processVoiceCommand(command) {
        if (command.includes("confirm my payment")) {
            confirmPayment();
        } else if (command.includes("cancel my payment")) {
            speak("Payment canceled. Returning to cart.");
            setTimeout(() => window.location.href = "cart.html", 3000);
        } else {
            speak("I didn't understand. Please say 'Confirm my payment' or 'Cancel my payment'.");
        }
    }
}

// Text-to-Speech Function
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speechSynthesis.speak(speech);
}

// Load order summary on page load
loadOrderSummary();
