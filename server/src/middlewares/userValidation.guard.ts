import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const userSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const userValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = userSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(422).send(error.details.map(detail => detail.message));
    };

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
