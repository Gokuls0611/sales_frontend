import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarProvider,
  SidebarInset,
  SidebarFooter
} from "@/components/ui/sidebar"
import { HouseIcon, SquareChartGanttIcon, Contact  } from "lucide-react"
import Cookies from "js-cookie";
import{ message } from 'antd'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from '@/components/Axios/AuthSlice';
import DialogComponent from './ButtonsAndDialogsControl';

export default function Dashboard() {
  const [element,setElement] = useState('home')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogged = useSelector((state) => state.auth.user);
  const items = [
    {
      title: "Home",
      url: "home",
      icon: HouseIcon,
    },
    {
      title: "Product",
      url: "product",
      icon: SquareChartGanttIcon,
    },
    {
      title: "Users",
      url: "user",
      icon: Contact,
    },
    
  ]
  

  const LoggingOut = () => {
    Cookies.remove('token');
    dispatch(logout());
    message.info("Loggout Successfully.")
    navigate('/login')
    }


  function handlechange(url){
    setElement(url)
  }
  return (
      <SidebarProvider>
        
        <Sidebar>
      <SidebarHeader className = 'text-black font-semibold bg-white'>
        Welcome {userLogged}
      </SidebarHeader>
      <SidebarContent className='bg-gray-200'>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton  className='cursor-pointer' onClick={() => handlechange(item.url)} asChild>
                    <div>
                      <item.icon />
                    {item.title}
                      </div>                  
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
      <Button className='h-8' onClick={()=>LoggingOut()} >
                Logout
              </Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
        <SidebarInset>
            <div className='flex px-4 justify-end items-end w-full self-center'>
            <DialogComponent element= {element}  />
            </div>
         
        </SidebarInset>
      </SidebarProvider>
  );
}
