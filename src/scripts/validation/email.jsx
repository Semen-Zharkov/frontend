import * as yup from 'yup';

export const emailRegistrationValidator = yup 
    .string()
    .required('Почта обязательна')
    .email('Неверный формат электронной почты')
    .matches(/^[A-Za-z0-9@.]+$/, 'Электронная почта должна содержать только латиницу, цифры, @ и .')
    .matches(/^[^@]+@[^@]+\.[^@.]+$/, 'Электронная почта не должна содержать спецсимволы, кроме @ и .')
    .matches(/^(?!.*\.\.).*$/, 'Точки не могут идти подряд в электронной почте')