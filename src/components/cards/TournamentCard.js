import React from 'react'
import { Link } from 'react-router-dom'
import { imageRender } from '../../utils/helpers'

const TournamentCard = ({ tournament }) => {
  return (
      <div className="shadow-card border-c rounded-lg">
          <Link to={`/tournament/${tournament._id}`}>
              <div className=" py-4 px-4 ">
                  <img
                      className="w-28 h-28 object-contain m-auto block"
                      src={imageRender(tournament.icon)}
                      alt={tournament.title}
                  />
              </div>
              <div className="md:py-4 py-1 text-center border-t border-t-zinc-300">
                  <h4 className="md:heading-6 heading-7">{tournament.name}</h4>
              </div>
          </Link>
      </div>
  )
}

export default TournamentCard