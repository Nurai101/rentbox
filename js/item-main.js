import { createLocalStorageAdapter } from "./core/storage.js";
import { createItemRepository } from "./items/itemRepository.js";
import { createItemService } from "./items/itemService.js";
import { initItemDetailsPage } from "./items/itemDetailsController.js";

const itemsStorage = createLocalStorageAdapter("items");

const itemRepository = createItemRepository(itemsStorage);

const itemService = createItemService(itemRepository);

initItemDetailsPage({
  container: document.getElementById("item-container"),
  itemService
});
