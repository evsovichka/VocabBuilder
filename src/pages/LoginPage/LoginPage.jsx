import illustration from "../../assets/images/loginIllustration.svg";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import css from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <section className={css.section}>
      <img
        src={illustration}
        alt="Login illustration"
        width="247"
        height="191"
      />
      <ul className={css.list}>
        <li>Word</li>
        <li>Translation</li>
        <li>Grammar</li>
        <li>Progress</li>
      </ul>
      <LoginForm />
    </section>
  );
}
