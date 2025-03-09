"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

interface FormData {
  name: string;
  contactNumber: string;
  email: string;
  budget: string;
}

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#008000b3] px-4">
      <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold color-primary text-center mb-6">
          Get in Touch
        </h2>

        {submitted ? (
          <p className="text-green-600 text-center text-lg font-semibold">
            ✅ Form submitted successfully!
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-2 border rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-[#38b000]"
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Contact Number
              </label>
              <input
                type="tel"
                {...register("contactNumber", {
                  required: "Contact number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Enter a valid 10-digit number",
                  },
                })}
                className="w-full px-4 py-2 border rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-[#38b000]"
                placeholder="Enter your contact number"
              />
              {errors.contactNumber && (
                <p className="text-red-500 text-sm">
                  {errors.contactNumber.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="w-full px-4 py-2 border rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-[#38b000]"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Budget</label>
              <select
                {...register("budget", {
                  required: "Budget selection is required",
                })}
                className="w-full px-4 py-2 border rounded-lg focus:border-none focus:outline-none focus:ring-2 focus:ring-[#38b000]"
              >
                <option value="">Select your budget</option>
                <option value="50000-1L">₹50,000 - ₹1 Lakh</option>
                <option value="1L-2L">₹1 Lakh - ₹2 Lakhs</option>
                <option value="2L-3L">₹2 Lakhs - ₹3 Lakhs</option>
                <option value="3L+">₹3 Lakhs+</option>
              </select>
              {errors.budget && (
                <p className="text-red-500 text-sm">{errors.budget.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bgcolor-primary text-white font-semibold py-2 rounded-lg hover:bg-[#005f6b] cursor-pointer transition duration-300"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
