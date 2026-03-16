import { createLocalStorageAdapter } from "../core/storage.js";
import { createItemRepository } from "../items/itemRepository.js";
import { createItemService } from "../items/itemService.js";
import { createOrderService } from "./orderService.js";

function getCurrentUser() {
  const data = localStorage.getItem("currentUser");
  return data ? JSON.parse(data) : null;
}

const itemsStorage = createLocalStorageAdapter("items");
const itemRepository = createItemRepository(itemsStorage);
const itemService = createItemService(itemRepository);
const orderService = createOrderService();

const container = document.getElementById("orders-container");

const user = getCurrentUser();

if (!user) {
  container.innerHTML = "<p>Вы не вошли в аккаунт</p>";
} else {

  const orders = orderService.getAll();

  const myOrders = orders.filter(function(order){
    return order.userId === user.id;
  });

  if (myOrders.length === 0) {
    container.innerHTML = "<p>У вас пока нет аренд</p>";
  } else {

    const items = itemService.getAllItems();

    const result = myOrders.map(function(order){

      const item = items.find(i => i.id === order.itemId);

      if (!item) return "";

      return `
        <div class="order-card">
          <img src="${item.image}" alt="${item.title}">
          <h3>${item.title}</h3>
          <p>${item.pricePerDay} ₸ / день</p>
          <p>Категория: ${item.category}</p>
          <p>Дата аренды: ${new Date(order.date).toLocaleDateString()}</p>
        </div>
      `;

    }).join("");

    container.innerHTML = result;

  }

}
