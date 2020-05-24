import { getRepository, Like } from 'typeorm';

import Post from '../models/Post';
import AppError from '../errors/AppError';

interface Request {
  id: string;
  q: string;
  page: number;
}

class CreateUserService {
  async execute({ id, q, page }: Request): Promise<Post[] | Any> {
    const postsRepository = getRepository(Post);

    if (id) {
      const postExists = await postsRepository.find({ where: { id } });

      if (!postExists) {
        throw new AppError('Post does not exists');
      }

      return postExists;
    }
    if (page) {
      const limit = 2;

      const where = q ? { title: Like(`%${q}%`) } : {};

      const postsCount = await postsRepository.count({ where });

      const lastPage = page * limit >= postsCount;

      const offset = (page - 1) * limit;
      if (postsCount > 2) {
        const posts = await postsRepository
          .createQueryBuilder('posts')
          .where(where)
          .skip(offset)
          .take(limit)
          .getMany();
        return { lastPage, content: posts };
      }
      const posts = await postsRepository
        .createQueryBuilder('posts')
        .where(where)

        .take(limit)
        .getMany();
      return { lastPage, content: posts };
    }

    const posts = await postsRepository.find();

    return posts;
  }
}

export default CreateUserService;
