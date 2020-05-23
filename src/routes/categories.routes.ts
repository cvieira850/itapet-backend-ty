import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateCategoryService from '../services/CreateCategoryService';
import Category from '../models/Category';

const categoriesRouter = Router();

categoriesRouter.post('/', async (request, response) => {
  const { name } = request.body;

  const createCategory = new CreateCategoryService();

  const category = await createCategory.execute({ name });

  return response.json(category);
});
categoriesRouter.get('/', async (request, response) => {
  const categoryRepository = getRepository(Category);

  const categories = await categoryRepository.find();

  return response.json(categories);
});
export default categoriesRouter;
