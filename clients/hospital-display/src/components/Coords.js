import React from 'react'
import Coord from './Coord';

const Coords = ( { coords } ) => {
  return (
    <>
      {
        coords.length === 0? <h1 className='text-3xl font-semibold m-6 text-center'>Nothing to display</h1> :
        <div className='flex flex-col mx-auto sm:w-6/12 w-9/12 p-3'>
          {coords.map((coord, index) => {
            return <Coord key={index} data={coord} />
          })}
        </div>
      }
    </>
  )
}

export default Coords