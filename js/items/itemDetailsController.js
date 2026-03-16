import { createOrderService } from "../orders/orderService.js";

const orderService = createOrderService();

function getCurrentUser() {
  const data = localStorage.getItem("currentUser");
  return data ? JSON.parse(data) : null;
}

export function initItemDetailsPage({ container, itemService }) {

  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const item = itemService.getItemById(id);

  if (!item) {
    container.innerHTML = "<p>Товар не найден</p>";
    return;
  }

  container.innerHTML = `
    <div class="item-details">
      <div class="item-image">
        <img src="${item.image}" alt="${item.title}">
      </div>

      <div class="item-info">
        <h2>${item.title}</h2>
        <p>Категория: ${item.category}</p>
        <p>Цена: ${item.pricePerDay} ₸ / день</p>
        <p>${item.description}</p>
        <button id="rent-btn">Арендовать</button>
      </div>
    </div>
  `;

  const rentBtn = document.getElementById("rent-btn");

  rentBtn.addEventListener("click", function () {

    const user = getCurrentUser();

    if (!user) {
      alert("Сначала войдите в аккаунт");
      return;
    }

    orderService.createOrder(item.id, user.id);

    alert("Товар успешно арендован");

  });

}
