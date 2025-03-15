const chatbotToggle = document.getElementById("chatbotToggle");
const chatbox = document.getElementById("chatbox");
const closeChat = document.getElementById("closeChat");
const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const voiceInputBtn = document.getElementById("voiceInputBtn");

// Toggle Chatbot Visibility
chatbotToggle.addEventListener("click", () => chatbox.classList.toggle("hidden"));
closeChat.addEventListener("click", () => chatbox.classList.add("hidden"));

// Predefined Responses
const responses = {
    "where is my order": "You can track your order in the 'Orders' section.",
    "how to return a product": "To return a product, go to 'Orders' and select the return option.",
    "what are the payment methods": "We accept Credit Card, UPI, and Cash on Delivery.",
    "show laptops": "Redirecting to the laptop section...",
    "show mobiles": "Redirecting to the mobile section..."
};

// Function to Add Messages to Chat
function addMessage(message, sender = "user") {
    let messageDiv = document.createElement("div");
    messageDiv.textContent = message;
    messageDiv.classList.add(sender);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle User Input
sendBtn.addEventListener("click", () => processMessage(userInput.value));
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") processMessage(userInput.value);
});

// Process Messages
function processMessage(message) {
    if (!message.trim()) return;
    addMessage(message);
    userInput.value = "";

    let response = responses[message.toLowerCase()] || "I'm not sure, please visit the Help section.";
    
    if (message.toLowerCase().includes("show")) {
        let category = message.replace("show", "").trim();
        response = `Redirecting to ${category} section...`;
        setTimeout(() => window.location.href = `products.html?search=${category}`, 2000);
    }

    setTimeout(() => addMessage(response, "bot"), 1000);
}

// Voice Input
if ("webkitSpeechRecognition" in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";

    voiceInputBtn.addEventListener("click", () => {
        recognition.start();
    });

    recognition.onresult = (event) => {
        let voiceCommand = event.results[0][0].transcript.toLowerCase();
        addMessage(voiceCommand);
        processMessage(voiceCommand);
    };
}
