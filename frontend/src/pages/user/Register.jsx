import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../../redux/feature/auth/authApi';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [registerUser, {isLoading}] = useRegisterUserMutation();
  const navigate = useNavigate()
   const handleRegister = async (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password
    }
    try {
      await registerUser(data).unwrap();
      alert("Registration successfully!");
      navigate("/login")
    } catch(error) {
      setMessage("Registration failed")
      // alert("Registration failed")
    }
    
  };

  return (
    <div className='max-w-sm bg-white mx-auto p-8 my-36'>
      <h2 className='text-2xl font-semibold pt-5'>Please Register</h2>
      <form onSubmit={handleRegister} className='space-y-5 max-w-sm mx-auto pt-8'>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
          required
          className='w-full bg-bgprimary focus:outline-none px-5 py-3'
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          required
          className='w-full bg-bgprimary focus:outline-none px-5 py-3'
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          required
          className='w-full bg-bgprimary focus:outline-none px-5 py-3'
        />
        {message && <p className='text-red-500'>{message}</p>}
        <button type="submit" className='w-full py-3 mt-5 bg-primary hover:bg-indigo-500 text-white font-medium rounded-md'>
          Register
        </button>
        <p className='my-5 text-center'>
          Already have an account? <Link className='text-red-700' to='/login'>Login</Link> here.
        </p>
      </form>
    </div>
  );
};

export default Register;
