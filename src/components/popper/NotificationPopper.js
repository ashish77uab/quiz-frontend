import React, { useEffect } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { reactIcons } from '../../utils/icons'
import moment from 'moment'
import { deleteNotificationStart, getUserNotifcationStart, readNotificationStart, toggleNewNotification, updatePageLimit } from '../../redux/features/authSlice'
import { getUserToken } from '../../utils/constants'
import { useSelector } from 'react-redux'
import RenderNoData from '../layout/RenderNoData'

const NotificationPopper = ({ dispatch }) => {
    const newNotificationCount = localStorage?.getItem('notificationCount') || 0
    const { notifications, notificationsLoading, updateLoading, isNewNotification } = useSelector((state) => state.auth);
    const isLoggedIn = getUserToken()

    const handleResetNewCount = (id) => {
        localStorage?.setItem('isNewNotification', JSON.stringify(false))
        localStorage?.setItem('notificationCount', JSON.stringify(0))
        dispatch(toggleNewNotification(false))
    }
    const handleDelete = (id) => {
        dispatch(deleteNotificationStart({ id }))
    }
    const handleRead=(id)=>{
        dispatch(readNotificationStart({ id }))
    }
    const handleLoadMore=()=>{
        dispatch(getUserNotifcationStart({ skip: notifications?.notifications?.length||0 , take: 10 }))
    }
    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getUserNotifcationStart({ skip:0, take:10 }))
        }

    }, [isLoggedIn]);


    return (
        (
            <div className="">
                <Popover className="relative">
                    {({ open }) => (
                        <>
                            <Popover.Button className='focus:ring-0 focus:outline-0' >
                                <div onClick={handleResetNewCount} className={`
                w-10 h-10 rounded-full text-xl bg-zinc-300 flex-center relative ring-0 outline-0 focus:ring-0 focus:outline-0`}>
                                    <span>{reactIcons?.notification}</span>
                                    {isNewNotification && (
                                        <span className="absolute leading-[1] text-white -top-2 -right-2  min-w-[24px] h-6 flex-center rounded-full text-sm font-semibold bg-red-600 ">
                                            {newNotificationCount}
                                        </span>
                                    )}
                                </div>
                               

                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-sm -translate-x-1/2 transform px-4 sm:px-0 lg:max-w-xl">
                                    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                                        <div className="relative gap-8 bg-white py-4 space-y-2 ">
                                            <div className='pb-2 border-b border-b-zinc-200 flex justify-between gap-2 px-4'>
                                                <h4 className='heading-4'>All Notifications</h4>
                                            </div>
                                            <div className='max-h-[600px] overflow-y-auto h-[calc(100vh-200px)] pr-2 space-y-2 px-4'>
                                                {notifications?.notifications?.length>0 ?  notifications?.notifications?.map((item) => (
                                                <div
                                                    key={item?._id}
                                                    className={`flex items-start rounded-lg p-2 transition duration-150 ease-in-out  focus:outline-none focus-visible:ring focus-visible:ring-amber-500/50 ${!item?.isRead ? 'bg-gray-300' : ''} `}
                                                >
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-gray-200 rounded-lg text-2xl  sm:h-12 sm:w-12">
                                                        {item?.isRead ? reactIcons?.read : reactIcons?.unread}
                                                    </div>
                                                    <div className="ml-4 flex-grow">
                                                        <p className="text-sm font-medium text-gray-900">
                                                            {item?.message}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            {moment(item?.createdAt)?.fromNow()}
                                                        </p>
                                                    </div>
                                                    <div className='flex items-center gap-2'>
                                                        <button disabled={updateLoading} onClick={() => handleRead(item?._id)} className='w-[28px] h-[28px] bg-zinc-200 text-base text-blue-800 rounded-md flex-center'>
                                                            {item?.isRead?reactIcons.check :reactIcons?.dotFill}
                                                        </button>
                                                        <button disabled={updateLoading} onClick={() => handleDelete(item?._id)} className='w-[28px] h-[28px] bg-red-200 text-base text-red-800 rounded-md flex-center'>
                                                            {reactIcons.trash}
                                                        </button>
                                                    </div>
                                                    
                                                </div>
                                                )) : <RenderNoData icon={reactIcons.notification} title={'No notification found'}/>}

                                            </div>
                                            {notifications?.notifications?.length < notifications?.totalNotifications && <div className='flex-center px-4 py-2 border-t border-t-zinc-200'>   <button className='btn-primary btn-sm' onClick={handleLoadMore}>Load More</button></div>}
                                        </div>

                                    </div>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>
            </div>
        )
    )
}

export default NotificationPopper
