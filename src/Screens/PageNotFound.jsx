import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd';

export default function PageNotFound() {
    const navigate = useNavigate();
    useEffect(()=>{
        message.error("Page not Found")
        navigate(-1)
    },[])

}
