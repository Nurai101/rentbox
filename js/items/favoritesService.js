function getCurrentUser() {
  const data = localStorage.getItem("currentUser");
  return data ? JSON.parse(data) : null;
}

export function createFavoritesService() {
  function getFavoritesKey() {
    const user = getCurrentUser();
    return user ? `favorites_${user.id}` : "favorites_guest";
  }

  function getFavorites() {
    const data = localStorage.getItem(getFavoritesKey());
    return data ? JSON.parse(data) : [];
  }

  function saveFavorites(list) {
    localStorage.setItem(getFavoritesKey(), JSON.stringify(list));
  }

  return {
    add(itemId) {
      const list = getFavorites();

      if (!list.includes(itemId)) {
        list.push(itemId);
        saveFavorites(list);
      }
    },

    remove(itemId) {
      const list = getFavorites().filter(id => id !== itemId);
      saveFavorites(list);
    },

    isFavorite(itemId) {
      const list = getFavorites();
      return list.includes(itemId);
    },

    getAll() {
      return getFavorites();
    }
  };
}
