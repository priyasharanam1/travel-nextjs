"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { IoChatbox } from "react-icons/io5";
import axios from "axios";

interface TripDetails {
  tripName: string;
  price: number;
  duration: string;
  amenities: string[];
}

interface TripData {
  "trip-name": string;
  price: number;
  duration: string;
  amenities: string[];
}

interface Destination {
  img: string;
  title: string;
  handle: string;
}

export default function DestinationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const [destination, setDestination] = useState<Destination | null>(null);
  const [tripDetails, setTripDetails] = useState<TripDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinationData = async () => {
      try {
        const res = await axios.get(
          "https://json-data-1wm2.onrender.com/featured-destination"
        );
        const matchedDestination = res.data.destination.find(
          (d: Destination) => d.handle === slug
        );
        setDestination(matchedDestination || null);
      } catch (error) {
        console.error("Error fetching destination data:", error);
      }
    };

    const fetchTripDetails = async () => {
      try {
        const res = await axios.get(
          `https://json-data-1wm2.onrender.com/destination/${slug}`
        );

        if (res.data && res.data.trips) {
          const formattedTrips = res.data.trips
            .filter((trip: TripData) => trip && trip["trip-name"])
            .map((trip: TripData) => ({
              tripName: trip["trip-name"],
              price: trip.price,
              duration: trip.duration,
              amenities: trip.amenities || [],
            }));

          setTripDetails(formattedTrips);
        } else {
          setTripDetails([]);
        }
      } catch (error) {
        console.error("Error fetching trip details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinationData();
    fetchTripDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-[#008000] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {destination && (
        <div className="relative w-full h-[480px]">
          <img
            src={destination.img}
            alt={destination.title}
            className="w-full h-full object-cover"
          />
          <h1 className="absolute inset-0 flex items-center justify-center text-6xl text-white lato-extrabold text-center uppercase tracking-wide drop-shadow-lg">
            {destination.title}
          </h1>
        </div>
      )}

      <div className="mt-6 px-4">
        <h1 className="text-3xl font-bold p-2 text-center md:text-left">
          Trips Available
        </h1>
        {tripDetails.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
            {tripDetails.map((trip, index) => (
              <div
                key={index}
                className="bg-white p-6 shadow-lg rounded-xl transition transform hover:scale-105 hover:shadow-xl"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {trip.tripName}
                </h2>
                <p className="text-lg text-gray-500 mb-2">
                  Duration: {trip.duration}
                </p>
                <p className="text-xl font-semibold color-secondary mb-3">
                  Price: ${trip.price}
                </p>
                <ul className="list-disc pl-5 text-gray-700">
                  {trip.amenities.map((amenity: string, i: number) => (
                    <li key={i} className="text-gray-600">
                      {amenity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            No trips available.
          </p>
        )}
      </div>

      <Link href="/get-in-touch">
        <button className="fixed bottom-6 right-6 w-14 h-14 bgcolor-secondary text-3xl text-white font-semibold rounded-full shadow-2xl hover:bg-[#00798ccc] transition duration-300 flex items-center justify-center cursor-pointer">
          <IoChatbox />
        </button>
      </Link>
    </div>
  );
}
