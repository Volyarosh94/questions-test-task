import * as express from 'express';
import { Request, Response } from 'express';
import { AuthController } from '../controllers/auth.controller';
import {
  userValidation,
  authValidation,
  refreshTokenValidation,
  refreshTokenGuard,
} from '../middlewares';

const Router = express.Router();
const authController: AuthController = new AuthController();

Router.post('/sign-up',
  userValidation,
  async (req: Request, res: Response,) => {
    await authController.register(req, res);
  });

Router.post('/sign-in',
  authValidation,
  async (req: Request, res: Response,) => {
    await authController.login(req, res);
  });

Router.post('/refresh-token',
  refreshTokenValidation,
  refreshTokenGuard(),
  async (req: Request, res: Response,) => {
    await authController.refreshToken(req, res);
  });

export { Router as authRouter };
