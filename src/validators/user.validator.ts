import Joi from 'joi';
import {CurrencyEnum} from '../enums/currency.enum';
import {RoleEnum} from '../enums/role.enum';
import {AdStatusEnum} from '../enums/ad-status.enum';


export const userIdSchema = Joi.object({
    userId: Joi.string().hex().length(24).required()
});

export const userBodySchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d).{8,}$'))
        .required()
        .messages({
            'string.pattern.base': 'Password must be at least 8 characters long and contain both letters and numbers',
        }),
    age: Joi.number().min(0).required(),
    phone: Joi.string().pattern(/^\+?\d{7,15}$/).optional(),
    roles: Joi.array().items(Joi.string().valid(...Object.values(RoleEnum))).optional(),
    accountType: Joi.string().valid('base', 'premium').default('base'),
    isVerified: Joi.boolean().default(false),
    isDeleted: Joi.boolean().default(false),
});


export const updateUserSchema = Joi.object({
    name: Joi.string().min(3).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d).{8,}$'))
        .optional()
        .messages({
            'string.pattern.base': 'Password must be at least 8 characters long and contain both letters and numbers',
        }),
    age: Joi.number().integer().min(0).optional(),
    phone: Joi.string().pattern(/^\+?\d{7,15}$/).optional(),
    roles: Joi.string().valid(...Object.values(RoleEnum)).optional(),
    isVerified: Joi.boolean().optional(),
    isDeleted: Joi.boolean().optional(),
}).min(1);

export const userQuerySchema = Joi.object({
    sortBy: Joi.string().valid('name', 'age', 'email').optional(),
    search: Joi.string().optional(),
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).optional(),
});

export const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d).{8,}$'))
        .required()
        .messages({
            'string.pattern.base': 'Password must be at least 8 characters long and contain both letters and numbers',

        }),
});

export const verifyEmailSchema = Joi.object({
    token: Joi.string().required().messages({
        'any.required': 'Token is required for email verification',
        'string.base': 'Token must be a string'
    }),
});

export const  changePasswordSchema = Joi.object({
    oldPassword: Joi.string()
        .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d).{8,}$'))
        .optional()
        .messages({
            'string.pattern.base': 'Password must be at least 8 characters long and contain both letters and numbers',
        }),
    password: Joi.string()
        .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d).{8,}$'))
        .optional()
        .messages({
            'string.pattern.base': 'Password must be at least 8 characters long and contain both letters and numbers',
        }),
});


export const createSchema = Joi.object({
    title: Joi.string().trim().min(2).max(100).required(),

    description: Joi.string().allow('', null).max(2000),

    brand: Joi.string().trim().required(),

    model: Joi.alternatives().try(
        Joi.string().trim(),
        Joi.array().items(Joi.string().trim().min(1))
    ).required(),

    currency: Joi.string()
        .valid(...Object.values(CurrencyEnum))
        .required(),

    price: Joi.number().positive().required(),

    priceUAH: Joi.number().positive().optional(),
    priceUSD: Joi.number().positive().optional(),
    priceEUR: Joi.number().positive().optional(),
    priceSource: Joi.string().optional(),
    priceRate: Joi.number().positive().optional(),

    adStatus: Joi.string()
        .valid(...Object.values(AdStatusEnum))
        .optional(),

    hasProfanity: Joi.boolean().optional(),
    profaneWords: Joi.array().items(Joi.string()).optional(),
    editAttempts: Joi.number().integer().min(0).optional(),

    views: Joi.array()
        .items(Joi.object({ date: Joi.date().required() }))
        .default([]),

    region: Joi.string().trim().required(),

    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
});
export const updateSchema = createSchema.fork(Object.keys(createSchema.describe().keys), (field) =>
    field.optional()
);
