import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataLoginService } from 'src/app/services/data-login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  createUserForm: FormGroup;
  showPasswordMismatchError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataLogin: DataLoginService
  ) {
    this.createUserForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required]
    }, 
    {
      validator: this.passwordsMatchValidator
    });
  }

  createUser() {
    const passwordsMatch = this.createUserForm.hasError('passwordsNotMatch');

    if (passwordsMatch) {
      this.showPasswordMismatchError = true;
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

    this.showPasswordMismatchError = false; // Restablecer la propiedad en caso de que las contraseñas coincidan

    const newUser = this.createUserForm.value;

    this.dataLogin.registrarUsuario(newUser).subscribe(
      (response: any) => {
        if (response.auth) {
          const authToken = response.token;
          if (authToken) {
            this.dataLogin.setAuthToken(authToken);
            this.router.navigate(['/listar-productos']);
          } else {
            this.handleSuccessResponse();
          }
        } else {
          this.handleErrorResponse(response);
        }
      },
      (error) => {
        this.handleErrorResponse(error);
      }
    );
  }

  private handleSuccessResponse() {
    Swal.fire('Éxito', 'Usuario creado correctamente', 'success');
  }
  
  private handleErrorResponse(response: any) {
    if (response.status === 400) {
      Swal.fire('Error', 'Campos obligatorios faltantes', 'error');
    } else if (response.status === 409) {
      Swal.fire('Error', 'Usuario ya existe', 'error');
    } else {
      Swal.fire('Error', 'Hubo un error', 'error');
    }
  }
  
  private passwordsMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const repeatPassword = formGroup.get('repeatPassword')?.value;

    if (password === repeatPassword) {
      return null; // Las contraseñas coinciden
    } else {
      formGroup.get('repeatPassword')?.setErrors({ passwordsNotMatch: true });
      return { passwordsNotMatch: true }; // Las contraseñas no coinciden
    }
  }
}


//   createUser() {
//     const newUser = this.createUserForm.value;

//     this.dataLogin.registrarUsuario(newUser).subscribe(
//       (response: any) => {
//         const authToken = response.token;
//         if (authToken) {
//           this.dataLogin.setAuthToken(authToken);
//           this.router.navigate(['/listar-productos']);
//         } else {
//           Swal.fire('Error', 'No se pudo crear el usuario', 'error');
//         }
//       },
//       (error) => {
//         // console.error('Error al crear el usuario', error);
//         Swal.fire('Error', 'Ocurrió un error al crear el usuario', 'error');
//       }
//     );
//   }
// }
