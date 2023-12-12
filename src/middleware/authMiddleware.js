// const Joi = require('joi');

// // const registerSchema = async (req, res, next) => {
// //     Joi.object({
// //         email: Joi.string().email().required(),
// //         password: Joi.string().min(6).required(),
// //     })
// // };



// const registerSchema = () => (req, res, next) => {
//     const registerSchemaVal = Joi.object({
//         email: Joi.string().email().required(),
//         password: Joi.string().min(6).required(),
//     });

//     const { error } = registerSchemaVal.validate(req.body);
//     if (error) {
//         return res.status(400).json({ error: error.details.map(detail => detail.message) });
//     }
//     next();
// };


// // const loginSchema = Joi.object({
// //     email: Joi.string().email().required(),
// //     password: Joi.string().required(),
// // });

// module.exports = {
//     registerSchema,
//     // loginSchema,
// };


const Joi = require('joi');

const registerSchema = () => (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map(detail => detail.message) });
    }
    next();
};

// You can do something similar for loginSchema if needed
const loginSchema = () => (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details.map(detail => detail.message) });
    }
    next();
};

module.exports = {
    registerSchema,
    loginSchema,
};
