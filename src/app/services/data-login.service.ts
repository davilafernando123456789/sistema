import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataLoginService {
  private authToken: string | null = null;
  nombreUsuario: string = 'Sin Nombre.....!!!';

  // Define la URL base de la API
  private apiUrl = 'http://localhost:4000/api/usuario';

  constructor(private http: HttpClient) {}

  // // Método para establecer el token de autenticación
  setAuthToken(token: string) {
    this.authToken = token;
  }
  
  loginUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl + '/login', user);
  }

  // Método para registrar un nuevo usuario
  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl + '/create', usuario);
  }
}
