import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay } from 'swiper';
import { reactIcons } from '../../utils/icons';
const HomeBannerSlider = ({ data }) => {
  return (
    <div className='pb-6'>
      <Swiper
        navigation={{
          prevEl: '.prev',
          nextEl: '.next',
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay]} className="mySwiper">
        {
          data?.images?.map((url) => {
            return (

              <SwiperSlide className='relative'>
                <img className='w-full md:h-[250px] h-[180px] lg:h-[280px] rounded-md max-h-[350px] object-cover' src={url} alt="" />
                <div className="text-center a-center z-[20] text-2xl md:text-6xl text-white font-semibold">
                  Big billion coming soon
                </div>
              </SwiperSlide>

            )
          })
        }
        <div className="prev w-8 h-8 cursor-pointer bg-black/10 flex-center rounded-full ay-center left-0 z-[45]">
          {reactIcons.arrowleft}
        </div>
        <div className="next w-8 h-8 cursor-pointer bg-black/10 flex-center rounded-full ay-center right-0 z-[45]">
          {reactIcons.arrowright}
        </div>

      </Swiper>
    </div>
  )
}

export default HomeBannerSlider