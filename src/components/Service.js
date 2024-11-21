import Cookies from "js-cookie";
import{ message } from 'antd'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function LoggingOut() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    Cookies.remove('token');
    dispatch(logout());
    message.info("Loggout Successfully.")
    navigate('/login')
}