import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().required("Email is required").email("Enter valid email"),

  password: yup
    .string()
    .required("Password is required")
    .min(7, "Minimum 7 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      "Must contain latin letters and numbers"
    )
    .matches(
      /^[a-zA-Z\d]+$/,
      "Only latin letters and digits are allowed (no symbols)"
    ),
});
