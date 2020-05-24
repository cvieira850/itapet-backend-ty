import { Router } from 'express';

import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Post from '../models/Post';
import IndexPostService from '../services/IndexPostService';
import AppError from '../errors/AppError';

const postsRouter = Router();

postsRouter.get('/', ensureAuthenticated, async (request, response) => {
  const { id, q, page } = request.query;

  const indexPost = new IndexPostService();
  const post = await indexPost.execute({
    id,
    q,
    page,
  });

  return response.json(post);
});
postsRouter.post('/', ensureAuthenticated, async (request, response) => {
  const { title, mensage, contact, owner_id, category_id } = request.body;
  const postRepository = getRepository(Post);

  const post = postRepository.create({
    title,
    mensage,
    contact,
    owner_id,
    category_id,
  });
  await postRepository.save(post);
  return response.json({ post });
});

postsRouter.put('/:id', ensureAuthenticated, async (request, response) => {
  const { title, mensage, contact, category_id } = request.body;
  const { id } = request.params;
  const postRepository = getRepository(Post);

  const postExists = await postRepository.findOne(id);
  if (!postExists) {
    throw new AppError('Post does not  created');
  }
  postExists.title = title || postExists.title;
  postExists.mensage = mensage || postExists.mensage;
  postExists.contact = contact || postExists.contact;
  postExists.category_id = category_id || postExists.category_id;

  await postRepository.save(postExists);

  return response.json(postExists);
});

postsRouter.delete('/:id', ensureAuthenticated, async (request, response) => {
  const { id } = request.params;

  const postRepository = getRepository(Post);

  const postExists = await postRepository.findOne(id);
  if (!postExists) {
    throw new AppError('Post does not  created');
  }

  await postRepository.remove(postExists);

  return response.json();
});
export default postsRouter;
