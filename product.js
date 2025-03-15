const voiceAssistantBtn = document.getElementById("voiceAssistantBtn");
const products = document.querySelectorAll(".product");

// Voice Assistant Activation
voiceAssistantBtn.addEventListener("click", () => {
    speak("Welcome to the product page. Say 'Filter by category', 'Sort by price', or 'Add to cart'");
});

// Function to Read Out Product Details
products.forEach(product => {
    product.addEventListener("focus", () => {
        const name = product.querySelector("p").textContent;
        speak(`Product: ${name}. Say 'Add to Cart' to purchase.`);
    });
});

// Function to Speak Text
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speechSynthesis.speak(speech);
}
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
        let product = button.parentElement.querySelector("p").textContent;
        let price = product.match(/\$([\d.]+)/)[1]; // Extract price
        let item = { name: product, price: price };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));

        speak(`${product} added to cart.`);
    });
});
