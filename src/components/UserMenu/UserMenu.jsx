import css from "./UserMenu.module.css";

export default function UserMenu({ isMobile, username, className = "" }) {
  return (
    <div className={`${css.userInfo} ${css[className]}`}>
      <p className={css.userName}>{username}</p>
      <div>
        <svg width={isMobile ? 20 : 24} height={isMobile ? 20 : 24}>
          <use href="/icons/icons.svg#icon-user" />
        </svg>
      </div>
    </div>
  );
}
