let apiKey = process.env.API_KEY
apiKey = "AIzaSyBlGOTVOA6GXpuRiv5rNxpqie1qfni1JlM"
const BASE_URL = "https://www.googleapis.com/youtube/v3"
import axios from "axios"


export class YoutubeService {
    async getVideos(query: string): Promise<any> {
        const url = `${BASE_URL}/search?part=snippet&type=video&q=${query}&key=${apiKey}`
        console.log(url)
        const response = await axios.get(url)
        return response.data
    }

    async getVideoDetails(videoId: string): Promise<any> {
        const url = `${BASE_URL}/videos?part=snippet&id=${videoId}&key=${apiKey}`
        const response = await axios.get(url)
        return response.data
    }
    async getVideoLicense(videoId: string): Promise<any> {
        const url = `${BASE_URL}/videos?part=contentDetails&id=${videoId}&key=${apiKey}`
        const response = await axios.get(url)
        return response.data
    }
    extractVideoId(url: string): string {
        const videoId = url.split("v=")[1]
        return videoId 
    }
    async getVideoLicenseByVideoName(videoName: string): Promise<any> {
        const API_KEY = apiKey; // Replace with your actual API key
        const url = `${BASE_URL}/search?part=snippet&q=${encodeURIComponent(videoName)}&key=${API_KEY}&type=video`;
    
        try {
            const response = await axios.get(url);
            const data = response.data;
    
            if (data.items && data.items.length > 0) {
                const videoId = data.items[0].id.videoId;
    
                // Fetch video details to get the license information
                const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${API_KEY}`;
                const detailsResponse = await axios.get(detailsUrl);
                const videoDetails = detailsResponse.data;
    
                if (videoDetails.items && videoDetails.items.length > 0) {
                    const license = videoDetails.items[0].contentDetails.licensedContent;
                    return {
                        videoId,
                        license,
                        url: `https://youtube.com/embed/${videoId}`,
                    };
                } else {
                    throw new Error('No video details found.');
                }
            } else {
                throw new Error('No videos found.');
            }
        } catch (error:any) {
            console.error('Error fetching video license:', error.message);
            throw error;
        }
    }
    // async getVideoInfo(video_id:string): Promise <any> {
    //     const url = `${BASE_URL}/videos?`
    // }
}