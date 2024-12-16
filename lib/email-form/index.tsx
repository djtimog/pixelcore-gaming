"use client";
import { useState, FormEventHandler } from "react";

type EmailFormProps = {
  onEmailSubmit: (email: string) => void;
};

function EmailForm({ onEmailSubmit }: EmailFormProps) {
  const [email, setEmail] = useState<string>("");

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onEmailSubmit(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default EmailForm;
