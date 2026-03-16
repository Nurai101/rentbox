export function createLocalStorageAdapter(key) {
  return {
    getAll() {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    },

    saveAll(items) {
      localStorage.setItem(key, JSON.stringify(items));
    }
  };
}
