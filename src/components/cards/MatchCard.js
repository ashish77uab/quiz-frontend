import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { numberWithCommas } from "../../utils/helpers";
const MatchCard = ({ match }) => {
  const filledSpot = match?.eventCount?.[0]?.eventCount||0
  const totalSpots = Math.floor(match?.prize?.winningAmount / match?.prize?.entryFees)
  const perCentage = filledSpot * 100 / totalSpots 
  return (
    <Link to={`/match/${match._id}`} className="p-4 border border-zinc-300 rounded-md">
      <div className="flex justify-between items-start gap-2 ">
        <div className="flex-grow">
          <div className=" flex items-center gap-1 ">
            <img className="w-8 h-8 object-contain mr-1" src={match?.home?.icon} alt="" />
            <p>{match?.home?.name}</p>
            <b className="self-center">Vs</b>
            <img className="w-8 h-8 object-contain mr-1" src={match?.away?.icon} alt="" />
            <p>{match?.away?.name}</p>
          </div>
          <div className="flex items-center gap-2 mt-2">
              <div className={`
            font-semibold
            ${match?.status === 'Live' && 'text-red-500'}
            ${match?.status === 'Completed' && 'text-green-500'}
            ${match?.status === 'Pending' && 'text-gray-500'}
            `}>
              {match?.status === 'Live' && 'Match is live'}
              {match?.status === 'Completed' && 'Match is Completed'}
              {match?.status === 'Pending' && 'Match not started yet'}
              
              </div>
          </div>

        </div>
      </div>
      {!match?.isDistributed && <div className="mt-4">
        <div className="flex justify-between gap-2 mb-2">
          <span className="text-sm">{numberWithCommas(filledSpot)} spot filled</span>
          <span className="text-sm">{numberWithCommas(totalSpots)} total spots</span>
        </div>
        <div className="h-[8px] rounded-full bg-gray-200">
          <div style={{ width: `${perCentage}%` }} className="h-full rounded-full bg-green-700"></div>
        </div>

      </div>}
      <div className="flex items-start gap-1 justify-between mt-4">
        <div>
          <p>Starts at <b>{moment(match?.time)?.format('DD MMM, HH:mm')}</b> </p>
          <p>Pool Prize  Rs.<b> {numberWithCommas(match?.prize?.winningAmount)}</b> </p>
          <p>1st Rank Prize   Rs.<b> {numberWithCommas(match?.prize?.distributionPyramid?.find((item) => item?.rank === 1)?.prize)}</b> </p>
        </div>
        <div>
          <p>Entry Fees  Rs.<b> {match?.prize?.entryFees}</b> </p>
          <p>Winnings  <b> {match?.prize?.winningPercentage}%</b> </p>
          
        </div>

      </div>
    </Link>
  );
};

export default MatchCard;
