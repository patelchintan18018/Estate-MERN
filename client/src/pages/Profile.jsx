import React from 'react';
import { useSelector } from 'react-redux';


export default function Profile() {

  const {currentUser} = useSelector((state)=>state.user);
  return (
    <>
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold my-7 text-slate-800 text-center'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img className='w-24 h-24 object-cover self-center rounded-full cursor-pointer' src={currentUser.photoURL} alt="profile-image" />
        <input type="text" name='username' id='username' placeholder='username' className='p-3 focus:outline-none rounded-lg' value={currentUser.username}/>
        <input type="email" name='email' id='email' placeholder='email' className='p-3 focus:outline-none rounded-lg' value={currentUser.email}/>
        <input type="password" name='password' id='password' placeholder='password' className='p-3 focus:outline-none rounded-lg'/>
        <button className='p-3 bg-slate-700 uppercase hover:opacity-95 text-white rounded-lg'>update</button>
      </form>
      <div className='flex justify-between text-red-600 my-3 font-semibold cursor-pointer'>
        <span>Delete account</span>
        <span>Sign out</span>
      </div>
      
    </div>
    </>
  )
}
