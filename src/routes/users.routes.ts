import { Router } from 'express';
import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';
import { ListUsersController } from '../modules/accounts/useCases/listUsers/ListUsersController';

const userRoutes = Router();

const createUserController = new CreateUserController();
const listUsersListController = new ListUsersController();

userRoutes.post("/", createUserController.handle);
userRoutes.get("/", listUsersListController.handle);

export { userRoutes }