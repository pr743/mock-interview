import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Sever() {
  const { id } = useParams();

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

  useEffect(() => {
    const loadData = async () => {
      const res = await fetch(`http://localhost:9000/employees/${id}`);

      const data = await res.json();
      setForm(data);
    };

    loadData();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const isNumeric = (v) => /^\d+$/.test(v);

    if (!form.fullName || form.fullName.trim().length < 3) {
      newErrors.fullName = "Name must be at least 3 characters.";
    }
    if (!form.email || !isValidEmail(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.phone || !isNumeric(form.phone)) {
      newErrors.phone = "Phone must contain only numbers.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const res = await fetch(`http://localhost:9000/employees/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("student Update Successfully");
      navigate("/home");
    } else {
      alert("Error updating  student");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-rose-500 p-6">
      <form
        onSubmit={handleUpdate}
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg animate-fadeSlide"
      >
        <h1 className="text-4xl font-bold text-center mb-6 bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent text-shadow-amber-700">
          Update Employee Details
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
            <label className="block font-semibold capitalize mb-1">
              {field}
            </label>

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
            Update
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

export default Sever;
