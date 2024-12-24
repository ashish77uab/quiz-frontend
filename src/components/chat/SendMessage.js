import React from 'react'
import { reactIcons } from '../../utils/icons';

const SendMessage = ({ handleSubmit, text, setText }) => {
  return (
      <div className='flex flex-shrink-0 items-center bg-zinc-200 py-4 px-4 border-y border-y-zinc-300'>
          <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
          }} className='w-full flex-grow relative'>
              <input type="text" className='bg-white px-8 py-3 border-none outline-none w-full' value={text} onChange={(e) => setText(e.target.value)} placeholder='Enter message' />
              <button type='submit' className='absolute ay-center right-2 flex-center w-8 h-8 rounded-md bg-amber-400 hover:bg-amber-300'>{reactIcons.plane}</button>
          </form>

      </div>
  )
}

export default SendMessage