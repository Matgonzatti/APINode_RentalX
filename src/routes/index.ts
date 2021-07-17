import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { authenticateRoutes } from './authenticate.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationRoutes } from './specification.routes';
import { userRoutes } from './users.routes';

const router = Router();

router.use(authenticateRoutes);
router.use("/categories", ensureAuthenticated, categoriesRoutes);
router.use("/specifications", ensureAuthenticated, specificationRoutes);
router.use("/users", ensureAuthenticated, userRoutes);

export { router }