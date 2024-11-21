import api from "./Api";

export async function requestApi(url,method,requestdata){
    // console.log(url,method,requestdata)
    if(method==='POST'){
        try{
            const response = await api.post(url,requestdata);
            return response
        }catch(error){
            throw error
        }
    }
    if(method==='GET'){
        try {
            const response = await api.get(url)
            return response
        }catch(error){
            throw error
        }
    }
    if(method==='PATCH'){
        try {
            const response = await api.patch(url)
            return response
        }catch(error){
            throw error
        }
    }
    if(method==='PUT'){
        try{
            const response = await api.put(url,requestdata)
            return response
        }
        catch(error){
            throw error
        }
    }
    if(method==='DELETE'){
        try{
            const response = await api.delete(url)
            return response
        }
        catch(error){
            throw error
        }
    }
}


export const uploadFileWithData = async (url, formData) => {
    try {
      const response = await api.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };