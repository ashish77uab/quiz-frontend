import React from "react";
const RenderNoData = ({ title, subtitle, className, icon }) => {
  return (
    <div className={`text-center py-20 w-full ${className}`}>
      <div className="flex justify-center icon-color items-center text-center flex-col ">
        {icon ? <div className="text-6xl ">{icon}</div> : <div className="w-14 h-14">
          {" "}
          <svg viewBox="0 0 57 54" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.333 53.69c.561 0 1.016-.455 1.016-1.016V31.78a2.91 2.91 0 0 0-2.905-2.915H6.667a2.91 2.91 0 0 0-2.905 2.915v20.895c0 .561.455 1.016 1.016 1.016h7.555zm-6.54-2.031v-19.88c0-.49.392-.884.874-.884h3.777c.482 0 .874.395.874.884v19.88H5.793zM52 53.69c.56 0 1.016-.455 1.016-1.016V3.286A2.91 2.91 0 0 0 50.11.371h-3.778a2.91 2.91 0 0 0-2.904 2.915v49.388c0 .561.455 1.016 1.015 1.016H52zm-1.016-2.031H45.46V3.286c0-.49.392-.884.873-.884h3.778c.481 0 .873.394.873.884V51.66zM38.778 53.69c.56 0 1.015-.455 1.015-1.016V22.282a2.91 2.91 0 0 0-2.904-2.916H33.11a2.91 2.91 0 0 0-2.904 2.916v30.392c0 .561.454 1.016 1.015 1.016h7.556zm-1.016-2.031h-5.524V22.282c0-.49.392-.884.873-.884h3.778c.481 0 .873.394.873.884v29.377zM25.556 53.69c.56 0 1.015-.455 1.015-1.016v-39.89a2.91 2.91 0 0 0-2.904-2.915h-3.778a2.91 2.91 0 0 0-2.905 2.915v39.89c0 .561.455 1.016 1.016 1.016h7.556zm-6.54-2.031V12.784c0-.49.392-.884.873-.884h3.778c.48 0 .873.394.873.884v38.875h-5.524z"></path>
            <path d="M1 51.659a1.016 1.016 0 1 0 0 2.03h54.778a1.016 1.016 0 0 0 0-2.03H1z"></path>
          </svg>
        </div>}
        <h6 className="text-xl font-semibold my-3">{title}</h6>
        <p className=" text-gray-600  ">{subtitle}</p>
      </div>
    </div>
  );
};

export default RenderNoData;
