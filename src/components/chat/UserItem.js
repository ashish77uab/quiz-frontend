import moment from 'moment'
import React from 'react'

const UserItem = ({ handleClickUser, user, userId, activeUsers,messages }) => {
    console.log(messages,'messagea')
    const isActive = activeUsers?.includes(user?._id)
    const hasUnread = user?.unreadMessages?.length>0
    const singleMessage = user?._id === userId ? messages?.[messages?.length-1]   : hasUnread ? user?.unreadMessages?.[0] : user?.latestReadMessage?.[0]
    return (
        <div onClick={() => handleClickUser(user)} className={`flex items-start gap-4 border-b border-b-zinc-300  px-4 py-3 cursor-pointer ${user?._id === userId ? 'bg-sky-500' : 'bg-white'} `}>
            <div className='w-12 h-12 flex-shrink-0 shadow-lg rounded-full relative bg-gray-200'>
                <div className={`w-4 h-4 rounded-full absolute top-[-3px] right-[-6px] z-[2] border-2 shadow-lg  border-white  ${isActive ? 'bg-green-500 ':'bg-zinc-400'}`}></div>
                <img className='object-cover w-full h-full rounded-full' src={user?.profileImage || "/images/user.png"} alt="" />
            </div>
            <div className='text-sm flex-grow'>
                <h6 className={`heading-6 leading-[1] ${user?._id === userId ? 'text-white ' : 'text-black'}`}>{user?.fullName}</h6>
                <div className='flex items-start gap-1 '>
                    <p className={`opacity-80 flex-grow line-clamp-2  leading-[1] mt-1 ${user?._id === userId ? 'text-white ' : 'text-black'}`}>{singleMessage?.text}</p>
                   {hasUnread && userId!==user?._id && <p className={`opacity-80 min-w-[24px] h-6 font-semibold rounded-full flex-center bg-green-500 flex-shrink-0  text-sm leading-[1] mt-1 text-white`}>{user?.unreadMessages?.length}</p>}
                    {singleMessage && <p className={`opacity-80 flex-shrink-0  text-xs leading-[1] mt-1 ${user?._id === userId ? 'text-white ' : 'text-black'}`}>{moment(singleMessage?.createdAt)?.format('hh:mm a')}</p>}
                </div>
            </div>

        </div>
    )
}

export default UserItem