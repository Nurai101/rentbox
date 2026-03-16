import { createLocalStorageAdapter } from "./core/storage.js";
import { createItemRepository } from "./items/itemRepository.js";
import { createItemService } from "./items/itemService.js";

function getCurrentUser() {
  const data = localStorage.getItem("currentUser");
  return data ? JSON.parse(data) : null;
}

const itemsStorage = createLocalStorageAdapter("items");
const itemRepository = createItemRepository(itemsStorage);
const itemService = createItemService(itemRepository);

const user = getCurrentUser();

const userInfoContainer = document.getElementById("profile-info");
const userItemsContainer = document.getElementById("profile-items");

if (!user) {
  userInfoContainer.innerHTML = "<p>Вы не вошли в аккаунт</p>";
} else {

  userInfoContainer.innerHTML = `
    <h2>${user.name}</h2>
    <p>${user.email}</p>
  `;

  const allItems = itemService.getAllItems();

  const myItems = allItems.filter(function(item){
    return item.ownerId === user.id;
  });

  if (myItems.length === 0) {
    userItemsContainer.innerHTML = "<p>Вы еще не добавили товары</p>";
  } else {

    userItemsContainer.innerHTML = myItems.map(function(item){
      return `
        <div class="item-card">
          <img src="${item.image}" alt="${item.title}">
          <h3>${item.title}</h3>
          <p>${item.pricePerDay} ₸ / день</p>
          <p>${item.category}</p>
        </div>
      `;
    }).join("");

  }

}
