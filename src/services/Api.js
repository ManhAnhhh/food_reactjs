import Http from "./Http";
export const getCategories = (config) => Http.get("/categories.php", config);
export const getByCategory = (category, config) => Http.get(`/filter.php?c=${category}`, config);
export const getIngredient = (ingredient,config) => Http.get(`/search.php?s=${ingredient}`,config);
export const getById = (id, config) => Http.get(`/lookup.php?i=${id}`,config);