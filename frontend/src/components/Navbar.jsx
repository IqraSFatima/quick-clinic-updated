import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const { token, setToken, userData } = useContext(AppContext);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleToggleDropdown = () => setShowDropdown(prev => !prev);

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
    }

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
            <img src={assets.logo} onClick={() => navigate('/')} alt="Logo" className='w-44 cursor-pointer' />
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'>
                    <li className='py-1 hover:text-emerald-500 transition-colors duration-300'>
                        Home
                    </li>
                    <hr className='border-none outline-none h-0.5 bg-emerald-500 w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/doctors'>
                    <li className='py-1 hover:text-emerald-500 transition-colors duration-300'>
                        All Doctors
                    </li>
                    <hr className='border-none outline-none h-0.5 bg-emerald-500 w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/about'>
                    <li className='py-1 hover:text-emerald-500 transition-colors duration-300'>
                        About
                    </li>
                    <hr className='border-none outline-none h-0.5 bg-emerald-500 w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/contact'>
                    <li className='py-1 hover:text-emerald-500 transition-colors duration-300'>
                        Contact
                    </li>
                    <hr className='border-none outline-none h-0.5 bg-emerald-500 w-3/5 m-auto hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                {
                    token && userData
                        ? <div className='flex items-center gap-2 cursor-pointer group relative' onClick={handleToggleDropdown}>
                            <img className='w-8 rounded-full' src={userData.image} alt="Profile Picture" />
                            <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown icon" />
                            <div className={`absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 group-hover:block ${showDropdown ? 'block' : 'hidden'}`}>
                                <div className='min-w-48 bg-gray-100 rounded flex flex-col gap-4 p-4'>
                                    <p onClick={() => navigate('/my-profile')} className='hover:text-emerald-500 cursor-pointer'>My Profile</p>
                                    <p onClick={() => navigate('/my-appointments')} className='hover:text-emerald-500 cursor-pointer'>My Appointments</p>
                                    <p onClick={() => logout()} className='hover:text-emerald-500 cursor-pointer'>Logout</p>
                                </div>
                            </div>
                        </div>
                        : <button onClick={() => navigate("/login")} className='bg-emerald-500 text-white px-8 py-3 rounded-full font-bold md:block cursor-pointer hidden'>
                            Login
                        </button>
                }

                <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} />

                {/* Mobile Menu */}
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all duration-300`}>
                    <div className='flex items-center justify-between px-5 py-6'>
                        <img className='w-36' src={assets.logo} />
                        <img className='w-7' onClick={() => setShowMenu(false)} src={assets.cross_icon} />
                    </div>
                    <ul className='flex flex-col items-center gap-4 mt-5 px-5 text-lg font-medium'>
                        <NavLink onClick={() => setShowMenu(false)} to='/'><p>Home</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/doctors'><p>All Doctors</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/about'><p>About</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to='/contact'><p>Contact</p></NavLink>

                        {
                            token && userData
                                ? ''
                                : <button onClick={() => { setShowMenu(false), navigate("/login") }} className='bg-emerald-500 text-white px-8 py-3 rounded-full font-bold md:block cursor-pointer md:hidden lg:hidden mt-10'>
                                    Login
                                </button>
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar