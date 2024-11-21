import Cookies from "js-cookie";

export default function Cookie(){
    if(Cookies.get('token')){
        return true
    }
    return false
}