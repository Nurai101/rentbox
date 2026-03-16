export function createSearchService() {
  function matchByText(item, query) {
    if (!query) return true;

    const q = query.toLowerCase();

    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  }

  return {
    search(items, query) {
      return items.filter(function (item) {
        return matchByText(item, query);
      });
    }
  };
}
