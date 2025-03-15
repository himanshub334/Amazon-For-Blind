// Function to Read Text Aloud
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speech.rate = 1; // Adjust speed if needed
    speechSynthesis.speak(speech);
}

// Enable Talk-Back on Click for All Elements
document.addEventListener("click", (event) => {
    let text = event.target.innerText.trim();
    if (text) {
        speak(text);
    }
});
