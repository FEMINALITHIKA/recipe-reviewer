import { connectToDatabase } from '../../lib/mongodb';
import FavoriteRecipe from '../../models/FavoriteRecipe';

export default async function handler(req, res) {
  await connectToDatabase();

  const { method } = req;

  if (method === 'GET') {
    const favorites = await FavoriteRecipe.find();
    return res.status(200).json(favorites);
  }

  if (method === 'POST') {
    const { recipeId, recipeName, imageUrl } = req.body;
    try {
      const newFavorite = await FavoriteRecipe.create({ recipeId, recipeName, imageUrl });
      return res.status(201).json(newFavorite);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  if (method === 'DELETE') {
    const { id } = req.query;
    await FavoriteRecipe.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Favorite removed successfully' });
  }

  res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
  res.status(405).end(`Method ${method} Not Allowed`);
}
