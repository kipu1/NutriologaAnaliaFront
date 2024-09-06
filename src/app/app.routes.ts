import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaCursosComponent } from './components/lista-cursos/lista-cursos.component';
import { ListaCitasComponent } from './components/lista-citas/lista-citas.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AgendarCitaComponent } from './components/agendar-cita/agendar-cita.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthGuard } from './services/AuthGuard.service';
import { ServiciosComponent } from './components/servicios/servicios.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'agendar-cita', component: AgendarCitaComponent },
  { path: 'home', component: HomeComponent },
  { path: 'servicios', component: ServiciosComponent },

  {
    path: 'lista-citas',
    component: ListaCitasComponent,
    canActivate: [AuthGuard],
  }, // Solo si estás logueado
  { path: 'lista-cursos', component: ListaCursosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
