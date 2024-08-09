import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

const refreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export const refreshTokenValidation = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = refreshTokenSchema.validate(req.body, { abortEarly: false });

    if (error) {
      return res.status(422).send(error.details.map(detail => detail.message));
    };

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
