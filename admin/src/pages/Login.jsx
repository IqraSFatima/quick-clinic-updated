import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'


const Login = () => {
    const [state, setState] = useState('Doctor');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setAToken, backendUrl } = useContext(AdminContext);
    const { setDToken } = useContext(DoctorContext);
    
    const navigate = useNavigate();

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password });
                if (data.success) {
                    localStorage.setItem('aToken', data.token);
                    setAToken(data.token);
                    navigate('/admin-dashboard')
                } else {
                    toast.error(data.message);
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password });
                if (data.success) {
                    localStorage.setItem('dToken', data.token);
                    setDToken(data.token);
                    navigate('/doctor-dashboard')
                    console.log(data.token);
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-2xl font-semibold m-auto'>
                    <span className='text-emerald-500'>
                        {state}&nbsp;
                    </span>
                    Login
                </p>
                <div className='w-full'>
                    <p className='text-emerald-500 font-semibold'>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-emerald-300 rounded w-full p-2 mt-1' type="email" required />
                </div>
                <div className='w-full'>
                    <p className='text-emerald-500 font-semibold'>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-emerald-300 rounded w-full p-2 mt-1' type="password" required />
                </div>
                <button className='bg-emerald-500 text-white w-full py-2 rounded-md text-base font-semibold cursor-pointer hover:bg-emerald-600 transition-all duration-300'>
                    Login
                </button>
                {
                    state === 'Admin'
                        ? <p className='text-gray-600'>Doctor Login? <span className='text-emerald-500 underline cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></p>
                        : <p className='text-gray-600'>Admin Login? <span className='text-emerald-500 underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p>
                }
            </div>
        </form>
    )
}

export default Login