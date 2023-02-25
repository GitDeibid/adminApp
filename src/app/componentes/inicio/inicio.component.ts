import { Serializer } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrincipalServicesService } from 'src/app/servicios/principalServices.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormGroup } from '@angular/forms';
import { ConfigServiceService } from 'src/app/servicios/config-service.service';

export interface sett{
  duracionIns:string;
  duracionScaner:string;
  frequency:string;
  nombre:string;
}


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  formEscaner:FormGroup;
  settings!:sett;

  constructor(private service:PrincipalServicesService, private router:Router, private config:ConfigServiceService) { 
    this.formEscaner=new FormGroup({
      //Agregar acá los componentes del formulario que se van creando como checkbox, listas, botones, etc.
    })
  }

  ngOnInit() {
    
      
  }

  Logout(){
    this.service.logout().then(()=>{
      this.router.navigate(['/login']);
    }).catch(err=>console.log(err));
  }

  Escanear(){
    console.log("Iniciar escaner");
    this.service.runEscaner();
    this.mostrar();

  }

  Detener(){
    console.log("Detener escaner");
    this.service.stopEscaner();
    this.ocultar();
  }

  loading(){
    this.service.getTiming().subscribe(t=>{
      this.settings=t as sett
      console.log(this.settings.duracionIns);  
    });
    
  }

  mostrar(){
    document.getElementById('spinner')!.style.display='inline';
  }
  ocultar(){
    document.getElementById('spinner')!.style.display='none';
  }
}
