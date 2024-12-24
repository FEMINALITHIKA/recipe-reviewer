import { fetchRecipeDetails } from '../../lib/api';

export default function RecipeDetails({ recipe }) {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{recipe.strMeal}</h1>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full rounded-lg" />
      <h2 className="text-xl font-bold mt-4">Ingredients</h2>
      <ul className="list-disc pl-5">
        {Object.keys(recipe)
          .filter((key) => key.startsWith('strIngredient') && recipe[key])
          .map((key) => (
            <li key={key}>{recipe[key]}</li>
          ))}
      </ul>
      <h2 className="text-xl font-bold mt-4">Instructions</h2>
      <p className="mt-2">{recipe.strInstructions}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const recipe = await fetchRecipeDetails(context.params.id);
  return { props: { recipe } };
}
