import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    employeeId: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    department: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const isNumeric = (v) => /^\d+$/.test(v);
    const isImageUrl = (v) => /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(v);

    if (!form.fullName || form.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters.";
    }
    if (!form.email || !isValidEmail(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.phone || !isNumeric(form.phone)) {
      newErrors.phone = "Phone must contain only numbers.";
    }
    if (!form.image || !isImageUrl(form.image)) {
      newErrors.image = "Provide an online image URL (jpg, jpeg, png, gif).";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const res = await fetch("http://localhost:9000/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("student Inserted Successfully");
      navigate("/home");
    } else {
      alert("Error inserting student");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-300 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg animate-fadeSlide"
      >
        <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Insert Employee Details
        </h1>
        {[
          "employeeId",
          "fullName",
          "email",
          "phone",
          "address",
          "department",
        ].map((field) => (
          <div key={field} className="mb-4">
            <label className="block font-semibold capitalize">{field}</label>
            <input
              name={field}
              value={form[field]}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-purple-500 transition"
              placeholder={`Enter ${field}`}
            />
            {errors[field] && (
              <p className="text-sm text-red-600 mt-1">{errors[field]}</p>
            )}
          </div>
        ))}

         <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-purple-700 text-white px-5 py-2 rounded-xl hover:bg-purple-800 transition shadow-md"
          >
            Insert
          </button>
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="bg-gray-500 text-white px-5 py-2 rounded-xl hover:bg-gray-600 transition shadow-md"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default About;
