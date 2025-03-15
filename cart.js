const cartList = document.getElementById("cartList");
const checkoutBtn = document.getElementById("checkoutBtn");
const voiceCartBtn = document.getElementById("voiceCartBtn");
const removeBtns = document.querySelectorAll(".removeBtn");

// Read Cart Items Aloud
function readCart() {
    let items = Array.from(cartList.children).map(item => item.textContent.split(" - ")[0]).join(", ");
    speak(`Your cart contains: ${items}. Total price is ${document.getElementById("totalPrice").textContent}.`);
}

// Proceed to Checkout
checkoutBtn.addEventListener("click", () => {
    speak("Are you sure you want to proceed to checkout? Say 'Yes' to confirm.");
    listenForCheckout();
});

// Remove Items from Cart
removeBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
        let item = event.target.parentElement;
        speak(`${item.textContent.split(" - ")[0]} removed from cart.`);
        item.remove();
    });
});

// Voice Assistant for Cart
if ("webkitSpeechRecognition" in window) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";

    voiceCartBtn.addEventListener("click", () => {
        speak("Say 'Proceed to checkout' or 'Remove item from cart'.");
        recognition.start();
    });

    recognition.onresult = (event) => {
        let command = event.results[0][0].transcript.toLowerCase();
        processCartCommand(command);
    };

    function processCartCommand(command) {
        if (command.includes("proceed to checkout")) {
            checkoutBtn.click();
        } else if (command.includes("remove") && command.includes("headphones")) {
            removeItemByName("Wireless Headphones");
        } else if (command.includes("remove") && command.includes("smartphone")) {
            removeItemByName("Smartphone");
        } else {
            speak("I didn't understand. Try again.");
        }
    }
}

// Remove Item by Name
function removeItemByName(itemName) {
    let items = Array.from(cartList.children);
    let itemToRemove = items.find(item => item.textContent.includes(itemName));
    if (itemToRemove) {
        speak(`${itemName} removed from cart.`);
        itemToRemove.remove();
    } else {
        speak(`${itemName} is not in your cart.`);
    }
}

// Listen for Checkout Confirmation
function listenForCheckout() {
    if ("webkitSpeechRecognition" in window) {
        const confirmRecognition = new webkitSpeechRecognition();
        confirmRecognition.lang = "en-US";
        confirmRecognition.start();

        confirmRecognition.onresult = (event) => {
            let response = event.results[0][0].transcript.toLowerCase();
            if (response.includes("yes")) {
                speak("Order placed. Redirecting to orders page.");
                setTimeout(() => window.location.href = "orders.html", 3000);
            } else {
                speak("Checkout canceled.");
            }
        };
    }
}

// Text-to-Speech Function
function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speechSynthesis.speak(speech);
}

// Read cart items on page load
readCart();
document.addEventListener("DOMContentLoaded", () => {
    const cartList = document.getElementById("cart-list");
    const cartTotal = document.getElementById("cart-total");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    if (cart.length === 0) {
        cartList.innerHTML = "<p tabindex='0'>Your cart is empty.</p>";
    } else {
        cartList.innerHTML = "";
        cart.forEach((item, index) => {
            total += parseFloat(item.price.replace("$", "")) || 0;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <p>${item.name} - ${item.price}</p>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            `;
            cartList.appendChild(cartItem);
        });
    }

    cartTotal.textContent = `$${total.toFixed(2)}`;

    // Remove item from cart
    document.querySelectorAll(".remove-from-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            location.reload(); // Refresh cart page
        });
    });
});
