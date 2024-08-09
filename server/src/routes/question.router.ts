import * as express from 'express';
import { Request, Response } from 'express';
import { QuestionController } from '../controllers/question.controller';
import {
  tokenGuard,
  questionValidation,
  editPermitGuard,
} from '../middlewares';

const Router = express.Router();
const questionController: QuestionController = new QuestionController();

Router.post('/create',
  tokenGuard(),
  questionValidation,
  async (req: Request, res: Response,) => {
    await questionController.create(req, res);
  });

Router.get('/get-all',
  tokenGuard(),
  async (req: Request, res: Response,) => {
    await questionController.findAll(req, res);
  });

Router.get('/get-one/:id',
  tokenGuard(),
  async (req: Request, res: Response,) => {
    await questionController.findOne(req, res);
  });

Router.patch('/update/:id',
  tokenGuard(),
  editPermitGuard(),
  questionValidation,
  async (req: Request, res: Response,) => {
    await questionController.update(req, res);
  });

Router.patch('/set-edit/:id',
  tokenGuard(),
  editPermitGuard(),
  questionValidation,
  async (req: Request, res: Response,) => {
    await questionController.setEdit(req, res);
  });

Router.delete('/delete/:id',
  tokenGuard(),
  async (req: Request, res: Response,) => {
    await questionController.delete(req, res);
  });

export { Router as questionRouter };
