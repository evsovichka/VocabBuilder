import css from "./Logo.module.css";
import logo from "../../assets/images/logo.svg";
export default function Logo() {
  return (
    <div className={css.wrap}>
      <img src={logo} alt="" className={css.image} />
      <p className={css.text}>VocabBuilder</p>
    </div>
  );
}
