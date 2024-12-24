import React from 'react'
import { STRATEGIES } from '../utils/constants'

const Strategy = () => {
    return (
        <div className='container py-4 pb-10'>
            <div className='max-w-5xl mx-auto'>
                <h3 className='heading-3 mb-2  md:mb-6'>Strategies</h3>
                <div className="space-y-2">
                    {STRATEGIES?.map((item) => {
                        return <div className='rounded-md p-4 bg-white shadow-num'>
                            <div>
                                <span>created: {item?.time}</span>
                                <span className='mx-2'>|</span>
                                <span>live deployment: {item?.count}</span>
                            </div>
                            <div className='py-4'>
                                <h4 className="heading-4">{item?.title}</h4>
                                <p className='text-muted text-sm mt-1'>{item?.description} <span className='text-sm mx-1 cursor-pointer text-primary-pink'>read more</span></p>
                            </div>
                            <div>
                                <span>by :</span>
                                <span className='text-primary-pink ml-2'>{item?.createdBy}</span>
                            </div>
                            <div className="flex items-center w-3/4 flex-wrap gap-2 my-4 ">
                                {item?.category?.map((cat) => {
                                    return <span className='badge font-medium bg-primary-pink text-white px-4 py-[6px] text-xs md:text-sm rounded-full'>{cat}</span>
                                })}
                            </div>
                            <div className=" grid grid-cols-2 md:flex md:items-center gap-y-4 py-4">
                                <div className='space-y-1 flex flex-col items-center text-center px-8 md:border-r border-r-zinc-200'>
                                    <div className='text-sm'>Trades/~Costs </div>
                                    <div className='font-semibold'>{item?.tradeCost}</div>

                                </div>
                                <div className='space-y-1 flex flex-col items-center text-center px-8 md:border-r border-r-zinc-200'>
                                    <div className='text-sm'>Drawdown </div>
                                    <div className='font-semibold'>{item?.drawDown}</div>

                                </div>
                                <div className='space-y-1 flex flex-col items-center text-center px-8 md:border-r border-r-zinc-200'>
                                    <div className='text-sm'>Min Capital </div>
                                    <div className='font-semibold'>{item?.minCapital}</div>

                                </div>
                                <div className='space-y-1 flex flex-col items-center text-center px-8'>
                                    <div className='text-sm'>Monthly Fee </div>
                                    <div className='font-semibold'>{item?.monthlyFee}</div>

                                </div>
                            </div>

                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Strategy