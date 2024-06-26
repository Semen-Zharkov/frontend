import * as yup from 'yup';

export const userCommentValidator = yup
    .string()
    .max(200, 'Комментарий должен быть не длинее 200 символов')