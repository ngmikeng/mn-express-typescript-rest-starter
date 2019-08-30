import Joi from "@hapi/joi";

const userBody = {
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  fullName: Joi.string().required()
};

export default {
  getById: {
    params: {
      userId: Joi.string().required().disallow([
        "null", "undefined"
      ])
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