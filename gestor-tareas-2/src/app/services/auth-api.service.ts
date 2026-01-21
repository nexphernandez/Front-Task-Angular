import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Auth } from "../models/auth.model";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthApiService {
    private baseUrl = 'http://localhost:8080/api/v1/auth/login';
    constructor(private http: HttpClient) { }

    login(user:Auth):Observable<string>{
        return this.http.post<string>(this.baseUrl,user);
    }
}