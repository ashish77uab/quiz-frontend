import moment from 'moment'
import React from 'react'

const SingleMessageItem = ({ message, isMe }) => {
  return (
      <div key={message?._id} className={`
                                     flex items-end  gap-4 border-b border-b-zinc-300 px-4 py-3 max-w-2xl
                                     ${isMe ? 'bg-white self-start rounded-lg rounded-br-none' : 'bg-sky-700 text-white self-end rounded-lg rounded-bl-none'}
                                    `}>
          <div className='flex-grow'>
              {message?.text}
          </div>
          <div className={`text-xs ${isMe ? 'text-muted' : 'text-white'} text-muted`}>{moment(message?.createdAt)?.format('hh:mm a')}</div>
      </div>
  )
}

export default SingleMessageItem