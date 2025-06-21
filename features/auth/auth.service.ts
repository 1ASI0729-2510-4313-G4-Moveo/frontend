import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'https://682838426b7628c529129386.mockapi.io/api/users';

    constructor(private http: HttpClient) {}


    login(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }


    register(user: any) {
        return this.http.post(this.apiUrl, {
            email: user.email,
            password: user.password,
            name: user.name,
            phone: user.phone,
            type: user.type // 'user' o 'provider'
        });
    }
}
