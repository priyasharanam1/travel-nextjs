"use client";

import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import "swiper/css";
import "swiper/css/navigation";

const destinations = [
  "Maldives",
  "Egypt",
  "Bali",
  "Dubai",
  "Japan",
  "Australia",
  "Thailand",
];

const durationOptions = [
  {
    days: "6-9 Days",
    img: "https://images.pickyourtrail.com/duration_option_1_0c9e8e2380.png?auto=format&fit=crop&w=256&q=75",
  },
  {
    days: "10-12 Days",
    img: "https://images.pickyourtrail.com/duration_option_2_66500bfd72.png?auto=format&fit=crop&w=256&q=75",
  },
  {
    days: "13-15 Days",
    img: "https://images.pickyourtrail.com/duration_option_3_ed7980d091.png?auto=format&fit=crop&w=256&q=75",
  },
  {
    days: "15-20 Days",
    img: "https://images.pickyourtrail.com/duration_option_4_d91110b9e1.png?auto=format&fit=crop&w=256&q=75",
  },
];

const travelOptions = [
  {
    type: "Couple",
    img: "https://oceanjar-new.s3.ap-south-1.amazonaws.com/travel_with_partner_de931cd6b8.png",
  },
  {
    type: "Family",
    img: "https://oceanjar-new.s3.ap-south-1.amazonaws.com/travel_with_family_730ac41742.png",
  },
  {
    type: "Friends",
    img: "https://oceanjar-new.s3.ap-south-1.amazonaws.com/travel_with_friends_23d8a637c3.png",
  },
  {
    type: "Solo",
    img: "https://oceanjar-new.s3.ap-south-1.amazonaws.com/travel_with_myself_8f0e425b26.png",
  },
];

export default function Customize() {
  const [step, setStep] = useState(1);
  const [selectedDestination, setSelectedDestination] = useState<string>("");
  const [filteredDestinations, setFilteredDestinations] = useState<string[]>(destinations);
  const [duration, setDuration] = useState<string>("");
  const [travelType, setTravelType] = useState<string>("");
  const [rooms, setRooms] = useState(1);
  const [roomConfig, setRoomConfig] = useState([{ adults: 2, children: 0 }]);

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePreviousStep = () => {
    if (step === 3) setDuration("");
    setStep((prev) => prev - 1);
  };

  const handleDestinationFilter = (value: string) => {
    setSelectedDestination(value);
    const filtered = destinations.filter((dest) =>
      dest.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDestinations(filtered);
  };

  const handleAddRoom = () => {
    setRoomConfig([...roomConfig, { adults: 2, children: 0 }]);
  };

  const handleRoomChange = (index: number, field: "adults" | "children", value: string) => {
    const updatedRooms = [...roomConfig];
    const parsedValue = parseInt(value, 10);
    updatedRooms[index][field] = isNaN(parsedValue) ? 0 : parsedValue;
    setRoomConfig(updatedRooms);
  };

  const handleTravelTypeSelection = (type: string) => {
    setTravelType(type);

    if (type === "Couple") {
      setRooms(1);
      setRoomConfig([{ adults: 2, children: 0 }]);
      handleNextStep();
    } else if (type === "Solo") {
      setRooms(1);
      setRoomConfig([{ adults: 1, children: 0 }]);
      handleNextStep();
    } else if (type === "Family" || type === "Friends") {
      setStep(3);
    }
  };

  return (
    <div className="min-h-screen p-6">
      {step > 1 && (
        <div className="w-[80%] h-[4px] rounded-lg mx-auto bg-gray-300 relative mt-18 mb-14">
          <div
            className="absolute top-0 left-0 h-full bgcolor-secondary transition-all"
            style={{ width: `${((step - 1) / 3) * 100}%` }}
          ></div>
        </div>
      )}

{step > 1 && (
  <div className="mt-4 mx-auto flex justify-center">
    <button
      onClick={handlePreviousStep}
      className="bg-gray-400 text-white py-2 px-8 rounded-md cursor-pointer hover:bg-gray-500 transition-all"
    >
      Back
    </button>
  </div>
)}

      {step === 1 && (
        <div className="text-center mt-24 mx-auto">
          <h1 className="text-2xl font-bold mb-8">
            What&apos;s <span className="color-light pacifico-regular text-4xl">your pick</span> for your
            next vacation?
          </h1>
          <div className="relative w-[95%] sm:w-[80%] mb-4 mx-auto bg-white shadow-lg rounded-md">
            <IoSearch className="absolute top-3 left-3 text-gray-400 text-3xl" />
            <input
              type="text"
              placeholder="Pick your destination"
              className="w-full pl-14 p-2 text-3xl text-gray-400 border-none rounded-md focus:outline-none"
              onChange={(e) => handleDestinationFilter(e.target.value)}
            />
          </div>
          <ul className="text-left w-[95%] sm:w-[80%] mx-auto">
            {filteredDestinations.map((destination) => (
              <li
                key={destination}
                className="p-4 text-xl rounded-lg font-semibold cursor-pointer hover:bg-[#38b000] hover:text-white"
                onClick={() => {
                  setSelectedDestination(destination);
                  handleNextStep();
                }}
              >
                {destination}
              </li>
            ))}
          </ul>
        </div>
      )}

      {step === 2 && (
        <div className="text-center mt-4">
          <h2 className="text-2xl font-semibold m-2 mb-6">
            What&apos;s the duration of your holiday?
          </h2>
          <div className="mx-10 grid grid-cols-1 sm:grid-cols-4 gap-6">
            {durationOptions.map(({ days, img }) => (
              <div
                key={days}
                className="px-4 py-16 border-1 border-[#008000] font-semibold rounded-lg bg-white shadow-lg shadow-[#008000]/20 cursor-pointer hover:ring-2 hover:ring-[#008000] hover:bg-[#0080001a] flex flex-col justify-center items-center transform transition-transform duration-300 hover:-translate-y-2"
                onClick={() => {
                  setDuration(days);
                  handleNextStep();
                }}
              >
                <img
                  src={img}
                  alt={days}
                  className="w-24 h-24 rounded-full mb-4"
                />
                {days}
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center mt-4">
          <h2 className="text-2xl font-semibold m-2 mb-6">
            Who is travelling with you?
          </h2>
          <div className="mx-10 grid grid-cols-1 sm:grid-cols-4 gap-6">
            {travelOptions.map(({ type, img }) => (
              <div
                key={type}
                className="px-4 py-16 border-1 border-[#008000] font-semibold rounded-lg bg-white shadow-lg shadow-[#008000]/20 cursor-pointer hover:ring-2 hover:ring-[#008000] hover:bg-[#0080001a] flex flex-col justify-center items-center transform transition-transform duration-300 hover:-translate-y-2"
                onClick={() => handleTravelTypeSelection(type)}
              >
                <img
                  src={img}
                  alt={type}
                  className="w-24 h-24 rounded-full mb-4"
                />
                {type}
              </div>
            ))}
          </div>
        </div>
      )}

      {(travelType === "Family" || travelType === "Friends") && step === 3 && (
        <div className="text-center mt-8">
          <h2 className="text-2xl font-semibold m-4">
            How to configure your rooms?
          </h2>
          {roomConfig.map((room, index) => (
            <div key={index} className="mb-4 p-4 w-[360px] mx-auto rounded-lg shadow-md">
              <p className="font-semibold text-lg mb-4">Room {index + 1}</p>
              <div className="flex items-center justify-center gap-4">
                <label className="flex items-center gap-2">
                  Adults:
                  <input
                    type="number"
                    value={room.adults}
                    min="1"
                    onChange={(e) =>
                      handleRoomChange(index, "adults", e.target.value)
                    }
                    className="w-16 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00798c]"
                  />
                </label>
                <label className="flex items-center gap-2">
                  Children:
                  <input
                    type="number"
                    value={room.children}
                    min="0"
                    onChange={(e) =>
                      handleRoomChange(index, "children", e.target.value)
                    }
                    className="w-16 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00798c]"
                  />
                </label>
              </div>
            </div>
          ))}

          <div className="mt-6">
            <button
              onClick={handleAddRoom}
              className="ring-2 ring-[#008000] hover:bg-[#9ef01a66] color-primary py-2 px-4 rounded-md cursor-pointer transition-all"
            >
              Add New Room
            </button>
            <button
              onClick={handleNextStep}
              className="bg-[#008000] text-white py-2 px-4 rounded-md ml-4 hover:bg-[#008000cc] cursor-pointer transition-all"
            >
              Confirm Changes
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold color-primary mb-6">
            🎉 Congratulations!
          </h1>
          <div className="space-y-4 text-gray-700">
            <p className="text-lg">
              Your vacation to{" "}
              <span className="font-semibold text-black">{selectedDestination}</span>{" "}
              for <span className="font-semibold text-black">{duration}</span> is
              confirmed.
            </p>
            <p className="text-lg">
              Traveler Type:{" "}
              <span className="font-semibold text-black">{travelType}</span>
            </p>
            <p className="text-lg">
              Rooms: <span className="font-semibold text-black">{rooms}</span>
            </p>
            <div className="mt-6">
              <p className="text-lg font-medium color-secondary">
                Room Configuration:
              </p>
              <ul className="space-y-2">
                {roomConfig.map((room, index) => (
                  <li key={index} className="text-gray-700">
                    Room {index + 1}:{" "}
                    <span className="font-semibold text-black">{room.adults} Adults</span>,{" "}
                    <span className="font-semibold text-black">{room.children} Children</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}