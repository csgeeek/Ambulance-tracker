import React from 'react'
import Coord from './Coord';

const Coords = ( { coords } ) => {
  return (
    <>
      <div className="coords-container">
        {
          coords.map((coord, index) => {
            return <Coord key={index} data={coord} />
          })
        }
      </div>
    </>
  )
}

export default Coords