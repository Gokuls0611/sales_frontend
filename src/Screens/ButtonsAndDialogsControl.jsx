import { Button }  from "@/components/ui/button";
import { Createuser } from "@/components/Dialogs/CreateUser";
import DialogControl from "@/components/Dialogs/DialogControl";
import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Suspense } from "react";
import LoadingSpinner from "./LoadingComponent";
import ProtectedRoute from "@/components/Authentication/ProtectedRoute";
import { CreateProduct } from "@/components/Dialogs/CreateProduct";
const Home = React.lazy(() => import('./Home'));
const User = React.lazy(() => import('./User'));
const Product = React.lazy(()=> import('./Product'))


export function DialogComponent({element}) {

  const { 
    createUserDialog,
    createProductDialog,
    reportDownlaod,
    UserOpen,
    UserClose,
    ProductOpen,
    ProductClose,
    ReportOpen,
    ReportClose
  } = DialogControl()
  const pages = {
    'home' : <ProtectedRoute element={<Home reportopen = {reportDownlaod} ReportClose = {ReportClose} />} />,
    'user' : <ProtectedRoute element={<User render= {UserClose} />} />,
    'product' : <ProtectedRoute element={<Product render= {ProductClose} />} />
  }

  const BUTTON = {
    home: (
      <div className="flex px-4 justify-end items-end self-center">
        <Button className="h-8" onClick={ReportOpen}>Download Report</Button>
      </div>
    ),
    user: (
      <div className="flex px-4 justify-end items-end self-center">
        <Button className="h-8" onClick={UserOpen}>Add User</Button>
      </div>
    ),
    product: (
      <div className="flex px-4 justify-end items-end self-center">
        <Button className="h-8" onClick= {ProductOpen}>Add Product</Button>
      </div>
    ),
  };

  const DIALOGS = {
    user: <Createuser open={createUserDialog} onClose={UserClose}  />,
    product: <CreateProduct open = {createProductDialog} onClose={ProductClose} />
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row h-12 w-full">
      <div className=' flex text-xl self-center w-full uppercase font-semibold' >
          <SidebarTrigger/>
          {element}
      </div>
      <div className="mt-4">{BUTTON[element]}</div>
      <div>{DIALOGS[element]}</div>
    </div>
    <div className="flex flex-grow">
      <Suspense fallback={<LoadingSpinner/>}>
              {pages[element]}
      </Suspense>
      </div>
    </div>
    
  );
}

export default DialogComponent;


export const roles = ['master','admin','user']