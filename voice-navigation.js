// Check if browser supports Speech Recognition
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (window.SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    document.getElementById("voiceAssistantBtn").addEventListener("click", () => {
        speak("Voice navigation enabled. Say a command like 'Go to Cart' or 'Show Mobiles'.");
        recognition.start();
    });

    recognition.onresult = (event) => {
        let command = event.results[0][0].transcript.toLowerCase();
        console.log("Voice Command:", command);
        handleVoiceCommand(command);
    };

    function handleVoiceCommand(command) {
        if (command.includes("go to home")) {
            speak("Navigating to Home.");
            window.location.href = "index.html";
        } else if (command.includes("go to cart")) {
            speak("Navigating to Cart.");
            window.location.href = "cart.html";
        } else if (command.includes("go to orders")) {
            speak("Navigating to Orders.");
            window.location.href = "orders.html";
        } else if (command.includes("go to products")) {
            speak("Navigating to Products.");
            window.location.href = "products.html";
        } else if (command.includes("go to checkout")) {
            speak("Navigating to Checkout.");
            window.location.href = "checkout.html";
        } else if (command.includes("show") || command.includes("search for")) {
            let searchQuery = command.replace("show", "").replace("search for", "").trim();
            speak(`Searching for ${searchQuery}.`);
            window.location.href = `products.html?search=${searchQuery}`;
        } else {
            speak("Sorry, I didn't understand that command.");
        }
    }

    // Text-to-Speech Function
    function speak(text) {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "en-US";
        speechSynthesis.speak(speech);
    }
} else {
    alert("Your browser does not support voice navigation.");
}
