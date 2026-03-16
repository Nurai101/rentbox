import { createLocalStorageAdapter } from "./core/storage.js";
import { createItemRepository } from "./items/itemRepository.js";
import { createItemService } from "./items/itemService.js";
import { initAddItemPage } from "./items/addItemController.js";

const itemsStorage = createLocalStorageAdapter("items");
const itemRepository = createItemRepository(itemsStorage);
const itemService = createItemService(itemRepository);

function getCurrentUser() {
  const data = localStorage.getItem("currentUser");
  return data ? JSON.parse(data) : null;
}

initAddItemPage({
  form: document.getElementById("add-item-form"),
  itemService,
  getCurrentUser
});
