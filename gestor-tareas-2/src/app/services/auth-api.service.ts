import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { Auth } from "../models/auth.model";
import { Injectable } from "@angular/core";

interface AutResponse {token:string}

@Injectable({ providedIn: 'root' })
export class AuthApiService {
    private readonly TOKEN_KEY = 'token';
    private baseUrl = 'http://localhost:8080/api/v1/auth/login';
    constructor(private http: HttpClient) { }
    private token = "";



    login(user: Auth): void {
        this.http.post<AutResponse>(this.baseUrl, user).pipe(
            tap(res => {
                localStorage.setItem(this.TOKEN_KEY, res.token);
            }))

    }

    getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }

}