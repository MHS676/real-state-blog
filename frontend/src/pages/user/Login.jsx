import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../../redux/feature/auth/authApi';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/feature/auth/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');  // Fixed typo
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };
    
    try {
      const response = await loginUser(data).unwrap();
      console.log(response);
      const {token, user} = response;
      dispatch(setUser({user}))
      alert("Login Successful")
      navigate('/')
     
    } catch (error) {
      setMessage(error?.data?.message || "Please provide a valid email and password");
    }
  }

  return (
    <div className='max-w-sm bg-white mx-auto p-8 my-36' >
      <h2 className='text-2xl font-semibold pt-5'>Please Login</h2>
      <form onSubmit={handleLogin} className='space-y-5 max-w-sm mx-auto pt-8'>
        <input 
          type="email" 
          value={email} 
          placeholder='Email' 
          required 
          onChange={(e) => setEmail(e.target.value)}
          className='w-full bg-bgprimary focus:outline-none px-5 py-3'
        />
        <input 
          type="password" 
          value={password} 
          placeholder='Password' 
          required 
          onChange={(e) => setPassword(e.target.value)} 
          className='w-full bg-bgprimary focus:outline-none px-5 py-3'
        />
        {message && <p className='text-red-500'>{message}</p>}
        <button 
          disabled={loginLoading} 
          className='w-full mt-5 bg-primary hover:bg-indigo-500 text-white font-medium rounded-md py-3'>
          Login
        </button>
        <p className='my-5 text-center'>
          Dont have an account? <Link className='text-red-700' to='/register'>Register</Link> here.
        </p>
      </form>
    </div>
  );
}

export default Login;
