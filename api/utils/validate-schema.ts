import type Joi from "joi";

/**
 *
 * @param { Record<string, unknown>} body
 * @param { Joi.ObjectSchema} schema
 * @returns {{Record<string, unknown>}}
 */

export const validateSchema = (
  body: Record<string, unknown>,
  schema: Joi.ObjectSchema
) => {
  const { value, error } = schema.validate(body);

  if (error) {
    const errorArray = error.details.map((item: any) => ({
      message: item.message.replace(/[^a-zA-Z0-9 ]/g, ""),
    }));
    throw new Error(errorArray[0]?.message);
  }
  return value;
};
