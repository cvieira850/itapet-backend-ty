import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateCategoryService from '../services/CreateCategoryService';
import Category from '../models/Category';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const categoriesRouter = Router();

categoriesRouter.post('/', ensureAuthenticated, async (request, response) => {
  const { name } = request.body;

  const createCategory = new CreateCategoryService();

  const category = await createCategory.execute({ name });

  return response.json(category);
});
categoriesRouter.get('/', ensureAuthenticated, async (request, response) => {
  const categoryRepository = getRepository(Category);

  const categories = await categoryRepository.find();

  return response.json(categories);
});
export default categoriesRouter;
