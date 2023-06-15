const cardData = {
  data: [
    {
      name: "Mixmax",
      budget_name: "Software subscription",
      owner_id: 1,
      spent: {
        value: 100,
        currency: "SGD",
      },
      available_to_spend: {
        value: 1000,
        currency: "SGD",
      },
      card_type: "burner",
      expiry: "9 Feb",
      limit: 100,
      status: "active",
    },
    {
      name: "Quickbooks",
      budget_name: "Software subscription",
      owner_id: 2,
      spent: {
        value: 50,
        currency: "SGD",
      },
      available_to_spend: {
        value: 250,
        currency: "SGD",
      },
      card_type: "subscription",
      limit: 10,
      status: "active",
    },
  ],
  page: 1,
  per_page: 10,
  total: 100,
};

const cardList = document.getElementById("card-list");

function createCard(card) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");

  const cardTypeElement = document.createElement("div");
  cardTypeElement.classList.add("card-type");
  cardTypeElement.innerText = card.card_type;
  cardElement.appendChild(cardTypeElement);

  const nameElement = document.createElement("h3");
  nameElement.innerText = card.name;
  cardElement.appendChild(nameElement);

  const budgetElement = document.createElement("p");
  budgetElement.innerText = card.budget_name;
  cardElement.appendChild(budgetElement);

  if (card.card_type === "burner") {
    const expiryElement = document.createElement("p");
    expiryElement.classList.add("expiry");
    expiryElement.innerText = `Expiry: ${card.expiry}`;
    cardElement.appendChild(expiryElement);
  } else if (card.card_type === "subscription") {
    const limitElement = document.createElement("p");
    limitElement.classList.add("limit");
    limitElement.innerText = `Limit: ${card.limit}`;
    cardElement.appendChild(limitElement);
  }

  const spentElement = document.createElement("p");
  spentElement.innerText = `Spent: ${card.spent.value} ${card.spent.currency}`;
  cardElement.appendChild(spentElement);

  const availableElement = document.createElement("p");
  availableElement.innerText = `Available to spend: ${card.available_to_spend.value} ${card.available_to_spend.currency}`;
  cardElement.appendChild(availableElement);

  cardList.appendChild(cardElement);
}

function displayCards(cards) {
  cardList.innerHTML = "";
  cards.forEach((card) => {
    createCard(card);
  });
}

function filterCardsByType(cards, cardType) {
  if (cardType === "all") {
    return cards;
  }
  return cards.filter((card) => card.card_type === cardType);
}

function searchCardsByName(cards, searchTerm) {
  return cards.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

let filteredCards = cardData.data;

function applyFilters() {
  const searchInput = document.getElementById("search-input");
  const cardTypeFilter = document.getElementById("card-type-filter");

  const searchTerm = searchInput.value.trim();
  const cardType = cardTypeFilter.value;

  let cardsToShow = filteredCards;

  if (searchTerm !== "") {
    cardsToShow = searchCardsByName(cardsToShow, searchTerm);
  }

  cardsToShow = filterCardsByType(cardsToShow, cardType);

  displayCards(cardsToShow);
}

// Event listeners

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", applyFilters);

const cardTypeFilter = document.getElementById("card-type-filter");
cardTypeFilter.addEventListener("change", applyFilters);

displayCards(filteredCards);
