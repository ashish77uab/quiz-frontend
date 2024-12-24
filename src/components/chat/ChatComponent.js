import React, { forwardRef } from 'react'
import UserItem from './UserItem'
import SingleMessageItem from './SingleMessageItem'
import SendMessage from './SendMessage'
import RenderNoData from '../layout/RenderNoData'
import { reactIcons } from '../../utils/icons'

const ChatComponent = forwardRef(({ users, selectedUser, handleSubmit, handleClickUser, text, setText, activeUsers, userId, messages, user }, messagesEndRef) => {
    return (
        <div className='flex  h-[calc(100vh-118px)] border border-zinc-300 rounded-md overflow-hidden'>
            <div className='w-96 flex flex-col border-r border-r-zinc-300   rounded-md rounded-r-none  h-full overflow-x-hidden overflow-y-auto'>
                {users?.map((user) => {
                    return (
                        <UserItem key={user?._id} activeUsers={activeUsers} user={user} messages={messages} userId={userId} handleClickUser={handleClickUser} />
                    )
                })}
            </div>
            <div className='flex-grow h-full flex flex-col  justify-between '>
                {userId ? <>
                    <div className='flex items-center gap-4  px-4 py-3 cursor-pointer'>
                        <div className='w-12 h-12 shadow-lg rounded-full overflow-hidden bg-gray-200'>
                            <img className='object-cover w-full h-full' src={selectedUser?.profileImage || "/images/user.png"} alt="" />
                        </div>
                        <div className='text-sm text-gray-500 flex-grow'>
                            <h6 className='heading-6 leading-[1]'>{selectedUser?.fullName}</h6>
                        </div>

                    </div>
                    <div className='flex-grow h-[calc(100%-72px)] flex flex-col justify-between'>
                        <div className='flex-grow bg-amber-100 py-2 px-4 overflow-y-auto'>
                            <div className=' flex flex-col gap-2'>
                                {messages?.map((item) => {
                                    const isMe = item?.sender === user?._id
                                    return (
                                        <SingleMessageItem key={item?._id} isMe={isMe} message={item} />
                                    )
                                })}
                                <div ref={messagesEndRef} />
                            </div>

                        </div>
                        <SendMessage handleSubmit={handleSubmit} setText={setText} text={text} />

                    </div>
                </> : 
                <div className='flex-center flex-grow'>
                    <RenderNoData title={'Select user to start chat'} icon={reactIcons?.chat} subtitle={'Send and recieve messages instantly'}/>

                </div>}


            </div>


        </div>
    )
})

export default ChatComponent