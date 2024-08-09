import { NextFunction, Response } from "express";
import { QuestionService } from "../services/question.service";
import { Question } from "../entities/question.entity";
import { ExtendedRequest } from "../interfaces/extendedRequest.interface";
import { FIVE_MINS } from "../utils/constants";

const questionService: QuestionService = new QuestionService();

export const editPermitGuard = () => {
  return async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
      const userId: string = req.userId;
      const questionId: string = req.params.id;
      const question: Question = await questionService.getById(questionId);

      if (question) {
        const currentTime = new Date().getTime();
        const lastEditedTime = new Date(question.updatedAt).getTime();
        if (currentTime - lastEditedTime > FIVE_MINS) {
          await questionService.setEdit(userId, questionId);
          return next();
        }

        if (!question.editingBy || question.editingBy === userId) {
          return next();
        }
      }

      return res.status(403).json({ canEdit: false });

    } catch (error) {
      if (error.message.includes("expired")) {
        return res.status(401).json(error.message);
      }
      return res.status(500).json(error.message);
    }
  };
};
