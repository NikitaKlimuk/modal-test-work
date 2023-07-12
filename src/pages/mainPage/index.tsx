import { useState } from "react";
import PhoneModal from "../../components/phoneModal";
import "./styles.scss";

function MainPage() {
  const [modalActive, setModalActive] = useState(false);

  const modalHandler = () => {
    setModalActive(!modalActive);
  };

  return (
    <div className="mainPage">
      <h1>
        This is a technical task for CTHINGS.CO - Mid Frontend Developer
        position (by Mikita Klimuk)
      </h1>
      <p>
        The first part of the task is stored in the utils/typedFreeze.ts folder
      </p>
      <button onClick={modalHandler} className="mainPage-btn">
        Active modal
      </button>
      {modalActive && <PhoneModal setActive={setModalActive} />}
      <p>
        If I had more time, I would devote my attention to improving the next
        points:
      </p>

      <li>
        Detailed work with styles (putting variables in a separate file, more
        detailed fitting by styles)
      </li>
      <li>Working with React Query states (isLoading)</li>
      <li>
        Adding validation to the number entry field (character limit, adding "-"
        stylisation)
      </li>
      <li>
        Handling events when an input is not filled (message output for the
        user)
      </li>
      <li>Moving smaller re-usable pieces into separate components.</li>
      <li>More detailed work with types.</li>
      <li>Custom scrollbar styling</li>
      <li>Moving interfaces to separate files</li>
    </div>
  );
}

export default MainPage;
