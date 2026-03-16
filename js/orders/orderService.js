export function createOrderService() {

  function getOrders() {
    const data = localStorage.getItem("orders");
    return data ? JSON.parse(data) : [];
  }

  function saveOrders(list) {
    localStorage.setItem("orders", JSON.stringify(list));
  }

  return {

    createOrder(itemId, userId) {

      const orders = getOrders();

      const order = {
        id: Date.now().toString(),
        itemId: itemId,
        userId: userId,
        date: new Date().toISOString(),
        status: "active"
      };

      orders.push(order);
      saveOrders(orders);

      return order;

    },

    getAll() {
      return getOrders();
    }

  };

}
