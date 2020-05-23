import { Router } from 'express';

import usersRouter from './users.routes';
import sessionssRouter from './sessions.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionssRouter);

export default routes;
