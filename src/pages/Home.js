import React from "react";
import { homeSection2Data, homeSection5Data, homeSection6Data, homeSection7Data, homeSection8Data } from "../utils/constants";
import { Link } from "react-router-dom";
import ContactUsForm from "./components/ContactUsForm";
import { useDispatch } from "react-redux";
import { setModalToggle } from "../redux/features/authSlice";
import TradingViewTickerTape from "./components/TradingViewTickerTape";
import TopStories from "./components/TopStories";

const Home = () => {
  const dispatch = useDispatch()
  const handleAuthToggle = (obj) => {
    dispatch(setModalToggle(obj))
  }
  const fileUrl = "/file/algo.txt"; // Replace with your file's URL
  const fileName = "algo.txt"; // Replace with the desired download file name

  const handleDownload = () => {
    // Create an anchor element and simulate a click
    const a = document.createElement('a');
    a.href = fileUrl;
    a.download = fileName; // This will suggest a filename for the download
    a.click();
  };
  return (
    <>
      <div>
        <TradingViewTickerTape />
      </div>
      <section className="">
        <div className="bg-white relative md:h-[calc(100dvh-162px)] header-wrapper max-h-[700px] ">
          <img className="absolute inset-0 w-full h-full" src="/images/bg-header.png" alt="bg-header" />
          <div className=" w-full   h-full">
            <video class="w-full bg-white h-full  object-contain" id="bannerVideo" autoPlay loop playsInline muted>
              <source src="https://files.tradetron.tech/tt-ad2.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="container ">
            {/* <div className="flex flex-col items-center gap-8">
            <h2 className="max-w-[1240px] heading-2 text-white font-bold"> India's First Algo trading platform
              with Auto Login feature</h2>
            <button className="btn-primary py-4"> Get Started Now</button>
          </div> */}
          </div>
        </div>
        <div className="py-6 pt-10 flex items-center gap-4 justify-center">
          <button onClick={() => handleAuthToggle({ key: 'isSignUpOpen', value: true })} className="btn-primary py-3">Open Free* Account - Lifetime free algo Trading</button>
        </div>
        <div className="py-20">
          <div className="container">
            <div className="lg:grid flex flex-col grid-cols-12  gap-10">
              <div className="col-span-5">
                <h3 className="heading-3 mb-8 lg:text-left text-center">
                  Simply Connect With
                  Powerful Algorithms</h3>
                <img className="w-full max-w-[300px] lg:mx-0 mx-auto lg:mt-0 mt-8 lg:max-w-[500px]" src="/images/s_block_image.png" alt="s_block_image" />

              </div>
              <div className="grid lg:grid-cols-2 col-span-7 gap-4">
                {
                  homeSection2Data?.map((item) => {

                    return <div>
                      <div className="flex flex-col items-start gap-4">
                        <img className="w-24 h-24" src={item.img} alt={item.img} />
                        <h3 className="text-xl font-semibold text-primary-dark">{item.title}</h3>
                        <p className="text-muted">{item.description}</p>
                      </div>
                    </div>
                  })
                }
                <div>
                  <button className="btn-primary py-3 mt-2" onClick={handleDownload}>
                    Download past data
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
        <div className="container py-16">
          <div className="flex lg:flex-row flex-col lg:items-start gap-10">
            <div className="bg-primary-pink flex-grow mx-auto px-4 py-10 rounded-xl">
              <img className="w-full h-full object-contain" src="/images/section3.png" alt="" />
            </div>
            <div className="lg:w-[600px]">
              <TopStories />
            </div>
          </div>
        </div>
        <div className="py-20  bg-pink-50/40">
          <div className="container">
            <header>
              <div className="container flex justify-center  mb-8  items-center">
                <h2 className="heading-3 font-semibold lg:text-left text-center">
                  How to start Algo trading</h2>
              </div>
            </header>
            <div className="grid lg:grid-cols-5 md:grid-cols-2 grid-cols-1  gap-8  lg:gap-4 ">
              {
                homeSection5Data?.map((item) => {

                  return <div className="flex flex-col items-start gap-4 card px-4 py-4 rounded-md bg-white flex-1">
                    <img className="w-16 h-16" src={item.img} alt={item.img} />
                    <h3 className="text-lg font-semibold text-primary-dark">{item.title}</h3>
                    <p className="text-muted text-sm">{item.description}</p>
                  </div>
                })
              }
            </div>
          </div>

        </div>
        {/* <div className="py-20  ">
          <div className="container">
            <header>
              <div className="container flex justify-center mb-10 lg:mb-16  items-center">
                <h2 className="heading-3 font-semibold lg:text-left text-center">
                  Charges and <span className="text-primary-pink">Benefits</span></h2>
              </div>
            </header>
            <div className=" grid grid-cols-1 lg:grid-cols-2 gap-10 place-items-center   ">
              <div>
                <div className="flex md:flex-row flex-col items-center gap-4 lg:gap-10">
                  <img className="max-w-[200px] object-contain" src="/images/user-mobile.jpeg" alt="charges" />
                  <div className="space-y-5 lg:text-start text-center">
                    <div>
                      <h6 className="lg:text-4xl text-2xl text-primary-pink font-bold">
                        0.02%
                      </h6>
                      <p className="text-lg font-medium text-primary-gray">Intraday and Futures <br /> (Equity and Commodity)</p>
                    </div>
                    <div>
                      <h6 className="lg:text-4xl text-2xl text-primary-pink font-bold">
                        ₹10 Per Order
                      </h6>
                      <p className="text-lg font-medium text-primary-gray">Options <br /> (Equity and Currency)</p>
                    </div>
                    <div>
                      <h6 className="lg:text-4xl text-2xl text-primary-pink font-bold">
                        0.10%
                      </h6>
                      <p className="text-lg font-medium text-primary-gray">Delivery</p>
                    </div>
                    <div>
                      <h6 className="lg:text-4xl text-2xl text-primary-pink font-bold">
                        0 Brokerage *
                      </h6>
                      <p className="text-lg font-medium text-primary-gray">for 1st month on F&O Trading <br />(up to Rs 1,000 )</p>
                    </div>
                  </div>
                </div>
                <div className="lg:mt-16 mt-10">
                  <h4 className="heading-4 mb-8 text-center">
                    Other Charges
                  </h4>
                  <div className="flex md:flex-row flex-col items-center md:items-start gap-8">
                    <div className="flex flex-col items-center text-center ">
                      <div>
                        <img className="w-[70px] object-contain" src="/images/add-user.png" alt="add" />
                      </div>
                      <div className="heading-5 mt-1 text-primary-pink font-bold">
                        FREE*
                      </div>
                      <p>Account Opening</p>
                    </div>
                    <div className="flex flex-col items-center text-center ">
                      <div>
                        <img className="w-[70px] object-contain" src="/images/free.png" alt="add" />
                      </div>
                      <div className="heading-5 mt-1 text-primary-pink font-bold">
                        FREE for 1st year
                      </div>
                      <p>AMC and Admin Charges</p>
                    </div>
                    <div className="flex flex-col items-center text-center ">
                      <div>
                        <img className="w-[70px] object-contain" src="/images/operator.png" alt="add" />
                      </div>
                      <div className="heading-5 mt-1 text-primary-pink font-bold">
                        FREE*
                      </div>
                      <p>Personal Advisor and Research</p>
                    </div>
                  </div>
                </div>

              </div>
              <div>
                <h4 className="heading-3 mb-10 text-center">
                  Free Account
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                  <div className="relative">
                    <img className="w-[270px] m-auto brightness-50" src="/images/sun.png" alt="" />
                    <div className="absolute text-white inset-0 w-full h-full flex justify-center flex-col items-center">
                      <b className="text-2xl md:text-4xl"> ₹ 0* AMC </b>
                      <span className="text-lg font-medium">for Liftime</span>
                    </div>
                  </div>
                  <div className="relative">
                    <img className="w-[270px] m-auto" src="/images/sun.png" alt="" />
                    <div className="absolute text-white inset-0 w-full h-full flex justify-center flex-col items-center">
                      <span className="text-lg font-medium">Trade in F&O</span>
                      <b className="text-2xl md:text-4xl"> ₹ 10 /Order </b>
                    </div>
                  </div>
                  <div className="relative">
                    <img className="w-[270px] m-auto" src="/images/sun.png" alt="" />
                    <div className="absolute text-white inset-0 w-full h-full flex justify-center flex-col items-center">
                      <b className="text-2xl md:text-4xl"> 1 Month </b>
                      <span className="text-lg font-medium">free Brokerage</span>
                    </div>
                  </div>
                  <div className="relative">
                    <img className="w-[270px] m-auto brightness-50" src="/images/sun.png" alt="" />
                    <div className="absolute text-white inset-0 w-full h-full flex justify-center flex-col items-center">
                      <span className="text-lg font-medium">Discount coupon of</span>
                      <b className="text-2xl md:text-4xl"> ₹ 3000 </b>
                    </div>
                  </div>

                </div>
              </div>


            </div>
          </div>

        </div> */}

        <div className="py-20  ">
          <div className="container">
            <header>
              <div className="mb-8 text-center">
                <h2 className="heading-3 font-semibold ">
                  Our core products for Traders</h2>
                <p className="text-muted max-w-3xl mx-auto text-center mt-2">An unique blend of opportunities to generate capital gains and get the best of both worlds Intraday and Positional trading</p>
              </div>
            </header>
            <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3  gap-4 ">
              {
                homeSection6Data?.map((item) => {

                  return <div className="flex flex-col items-center text-center gap-4 card px-4 py-4 rounded-md bg-white flex-1">
                    <div className="bg-primary-pink w-16 h-16 p-3 rounded-full flex-center ">
                      <img className=" w-full h-full object-contain invert" src={item.img} alt={item.img} />
                    </div>

                    <h3 className="text-2xl font-semibold text-primary-pink">{item.title}</h3>
                    <p className="text-muted text-sm">{item.description}</p>
                  </div>
                })
              }
            </div>
          </div>

        </div>
        <div className="py-16">
          <div className="container">
            <div className="lg:grid flex flex-col grid-cols-12 gap-16 lg:gap-10">
              <div className="col-span-5">
                <h2 className="heading-3 mb-8 lg:text-left text-center ">
                  A strategy for every type of trading</h2>
                <img className="w-full max-w-[500px]" src="/images/trading.png" alt="s_block_image" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 col-span-7 gap-8 lg:gap-4">
                {
                  homeSection7Data?.map((item) => {

                    return <div>
                      <div className="flex flex-col items-start gap-4">
                        <img className="w-24 h-24" src={item.img} alt={item.img} />
                        <h3 className="text-xl text-primary-pink font-semibold ">{item.title}</h3>
                        <p className="text-muted">{item.description}</p>
                      </div>
                    </div>
                  })
                }
              </div>

            </div>
          </div>

        </div>
        <div className="py-20  bg-pink-50/40">
          <div className="container">
            <header className="text-center mb-24 lg:mb-20">
              <div className="">
                <h3 className="heading-3">
                  Why Choose <span className="text-primary-pink">Algotrons</span> <br className="lg:block hidden" /> for best Algo Platform</h3>
              </div>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 gap-y-20 max-w-6xl mx-auto ">
              {
                homeSection8Data?.map((item) => {

                  return <div className="flex flex-col relative items-center text-center cursor-pointer gap-4 card  rounded-lg px-10 pb-10 lg:pt-28 pt-20 transition-all hover:shadow-sm duration-200 group bg-white flex-1 hover:bg-primary-pink hover:text-white">
                    <div className="lg:w-32 lg:h-32 w-28 h-28  absolute ax-center -rotate-45 top-[-60px] flex-center bg-primary-pink rounded-full group-hover:shadow-sm group-hover:ring-1 group-hover:ring-white">
                      <img className="w-[40px] h-[40px] object-contain rotate-45" src={item.img} alt={item.img} />
                    </div>
                    <h3 className="text-2xl font-semibold text-primary-dark group-hover:text-white">{item.title}</h3>
                    <p className="text-muted text-base group-hover:text-white">{item.description}</p>
                  </div>
                })
              }
              <div className="flex flex-col relative items-center text-center gap-4 card  rounded-lg px-10 py-10  bg-primary-pink flex-1">
                <img className="w-full" src='/images/s86.jpg' alt={'call-us'} />
                <Link to='/contact' className='px-6 py-2 border border-white rounded-md !text-white' >Contact Us</Link>

              </div>
            </div>
          </div>

        </div>
        <div className="py-10">
          <div className="container ">
            <div className="bg-primary-pink lg:px-10 px-4 py-10 rounded-xl">
              <div className="text-center py-4 md:py-10">
                <h2 className="heading-3 text-white">
                  Get a Call Back
                </h2>
                <p className="text-white opacity-80 font-medium">Fill out the below form and we will contact you ASAP</p>
              </div>
              <div className="flex justify-center items-center gap-4">
                <ContactUsForm />
              </div>

            </div>
          </div>
        </div>
      </section>

    </>
  );
};

export default Home;
