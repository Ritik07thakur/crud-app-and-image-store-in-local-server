import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Forget() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    otp: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const correctOtp = "1234";

    if (formData.otp === correctOtp) {
      console.log("OTP matched");
      navigate("/confirm");
    } else {
      console.log("Error: OTP does not match");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Enter Your OTP
        </h2>

        <input
          id="otp"
          name="otp"
          type="text"
          value={formData.otp}
          onChange={handleChange}
          placeholder="1234"
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}
