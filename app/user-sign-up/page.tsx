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
    <section className="h-full w-full">
ys
    </section>
  );
}
