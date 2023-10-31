import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataLoginService {
  private authToken: string | null = null;
  nombreUsuario: string = 'Sin Nombre';

  // Define la URL base de la API
  private apiUrl = 'http://localhost:4000/api/usuario';

  constructor(private http: HttpClient) {}

  // Método para establecer el token de autenticación
  setAuthToken(token: string) {
    this.authToken = token;
  }
  
  loginUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl + '/login', user).pipe(
      map((response: any) => {
        if (response.auth) {
          // Actualiza el nombre de usuario si el inicio de sesión es exitoso
          this.nombreUsuario = response.username; // Asigna el valor de 'username' desde la respuesta
        }
        return response;
      })
    );
  }

  // Método para registrar un nuevo usuario
  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl + '/create', usuario).pipe(
      map((response: any) => {
        if (response.auth) {
          // Actualiza el nombre de usuario si el registro es exitoso
          this.nombreUsuario = response.username; // Asigna el valor de 'username' desde la respuesta
        }
        return response;
      })
    );
  }
}
