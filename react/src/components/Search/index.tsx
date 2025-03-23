import { useState, SetStateAction, Dispatch } from "react";
import searchIcon from "assets/images/search.svg";
import closeIcon from "assets/images/close.svg";
import "./index.scss";

interface SearchProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
}

export const Search = ({ value, onChange }: SearchProps) => {
  const clear = () => {
    onChange("");
  };

  return (
    <div className={`search-input ${value ? "has-value" : ""}`}>
      <img className="search-icon" src={searchIcon} alt="Search" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search all launches..."
      />
      {value && (
        <img
          className="close-icon"
          src={closeIcon}
          onClick={clear}
          alt="Close"
        />
      )}
    </div>
  );
};
