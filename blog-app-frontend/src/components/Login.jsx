import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../AuthStore/useAuth';
import { useNavigate } from 'react-router';
import {toast} from 'react-hot-toast'
function Login() {
  const { register, handleSubmit,formState:{errors} } = useForm();
  const login=useAuth((state)=>state.login);
  const isAuthenticated=useAuth((state)=>state.isAuthenticated);
  const currentUser=useAuth((state)=>state.currentUser);
  const navigate=useNavigate();
  const onLoginSubmit = async(userCredObj) => {
    // console.log("Login Data:", data);
    await login(userCredObj);
    toast.success("Logged in Successfully");
  };

  useEffect(()=>{
    if(isAuthenticated){
      if(currentUser.role === "USER"){
        navigate("/user-profile");
      }
      if(currentUser.role ==="AUTHOR"){
        navigate("/author-profile");
      }

    }
  },[isAuthenticated,currentUser])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm bg-gray-100 p-8 rounded-2xl shadow-xl border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Login</h2>

        <form onSubmit={handleSubmit(onLoginSubmit)}>

          <div className="mb-6 flex items-center justify-center space-x-4 bg-white py-2 rounded-lg border border-gray-300">
            <span className="font-medium text-gray-600">Role:</span>
            <label className="flex items-center cursor-pointer">
              <input type="radio" value="user" {...register("role",{required:"Email is Required"})} className="accent-blue-600 w-4 h-4" />
              <span className="ms-2 text-sm">User</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input type="radio" value="author" {...register("role",{required:"Password is Required"})} className="accent-blue-600 w-4 h-4" />
              <span className="ms-2 text-sm">Author</span>
            </label>
          </div>
          <div className="mb-4">
            <input 
              type="email" 
              {...register("email")} 
              placeholder="Email" 
              className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-400 transition-colors" 
            />
          </div>
            {
              errors.email && <p className='text-red-700 text-7xl '>{errors.email.message}</p>
            }


          <div >
            <input 
              type="password" 
              {...register("password")} 
              placeholder="Password" 
              className="w-full border-2 border-gray-300 p-3 rounded-lg focus:outline-none focus:border-blue-400 transition-colors" 
            />
          </div>
    <p className=" inline  mb-6  text-end text-sm text-gray-500 cursor-pointer hover:underline">
            Forgot password?
          </p>

          <button 
            type="submit" 
            className="w-full py-3 mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg shadow-md transition-all active:scale-95"
          >
            Login
          </button>

          
        </form>
      </div>
    </div>
  );
}

export default Login;