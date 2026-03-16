import { createLocalStorageAdapter } from "./core/storage.js";
import { createItemRepository } from "./items/itemRepository.js";
import { createItemService } from "./items/itemService.js";
import { createSearchService } from "./items/searchService.js";
import { initCatalogPage } from "./items/catalogController.js";

const itemsStorage = createLocalStorageAdapter("items");
const itemRepository = createItemRepository(itemsStorage);
const itemService = createItemService(itemRepository);
const searchService = createSearchService();

initCatalogPage({
  container: document.getElementById("catalog-container"),
  searchInput: document.getElementById("search-input"),
  itemService,
  searchService
});
