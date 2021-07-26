import { Router } from 'express';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { authenticateRoutes } from './authenticate.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationRoutes } from './specification.routes';
import { userRoutes } from './users.routes';
import { carRoutes } from './car.routes';

const router = Router();

router.use(authenticateRoutes);
router.use("/categories", ensureAuthenticated, categoriesRoutes);
router.use("/specifications", ensureAuthenticated, specificationRoutes);
router.use("/users", ensureAuthenticated, userRoutes);
router.use("/cars", ensureAuthenticated, carRoutes);

export { router }