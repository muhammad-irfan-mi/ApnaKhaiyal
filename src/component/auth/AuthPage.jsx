import Login from '../auth/Login';
import Register from '../auth/Register';
import axios from 'axios';
import Banner from '../Banner/Banner';
import useAxios from '../../utils/useAxios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleLoginSubmit = async (data) => {
    try {
      setLoading(true);
      const [res, error] = await useAxios('POST', 'auth/login', null, data);

      if (res) {
        toast.success('Login successful!');
        localStorage.setItem("KhaiyalAuth", res.accessToken);
        setTimeout(() => {
          window.location.href = "/my-account/";
        }, 2000);
      } else {
        toast.error(error?.message || error?.error || 'Invalid credentials');
      }
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (data) => {
    try {
      setLoading(true);
      const [res, err] = await useAxios('POST', 'auth/signup', null, data);

      console.log('res', res)
      if (res) {
        localStorage.setItem("KhaiyalAuth", res.accessToken);
        toast.success('Registration successful!');
        setTimeout(() => {
          window.location.href = "/my-account/";
        }, 2000);
      } else {
        toast.error(err?.message || err?.error || 'Email ALready Exist');
      }
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Banner title="My Account" />
      <div className=" bg-gray-100 min-h-screen flex items-center justify-center px-4 lg:px-0">
        <div className="bg-white rounded p-6 flex flex-col lg:flex-row w-full max-w-7xl shadow-md mx-auto my-8">
          <Login onSubmit={handleLoginSubmit} />
          <Register onSubmit={handleRegister} />
        </div>
      </div>
    </>
  );
};

export default AuthPage;
