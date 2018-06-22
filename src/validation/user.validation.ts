import Joi from "joi";

const userBody = {
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  fullName: Joi.string().required()
};

export default {
  getById: {
    params: {
      userId: Joi.string().required()
    }
  },
  createUser: {
    body: userBody
  },
  createUserByDb: {
    body: userBody,
    query: {
      db: Joi.string().required(),
    }
  }
};