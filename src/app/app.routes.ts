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
import { ConocemeComponent } from './components/conoceme/conoceme.component';
import { HistoriaClinicaComponent } from './components/historia-clinica/historia-clinica.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ListaServicioComponent } from './components/lista-servicio/lista-servicio.component';
import { CrearCursoComponent } from './components/crear-curso/crear-curso.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'agendar-cita', component: AgendarCitaComponent },
  { path: 'home', component: HomeComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'conoceme', component: ConocemeComponent },
  { path: 'historia-clinica', component: HistoriaClinicaComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'lista-servicio', component: ListaServicioComponent },
  { path: 'crear-curso', component: CrearCursoComponent },
  { path: 'lista-cursos', component: ListaCursosComponent },
  {
    path: 'lista-citas',
    component: ListaCitasComponent,
    canActivate: [AuthGuard],
  }, // Solo si estás logueado
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
