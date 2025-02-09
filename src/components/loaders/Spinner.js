import React from "react";
import { createPortal } from "react-dom";
import BeatLoader from "react-spinners/BeatLoader";
const Spinner = () => {
  return (
    <>
      {createPortal(
        <div className="fixed inset-0 flex-center drop-shadow-md bg-gray-50 bg-opacity-0 z-[49]">
          <BeatLoader color="#d97706" size={20} />
        </div>,
        document.getElementById("modals")
      )}
    </>
  );
};

export default Spinner;
