const Joi = require('joi');


module.exports = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = Joi.validate(req.body, schema);
            if (result.error) {
                // res.status(200).json({user : ''})
                //  res.status(400).json(result.error);
                res.json({error: result.error})
                
            }

            if (!req.value) { req.value = {}; }
            req.value['body'] = result.value;
            next();
        }
    },
    schemas: {
        authSchema: Joi.object().keys({
            fname: Joi.string().required(),
            lname: Joi.string().required(),
            email: Joi.string().email().lowercase().required(),
            gender: Joi.string().required(),
            birthdate: Joi.date().required(),
            password: Joi.string().required().regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/),
            cpassword: Joi.string().valid(Joi.ref('password')).required(),
            isAdmin: Joi.boolean(),
            isActive: Joi.boolean(),
            code: Joi.string().required()

        })
    }
}