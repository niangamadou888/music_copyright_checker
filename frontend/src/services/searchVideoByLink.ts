import axios from "axios";
import { BACKEND_BASE_URL } from "../config";

export const searchVideoByLink = (data: string) => {
    return axios.get(`${BACKEND_BASE_URL}/youtube/video`, {
        params: {
            video_id: data
        }
    })
}