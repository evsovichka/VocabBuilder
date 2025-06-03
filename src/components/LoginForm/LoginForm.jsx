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
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
        <Link to="/register">Reister</Link>
      </form>
    </div>
  );
}
