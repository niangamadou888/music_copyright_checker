import axios from "axios";
import { BACKEND_BASE_URL } from "../config";

export const searchVideoByTitle = (data: string) => {
    return axios.get(`${BACKEND_BASE_URL}/youtube/search`, {
        params: {
            search_query: data
        }
    })
}