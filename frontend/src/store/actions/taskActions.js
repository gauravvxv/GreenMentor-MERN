import axios from "axios"
import { ADD_TASK,GET_TASKS,UPDATE_TASK,DELETE_TASK } from "../actionTypes"

export const getTasks = (token) => {
return async(dispatch) => {
    try {
        const res = await axios.get('https://backend-mern-crud.onrender.com/task',{
            headers: {
                "Content-type": "application/json",
                "Authorization": `${token}`
            },
        },
        );
        console.log(res.data);
        dispatch({type: GET_TASKS,payload: res.data})
    } catch (error) {
        console.log("Fail to fetch" +error)
    }
}
}

export const addTasks = (formData,token) => {
   console.log(formData,token);

   const config = {
    headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
    },
};
   return async (dispatch) => {
    try {
        const res = await axios.post('https://backend-mern-crud.onrender.com/task',formData,config);
        dispatch({type: ADD_TASK});
        dispatch(getTasks(token));
        console.log(res);
    } catch (error) {
        console.error("Failed to add task:", error);
    }
   }
   }

   export const updateTask = (id,data,token) => {
    const config = {
		headers: {
			Authorization: `${token}`,
			"Content-Type": "application/json", 
		},
	};
    return async (dispatch) => {
        try {
            const res = await axios.patch(`https://backend-mern-crud.onrender.com/task/${id}`,data,config);
            dispatch(getTasks(token));
            console.log(res);
        } catch (error) {
            console.error("Failed to update task:", error);
        }
    }
   }

   export const deleteTask = (id,token) => {
    const config = {
		headers: {
			Authorization: `${token}`,
			"Content-Type": "application/json",
		},
	};
    return async (dispatch) => {
        try {
            const res = await axios.delete(`https://backend-mern-crud.onrender.com/task/${id}`,config);
            dispatch(getTasks(token))
            console.log(res);
        } catch (error) {
            console.error("Failed to delete task:", error)
        }
    }
   }