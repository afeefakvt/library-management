import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";
import { HTTP_STATUS } from "../constants/httpStatus";

export const withValidation = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.context.errors.length) break; 
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ errors: errors.array().map(err => err.msg) });
    }

    next();
  };
};
