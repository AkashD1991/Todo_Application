const Joi = require('joi');


module.exports = {
    validateTaskBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                return res.status(400).send(result.error);
            }

            if (!req.value) { req.value = {}; }
            req.value['body'] = result.value;
            next();
        }
    },
    Taskschemas: {
        authSchema: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            completed: Joi.boolean().required()
        })
    }
}