import { Component, OnInit } from '@angular/core';
import { DataLoginService } from 'src/app/services/data-login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  nombreUsuario: string = 'Sin Nombre';

  constructor(private loginService: DataLoginService) {}

  ngOnInit() {
    this.nombreUsuario = this.loginService.nombreUsuario;
  }
}
