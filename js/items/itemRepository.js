export function createItemRepository(storage) {
  return {
    getAll() {
      return storage.getAll();
    },

    getById(id) {
      return storage.getAll().find(item => item.id === id);
    },

    add(item) {
      const items = storage.getAll();
      items.push(item);
      storage.saveAll(items);
      return item;
    }
  };
}
