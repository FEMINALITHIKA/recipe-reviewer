import axios from 'axios';

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

export const fetchRecipes = async (query = '') => {
  const { data } = await axios.get(`${API_BASE}/search.php?s=${query}`);
  return data.meals || [];
};

export const fetchRecipeDetails = async (id) => {
  const { data } = await axios.get(`${API_BASE}/lookup.php?i=${id}`);
  return data.meals[0];
};
