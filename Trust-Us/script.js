// This is a complete JavaScript file that would work with the HTML/CSS I provided

// Sample data for cards (if you want to use dynamic data)
const cardsData = [
  {
    id: 1,
    title: "Card 1",
    description: "This is the first card description",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    title: "Card 2",
    description: "This is the second card description",
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    title: "Card 3",
    description: "This is the third card description",
    image: "https://via.placeholder.com/300x200",
  },
];

// Function to create cards from data
function createCards() {
  const container = document.getElementById("cards-container");

  cardsData.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.className = "card";
    cardElement.innerHTML = `
            <img src="${card.image}" alt="${card.title}">
            <div class="card-content">
                <h3>${card.title}</h3>
                <p>${card.description}</p>
                <button class="btn">Learn More</button>
            </div>
        `;
    container.appendChild(cardElement);
  });
}

// Add event listeners to buttons
function addEventListeners() {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.closest(".card");
      const title = card.querySelector("h3").textContent;
      alert(`You clicked on: ${title}`);
    });
  });
}

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
  createCards();
  addEventListeners();
});

// Optional: Add responsive behavior
window.addEventListener("resize", function () {
  // This would handle responsive layout changes if needed
  console.log("Window resized");
});
