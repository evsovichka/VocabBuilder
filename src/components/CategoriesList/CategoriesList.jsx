import { useState } from "react";
import css from "./CategoriesList.module.css";

export default function CategoriesList() {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("regular");

  const handleChange = (evt) => setCategory(evt.target.value);
  const handleVerbTypeChange = (evt) => {
    setType(evt.target.value);
  };

  return (
    <div className={css.wrap}>
      <select className={css.select} value={category} onChange={handleChange}>
        <option value="">Categories</option>
        <option value="verb">Verb</option>
        <option value="participle">Participle</option>
        <option value="noun">Noun</option>
        <option value="adjective">Adjective</option>
        <option value="pronoun">Pronoun</option>
        <option value="numerals">Numerals</option>
        <option value="adverb">Adverb</option>
        <option value="preposition">Preposition</option>
        <option value="phrasalVerb">Phrasal verb</option>
        <option value="functionalPhrase">Functional phrase</option>
      </select>
      <svg className={css.selectIcon}>
        <use href="/icons/icons.svg#icon-arrow-down" />
      </svg>
      {category === "verb" && (
        <div className={css.radioWrap}>
          <label className={css.radio}>
            <input
              type="radio"
              name="verbType"
              value="regular"
              checked={type === "regular"}
              onChange={handleVerbTypeChange}
            />
            <span className={css.customRadio}></span>
            Regular
          </label>
          <label className={css.radio}>
            <input
              type="radio"
              name="verbType"
              value="irregular"
              checked={type === "irregular"}
              onChange={handleVerbTypeChange}
            />
            <span className={css.customRadio}></span>
            Irregular
          </label>
        </div>
      )}
    </div>
  );
}
