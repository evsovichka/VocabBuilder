import { Link } from "react-router-dom";
import css from "./LoginForm.module.css";

export default function LoginForm() {
  return (
    <div className={css.wrapper}>
      <div className={css.textWrap}>
        <h2 className={css.title}>Login</h2>
        <p className={css.text}>
          Please enter your login details to continue using our service:
        </p>
      </div>
      <form className={css.form}>
        <input type="email" placeholder="Email" className={css.input} />
        <input type="password" placeholder="Password" className={css.input} />
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
