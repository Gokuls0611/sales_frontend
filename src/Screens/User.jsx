import { useEffect, useState } from 'react'
import { requestApi } from '@/components/Axios/Axios'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { message } from 'antd';
import { roles } from './ButtonsAndDialogsControl';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { validateEmail, validatePhoneNumber } from '@/components/Validation';

export default function User({render}) {

    const [userdata,setUserData] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [role,setRole] = useState('');
    const [editid, setEditId] = useState(null)
    const [pagerender,setPagerender] = useState(false)

    async function getAllUsers(){
        try{
            const response = await requestApi('/auth/','GET')
            setUserData(response.data.data)
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        getAllUsers();
    },[pagerender,render])
  
    function EditAction(id,name,email,phone,role){
        setEditId(id);
        setName(name);
        setEmail(email);
        setPhone(phone);
        setRole(role)
    }

    function EditActionCancel(){
        setEditId(null);
        setName('');
        setEmail('');
        setPhone('');
        setRole('')
    }

    
    async function UpdateId(){
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
        try{
            const response = await requestApi('/auth/update/'+editid,'PUT',{
                name:name,
                email:email,
                phone:phone,
                role:role,
            })
            message.info(response.data.message)
            EditActionCancel()
            setPagerender(!pagerender)
        }catch(error){

            console.log(error)
        }
    }

    async function DeleteId(id) {
        try{
            const response = await requestApi('/auth/'+id,'DELETE')
            message.info(response.data.message)
            setPagerender(!pagerender)
        }catch(error){
            message.warning(error.response?.data?.message || 'An error occurred');
        }
    }


  return (
    <div className='flex flex-grow ml-6 mt-10 self-center w-[90%]'>
        {   
            userdata.length!==0 ?( userdata && 
            <div className="overflow-x-auto w-full">
            <Table className='table-fixed w-full '>
            <TableHeader className="bg-gray-100 w-full pointer-events-none ">
                <TableRow>
                <TableHead className="w-[20px] text-center">S.NO</TableHead>
                <TableHead className="w-[100px] sm:w-[100px] text-center">NAME</TableHead>
                <TableHead className="w-[75px] sm:w-[100px] text-center">EMAIL</TableHead>
                <TableHead className="w-[50px] sm:w-[175px] text-center">MOBILE</TableHead>
                <TableHead className="w-[50px] sm:w-[100px] text-center">ROLE</TableHead>
                <TableHead className= "w-[75px] sm:w-[200px]  text-center" colSpan={2} >ACTIONS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                   userdata.length!==0 && userdata.map((i,index)=>
                    <TableRow className='text-center' key={index}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell className='uppercase'>{editid===i.id?<Input value={name} onChange={(e)=>setName(e.target.value)} />:i.name}</TableCell>
                        <TableCell>{editid===i.id?<Input value={email} onChange={(e)=>setEmail(e.target.value)} />:i.email}</TableCell>
                        <TableCell>{editid===i.id?<Input value={phone} onChange={(e)=>setPhone(e.target.value)} />:i.phone}</TableCell>
                        <TableCell className='uppercase'>
                            {editid===i.id ?( <Select
                                      value={role}
                                      onValueChange={setRole}  
                                      >
                                        <SelectTrigger className=" focus:ring-0 focus:ring-offset-0 uppercase focus-visible:ring-0 mr-[20px]">
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
                                </Select>) :i.role
}
                                </TableCell>
                        <TableCell>{editid!==i.id?<Button onClick={()=>EditAction(i.id,i.name,i.email,i.phone,i.role)}>EDIT</Button>:<Button onClick={()=>UpdateId()}>UPDATE</Button>}</TableCell>
                        <TableCell>{editid!==i.id?<Button onClick={()=>DeleteId(i.id)}>DELETE</Button>:<Button onClick={()=>EditActionCancel()}>CANCEL</Button>}</TableCell>
                    </TableRow>

                   )
                }
            </TableBody>
            </Table>
            </div>):
             <div className='flex w-full h-full items-center font-semibold text-3xl justify-center'>
             No Users Found
            </div>

           
        }

    </div>
  )
}
