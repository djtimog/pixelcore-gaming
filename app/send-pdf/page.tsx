"use client";
import { useState, FormEventHandler } from "react";
import axios from "axios";

function EmailForm() {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:3000/send-pdf", { email });
      setMessage("PDF sent successfully!");
    } catch (error: any) {
      if (error.response?.status === 400) {
        setMessage("Invalid email address.");
      } else {
        setMessage("Failed to send PDF. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border rounded-md p-2 w-full md:py-3 md:px-4 md:text-lg"
      />
      <button
        type="submit"
        className={`md:py-4 md:px-5 p-2 text-white rounded-md ${loading ? "bg-gray-400" : "bg-[#14C570]"}`}
        disabled={loading}
      >
        {loading ? "Sending..." : "Submit"}
      </button>
      {message && <p className="text-center text-sm">{message}</p>}
    </form>
  );
}

export default EmailForm;
