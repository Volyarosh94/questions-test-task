import { Request, Response } from 'express';
import { QuestionService } from '../services/question.service';
import { Question } from '../entities/question.entity';
import { ExtendedRequest } from '../interfaces/extendedRequest.interface';
import { handleErrorResponse } from '../utils/errorHandling/errorResponse.handler';

export class QuestionController {
  private questionService: QuestionService = new QuestionService();

  async create(req: Request, res: Response): Promise<void> {
    try {
      const newQuestion: Question = await this.questionService.create(req.body);

      res.status(201).json(newQuestion);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  };

  async findAll(req: Request, res: Response): Promise<void> {
    try {
      const questions = await this.questionService.getAll();

      res.status(200).json(questions);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  };

  async findOne(req: Request, res: Response): Promise<void> {
    try {
      const questionId: string = req.params.id;
      const question: Question = await this.questionService.getById(questionId);

      res.status(200).json(question);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  };

  async update(req: Request, res: Response): Promise<void> {
    try {
      const questionId: string = req.params.id;
      const editedQuestion: Question = await this.questionService.update(questionId, req.body);

      res.status(200).json(editedQuestion);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  };

  async setEdit(req: ExtendedRequest, res: Response): Promise<void> {
    try {
      const userId: string = req.userId;
      const questionId: string = req.params.id;
      await this.questionService.setEdit(userId, questionId);

      res.status(200).json({canEdit: true});
    } catch (error) {
      handleErrorResponse(res, error);
    }
  };

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const questionId: string = req.params.id;
      const deletedQuestion = await this.questionService.delete(questionId);

      res.status(200).json(deletedQuestion);
    } catch (error) {
      handleErrorResponse(res, error);
    }
  };

};
