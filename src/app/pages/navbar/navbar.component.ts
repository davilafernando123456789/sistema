import { Component } from '@angular/core';
import { DataLoginService } from 'src/app/services/data-login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  nombre: string = 'Sin nombre';

  constructor(private loginService: DataLoginService) {
    this.nombre = this.loginService.nombreUsuario
   }

}
