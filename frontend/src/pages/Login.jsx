import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const { backendUrl, token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }

  }


  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token])


  return (
    <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>

        <p className='text-2xl font-semibold text-emerald-500'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
        <p>Please {state === 'Sign Up' ? "sign up" : "login"} to book appointment.</p>

        {
          state === 'Sign Up'
          &&
          <div className='w-full'>
            <p className='text-emerald-500 font-semibold'>Full Name</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e) => setName(e.target.value)} value={name} required />
          </div>
        }

        <div className='w-full'>
          <p className='text-emerald-500 font-semibold'>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
        </div>

        <div className='w-full'>
          <p className='text-emerald-500 font-semibold'>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
        </div>

        <button type='submit' className='bg-emerald-500 text-white w-full py-2 rounded-md text-base cursor-pointer hover:bg-emerald-600 transition-colors duration-300 font-semibold'>
          {state === 'Sign Up' ? "Create Account" : "Login"}
        </button>

        {
          state === 'Sign Up'
            ? <p>Already have an account? <span className='text-emerald-500 underline cursor-pointer' onClick={() => setState('Login')}>Login here</span></p>
            : <p>Create a new account? <span className='text-emerald-500 underline cursor-pointer' onClick={() => setState('Sign Up')}>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login