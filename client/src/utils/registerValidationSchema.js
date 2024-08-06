import * as Yup from "yup";

export const registerValidationSchema = Yup.object({
  firstname: Yup.string()
    .min(2, 'First Name must be at least 2 characters')
    .max(12, 'First Name must not exceed 12 characters')
    .matches(/^[a-zA-Z]+$/, 'First Name can only contain letters')
    .required('First Name is required'),
  lastname: Yup.string()
    .min(2, 'Last Name must be at least 2 characters')
    .max(50, 'Last Name must not exceed 50 characters')
    .matches(/^[a-zA-Z]+$/, 'Last Name can only contain letters')
    .required('Last Name is required'),
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(13, 'Username must not exceed 13 characters')
    .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

