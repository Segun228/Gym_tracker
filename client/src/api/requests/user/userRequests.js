import axios from "axios";
import {BASE_URL, USER_URL, API_URL} from "./../../../../config"
import api from "./../../api"
import handleLog from "../../../helpers/handleLog";

export const getUser = async () => {
    try{
        const answer = await api.get(USER_URL + "me/")
        if(!answer){
            throw new Error("Error while getting user")
        }
        return answer
    }
    catch(error){
        console.error(error)
        return null
    }
}


export const putUser = async ({user_vk_id, height, weight}, id) =>  {
    try{
        if(!user_vk_id || !height || !weight || !id){
            throw new Error("Error handling empty fields")
        }
        const data = {
            user_vk_id, 
            height, 
            weight
        }
        const answer = await api.put(USER_URL + `me/${id}/`, data)
        if(!answer){
            throw new Error("Error while editing user")
        }
        return answer
    }
    catch(error){
        console.error(error)
        return null
    }
}


export const registerUser = async ({user_vk_id, height, weight, username}) =>  {
    try{
        if(!user_vk_id || !height || !weight || !username){
            throw new Error("Error handling empty fields")
        }
        const data = {
            user_vk_id, 
            height, 
            weight,
            username
        }
        const answer = await api.post(USER_URL + `register/`, data)
        if(!answer){
            throw new Error("Error while editing user")
        }
        return answer
    }
    catch(error){
        console.error(error)
        return null
    }
}


const loginUser = async ({user_vk_id}) =>  {
    try{

    }
    catch(error){
        console.error(error)
        return null
    }
}