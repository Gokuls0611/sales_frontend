
import { useState, useEffect } from 'react';
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
  
  export function CreateProduct({ open, onClose }) {
    const [name, setName] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    const [quantity,setQunatity] = useState('');

    function reset(){
        setName('');
        setDescription('');
        setPrice('');
        setQunatity('');
    }
    
    async function CreatingProduct() {
      if(!name || !price){
        message.warning("Name and Price are Mandatory")
        return;
      }
      try{
        const response = await requestApi('/products/create','POST',{
          name:name,
          description:description,
          price:price,
          quantity:quantity
        })
        message.info(response.data.message)
        reset();
        onClose();
      }catch(error){
        message.error(error.response.data.message)
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
                  <X className="cursor-pointer" onClick={onClose} />
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
                                <Label className="block text-gray-700 font-bold mb-2">PRODUCT NAME</Label>
                                <Input value={name} onChange={(e)=>setName(e.target.value)} />
                              </div>
                              <div className="mb-4 mt-6">
                                <Label className="block text-gray-700 font-bold mb-2">DESCRPTION</Label>
                                <Input type= "email" value={description} onChange={(e)=>setDescription(e.target.value)} />
                              </div>
                              <div className="mb-4 mt-6">
                                <Label className="block text-gray-700 font-bold mb-2">PRICE</Label>
                                <Input value={price} onChange={(e)=>setPrice(e.target.value)} />
                              </div>
                              <div className="mb-4 mt-6">
                                <Label className="block text-gray-700 font-bold mb-2">QUANTITY</Label>
                                <Input value={quantity} onChange={(e)=>setQunatity(e.target.value)} />
                              </div>
                            </div>
                          </ScrollArea>
                      </div>
                  <div className="w-full flex mt-8 items-center justify-center">
                    <Button className=" text-white px-4 py-2 rounded" onClick={()=>CreatingProduct()}>
                      Create Product
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