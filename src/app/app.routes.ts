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
import { VerListaCursoComponent } from './components/ver-lista-curso/ver-lista-curso.component';
import { VerListaServicioComponent } from './components/ver-lista-servicio/ver-lista-servicio.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'loginana', component: LoginComponent },
  { path: 'registroana', component: RegistroComponent },
  { path: 'agendar-cita', component: AgendarCitaComponent },
  { path: 'home', component: HomeComponent },
  { path: 'conoceme', component: ConocemeComponent },
  { path: 'lista-cursos', component: ListaCursosComponent },
  { path: 'lista-servicio', component: ListaServicioComponent },

  // Rutas protegidas (requieren estar logueado)
  {
    path: 'servicios',
    component: ServiciosComponent,
    canActivate: [AuthGuard], // Protegida
  },
  {
    path: 'historia-clinica',
    component: HistoriaClinicaComponent,
    canActivate: [AuthGuard], // Protegida
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard], // Protegida
  },
  {
    path: 'crear-curso',
    component: CrearCursoComponent,
    canActivate: [AuthGuard], // Protegida
  },
  {
    path: 'lista-citas',
    component: ListaCitasComponent,
    canActivate: [AuthGuard], // Protegida
  },
  {
    path: 'ver-lista-curso',
    component: VerListaCursoComponent,
    canActivate: [AuthGuard], // Protegida
  },
  {
    path: 'ver-lista-servicio',
    component: VerListaServicioComponent,
    canActivate: [AuthGuard], // Protegida
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
