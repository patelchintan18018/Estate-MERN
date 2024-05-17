import React from 'react';
import {FaSearch} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux';

export default function Header() {

    const {currentUser} = useSelector((state)=>state.user);

  return (
    <>
        <header className='bg-slate-200'>
            <div className='flex justify-between items-center mx-auto p-3 max-w-6xl'>
                <h1 className='font-bold flex-wrap sm:text-2xl'>
                    <span className='text-slate-500'>Sahand</span>
                    <span className='text-slate-700'>Estate</span>
                </h1>
                <form className='bg-slate-100 flex p-3 items-center rounded-lg '>
                    <input type="text" placeholder='Search ...' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
                    <FaSearch className='text-slate-600'/>
                </form>
                <ul className='flex gap-6 items-center'>
                    <Link to='/' className='hidden sm:inline text-slate-700 font-semibold hover:font-bold'><li>Home</li></Link>
                    <Link to='/about' className='hidden sm:inline text-slate-700 font-semibold hover:font-bold'><li>About</li></Link>
                    <Link to='/profile'>
                    {currentUser ? <img className='w-7 h-7 lg:w-10 lg:h-10 rounded-full object-cover' src={currentUser.photoURL} alt="profile" /> : <Link to='/signup' className='text-slate-700 font-semibold hover:font-bold'><li>Sign In</li></Link> }
                    </Link>
                    
                </ul>
            </div>
        </header>
    </>
  )
}
