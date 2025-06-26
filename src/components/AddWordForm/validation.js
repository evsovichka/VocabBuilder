import * as yup from "yup";

const addWordSchema = yup.object({
  en: yup
    .string()
    .required("Required")
    .matches(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/, "Use English letters only."),
  ua: yup
    .string()
    .required("Required")
    .matches(
      /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u,
      "Use Ukrainian letters only."
    ),
});

export default addWordSchema;
