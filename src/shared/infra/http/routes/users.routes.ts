import { Router } from 'express';
import multer from 'multer';

import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { ListUsersController } from '@modules/accounts/useCases/listUsers/ListUsersController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';

import uploadConfig from '@config/upload';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const userRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("tmp/avatar"));

const createUserController = new CreateUserController();
const listUsersListController = new ListUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();

userRoutes.post("/", ensureAuthenticated, ensureAdmin, createUserController.handle);
userRoutes.patch(
  "/avatar",  
  ensureAuthenticated,
  uploadAvatar.single("avatar"), 
  updateUserAvatarController.handle
  );  
userRoutes.get("/", listUsersListController.handle);

export { userRoutes }