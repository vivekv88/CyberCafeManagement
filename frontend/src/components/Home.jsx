import React from 'react'

function Home() {
  return (
    
    <div>
        <div className='absolute z-10 ml-[15vw]'>
            <img className='w-[10vw] cursor-pointer mb-[10vh]' src="/assets/logo1.png" alt="" />
        </div>
        <div  className='relative top-xl flex justify-center bg-cyan-900 h-[100vh] w-full font-serif'>
            <div className='flex flex-col gap-4 items-center mt-[20vh] border-1 bg-transparent shadow-lg shadow-cyan-500 p-5 rounded-md h-[60vh] max-w-3xl'>
            <h1 className='decoration-indigo-700 text-white mb-[40px]'>Login</h1>
            <div className='flex flex-col w-sm'>
            <label htmlFor="email" className='text-white'>User Email</label>
            <input type="text" placeholder='Email' name='email' className='bg-transparent outline-none border-1 border-gray-400 px-3 py-2 rounded-lg mb-[30px] mt-[15px] text-gray-300 text-xl'/>
            <label className='text-white' htmlFor="password">Password</label>
            <input type="password" placeholder='Password' name='password' className='bg-transparent outline-none border-1 border-gray-400 px-3 py-2 rounded-lg mb-[30px] mt-[15px] text-gray-300 text-xl'/>
            <button type='submit' className='px-3 py-2 bg-red-500 mb-[10px]'>Login</button>
        </div>
      </div>
        </div>
    </div>
  )
}

export default Home
