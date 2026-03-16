export function initAddItemPage({ form, itemService, getCurrentUser }) {
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const currentUser = getCurrentUser();

    if (!currentUser) {
      alert("Сначала войдите в аккаунт");
      return;
    }

    const data = {
      title: form.title.value,
      category: form.category.value,
      pricePerDay: form.pricePerDay.value,
      description: form.description.value,
      image: form.image.value
    };

    const result = itemService.createItem(data, currentUser.id);

    clearErrors();

    if (!result.success) {
      showErrors(result.errors);
      return;
    }

    alert("Товар успешно добавлен");
    form.reset();
  });
}

function showErrors(errors) {
  Object.keys(errors).forEach(function (key) {
    const errorElement = document.querySelector(`[data-error="${key}"]`);
    if (errorElement) {
      errorElement.textContent = errors[key];
    }
  });
}

function clearErrors() {
  document.querySelectorAll("[data-error]").forEach(function (element) {
    element.textContent = "";
  });
}
