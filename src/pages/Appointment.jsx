import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets, doctors } from "./../assets/assets2";
import { AppContext } from "../context/AppContext";
import RealatedDoctors from "../components/RealatedDoctors";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const dayOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const [docInfo, setdocInfo] = useState(null);

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id == docId);
    setdocInfo(docInfo);
    console.log(docInfo);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  const [docSlots, setdocSlots] = useState([]);
  const [sloteIndex, setsloteIndex] = useState(0);
  const [slotTime, setslotTime] = useState("");

  const getAvailableSlotes = async () => {
    setdocSlots([]);

    //getting current dTE

    let today = new Date();
    for (let i = 0; i < 7; i++) {
      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      //  here  i am setting  end time of the data with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      //setting hpurs

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }
      let timeSlotes = [];
      while (currentDate < endTime) {
        let formatedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        //add slot to array
        timeSlotes.push({
          datatime: new Date(currentDate),
          time: formatedTime,
        });

        //Incrementcurrent time to 30 Min
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setdocSlots((prev) => [...prev, timeSlotes]);
    }
  };

  useEffect(() => {
    getAvailableSlotes();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);
  return (
    docInfo && (
      <div>
        {/* ---------------doctors details------------------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg "
              src={docInfo.image}
              alt=""
            />
          </div>

          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 ">
            {/* ----------doc info---- */}
            <p className="flex item-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex item-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 border px-2 text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>

            {/* ================ Doctors About============== */}
            <div>
              <p className="flex item-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text:smtext-gray-500 max-w-[700px] mt-1 ">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4 ">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>{" "}
            </p>
          </div>
        </div>
        {/* =========== BOOKING SLOTES =============== */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700 ">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4 ">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => setsloteIndex(index)}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    sloteIndex === index
                      ? "bg-primary text-white"
                      : "border border-gray-200"
                  }`}
                  key={index}
                >
                  <p>{item[0] && dayOfWeek[item[0].datatime.getDay()]} </p>
                  <p>{item[0] && [item[0].datatime.getDate()]} </p>
                </div>
              ))}
          </div>
          <div className="flex item-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots[sloteIndex].map((item, index) => (
                <p
                  onClick={() => setslotTime(item.time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    item.time === slotTime
                      ? "bg-primary text-white"
                      : " text-gray-400  border border-gray-300"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 ">
            Book an appointment
          </button>
        </div>
        {/* listing related doc */}
        <RealatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    )
  );
};

export default Appointment;
