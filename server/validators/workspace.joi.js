import Joi from 'joi'

const workspaceValidObject = Joi.object(
    {
        name: Joi.string().min(3).max(50).required(),
        admin: Joi.string().required(),
        category: Joi.string()
    }
)

export default workspaceValidObject