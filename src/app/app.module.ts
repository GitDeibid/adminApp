import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth,Auth } from '@angular/fire/auth';
import { RegistroComponent } from './componentes/registro/registro.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
//Angular Material modules.
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule} from '@angular/material/select';
import { MatButtonModule} from '@angular/material/button';
import { MatTableModule} from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
//----------------------------
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';//Añadir este objeto de proveedor es escencial para poder utilizar ciertas funcionalidades injectables de firebase. Como editar documento.
import { MatDialogModule } from '@angular/material/dialog';
import { AddExperimentoComponent } from './componentes/configuracion/add-experimento/add-experimento.component';
import { AddRolComponent } from './componentes/configuracion/add-rol/add-rol.component';
import { ResultadosComponent } from './componentes/resultados/resultados.component';
import { DispositivosComponent } from './componentes/dispositivos/dispositivos.component';


@NgModule({
  declarations: [	
    AppComponent,
    RegistroComponent,
    InicioComponent,
    LoginComponent,
    ConfiguracionComponent,
    AddExperimentoComponent,
    ResultadosComponent,
    DispositivosComponent,
    AddRolComponent
   ],
   entryComponents:[AddExperimentoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule,
    FormsModule,
    FontAwesomeModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatProgressBarModule
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],//También se debe añadir esta sección.
  bootstrap: [AppComponent]
})
export class AppModule { }
