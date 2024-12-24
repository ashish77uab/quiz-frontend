import React from 'react'
import MarketAdvanceChart from './components/MarketAdvanceChart'
import MarketSymbolChart from './components/MarketSymbolChart'
import MarketSingleSymbolChart from './components/MarketSingleSymbolChart'

const Markets = () => {
    return (
        <div>
            <div className='pb-4 border-b-dark'>

                <MarketAdvanceChart />
            </div>
            <div className="flex lg:flex-row flex-col lg:items-start gap-2 mt-4">
                <div className='flex-grow'>
                    <MarketSymbolChart />
                </div>
                <div className='lg:w-[400px]'>
                    <MarketSingleSymbolChart />
                </div>
            </div>
        </div>
    )
}

export default Markets