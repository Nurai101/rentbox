import { createLocalStorageAdapter } from "./core/storage.js";
import { createItemRepository } from "./items/itemRepository.js";
import { createItemService } from "./items/itemService.js";
import { createFavoritesService } from "./items/favoritesService.js";
import { renderItems } from "./items/itemRenderer.js";

const itemsStorage = createLocalStorageAdapter("items");
const itemRepository = createItemRepository(itemsStorage);
const itemService = createItemService(itemRepository);
const favoritesService = createFavoritesService();

const container = document.getElementById("favorites-container");

const favoriteIds = favoritesService.getAll();
const allItems = itemService.getAllItems();

const favoriteItems = allItems.filter(function (item) {
  return favoriteIds.includes(item.id);
});

renderItems(container, favoriteItems);
