import axios from "axios";
import { USERLOGIN,USERSIGNUP,USERLOGOUT } from "../actionTypes";

export const signup = (formData) => {
    return async (dispatch) => {
        try {
            const res =  await axios.post(`https://backend-mern-crud.onrender.com/signup`,formData);
            dispatch({type: USERSIGNUP});
            console.log(res.data);
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
                payload: {user: res.data.user,token: res.data.token}
            })
            console.log(res.data);
            
            if(res.data.token){
                navigate("/");
            }
            else{
                navigate("/login")
            }
        } catch (error) {
            console.log(error);
        }
    }
}


