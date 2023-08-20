import Workspace from "../models/Workspace.model.js";
import workspaceValidObject from "../validators/workspace.joi.js";

export const createWorkspace = async (req, res, next) => {
    try {
        const { name, category, admin } = req.body
        const { value, error } = workspaceValidObject.validate({ name, category, admin })

        if (error) return next(errorResponse(400, error.details[0].message))

        let newWorkspace = await new Workspace({
            name: value.name,
            category: value.category,
            admin: value.admin
        }).save()

        res.status(201).json({
            status: true,
            message: 'workspace created',
            Workspace: newWorkspace
        })
    } catch (error) {
        console.log('[create-workspace]', error.message)
        next(errorResponse(500, 'something went wrong'))
    }
}
