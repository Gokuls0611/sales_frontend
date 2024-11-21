import  { useState } from "react";

export default function DialogControl(){
  const [createUserDialog, setCreateUserDialog] = useState(false);
  const [createProductDialog, setCreateProductDialog] = useState(false);
  const [reportDownlaod, setReportDownload] = useState(false);

 
  const UserOpen = () => {
    setCreateUserDialog(true);
  };

  const UserClose = () => {
    setCreateUserDialog(false);
  };

  const ProductOpen = () => {
    setCreateProductDialog(true);
  }

  const ProductClose = () => {
    setCreateProductDialog(false);
  }

  const ReportOpen = () => {
    setReportDownload(true)
  }
  const ReportClose = () => {
    setReportDownload(false)
  }
  return {
    createUserDialog,
    createProductDialog,
    reportDownlaod,
    UserClose,
    UserOpen,
    ProductOpen,
    ProductClose,
    ReportOpen,
    ReportClose
  }
}

