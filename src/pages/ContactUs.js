import React from "react";
import BreadCrumb from "./components/BreadCrumb";
import { reactIcons } from "../utils/icons";
import ContactUsForm2 from "./components/ContactUsForm2";

const ContactUs = () => {
  return (
    <section className="">
      <div className="bg-primary-pink relative header-wrapper ">
        <img className="absolute inset-0 w-full h-full" src="/images/bg-header.png" alt="bg-header" />
        <div className="container header-container-wrapper">
          <div className="flex flex-col items-center gap-8">
            <h2 className="max-w-[1240px] heading-2 text-white font-bold"> Contact Us</h2>
            <BreadCrumb path={'/about'} title={'Contact Us'} />
          </div>
        </div>
      </div>
      <section className="md:py-20 py-10 bg-pink-50">
        <div className="container ">
          <div className="max-w-[1300px] mx-auto w-full grid grid-cols-1 lg:grid-cols-6  gap-10 ">
            <div className="col-span-3">
              <div className="py-10">
                <h3 className="heading-3">Contact Information</h3>
                <p className="mt-2 text-muted">Fill up the form and our team will get back to you within 24 hours.</p>
                <ul className="mt-8 space-y-8">
                  <li className='flex items-start gap-4'>
                    <span className='text-3xl text-primary-pink'>{reactIcons.mobile}</span>
                    <span className="text-lg font-medium">044 2450 0009</span>
                  </li>
                  {/* <li className='flex items-start gap-4'>
                    <span className='text-3xl text-primary-pink'>{reactIcons.whatsapp}</span>
                    <span className="text-lg font-medium">9193868729</span>
                  </li> */}
                  <li className='flex items-start gap-4'>
                    <span className='text-3xl text-primary-pink' >{reactIcons.location}</span>
                    <span className="text-lg font-medium">
                      Vaishnavi Tech Park,
                      3rd & 4th Floor, Sarjpur Main Road
                      Bellandur, Bengaluru - 560103</span>
                  </li>
                  <li className='flex items-start gap-4'>
                    <span className='text-3xl text-primary-pink' >{reactIcons.email}</span>
                    <span className="text-lg font-medium text-primary-pink">algotronssupport@algotorns.com</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-span-3">
              <div className="bg-white shadow-card px-4 md:px-10 py-6  md:py-10 rounded-md">
                <h3 className="heading-3">Get In touch</h3>
                <p className="mt-2 text-muted">We are here for you. How we can help?</p>
                <div className="my-4">
                  <ContactUsForm2 />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </section>
  );
};

export default ContactUs;
