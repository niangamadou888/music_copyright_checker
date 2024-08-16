import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }


  registerUser(data: any): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/users`, data)
  }

  login(data: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/auth/login', data)
  }

}
