import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicCheckerService {


  constructor(private http: HttpClient ) { }

  getVidsByName(search_query: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/youtube/video-by-name?video_name=${search_query}`)
  }
  getVidsById(videoId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/youtube/video?video_id=${videoId}`)
  }

  getLicense(videoId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/youtube/video?video_id=${videoId}`)
  }

  likeVideo(videoId: string): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/youtube/music`, {video_id: videoId})
  }
}
