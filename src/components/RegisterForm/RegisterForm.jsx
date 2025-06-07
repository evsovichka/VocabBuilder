import { Link } from "react-router-dom";
import css from "./RegisterForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./validation.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
    navigate("/dictionary");
  };

  const passwordValue = watch("password");
  return (
    <div className={css.wrapper}>
      <div className={css.textWrap}>
        <h2 className={css.title}>Register</h2>
        <p className={css.text}>
          To start using our services, please fill out the registration form
          below. All fields are mandatory:
        </p>
      </div>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputWrapper}>
          <input
            type="text"
            {...register("name")}
            placeholder="Name"
            className={`${css.input} ${errors.name ? css.inputError : ""}`}
          />
          {errors.name && (
            <span className={css.error}>
              <svg width="16" height="16">
                <use href="/icons/icons.svg#icon-error" />
              </svg>
              {errors.name.message}
            </span>
          )}
        </div>
        <div className={css.inputWrapper}>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className={`${css.input} ${errors.email ? css.inputError : ""}`}
          />
          {errors.email && (
            <span className={css.error}>
              <svg width="16" height="16">
                <use href="/icons/icons.svg#icon-error" />
              </svg>
              {errors.email.message}
            </span>
          )}
        </div>
        <div className={`${css.inputWrapper} ${css.inputPassword}`}>
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            placeholder="Password"
            className={`${css.input} ${errors.password ? css.inputError : ""} ${
              !errors.password && passwordValue && touchedFields.password
                ? css.inputSuccess
                : ""
            }`}
          />
          <span className={css.togglePassword} onClick={togglePassword}>
            {showPassword ? (
              <svg width="20" height="20">
                <use href="/icons/icons.svg#icon-eye" />
              </svg>
            ) : (
              <svg width="20" height="20">
                <use href="/icons/icons.svg#icon-eye-off" />
              </svg>
            )}
          </span>
          {errors.password ? (
            <span className={css.error}>
              <svg width="16" height="16">
                <use href="/icons/icons.svg#icon-error" />
              </svg>
              {errors.password.message}
            </span>
          ) : passwordValue && touchedFields.password ? (
            <span className={css.success}>
              <svg width="16" height="16" className={css.successIcon}>
                <use href="/icons/icons.svg#icon-success" />
              </svg>
              Success password
            </span>
          ) : null}
        </div>
        <div className={css.buttonWrap}>
          <button type="submit" className={css.button}>
            Register
          </button>
          <Link to="/login" className={css.link}>
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
