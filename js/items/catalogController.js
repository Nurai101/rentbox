import { renderItems } from "./itemRenderer.js";

export function initCatalogPage({ container, searchInput, itemService, searchService }) {
  if (!container) return;

  function updateCatalog() {
    const allItems = itemService.getAllItems();
    const query = searchInput ? searchInput.value.trim() : "";
    const filteredItems = searchService.search(allItems, query);

    renderItems(container, filteredItems);
  }

  updateCatalog();

  if (searchInput) {
    searchInput.addEventListener("input", updateCatalog);
  }
}
