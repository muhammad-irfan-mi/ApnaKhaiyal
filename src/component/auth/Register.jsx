import React, { useState } from 'react';
import PasswordInput from './PasswordInput';

const role = [
  "LOCAL SERVICES",
  "TOWN OWNER",
  "PROPERTY AGENT",
  "MARKETING AGENCIES",
  "INDIVIDUAL ACCOUNT"
];

const Register = ({ onSubmit }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    roles: role[0], 
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = () => {
    if (form.password === form.confirmPassword) {
      const { confirmPassword, ...payload } = form;
      onSubmit(payload);
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="w-full md:w-1/2 p-4">
      <h2 className="font-bold text-xl mb-4">Register</h2>

      {/* Name input */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Name <span className="text-red-500">*</span></label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        {/* <small className="text-gray-500">Username cannot be changed.</small> */}
      </div>

      {/* Email input */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Email address <span className="text-red-500">*</span></label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Phone Number input */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Phone Number <span className="text-red-500">*</span></label>
        <input
          type="text"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Password inputs */}
      <PasswordInput
        label="Password"
        value={form.password}
        onChange={(value) => handleChange({ target: { name: 'password', value } })}
      />

      <PasswordInput
        label="Confirm Password"
        value={form.confirmPassword}
        onChange={(value) => handleChange({ target: { name: 'confirmPassword', value } })}
      />

      {/* Role select */}
      <label className="block font-medium mb-1">Select Role</label>
      <select
        className="w-full p-2 mb-4 border rounded"
        name="roles"
        value={form.roles}
        onChange={handleChange}
      >
        {role.map(role => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>

      {/* Privacy policy checkbox */}
      <div className="mb-4 text-sm">
        <input type="checkbox" className="mr-2" />
        Your personal data will be used to support your experience throughout this website...
        <a href="#" className="text-blue-600 underline ml-1">privacy policy</a>.
      </div>

      <button onClick={handleRegister} className="bg-blue-900 text-white px-4 py-2 rounded">
        Register
      </button>
    </div>
  );
};

export default Register;
