import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';//guard para impedir el acceso a usuarios no autenticados.
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { ResultadosComponent } from './componentes/resultados/resultados.component';
import { DispositivosComponent } from './componentes/dispositivos/dispositivos.component';
import { GraficosComponent } from './componentes/graficos/graficos.component';

const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'/inicio'},
  {path:'login',component:LoginComponent},
  {path:'registro',component:RegistroComponent},
  {path: 'config',component:ConfiguracionComponent},
  {path:'disp',component:DispositivosComponent},
  {path:'result',component:ResultadosComponent},
  {path:'inicio',component:InicioComponent},
  {path:'graf',component:GraficosComponent}
  //{path:'inicio',component:InicioComponent,...canActivate(()=>redirectUnauthorizedTo(['/login']))}//Si el usuario no está autorizado, entonces seremos redireccionados a login.

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
