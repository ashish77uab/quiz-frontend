import { reactIcons } from "../../utils/icons";
import { useNavigate } from "react-router-dom";

import React from 'react'
import { useScrollToTop } from "../../hooks/useScrollToTop";
const TopBar = ({ handleBack }) => {
  useScrollToTop()
  const navigate = useNavigate();
  const handleGoBack = () => {
    if (handleBack) {
      handleBack()
    } else {
      navigate(-1)
    }
  }

  return (
    <>
      <div className={`flex items-center min-h-[65px]  shadow-navbar border-b border-b-zinc-100 bg-transparent transition-all duration-200 py-[10px] sticky top-0 left-0  bg w-full z-[50] bg-white`}>
        <div className="px-4 w-full">
          <div className="flex items-center justify-between">
            <div onClick={handleGoBack} className="flex items-center cursor-pointer gap-1">
              <span role="button" className="text-3xl  font-bold ">
                {reactIcons.goback}
              </span>
              <span className="font-semibold"> Go back</span>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default TopBar;
