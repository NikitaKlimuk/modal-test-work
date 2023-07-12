import React, { useState } from "react";
import { countryCodeList } from "../../config/countryCode";
import SelectCode, { CountryCode } from "../selectCode";
import { useQuery } from "react-query";
import "./styles.scss";

interface IProps {
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface formData {
  code: string;
  number: string;
}

const PhoneModal: React.FC<IProps> = ({ setActive }) => {
  const [formData, setFormData] = useState<formData>({
    code: "+48",
    number: "",
  });

  const { data: suggestions = [] } = useQuery<CountryCode[]>(
    "suggestions",
    async () => {
      // Simulate an asynchronous API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return countryCodeList;
    }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      number: e.target.value,
    }));
  };

  const handleSaveBtn = () => {
    console.log(formData);
    setActive(false);
  };

  return (
    <div className="wrapper" onClick={() => setActive(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Change phone number</h3>
        <div className="modal__phone">
          <div className="modal__phone-title">Provide new phone number</div>
          <div className="modal__phone-select">
            <SelectCode suggestions={suggestions} setFormData={setFormData} />

            <input
              type="number"
              className="modal__phone-select__input"
              placeholder={"000-000-000"}
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="modal__phone-buttons">
            <button className="close-btn" onClick={() => setActive(false)}>
              Close
            </button>
            <button className="save-btn" onClick={handleSaveBtn}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneModal;
