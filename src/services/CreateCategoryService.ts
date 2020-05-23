import { getRepository } from 'typeorm';

import Category from '../models/Category';
import AppError from '../errors/AppError';

interface Request {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: Request): Promise<Category> {
    const categoriesRepository = getRepository(Category);

    const checkCategoryExists = await categoriesRepository.findOne({
      where: { name },
    });

    if (checkCategoryExists) {
      throw new AppError('Category already created');
    }
    console.log(name);

    const category = categoriesRepository.create({
      name,
    });

    await categoriesRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
