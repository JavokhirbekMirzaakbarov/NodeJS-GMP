import { Request, Response } from 'express';

type SchemaError = {
  path: string;
  message: string;
};

export const errorResponse = (schemaErrors: SchemaError[]) => {
  const errors = schemaErrors.map(({ path, message }) => ({
    path,
    message,
  }));

  return {
    status: 'failed',
    errors,
  };
};

export const validateSchema = (schema: any) => {
  return (req: Request, res: Response, next: () => void) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });
    if (error?.isJoi) {
      res.status(400).json(errorResponse(error.details));
    } else {
      next();
    }
  };
};
