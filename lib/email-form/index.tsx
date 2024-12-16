"use client";
import { useState, FormEventHandler } from "react";
import axios from "axios";

type EmailFormProps = {
  onEmailSubmit: (email: string) => void;
};

function EmailForm() {
  const [email, setEmail] = useState<string>("");
  const [message , setMessage] = useState("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try{
        const response = await axios.post("http://localhost:3000/send-pdf", { email });
        setMessage("PDF sent successfully!");
    } catch(error){
        setMessage("Failed to send PDF")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mr-4 p-2 md:py-3 md:px-4 md:text-lg"
      />
      <button type="submit" className="md:py-4 md:px-5 p-2 bg-[#14C570] text-white">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default EmailForm;
