import { useState } from "react";
import { api } from "../services/api";
import Alert from "../components/Alert";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setAlert({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    if (!file) {
      setAlert({ type: "error", message: "Please upload a file." });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("file", file);

      const newRecord = await api.addRecord({
        name,
        email,
        file,
      });

      setAlert({ type: "success", message: "Record added successfully!" });
      setName("");
      setEmail("");
      setFile(null);
    } catch {
      setAlert({ type: "error", message: "Error adding record." });
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register a New Record</h2>
      {alert && <Alert type={alert.type} message={alert.message} />}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="file"
          accept="application/pdf"
          className="w-full p-2 border rounded"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
