import axios from "axios";
import { BACKEND_BASE_URL } from "../config";

export const searchVideo = (data: string, by: 'title' | 'link') => {
    const params = {}
    if (by == 'title') Object.assign(params, {search_query: data})
    else Object.assign(params, {video_id: data})
    return axios.get(`${BACKEND_BASE_URL}/${by == 'title' ? 'youtube/search' : '/youtube/video'}`, {
        params
    })
}