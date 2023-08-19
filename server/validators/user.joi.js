import Joi from "joi";

const validObject = Joi.object({
    email: Joi.string().email().required().min(5).max(100),
    firstName: Joi.string().min(3).max(50).required(),
    lastName: Joi.string().min(3).max(50).required(),
    password: Joi.string().required().min(5).max(64)
})

export { validObject }