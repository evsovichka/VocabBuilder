import css from "./SearchInput.module.css";

export default function SearchInput() {
  const handleChange = (evt) => {
    console.log(evt.target.value);
  };
  return (
    <div className={css.wrap}>
      <input
        type="text"
        placeholder="Find the word"
        className={css.input}
        onChange={handleChange}
      />
      <svg width="20" height="20">
        <use href="/icons/icons.svg#icon-search" />
      </svg>
    </div>
  );
}
