import axios from "axios";
import { USERLOGIN,USERSIGNUP } from "../actionTypes";

export const signup = (formData) => {
    return async (dispatch) => {
        try {
            const res =  await axios.post(`https://backend-mern-crud.onrender.com/signup`,formData);
            dispatch({type: USERSIGNUP});
            console.log(res.data);
            console.log(res.message)
        } catch (error) {
         console.log(error.res.data);

        }
    }
}

export const login = (formData,navigate) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(`https://backend-mern-crud.onrender.com/login`,formData);
            dispatch({
                type: USERLOGIN,
                payload: {user: res.data.user,token: res.data.token,userId: res.data.userId}
              
            })
            console.log(res.data.userId);

            localStorage.setItem('userID',res.data.userId)
      
            if(res.data.token){
                navigate("/task");
               
            }
            else{
                navigate("/")
            }
        } catch (error) {
            console.log(error);

        }
    }
}




