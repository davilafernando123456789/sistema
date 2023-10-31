import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataLoginService } from 'src/app/services/data-login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private dataLoginService: DataLoginService
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  loginUser() {
    const USER = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
  
    this.dataLoginService.loginUser(USER).subscribe(
      (response: any) => {
        if (response.auth) {
          // Autenticación exitosa
          const authToken = response.token;
          // Almacena el token en el servicio o en localStorage, según tus necesidades
          // Redirige al usuario a la página de lista de productos
          this.router.navigate(['/listar-productos']);
        } else {
          this.handleErrorResponse(response);
        }
      },
      (error) => {
        this.handleErrorResponse(error);
      }
    );
  }
  
  private handleErrorResponse(response: any) {
    if (response.status === 401) {
      Swal.fire('Error', 'Credenciales incorrectas', 'error');
    } else if (response.status === 404) {
      Swal.fire('Error', 'Usuario no encontrado', 'error');
    } else {
      Swal.fire('Error', 'Hubo un error', 'error');
    }
  }
  
}

    // this.dataLoginService.loginUser(USER).subscribe(
    //   (response: any) => {
    //     if (response.auth) {
    //       // Autenticación exitosa
    //       const authToken = response.token;
    //       // Almacena el token en el servicio o en localStorage, según tus necesidades
    //       // Redirige al usuario a la página de lista de productos
    //       this.router.navigate(['/listar-productos']);
    //     } else {
    //       // Mostrar mensaje de error basado en el tipo de error
    //       if (response.error === "contraseña incorrecta") {
    //         Swal.fire('Error', 'Contraseña incorrecta', 'error');
    //       } else if (response.error === "usuario no encontrado") {
    //         Swal.fire('Error', 'Usuario no encontrado', 'error');
    //       } else {
    //         Swal.fire('Error', 'Hubo un error', 'error');
    //       }
    //     }
    //   },
    //   (error) => {
    //     // Mostrar mensaje de error genérico
    //     Swal.fire('Error', 'Ocurrió un error al iniciar sesión', 'error');
    //   }
    // );

