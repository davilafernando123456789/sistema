import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearProductosComponent } from './pages/productos/crear-productos/crear-productos.component';
import { ListarProductosComponent } from './pages/productos/listar-productos/listar-productos.component';
import { EditarProductosComponent } from './pages/productos/editar-productos/editar-productos.component';
import { CreateUsersComponent } from './pages/users/create-users/create-users.component';
import { LoginComponent } from './pages/users/login/login.component';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'crear-usuario', component: CreateUsersComponent },
  { path: 'listar-productos', component: ListarProductosComponent },
  { path: 'crear-productos', component: CrearProductosComponent },
  { path: 'editar-producto/:id', component: EditarProductosComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
