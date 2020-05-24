import { Router } from 'express';

import usersRouter from './users.routes';
import sessionssRouter from './sessions.routes';
import categoriesRouter from './categories.routes';
import postsRouter from './posts.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionssRouter);
routes.use('/categories', categoriesRouter);
routes.use('/posts', postsRouter);

export default routes;
