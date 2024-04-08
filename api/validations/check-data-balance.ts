import Joi from "joi";

const getDataBalance = Joi.object({
  identifier: Joi.string().required().min(10).max(11)
});

export { getDataBalance };
