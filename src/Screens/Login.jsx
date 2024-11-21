import React, { useState,useEffect } from 'react';
import SiteLogo_white from '../assets/caliberlogo.png';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User, LockKeyholeIcon } from 'lucide-react';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { login } from '@/components/Axios/AuthSlice';
import { useDispatch } from 'react-redux';
import { requestApi } from '@/components/Axios/Axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch()

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
        navigate('/dashboard'); 
    }
  }, [navigate]);

  async function validate() {
    if (username.length <= 0 || password.length <= 0) {
      message.error('Enter the Details ');
    }
     else {
      try {
        const response = await requestApi('/auth/login','POST',{ email:username, password:password });
        message.success(response.data.data.user.name)
        Cookies.set('token', response.data.data.token, { expires: 1 * 3600 * 1000 });
        navigate('/dashboard');
        dispatch(login({
          user:response.data.data.user.name,
          role:response.data.data.user.role,
          email:username
        }))
        return response;
      } catch (error) {
        console.log(error)
        {error.response.data.message!==null || error.response.data.message!==undefined?message.error(error.response.data.message):message.error("Please try again...")}
      };
    }
  }

  
  return (
    <div className="flex items-center h-full flex-grow w-full">
      <div className="w-full flex flex-col">
        <div className="flex  h-[550px] rounded-lg w-[500px] items-center bg-[#1e1e1e] justify-center self-center">
          <div className="stroke-white flex self-center justify-between h-full  text-white flex-col fill-white ">
            <div className="flex self-center my-[50px] pointer-events-none cursor-pointer ">
            <img src={SiteLogo_white} alt="Site Logo" className="h-12 w-auto bg-white" />

            </div>
            <div className="flex mb-[300px] flex-col w-full self-center">
              <div className="mb-12 font-inter font-bold text-xl self-center ">
                LOGIN
              </div>
              <div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="fas fa-envelope stroke-black" />
                  </div>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className=" text-black pl-12 mb-8 w-[350px] rounded-[10px]"
                    placeholder="Email"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockKeyholeIcon className="fas fa-envelope stroke-black" />
                  </div>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=" text-black pl-12 mb-8 w-[350px] rounded-[10px]"
                    placeholder="Password"
                  />
                </div>
              </div>
            
              <div className="flex self-center">
                <Button
                  onClick={() => validate()}
                  type= 'submit' 
                  className="flex bg-white text-black h-8 w-[150px] self-center hover:bg-gray-200"
                >
                  Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
