"use client";

// import React, { useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import { db } from "@/config/db";
// import { usersTable } from "@/config/schema";
// import { useRouter } from "next/navigation";

export default function PlayerSignup() {
//   const { user } = useUser();
//   const router = useRouter();
//   const [formData, setFormData] = useState({
//     phoneNumber: "",
//     subscription: "",
//   });
//   const [error, setError] = useState("");

//   // Handle form changes
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.phoneNumber || !formData.subscription) {
//       setError("Please fill out all required fields.");
//       return;
//     }

//     try {
//       const email = user?.primaryEmailAddress?.emailAddress;

//       if (!email) {
//         setError("Email is required. Please log in.");
//         return;
//       }

//       // Insert user data into the Neon database
//       await db.insert(usersTable).values({
//         email: email,
//         phoneNumber: formData.phoneNumber,
//         subscription: formData.subscription,
//       });

//       // Redirect to the homepage or another page
//       router.push("/schedule");
//     } catch (err) {
//       console.error("Error creating user:", err);
//       setError("Something went wrong. Please try again.");
//     }
//   };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Player Signup</h1>
      {/* <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium">
            Phone Number
          </label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div>
          <label htmlFor="subscription" className="block text-sm font-medium">
            Subscription Type
          </label>
          <select
            id="subscription"
            name="subscription"
            value={formData.subscription}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Subscription</option>
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form> */}
    </div>
  );
}
