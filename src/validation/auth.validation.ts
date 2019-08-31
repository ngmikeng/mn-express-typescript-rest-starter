import Joi from "@hapi/joi";

export default {
  login: {
    body: Joi.object({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
  }
};
