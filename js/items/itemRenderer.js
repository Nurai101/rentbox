import { createFavoritesService } from "./favoritesService.js";

const favoritesService = createFavoritesService();

export function renderItems(container, items) {

  if (!container) return;

  if (!items.length) {
    container.innerHTML = "<p>Товары не найдены</p>";
    return;
  }

  container.innerHTML = items.map(function(item){

    const isFav = favoritesService.isFavorite(item.id);

    return `
      <div class="item-card">

        <img src="${item.image}" alt="${item.title}" width="200">

        <h3>${item.title}</h3>

        <p>Категория: ${item.category}</p>

        <p>Цена: ${item.pricePerDay} ₸ / день</p>

        <button class="fav-btn" data-id="${item.id}">
          ${isFav ? "❤️" : "🤍"}
        </button>

        <br><br>

        <a href="item.html?id=${item.id}">Подробнее</a>

      </div>
    `;

  }).join("");

  const favButtons = container.querySelectorAll(".fav-btn");

  favButtons.forEach(function(button){

    button.addEventListener("click", function(){

      const id = button.dataset.id;

      if (favoritesService.isFavorite(id)) {
        favoritesService.remove(id);
      } else {
        favoritesService.add(id);
      }

      location.reload();

    });

  });

}
