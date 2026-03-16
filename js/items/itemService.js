function generateId() {
  return Date.now().toString() + Math.random().toString(16).slice(2);
}

function validateItem(data) {
  const errors = {};

  if (!data.title || data.title.trim().length < 2) {
    errors.title = "Название должно содержать минимум 2 символа";
  }

  if (!data.category || data.category.trim().length === 0) {
    errors.category = "Укажите категорию";
  }

  if (!data.pricePerDay || Number(data.pricePerDay) <= 0) {
    errors.pricePerDay = "Цена должна быть больше 0";
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.description = "Описание должно быть не короче 10 символов";
  }

  if (!data.image || data.image.trim().length === 0) {
    errors.image = "Добавьте ссылку на изображение";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function createItemService(itemRepository) {
  return {
    createItem(data, ownerId) {
      const validation = validateItem(data);

      if (!validation.isValid) {
        return {
          success: false,
          errors: validation.errors
        };
      }

      const item = {
        id: generateId(),
        title: data.title.trim(),
        category: data.category.trim(),
        pricePerDay: Number(data.pricePerDay),
        description: data.description.trim(),
        image: data.image.trim(),
        ownerId,
        createdAt: new Date().toISOString(),
        isAvailable: true
      };

      itemRepository.add(item);

      return {
        success: true,
        item
      };
    },

    getAllItems() {
      return itemRepository.getAll();
    },

    getItemById(id) {
      return itemRepository.getById(id);
    }
  };
}
