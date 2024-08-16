import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MusicCheckerService {


  constructor(private http: HttpClient ) { }

  getVids(search_query: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/youtube/search?search_query=${search_query}`)
  }

  getLicense(videoId: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/youtube/video?video_id=${videoId}`)
  }
}
