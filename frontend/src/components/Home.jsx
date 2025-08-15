import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Dashboard from './Dashboard';

function Home() {

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:5173/api/login', { email,password } );
      navigate('/Dashboard')
    }catch(error){
      console.log(error);
      alert("Invalid credentials");
    }

  }

  return (

    <div>
      <div className='flex justify-between w-[80vw] absolute z-1 ml-[15vw] font-serif items-center'>
        <img className='w-[10vw] cursor-pointer' src="/assets/logo1.png" alt="" />
        <button className='bg-gray-900 cursor-pointer rounded-lg text-[15px] text-cyan-100 h-[8vh] px-4 py-[0px]'>Register</button>
      </div>
      <div className='relative flex justify-center bg-cyan-900 h-[100vh] w-full font-serif'>
        <form onSubmit={submitHandler}>
          <div className='flex flex-col gap-4 items-center mt-[20vh] border-1 bg-transparent shadow-lg shadow-cyan-500 p-5 rounded-md h-[60vh] max-w-3xl'>
            <h1 className='decoration-indigo-700 text-amber-400 font-bold mb-[40px]'>Login</h1>
            <div className='flex flex-col w-sm'>
              <label htmlFor="email" className='text-white'>User Email</label>
              <input type="text" placeholder='Email' name='email' className='bg-transparent outline-none border-1 border-gray-400 px-3 py-2 rounded-lg mb-[30px] mt-[15px] text-gray-300 text-xl' />
              <label className='text-white' htmlFor="password">Password</label>
              <input type="password" placeholder='Password' name='password' className='bg-transparent outline-none border-1 border-gray-400 px-3 py-2 rounded-lg mb-[30px] mt-[15px] text-gray-300 text-xl' />
              <button type='submit' className='cursor-pointer text-white text-xl m-auto font-extrabold w-[10vw] rounded-lg px-3 py-2 bg-red-500 mb-[10px]'>Login</button>
            </div>
          </div>
        </form>
      </div>
    </div >
  )
}

export default Home
