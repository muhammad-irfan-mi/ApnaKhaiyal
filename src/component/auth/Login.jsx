import React, { useState } from 'react';
import PasswordInput from './PasswordInput';

const Login = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    onSubmit({ email, password });
  };

  return (
    <div className="w-full md:w-1/2 p-4">
      <h2 className="font-bold text-xl mb-4">Login</h2>
      <label className="block font-medium mb-1">E-mail <span className="text-red-500">*</span></label>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      {/* Corrected this line below: */}
      <PasswordInput label="Password" value={password} onChange={setPassword} />

      <button onClick={handleLogin} className="bg-blue-900 text-white px-4 py-2 rounded">Login</button>
    </div>
  );
};

export default Login;
