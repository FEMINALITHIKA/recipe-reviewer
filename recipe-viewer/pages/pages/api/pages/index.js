import { useState } from 'react';
import { fetchRecipes } from '../lib/api';
import Link from 'next/link';

export default function Home({ recipes }) {
  const [query, setQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  const handleSearch = async (e) => {
    e.preventDefault();
    const results = await fetchRecipes(query);
    setFilteredRecipes(results);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Welcome to Recipe Viewer!</h1>
      <form onSubmit={handleSearch} className="flex justify-center mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for recipes..."
          className="w-1/2 p-2 border rounded-lg"
        />
        <button type="submit" className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg">
          Search
        </button>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-card shadow-lg rounded-lg p-4">
            <Link href={`/recipe/${recipe.idMeal}`}>
              <a>
                <img
                  src={recipe.strMealThumb}
                  alt={recipe.strMeal}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h2 className="mt-2 text-lg font-bold">{recipe.strMeal}</h2>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const recipes = await fetchRecipes();
  return { props: { recipes } };
}
