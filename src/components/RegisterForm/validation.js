import * as yup from "yup";

export const RegisterSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required").email("Enter valid email"),

  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/,
      "Must be 7 chars, 6 letters in a row, 1 digit"
    ),
});
