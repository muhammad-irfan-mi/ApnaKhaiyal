import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const PasswordInput = ({ label, value, onChange }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute right-2 top-2 text-gray-500"
        >
          {visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
