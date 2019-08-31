import Joi from "@hapi/joi";

const userBody = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  fullName: Joi.string().required()
});

const userId = Joi.string().required().disallow([
  "null", "undefined"
]);

export default {
  userId: userId,
  getById: {
    params: Joi.object({
      userId: userId
    })
  },
  createUser: {
    body: userBody
  },
  createUserByDb: {
    body: userBody,
    query: Joi.object({
      db: Joi.string().required(),
    })
  }
};
