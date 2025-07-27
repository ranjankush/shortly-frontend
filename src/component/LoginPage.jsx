import React from 'react'
import {useForm} from 'react-hook-form'
import TextField from './TextField'
import { useState } from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import api from '../api/api'
import { useStoreContext } from '../contextApi/ContextAPI'
const LoginPage = () => {
 const navigate=useNavigate();
    const[loader,setLoader]=useState(false);

    const {setToken}=useStoreContext();
    const{
        register,
        handleSubmit,
        reset,
        formState:{errors}

    }=useForm({
        defaultValues:{
            username:"",
            email:"",
            password:""
        },
        mode:"onTouched",
    })

    const loginHandler = async (data) => {
        setLoader(true);
        try {
            const { data: response } = await api.post(
                "/api/auth/public/login",
                data
            );
            //store token in local storage
            console.log(response.token); 
            setToken(response.token);
            // localStorage.setItem("JWT_TOKEN",JSON.stringify(response.token));
            reset();
            toast.success("Login Successful!")
            navigate("/dashboard");

        } catch (error) {
            console.log(error);
            toast.error("Login Failed!")
        } finally {
            setLoader(false);
        }
    };

  return (
    <div className='min-h-[calc(100vh-64px)] flex justify-center items-center '>
        <form onSubmit={handleSubmit(loginHandler)}
        className='sm:w-[450px] w-[360px] shadow-custom py-8 sm:px-8 px-4 rounded-md'>
`           <h1 className="text-center font-serif text-btnColor font-bold lg:text-3xl text-2xl">
                Login Here
            </h1>
            <hr className='mt-2 mb-5 text-black'/>

            <div className="flex flex-col gap-3">
               
               <TextField
                      label="UserName"
                      required
                      id="username"
                      type="text"
                      message="Username is required"
                      placeholder="Enter your username"

                      register={ register }
                      errors={ errors } className={ undefined } min={ undefined } value={ undefined }             
                />
               {/* <TextField
                      label="Email"
                      required
                      id="email"
                      type="email"
                      message="Email is required"
                      placeholder="Enter your Email"

                      register={ register }
                      errors={ errors } className={ undefined } min={ undefined } value={ undefined }
               /> */}
               <TextField
                      label="Password"
                      required
                      id="password"
                      type="password"
                      message="Password is required"
                      placeholder="Enter your password"

                      register={ register }
                      min={ 6 }
                      errors={ errors } className={ undefined } value={ undefined }               
                />
            </div>
            <button 
            disabled={loader}
            type="submit" 
            className='bg-customRed font-semibold text-white bg-custom-gradient w-full py-2 mt-2 rounded-md'>
            {loader?"Loading....":"Login"}
            </button>
            <p className='text-center text-sm text-slate-700 mt-6'>
                Don't have an account ? 
               
               <Link className='font-semibold underline hover:text-black' to="/register">
               <span className='text-btnColor'>SignUp</span>
               </Link>
            </p>

        </form>
    </div>
  )
}


export default LoginPage