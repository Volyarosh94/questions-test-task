import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const questionSchema = Joi.object({
  text: Joi.string().optional(),
  editingBy: Joi.string().optional(),
});

export const questionValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = questionSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(422).send(error.details.map(detail => detail.message));
    };

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
