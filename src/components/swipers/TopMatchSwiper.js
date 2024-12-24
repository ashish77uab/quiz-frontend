import React from "react";
import MatchCard from "../cards/MatchCard";
const TopMatchSwiper = ({ data }) => {
  return (
    <>
      {data.map((match) => (
        <MatchCard key={match?._id} match={match} />
      ))}
     
    </>
  );
};

export default TopMatchSwiper;
