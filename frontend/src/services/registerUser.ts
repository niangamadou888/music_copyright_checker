import axios from "axios";
import { BACKEND_BASE_URL } from "../config";

type TCreateUser = {
    username: string;
    email: string;
    password: string;
}

export const registerUser = (data: TCreateUser) => {
    return axios.post(`${BACKEND_BASE_URL}/users`, data)
}