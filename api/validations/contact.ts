import Joi from "joi";

const createContactTicket = Joi.object({
  fname: Joi.string().trim().required().min(2),
  lname: Joi.string().trim().required().min(2),
  email: Joi.string().email().trim().required(),
  phone: Joi.string().trim().required().min(8).max(16),
  country: Joi.string().trim().required().min(2).max(255),
  countryCode: Joi.string().trim().required().length(2),
  state: Joi.string().trim().required().min(2).max(255),
  message: Joi.string().trim().required().min(8).max(300),
});

export { createContactTicket };
