import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'

const Home = ({ setShowLogin }) => {

  const navigate = useNavigate();
  const [currState, setCurrState] = useState("Login")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const onChangeHandler = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const url = "https://cybercafemanagement.onrender.com/";
      let newUrl = url
      if (currState === "Login") {
        newUrl += "api/adminLogin";
      }
      else {
        newUrl += "api/register";
      }

      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate('/dashboard');
      }
      else {
        alert(response.data.message)
      }

    } catch (error) {
      console.log(error);
      alert("Invalid credentials");
    }

  }

  return (

    <div>
      {/* Navbar */}
      <div className='flex justify-between w-[90vw] md:w-[80vw] absolute z-1 left-1/2 transform -translate-x-1/2 font-serif items-center px-4 md:px-0'>
        <img className='w-[30vw] sm:w-[20vw] md:w-[10vw] cursor-pointer' src="/assets/logo1.png" alt="" />
      </div>

      {/* Main container */}
      <div className='relative flex justify-center bg-cyan-900 min-h-screen w-full font-serif px-4 sm:px-6 md:px-0'>
        <form onSubmit={submitHandler} className='w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-3xl'>
          <div className='flex flex-col gap-4 items-center mt-[15vh] sm:mt-[18vh] border-1 bg-transparent shadow-lg shadow-cyan-500 p-4 sm:p-6 md:p-8 rounded-md h-auto'>

            {/* Title */}
            <h1 className='decoration-indigo-700 text-amber-400 font-bold text-2xl sm:text-3xl mb-4'>
              {currState}
            </h1>

            {/* Input fields */}
            <div className='flex flex-col w-full'>
              {currState === "Sign Up" && (
                <input
                  type="text"
                  onChange={onChangeHandler}
                  value={data.name}
                  placeholder='User Name'
                  name='name'
                  className='bg-transparent outline-none border-1 border-gray-400 px-3 py-2 rounded-lg mb-4 text-gray-300 text-base sm:text-lg'
                  required
                />
              )}
              <input
                type="text"
                onChange={onChangeHandler}
                value={data.email}
                placeholder='Email'
                name='email'
                className='bg-transparent outline-none border-1 border-gray-400 px-3 py-2 rounded-lg mb-4 text-gray-300 text-base sm:text-lg'
                required
              />
              <input
                type="password"
                onChange={onChangeHandler}
                value={data.password}
                placeholder='Password'
                name='password'
                className='bg-transparent outline-none border-1 border-gray-400 px-3 py-2 rounded-lg mb-4 text-gray-300 text-base sm:text-lg'
                required
              />

              {/* Button */}
              <button
                type='submit'
                className='cursor-pointer text-white text-lg sm:text-xl m-auto font-extrabold w-full sm:w-[60%] md:w-[40%] lg:w-[10vw] rounded-lg px-3 py-2 bg-red-500 mb-3'>
                {currState === "Login" ? "Login" : "Register"}
              </button>
            </div>

            {/* Switch between Login / Register */}
            {currState === "Login" ? (
              <p className='text-sm sm:text-md text-white font-serif text-center'>
                Create a new account?
                <span
                  className='cursor-pointer text-sm sm:text-md text-blue-400 font-serif ml-1'
                  onClick={() => setCurrState("Sign Up")}
                >
                  Click here
                </span>
              </p>
            ) : (
              <p className='text-sm sm:text-md text-white font-serif text-center'>
                Already have an account?
                <span
                  className='cursor-pointer text-sm sm:text-md text-blue-400 font-serif ml-1'
                  onClick={() => setCurrState("Login")}
                >
                  Login here
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Home
