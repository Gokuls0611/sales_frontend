
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogHeader,
    AlertDialogDescription,
  } from '@/components/ui/alert-dialog';
import { message } from 'antd';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { requestApi } from '@/components/Axios/Axios';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { roles } from '@/Screens/ButtonsAndDialogsControl';
import { validateEmail, validatePhoneNumber } from '../Validation';
  
export function Createuser({ open, onClose}) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [role,setRole] = useState('');

    function reset(){
        setName('');
        setEmail('');
        setPhone('');
        setRole('');
    }
    
    function closing(){
      onClose();
    }
    async function CreatingUser() {
      if(!name || !email || !phone ||!role){
        message.warning("Enter All Details")
        return;
      }
      if(!validatePhoneNumber(phone)){
        message.error("Enter a Valid Number")
        return;
      }
      if(!validateEmail(email)){
        message.error("Enter a Valid Email ")
        return;
      }
      try {
        const response = await requestApi('/auth/create', 'POST', {
            email,
            phone,
            role,
            name,
        });
        message.info(response.data.message);
    } catch (error) {
        message.warning(error.response?.data?.message || 'An error occurred');
    } finally {
        reset();
        closing();
    }
    
    }
  
    return (
      <div>
        <AlertDialog open={open}>
          <AlertDialogContent className="max-w-[800px]">
            <AlertDialogHeader className="flex w-full">
              <div className="flex flex-row justify-between">
                <div>
                  <AlertDialogTitle className="font-inter flex self-center w-full">
                    Create User
                  </AlertDialogTitle>
                </div>
                <div>
                  <X className="cursor-pointer" onClick={()=>closing()} />
                </div>
              </div>
              <AlertDialogDescription></AlertDialogDescription>
              <div className="flex justify-center">
                <div className="flex flex-row w-full">
                  <div className="flex w-full flex-col h-1/5 p-4 ">
                    <div className="flex flex-col px-8 w-full justify-between ">
                    <div className="flex flex-col w-full self-center">
                        <div className="flex items-center w-full">
                          <ScrollArea className="h-[475px] px-4 w-full rounded-md border">
                            <div className="flex flex-col">
                              <div className="mb-4 mt-6">
                                <Label className="block text-gray-700 font-bold mb-2">NAME</Label>
                                <Input value={name} onChange={(e)=>setName(e.target.value)} />
                              </div>
                              <div className="mb-4 mt-6">
                                <Label className="block text-gray-700 font-bold mb-2">EMAIL</Label>
                                <Input type= "email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                              </div>
                              <div className="mb-4 mt-6">
                                <Label className="block text-gray-700 font-bold mb-2">MOBILE</Label>
                                <Input value={phone} onChange={(e)=>setPhone(e.target.value)} />
                              </div>
                              <div className="mb-4 mt-6">
                                <Label className="block text-gray-700 font-bold mb-2">ROLE</Label>
                                <Select
                                      value={role}
                                      onValueChange={setRole}  
                                      >
                                        <SelectTrigger className=" focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 mr-[20px]">
                                          <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {roles.length!==0?
                                            roles.map((i,index)=>
                                          <SelectItem key={index} value={i} className='uppercase' >
                                            {i}
                                          </SelectItem>
                                            )
                                            :<SelectItem value="No events" className='h-20 flex pl-0 justify-center' disabled={true}> No Roles Found</SelectItem>
                                          }
                                        </SelectContent>
                                </Select>
                              </div>
                            </div>
                          </ScrollArea>
                      </div>
                  <div className="w-full flex mt-8 items-center justify-center">
                    <Button className=" text-white px-4 py-2 rounded" onClick={()=>CreatingUser()}>
                      Create User
                    </Button>
                  </div>
                </div>

                  </div>
                </div>
                </div>
              </div>
            </AlertDialogHeader>
            
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }