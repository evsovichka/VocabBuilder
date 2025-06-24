import illustration from "../../assets/images/loginIllustration.svg";
import LoginForm from "../../components/LoginForm/LoginForm.jsx";
import { useResizeWindow } from "../../hooks/resizeWindow.js";
import css from "./LoginPage.module.css";
import { useKeyboardVisible } from "../../hooks/keyboardVisible.js";

export default function LoginPage() {
  const sizeWindow = useResizeWindow();
  const isMobile = sizeWindow < 768;
  const isTablet = sizeWindow >= 768 && sizeWindow < 1440;
  const isKeyboardOpen = useKeyboardVisible();

  return (
    <section className={css.page}>
      {!isMobile && <div className={css.background}></div>}
      <div className={css.section}>
        <div
          className={`${css.formWrapper} ${
            isKeyboardOpen ? css.keyboardOpen : ""
          }`}
        >
          <LoginForm />
        </div>
        <div className={css.illustrationBox}>
          {!isTablet && (
            <img
              src={illustration}
              alt="Login illustration"
              width={isMobile ? 247 : 498}
              height={isMobile ? 191 : 435}
            />
          )}
          <ul className={css.list}>
            <li>Word</li>
            <li>Translation</li>
            <li>Grammar</li>
            <li>Progress</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
