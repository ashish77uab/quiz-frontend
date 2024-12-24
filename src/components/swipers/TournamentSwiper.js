import React from "react";
import TournamentCard from "../cards/TournamentCard";
const TournamentSwiper = ({ data }) => {
  return (
      < >
        {data.map((tournament) => (
         <TournamentCard tournament={tournament}/>
        ))}
      </>
  );
};

export default TournamentSwiper;
