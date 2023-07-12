import React, { useEffect, useState } from "react";
import searchImg from "../../assets/icons/search.svg";
import arrow from "../../assets/icons/arrow.svg";
import { formData } from "../phoneModal";
import "./styles.scss";

export interface CountryCode {
  country: string;
  code: string;
  flag: string;
}

interface IProps {
  suggestions: CountryCode[];
  setFormData: React.Dispatch<React.SetStateAction<formData>>;
}

const SelectCode: React.FC<IProps> = ({ suggestions, setFormData }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputFlag, setinputFlag] = useState<string>("🇵🇱");

  const [filteredSuggestions, setFilteredSuggestions] = useState<CountryCode[]>(
    []
  );
  const [showFiltering, setshowFiltering] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;

    const filteredResults = suggestions.filter(
      (suggestion) =>
        suggestion.country.toLowerCase().includes(userInput.toLowerCase()) ||
        suggestion.code.toLowerCase().includes(userInput.toLowerCase())
    );
    const sortedResults = filteredResults.sort((a, b) =>
      a.country.localeCompare(b.country)
    );
    setFilteredSuggestions(sortedResults);
  };

  const selectSuggestion = (suggestion: CountryCode) => {
    setInputValue(suggestion.code);
    setFormData((prevFormData: formData) => ({
      ...prevFormData,
      code: suggestion.code,
    }));

    setinputFlag(suggestion.flag);
    setshowFiltering(false);
    setFilteredSuggestions(suggestions);
  };

  useEffect(() => {
    setFilteredSuggestions(suggestions);
  }, [suggestions]);

  return (
    <div className="selectCode">
      <button
        className="selectCode-btn"
        onClick={() => setshowFiltering(!showFiltering)}
      >
        <div className="selectCode-btn__flag">{inputFlag}</div>
        <div>{inputValue || "+48"}</div>
        <img
          src={arrow}
          alt="arrow"
          className={showFiltering ? "rotated" : ""}
        />
      </button>
      {showFiltering && (
        <div className="selectCode__filtering">
          <div className="selectCode__filtering-input">
            <img src={searchImg} alt="search" />
            <input
              type="text"
              onChange={handleChange}
              placeholder="Search..."
            />
          </div>

          <ul className="suggestions">
            {filteredSuggestions?.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => selectSuggestion(suggestion)}
                className="suggestions__item"
              >
                <div className="suggestions__item-country">
                  <div className="suggestions__item-country__flag">
                    {suggestion.flag}
                  </div>
                  {suggestion.country}
                </div>
                <div className="suggestions__item-code">{suggestion.code}</div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectCode;
