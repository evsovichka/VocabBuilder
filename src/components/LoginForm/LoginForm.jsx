import { Link } from "react-router-dom";
import css from "./LoginForm.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./validation.js";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = (data) => {
    console.log(data);
    reset();
    navigate("/dictionary");
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
        <div className={css.inputWrapper}>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className={`${css.input} ${errors.password ? css.inputError : ""}`}
          />
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
