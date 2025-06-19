import css from "./ActionButton.module.css";
import clsx from "clsx";

export default function ActionButton({
  children,
  svgName,
  onClick,
  className,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(css.button, className && css[className])}
    >
      {children}
      <svg>
        <use href={`/icons/icons.svg#${svgName}`} />
      </svg>
    </button>
  );
}
