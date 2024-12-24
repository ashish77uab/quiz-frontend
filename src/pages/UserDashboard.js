import React, { useEffect, useState } from "react";

import ToastMsg from "../components/toast/ToastMsg";
import { toast } from "react-toastify";
import axios from "axios";
import WishlistData from "./components/WishlistData";
const MARKET = {
  '0': 'NIFTY 50',
  '1': 'NIFTY Bank',
  '2': 'Sensex',
  '3': 'Finance Nifty',

}

const POLLING_INTERVAL = 1000; // 1 second
const INDICES = ['in%3BNSX', 'in%3Bnbx', 'in%3BSEN', 'in%3Bcnxf']
const WISHINDICES = ['AE01', 'TI01', 'BF04', 'TEL', 'AHE']
const CATEGORY = {
  0: "NIFTY METAL",
  1: "NIFTY 50",
  2: "NIFTY 50",
  3: "NIFTY AUTO",
  4: "NIFTY 50",
}
const UserDashboard = () => {

  const [fetchLoading, setFetchLoading] = useState(false)
  const [marketData, setMarketData] = useState([])
  const [wishlistData, setWishlistData] = useState([])


  const getWatchlistData = async (index) => {
    setFetchLoading(true)
    try {
      const res = await axios.get(`https://priceapi.moneycontrol.com/pricefeed/nse/equitycash/${index}`);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        return data
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
      setFetchLoading(false)
    }
  };
  const getMarketData = async (index) => {
    setFetchLoading(true)
    try {
      const res = await axios.get(`https://priceapi.moneycontrol.com/pricefeed/notapplicable/inidicesindia/${index}`);
      const { status, data } = res;
      if (status >= 200 && status <= 300) {
        return data
      } else {
        toast.error(<ToastMsg title={data.message} />);
      }
    } catch (error) {
      toast.error(<ToastMsg title={error?.response?.data?.message} />);
    } finally {
      setFetchLoading(false)
    }
  };




  useEffect(() => {
    let intervalId;

    const fetchMarketData = async () => {
      setFetchLoading(true);
      try {
        const dataPromises = INDICES.map((index) => getMarketData(index));
        const results = await Promise.all(dataPromises);
        const validData = results.filter((result) => result !== null);
        setMarketData(validData);
      } finally {
        setFetchLoading(false);
      }
    };
    const fetchWishlistData = async () => {
      setFetchLoading(true);
      try {
        const dataPromises = WISHINDICES.map((index) => getWatchlistData(index));
        const results = await Promise.all(dataPromises);
        const validData = results.filter((result) => result !== null);
        setWishlistData(validData);
      } finally {
        setFetchLoading(false);
      }
    };

    // Start polling
    const startPolling = () => {
      fetchMarketData(); // Initial fetch
      fetchWishlistData()
      intervalId = setInterval(() => {
        fetchMarketData()
        fetchWishlistData()

      },
        POLLING_INTERVAL);

    };

    startPolling();

    // Cleanup on component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="">
      <section className="">
        <div className="lg:flex items-start grid lg:grid-cols-4 grid-cols-2 gap-4 lg:gap-10 p-4 border-dark rounded-md">
          {
            marketData?.map((item, index) => {
              const isNegative = (Number(item?.data?.pricecurrent) - Number(item?.data?.priceprevclose)) < 0
              return (
                <div className="">
                  <h6 className="lg:text-base text-sm  font-semibold text-white">{MARKET[index]}</h6>
                  <div className="flex items-center gap-1 py-2">
                    <span className=" font-semibold text-xs lg:text-sm opacity-70">{item?.data?.pricecurrent}</span>
                    <div className={` text-xs lg:text-sm font-medium ${isNegative ? 'text-red-600' : 'text-[#1ab156]'}`}><span>{Number(item?.data?.pricechange)?.toFixed(2)}</span> <span className="ml-1">({Number(item?.data?.pricepercentchange)?.toFixed(2)}%)</span></div>
                  </div>
                </div>
              )
            })
          }


        </div>
        {/* <div className="lg:mt-4 mt-4">
          <header className="mb-4">
            <h4 className="heading-4">My Watchlist</h4>
          </header>
        </div> */}
        <div className="flex lg:flex-row flex-col lg:items-start gap-1 mt-1">
          <div className="lg:max-w-md w-full space-y-2 min-h-[700px]">
            <WishlistData />
          </div>
          <div className="flex-grow">
            <iframe title="markets" className="w-full min-h-[300px] lg:min-h-[700px] md:min-h-[450px] rounded-sm overflow-hidden" src=" https://www.tradingview-widget.com/embed-widget/advanced-chart/?locale=en#%7B%22width%22%3A980%2C%22height%22%3A550%2C%22symbol%22%3A%22INDEX%3ASENSEX%22%2C%22interval%22%3A%22D%22%2C%22timezone%22%3A%22exchange%22%2C%22theme%22%3A%22dark%22%2C%22style%22%3A%221%22%2C%22allow_symbol_change%22%3Atrue%2C%22calendar%22%3Afalse%2C%22studies%22%3A%5B%22STD%3BMACD%22%5D%2C%22show_popup_button%22%3Atrue%2C%22popup_width%22%3A%221000%22%2C%22popup_height%22%3A%22550%22%2C%22support_host%22%3A%22https%3A%2F%2Fwww.tradingview.com%22%2C%22utm_source%22%3A%22staralgosecurities.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22advanced-chart%22%2C%22page-uri%22%3A%22staralgosecurities.com%2Fuser%2Fdashboard.php%22%7D" frameborder="0"></iframe>
          </div>


        </div>
      </section>

    </div>
  );
};

export default UserDashboard
