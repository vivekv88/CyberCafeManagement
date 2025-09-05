import React from 'react'
import { data, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'

const Home = ({setShowLogin}) => {

  const navigate = useNavigate();
  const [currState, setCurrState] = useState("Login")
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    mobile:""
  })

  const onChangeHandler = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=> ({...data,[name]:value}));
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const url = "http://localhost:3000/" ;
      let newUrl = url
      if(currState==="Login"){
        newUrl += "api/loginUser";
      }
      else{
        newUrl += "api/registerNewUser";
      }

      const response = await axios.post(newUrl,data);
      if(response.data.success){
        localStorage.setItem("token",response.data.token);
        alert("Account created successful login to start session")
        navigate('/')
      }
      else{
        alert(response.data.message)
      }

    } catch (error) {
      console.log(error);
      alert("Invalid credentials");
    }

  }

  return (

    <div>
      <div className='flex justify-between w-[80vw] absolute z-1 ml-[15vw] font-serif items-center'>
        <img className='w-[10vw] cursor-pointer' src="/assets/logo1.png" alt="" />

      </div>
      <div className='relative flex justify-center bg-cyan-900 h-[100vh] w-full font-serif'>
        <form onSubmit={submitHandler}>
          <div className='flex flex-col gap-4 items-center mt-[20vh] border-1 bg-transparent shadow-lg shadow-cyan-500 p-5 rounded-md h-auto max-w-3xl'>
            <h1 className='decoration-indigo-700 text-amber-400 font-bold mb-[20px]'>{currState}</h1>
            <div className='flex flex-col w-sm'>
              {currState==="Sign Up"?<input type="text" onChange={onChangeHandler} value={data.name} placeholder='User Name' name='name' className='bg-transparent outline-none border-1 border-gray-400 px-3 py-2 rounded-lg mb-[30px] mt-[15px] text-gray-300 text-xl' required/> : <></>}
              <input type="text" onChange={onChangeHandler} value={data.email} placeholder='Email' name='email' className='bg-transparent outline-none border-1 border-gray-400 px-3 py-2 rounded-lg mb-[30px] mt-[15px] text-gray-300 text-xl' required/>
              {currState==="Sign Up"?<input type="text" onChange={onChangeHandler} value={data.mobile} placeholder='Mobile' name='mobile' className='bg-transparent outline-none border-1 border-gray-400 px-3 py-2 rounded-lg mb-[30px] mt-[15px] text-gray-300 text-xl' required/> : <></>}
              <input type="password" onChange={onChangeHandler} value={data.password} placeholder='Password' name='password' className='bg-transparent outline-none border-1 border-gray-400 px-3 py-2 rounded-lg mb-[30px] mt-[15px] text-gray-300 text-xl' required/>
              <button type='submit' className='cursor-pointer text-white text-xl m-auto font-extrabold w-[10vw] rounded-lg px-3 py-2 bg-red-500 mb-[10px]'>{currState==="Login"?"Login":"Register"}</button>

            </div>
            {currState === "Login" ? <p className='text-md text-white font-serif'>Create a new account? <span className='cursor-pointer text-md text-blue-400 font-serif' onClick={() => setCurrState("Sign Up")}>Click here</span></p> : <p className='text-md text-white font-serif'>Already have an account? <span className='cursor-pointer text-md text-blue-400 font-serif' onClick={() => setCurrState("Login")}>Login here</span></p>}
          </div>
        </form>
      </div>
    </div >
  )
}

export default Home
