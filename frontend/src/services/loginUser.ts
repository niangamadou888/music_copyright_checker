import axios from "axios";
import { BACKEND_BASE_URL } from "../config";

type TCreateUser = {
    email: string;
    password: string;
}

export const loginUser = (data: TCreateUser) => {
    return axios.post(`${BACKEND_BASE_URL}/auth/login`, data)
}