import React from "react";
import BeatLoader from "react-spinners/BeatLoader";
const SpinnerInline = () => {
  return (
    <>
      <div className="flex-center py-4">
        <BeatLoader color="#d97706" size={20} />
      </div>
    </>
  );
};

export default SpinnerInline;
