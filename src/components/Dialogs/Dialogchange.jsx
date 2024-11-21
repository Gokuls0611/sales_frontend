import { useState } from 'react';

export default function Dialogchange() {
 const [createuserdialog,setCreateUserDialog] = useState(false)
 const UserOpen = () => {
    setCreateUserDialog(true)
 }
 const UserClose = () => {
    setCreateUserDialog(false)
 }


 return {
    createuserdialog,
    UserOpen,
    UserClose
 }
}
