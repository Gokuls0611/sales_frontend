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

export default function Product({render}) {

    const [productdata,setProductData] = useState([]);
    const [editid,setEditId] = useState(null);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('')
    const [quantity,setQuantity] = useState('')
    const [pagerender,setPagerender] = useState(false)

    async function getAllProducts(){
        try{
            const response = await requestApi('/products/','GET')
            setProductData(response.data.data)
        }
        catch(error){
            console.log(error)
            message.error("Something went Wrong")
        }
    }



    useEffect(()=>{
        getAllProducts();
    },[pagerender,render])


    function EditAction(id,name,price,quantity){
        setEditId(id);
        setName(name);
        setPrice(price);
        setQuantity(quantity);
    }

    function EditActionCancel(){
        setEditId(null);
        setName('');
        setPrice('');
        setQuantity('');
    }

    async function UpdateId(){
        try{
            const response = await requestApi('/products/update/'+editid,'PUT',{
                name:name,
                quantity:quantity,
                price:price
            })
            message.info(response.data.message)
            EditActionCancel()
            setPagerender(!pagerender)
        }catch(error){
            message.warning(error.response?.data?.message || 'An error occurred');
            EditActionCancel()
        }
    }

    async function DeleteId(id) {
        try{
            const response = await requestApi('/products/'+id,'DELETE')
            message.info(response.data.message)
            setPagerender(!pagerender)
        }catch(error){
            message.warning(error.response?.data?.message || 'An error occurred');
        }
    }

  return (
    <div className='flex flex-grow flex-col ml-6 mt-10 self-center w-[90%]'>
        {   
           productdata.length!==0 ? (productdata && 
            <div className="overflow-x-auto  w-full min-h-screen  flex flex-col self-center">
            <Table className='table-fixed w-full '>
            <TableHeader className="bg-gray-100 w-full sm:w-[400px] pointer-events-none ">
                <TableRow>
                <TableHead className="w-[20px] text-center">S.NO</TableHead>
                <TableHead className="w-[150px] text-center">NAME</TableHead>
                <TableHead className="w-[75px] text-center">PRICE</TableHead>
                <TableHead className="w-[75px] text-center">QUANTITY</TableHead>
                <TableHead className = "w-[150px] text-center">REMAINING STOCK</TableHead>
                <TableHead className = "w-[150px] text-center">AVERAGE SALE PRICE</TableHead>
                <TableHead className = "w-[75px] text-center">REVENUE</TableHead>
                <TableHead className= "sm:w-[400px] text-center" colSpan={2} >ACTIONS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              
                {
                    productdata.map((i,index)=>
                    <TableRow className='text-center' key={index}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{editid===i.id?<Input value={name} onChange={(e)=>setName(e.target.value)} />:i.name}</TableCell>
                        <TableCell>{editid===i.id?<Input value={price} onChange={(e)=>setPrice(e.target.value)} />:i.price}</TableCell>
                        <TableCell>{editid===i.id?<Input value={quantity} onChange={(e)=>setQuantity(e.target.value)} />:i.initial_quantity}</TableCell>
                        <TableCell>{i.remaining_stock}</TableCell>
                        <TableCell>{i.average_sale_price}</TableCell>
                        <TableCell>{i.total_revenue}</TableCell>
                        <TableCell>{editid!==i.id?<Button onClick={()=>EditAction(i.id,i.name,i.price,i.initial_quantity)}>EDIT</Button>:<Button onClick={()=>UpdateId()}>UPDATE</Button>}</TableCell>
                        <TableCell>{editid!==i.id?<Button onClick={()=>DeleteId(i.id)}>DELETE</Button>:<Button onClick={()=>EditActionCancel()}>CANCEL</Button>}</TableCell>
                    </TableRow>

                   )
                }

            </TableBody>
            </Table>
            </div>
            ):
            <div className='flex w-full h-full items-center font-semibold text-3xl justify-center'>
                No Products Found
            </div>

           
        }

    </div>
  )
}
