const errorResponse = (schemaErrors) => {
  const errors = schemaErrors.map(({ path, message }) => ({
    path,
    message,
  }));

  return {
    status: "failed",
    errors,
  };
};

const validateSchema = (schema) => {
  return (req, res, next) => {
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

const getExistingUsers = (users) => {
  return users.filter((user) => !user.isDeleted);
};

module.exports = {
  errorResponse,
  validateSchema,
  getExistingUsers,
};
