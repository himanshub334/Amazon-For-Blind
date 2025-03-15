const voiceBtn = document.getElementById("voiceBtn");
const voiceSearchBtn = document.getElementById("voiceSearchBtn");
const searchBox = document.getElementById("searchBox");

voiceBtn.addEventListener("click", () => {
    speak("Welcome to the Amazon clone. Say 'Go to products' or 'Open cart'.");
});

voiceSearchBtn.addEventListener("click", () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
        const query = event.results[0][0].transcript;
        searchBox.value = query;
        speak(`Searching for ${query}`);
    };
});

function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speechSynthesis.speak(speech);
}
