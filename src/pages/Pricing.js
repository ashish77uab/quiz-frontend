import React, { useEffect, useRef } from "react";
import { pricingFeatures, pricingFeaturesList } from "../utils/constants";
import { numberWithCommas } from "../utils/helpers";
import BreadCrumb from "./components/BreadCrumb";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);
const Pricing = () => {
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    const container = containerRef.current;
    container.isDown = true;
    container.startX = e.pageX - container.offsetLeft;
    container.scrollLeft = container.scrollLeft;
    container.classList.add("active");
    container.classList.remove("smooth-scroll");
  };

  const handleMouseLeave = () => {
    const container = containerRef.current;
    container.isDown = false;
    container.classList.remove("active");
    container.classList.add("smooth-scroll");
  };

  const handleMouseUp = () => {
    const container = containerRef.current;
    container.isDown = false;
    container.classList.remove("active");
    container.classList.add("smooth-scroll");
  };

  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container.isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - container.startX) * 2; // Adjust the scroll speed
    container.scrollLeft = container.scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    const container = containerRef.current;
    container.isDown = true;
    container.startX = e.touches[0].pageX - container.offsetLeft;
    container.scrollLeft = container.scrollLeft;
    container.classList.remove("smooth-scroll");
  };

  const handleTouchMove = (e) => {
    const container = containerRef.current;
    if (!container.isDown) return;
    const x = e.touches[0].pageX - container.offsetLeft;
    const walk = (x - container.startX) * 2; // Adjust the scroll speed
    container.scrollLeft = container.scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    const container = containerRef.current;
    container.isDown = false;
    container.classList.add("smooth-scroll");
  };

  return (
    <section className="">
      <div className="bg-primary-pink relative header-wrapper ">
        <img className="absolute inset-0 w-full h-full" src="/images/bg-header.png" alt="bg-header" />
        <div className="container header-container-wrapper">
          <div className="flex flex-col items-center gap-8">
            <h2 className="max-w-[1240px] heading-2 text-white font-bold"> Pricing Plans for every level of Ambition</h2>
            <p className="text-primary-white font-medium">“Setting a goal is not the main thing. It is deciding how you will go about achieving it and staying with that plan.”</p>
            <BreadCrumb path={'/pricing'} title={'Pricing'} />


          </div>
        </div>
      </div>

      <div className="container py-16">
        <h4 className="heading-4 mb-4">
          Choose one of our plans:
        </h4>
        <div className="flex lg:flex-row flex-col lg:items-center gap-4">
          <p >Type of subscription plans</p>
          <div className="flex items-center gap-2 lg:gap-4">{
            ['Monthly']?.map((item) => (
              <div className="border border-primary-gray px-3 lg:px-4 py-2 rounded-md  flex items-center gap-4 cursor-pointer">
                <input type="radio" checked={true} id={item} name="subscription" className="text-primary-pink cursor-pointer" />
                <label className="cursor-pointer lg:text-base text-sm" htmlFor={item}>{item}</label>
              </div>
            ))

          }

          </div>
        </div>
        <div
          ref={containerRef}
          className="flex gap-1 my-10 overflow-x-auto w-full py-4 cursor-grab"
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="px-6 rounded-md shaodw-price py-8 bg-white max-w-[250px] w-full flex-shrink-0">
            <h6 className="font-semibold text-base">Features / Plans</h6>
            <h4 className="text-3xl font-bold">Price</h4>
            <ul className="my-4">
              {
                pricingFeatures?.map((feature) => (
                  <li className="py-4 border-b text-sm border-b-zinc-100 last:border-none">
                    {feature}
                  </li>
                ))
              }
            </ul>
          </div>
          {
            pricingFeaturesList?.map((item) => (
              <div className="px-6 w-[250px]  rounded-md shaodw-price py-8 bg-white max-w-xs text-center relative pb-10 flex-shrink-0">
                <div className="flex-1">
                  <h6 className="font-semibold text-base">{item?.title}</h6>
                  <h4 className="text-3xl font-bold">Rs. {numberWithCommas(item?.price)}</h4>
                  <ul className="my-4">
                    {
                      item?.list?.map((feature) => (
                        <li className="py-4 border-b text-sm border-b-zinc-100 last:border-none">
                          {feature?.type === 'string' ? <span>{feature?.value}</span> : <div className={`flex text-3xl justify-center ${feature?.isCheck ? 'text-green-600' : 'text-red-500'}`}><span>{feature.value}</span></div>}
                        </li>
                      ))
                    }

                  </ul>
                </div>
                <div className="ax-center w-full bottom-4">
                  <button className="btn-primary btn-sm ">Choose Plan</button>
                </div>



              </div>
            ))
          }


        </div>
      </div>


    </section>
  );
};

export default Pricing;
