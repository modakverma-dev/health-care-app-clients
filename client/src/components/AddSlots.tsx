import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function AddSlots({ data }: { data: any }) {
  const [startDate, setStartDate] = useState(null);
  const [selectedSlots, setSelectedSlots] = useState<any>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const updateMySlots = async () => {
    if (!selectedSlots.length || !startDate) {
      alert("Please select date and slots");
      return;
    }
    try {
      setLoading(true);
      let slotsData = [...slots];
      slotsData.filter((item) => selectedSlots.includes(item?.id));
      const res = await axios.post(
        "http://localhost:6000/appointment/update-slots",
        {
          date: "2024-06-14",
          slots: [],
        }
      );
      console.log(res, "res");
      if (res.status === 201) {
        alert(res?.data?.message);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const slots = [
    { id: 1, startTime: "09:00:00 AM", endTime: "10:00:00 AM" },
    { id: 2, startTime: "10:00:00 AM", endTime: "11:00:00 AM" },
    { id: 3, startTime: "11:00:00 AM", endTime: "12:00:00 AM" },
    { id: 4, startTime: "12:00:00 AM", endTime: "01:00:00 PM" },
    { id: 5, startTime: "01:00:00 PM", endTime: "02:00:00 PM" },
    { id: 6, startTime: "02:00:00 PM", endTime: "03:00:00 PM" },
    { id: 7, startTime: "03:00:00 PM", endTime: "04:00:00 PM" },
    { id: 8, startTime: "04:00:00 PM", endTime: "05:00:00 PM" },
    { id: 9, startTime: "05:00:00 PM", endTime: "06:00:00 PM" },
    { id: 10, startTime: "06:00:00 PM", endTime: "07:00:00 PM" },
    { id: 11, startTime: "07:00:00 PM", endTime: "08:00:00 PM" },
    { id: 12, startTime: "08:00:00 PM", endTime: "09:00:00 PM" },
    { id: 13, startTime: "09:00:00 PM", endTime: "10:00:00 PM" },
  ];
  const daysOfWeekNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <div className="w-full">
      <div className="border-l-2 border-slate-200 pl-5 ">
        <h1 className="text-2xl font-bold">Active Dates</h1>

        <div className="flex gap-4 flex-wrap mt-8">
          {data?.map((item: any, index: number) => {
            const dateObject = new Date(item?.date);
            return (
              <div
                onClick={() => setActiveIndex(index)}
                className={`p-3 rounded-2xl border-2 border-blue-500 text-white text-center flex flex-col gap-2 cursor-pointer ${
                  index === activeIndex ? `bg-blue-500` : "bg-blue-300"
                }`}
                key={item?.id}
              >
                {dateObject.getDate()}
                <h1>{daysOfWeekNames[dateObject.getDay()].slice(0, 3)}</h1>
                <h1>{dateObject.getFullYear()}</h1>
              </div>
            );
          })}
        </div>
        <div className="mt-5 mb-10">
          <h1 className="text-slate-500 text-lg">Active Slots</h1>
          <div className="flex flex-wrap">
            {data[activeIndex]?.slots?.map((item: any) => {
              return (
                <div
                  className="bg-slate-200/80 rounded-xl p-2 shadow-sm"
                  key={item?.id}
                >{`${item?.startTime}-${item?.endTime}`}</div>
              );
            })}
          </div>
        </div>
      </div>
      <h1 className="text-2xl font-bold">Add Slots</h1>
      <div className="w-full flex flex-col items-center gap-5 my-8 text-blue-500">
        <DatePicker
          className="w-full border border-blue-600 p-2 rounded-md shadow-lg"
          calendarClassName=" bg-white border border-gray-600 rounded-md shadow-sm cursor-pointer "
          dateFormat="yyyy/MM/dd"
          selected={startDate}
          placeholderText="Select Date"
          onChange={(date: any) => setStartDate(date)}
          filterDate={(date) => date.getDate() !== 6 && date.getDay() !== 0}
          minDate={new Date()}
        />

        {startDate && (
          <div className="w-full flex flex-wrap gap-5">
            {slots?.map((item, index) => (
              <div
                onClick={() => {
                  if (selectedSlots.includes(item?.id)) {
                    const newList = [...selectedSlots].filter(
                      (slot) => slot !== item.id
                    );
                    setSelectedSlots(newList);
                  } else {
                    setSelectedSlots((prev: any) => [...prev, item?.id]);
                  }
                }}
                className={`p-3 cursor-pointer rounded-lg border-2 border-blue-500 hover:bg-blue-300 hover:text-white transition ${
                  selectedSlots.includes(item?.id)
                    ? `bg-blue-500 text-white`
                    : ""
                }`}
                key={index}
              >{`${item?.startTime}-${item?.endTime}`}</div>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={updateMySlots}
        className="bg-[#407CE2] text-white px-5 py-3 rounded-2xl hover:bg-[#3767ba] transition mb-10 w-full cursor-pointer"
      >
        {loading ? "Updating.." : "Update Dates"}
      </button>
    </div>
  );
}

export default AddSlots;
