"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { IoSearch } from "react-icons/io5";
import "swiper/css";
import "swiper/css/navigation";

interface Banner {
  img: string;
  alt: string;
}

interface Destination {
  img: string;
  title: string;
  handle: string;
}

export default function Home() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannersRes, destinationsRes] = await Promise.all([
          axios.get("https://json-data-1wm2.onrender.com/banners"),
          axios.get("https://json-data-1wm2.onrender.com/featured-destination"),
        ]);

        setBanners(bannersRes.data.banners);
        setDestinations(destinationsRes.data.destination);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="relative w-full h-[480px]">
        <Swiper
          loop={true}
          autoplay={{ delay: 2000 }}
          modules={[Autoplay, Navigation]}
          className="relative"
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <img
                src={banner.img}
                alt={banner.alt}
                className="w-full h-[460px] object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 bg-white z-10 rounded-full shadow-lg p-4 flex items-center justify-between cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/customize")}
        >
          <button className="text-gray-700 text-lg font-md px-4">Search</button>
          <IoSearch className="text-gray-500 text-3xl font-bold" />
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto py-10">
        <h2 className="text-3xl font-bold text-center mb-6">
          Popular Destinations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <motion.div
              key={destination.handle}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={destination.img}
                alt={destination.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center flex justify-around">
                <h3 className="text-xl font-semibold">{destination.title}</h3>
                <Link
                  href={`/destination/${destination.handle}`}
                  className="px-4 py-2 bg-[#00798c] text-white rounded-md hover:bg-[#00798ccc] cursor-pointer transition"
                >
                  Explore
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
