import * as Yup from 'yup';

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format')
    // .test('gmail', 'Email must be from a Gmail domain', value => value ? value.endsWith('@gmail.com') : true)
    .required('Email is required'),

  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Password must be at least 6 characters long and include one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .max(12, 'Password must be at most 12 characters')
    .required('Password is required'),
});

