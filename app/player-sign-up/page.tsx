'use client'
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

const PlayerSignup = () => {
  const { user } = useUser();
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    phone_number: "",
    discord_handle: "",
    imageUrl: "",
    subscription: false,
    verified: false,
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/player-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          email: user?.emailAddresses[0].emailAddress, // Clerk email
          user_name: user?.username || user?.firstName, // Clerk username
        }),
      });

      if (response.ok) {
        alert("Signup successful!");
        router.push("/dashboard"); // Redirect to a dashboard or home page
      } else {
        alert("Failed to submit form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Player Signup</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="discord_handle"
          placeholder="Discord Handle (e.g., user#1234)"
          value={formData.discord_handle}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="imageUrl"
          placeholder="Profile Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <div className="flex items-center space-x-2">
          <label htmlFor="subscription" className="text-sm">
            Subscription
          </label>
          <Input
            type="checkbox"
            name="subscription"
            id="subscription"
            checked={formData.subscription}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="verified" className="text-sm">
            Verified
          </label>
          <Input
            type="checkbox"
            name="verified"
            id="verified"
            checked={formData.verified}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PlayerSignup;
