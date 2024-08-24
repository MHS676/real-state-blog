import React, { useState } from 'react';
import { IoClose, IoMenuSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import avatarImg from '../assets/commentor.png';
import { useLogoutUserMutation } from '../redux/feature/auth/authApi';
import { logout } from '../redux/feature/auth/authSlice';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [logoutUser] = useLogoutUserMutation();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
        } catch (error) {
            console.error('Logout failed: ', error);
        }
    };

    const navlists = [
        { name: "Home", path: "/" },
        { name: "About us", path: "/about-us" },
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Contact us", path: "/contact-us" },
    ];

    return (
        <header className="bg-white  border-b">
            <nav className="container mx-auto flex justify-between items-center px-2">
                <Link to="/">
                    <img src="/Blogging!.png" alt="Logo" className="h-24" />
                </Link>
                <ul className="sm:flex hidden items-center gap-8">
                    {navlists.map((list, index) => (
                        <li key={index}>
                            <NavLink
                                to={list.path}
                                className={({ isActive }) =>
                                    isActive ? 'text-blue-500' : 'text-gray-700'
                                }
                            >
                                {list.name}
                            </NavLink>
                        </li>
                    ))}
                    {user ? (
                        <li className='flex items-center gap-3'>
                            <img src={avatarImg} alt="Avatar" className="h-10 w-10 rounded-full" />
                            {user.role === 'admin' ? (
                                <Link to="/dashboard">
                                    <button className='bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm'>
                                        Dashboard
                                    </button>
                                </Link>
                            ) : (
                                <button onClick={handleLogout} className='bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm'>
                                    Logout
                                </button>
                            )}
                        </li>
                    ) : (
                        <li>
                            <NavLink to="/login" className='text-gray-700'>
                                Login
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div className="flex items-center sm:hidden">
                    <button
                        onClick={toggleMenu}
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        className="flex items-center px-3 py-2 bg-gray-100 rounded text-gray-500 hover:text-gray-900"
                    >
                        {isMenuOpen ? <IoClose size={24} /> : <IoMenuSharp size={24} />}
                    </button>
                </div>
            </nav>
            {isMenuOpen && (
                <ul className="fixed top-[108px] left-0 w-full bg-white shadow-sm z-50 pb-8 border-b">
                    {navlists.map((list, index) => (
                        <li className="mt-5 px-4" key={index}>
                            <NavLink
                                onClick={() => setIsMenuOpen(false)}
                                to={list.path}
                                className={({ isActive }) =>
                                    isActive ? 'text-blue-500' : 'text-gray-700'
                                }
                            >
                                {list.name}
                            </NavLink>
                        </li>
                    ))}
                    {user ? (
                        <li className="px-4 mt-5">
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsMenuOpen(false);
                                }}
                                className='bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm w-full text-left'
                            >
                                Logout
                            </button>
                        </li>
                    ) : (
                        <li className="px-4 mt-5">
                            <NavLink to="/login" onClick={() => setIsMenuOpen(false)} className='text-gray-700'>
                                Login
                            </NavLink>
                        </li>
                    )}
                </ul>
            )}
        </header>
    );
};

export default Navbar;
