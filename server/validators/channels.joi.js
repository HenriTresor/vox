import Joi from "joi";

export const channelValidObject = Joi.object({
    name: Joi.string().required(),
    form: Joi.string().required(),
    creator: Joi.string().required(),
})