import React from "react";
import Doctors from "./../pages/Doctors";
import { assets } from "../assets/assets2";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-primary rounded-1g px-6 md:px-10 1g:px-20">
      {/* {----------left side------------} */}
      <div className="md:w-1/2 flex flex-col item-start justify-center gap-4 py-10 m-auto md:py-[6vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight ">
          Book Appointment <br /> with Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row item-center gap-2 text-white text-sm font-light ">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted doctors,
            <br className="hidden sm:block" />
            schedule your appointment hassle-free.
          </p>
        </div>
        <a
          href="#/doctors/"
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-full text-gray-600 text-sm m-auto w-1/2 md:m-0 hover:scale-105 transition-all duration-300"
        >
          Book appointment{" "}
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* {----------right side------------} */}
      <div className="md:w-1/3 relative">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src={assets.header_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
