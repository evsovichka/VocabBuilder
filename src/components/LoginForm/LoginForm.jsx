import { Link } from "react-router-dom";
import css from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./validation.js";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations.js";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const togglePassword = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(loginSchema), mode: "onChange" });

  const onSubmit = (data) => {
    console.log(data);
    dispatch(logIn(data));
    reset();
  };

  return (
    <div className={css.wrapper}>
      <div className={css.textWrap}>
        <h2 className={css.title}>Login</h2>
        <p className={css.text}>
          Please enter your login details to continue using our service:
        </p>
      </div>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
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
            className={`${css.input} ${errors.password ? css.inputError : ""}`}
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
          {errors.password && (
            <span className={css.error}>
              <svg width="16" height="16">
                <use href="/icons/icons.svg#icon-error" />
              </svg>
              {errors.password.message}
            </span>
          )}
        </div>
        <div className={css.buttonWrap}>
          <button type="submit" className={css.button}>
            Login
          </button>
          <Link to="/register" className={css.link}>
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
