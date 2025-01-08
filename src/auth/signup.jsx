import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'

const Signup = ({ onToggleSignin , onLoginSuccess}) => {

    const handleSignup = () => {
        // Handle signup logic here
    };

    

    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8082/register', formData);
            setMessage(response.data.message);
            onToggleSignin()
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "SignUp Successfully"
              });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "An error occurred",
                
              });
        }
        
    };


    const gotoLogin = () => {
        try{
            onLoginSuccess()
        } catch{
            
        }
    }




    return (
        <>

            <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div class="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 class="mt-6 text-center text-4xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p class="mt-2 text-center text-sm text-gray-600 max-w">
                        
                        {/* <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                            create an account
                        </a> */}
                    </p>
                </div>

                <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                       
                        <form onSubmit={handleSubmit} class="space-y-6">
                            
                            <div>
                                <label  class="block text-sm font-medium text-gray-700">
                                   Email Address
                                </label>
                                <div class="mt-1">
                                    <input name="username" onChange={handleChange} type="email" required
                                        class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter your email"></input>
                                </div>
                            </div>

                            <div>
                                <label for="password" class="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div class="mt-1">
                                    <input type="password" name="password"  onChange={handleChange} autocomplete="current-password" required
                                        class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter your password"></input>
                                </div>
                            </div>

                            <div class="flex items-center justify-between">
                                <div class="flex items-center">
                                    <input id="remember_me" name="remember_me" type="checkbox"
                                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"></input>
                                    <label for="remember_me" class="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div class="text-sm">
                                    <a href="#" class="font-medium text-blue-600 hover:text-blue-500">
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button  type="submit"
                                    class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">

                                    Sign up
                                </button>
                            </div>
                        </form>
                        <span class="mt-3 justify-center gap-2 flex px-2 bg-gray-100 text-gray-500">
                            <p>Already have an acoount?</p> <button onClick={gotoLogin()} className='text-green-500 pointer'>login</button>
                        </span>
                        <div class="mt-6">

                            <div class="relative">
                                <div class="absolute inset-0 flex items-center">
                                    <div class="w-full border-t border-gray-300"></div>
                                </div>
                                <div class="relative flex justify-center text-sm">
                                    <span class="px-2 bg-gray-100 text-gray-500">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <div class="mt-6 grid grid-cols-3 gap-3">
                                <div>
                                    <a href="#"
                                        class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                        <img class="h-5 w-5" src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                                            alt=""></img>
                                    </a>
                                </div>
                                <div>
                                    <a href="#"
                                        class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                        <img class="h-5 w-5" src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                                            alt=""></img>
                                    </a>
                                </div>
                                <div>
                                    <a href="#"
                                        class="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                        <img class="h-6 w-6" src="https://www.svgrepo.com/show/506498/google.svg"
                                            alt=""></img>
                                    </a>
                                </div>

                               
                                    
                               




                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Signup