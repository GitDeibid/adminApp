import { Serializer } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrincipalServicesService } from 'src/app/servicios/principalServices.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormGroup } from '@angular/forms';
import { ConfigServiceService } from 'src/app/servicios/config-service.service';
import { faLongArrowDown } from '@fortawesome/free-solid-svg-icons';

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
  tiempo:number= 300000;
  progreso:number=0;
  
  //Cronometro
  displayTime: string = '00:00:00';
  isRunning: boolean = false;
  startTime: number=0;
  intervalId: any;

  
  constructor(private service:PrincipalServicesService, private router:Router, private config:ConfigServiceService) { 
    this.formEscaner=new FormGroup({
      //Agregar acá los componentes del formulario que se van creando como checkbox, listas, botones, etc.
    })
  }

  ngOnInit() {
    //this.com.btn_visible=true;
    this.obtenerConfig();
    //this.tiempo = parseInt(this.settings.duracionIns)*60000;  
  }

  Logout(){
    this.service.logout().then(()=>{
      this.router.navigate(['/login']);
    }).catch(err=>console.log(err));
  }

  Escanear(){
    console.log("Iniciar escaner");
    this.service.getTiming().subscribe(t=>{
      this.settings=t as sett
      var time = parseInt(this.settings.duracionIns,10);
      console.log(time*60000);
      this.tiempo=time*60000

      this.service.runEscaner(this.settings.nombre);//Se necesita la ID de la instancia y no el nombre.
      this.mostrar();
      setTimeout(this.ocultar,this.tiempo);   
    });
      

  }

  Detener(){
    console.log("Detener escaner");
    this.service.stopEscaner(this.settings.nombre);
    this.ocultar();
    //clearInterval(this.exe);
    this.stopChronometer();
  }

  obtenerConfig(){
    this.service.getTiming().subscribe(t=>{
      this.settings=t as sett      
      console.log(this.settings.duracionIns);  
    });
    
  }

  mostrar(){    
    document.getElementById('spinner')!.style.display='inline';
    /*this.progreso=0;
    this.progreso+=1
    this.exe = setInterval(()=>{
      this.progreso+=1
      if(this.progreso>=100){
        this.progreso=100;
        console.log(this.progreso);
        clearInterval(this.exe);
        this.service.stopEscaner();
      }
    },(this.tiempo)/100);*/

    this.startChronometer();

  }

  ocultar(){
    document.getElementById('spinner')!.style.display='none';
  }

  startChronometer() {
    if (!this.isRunning) {
      this.startTime = Date.now() - (this.startTime || 0);
      console.log(this.startTime);
      this.intervalId = setInterval(() => {
        this.displayTime = this.formatTime(Date.now() - this.startTime);
      }, 10);
      this.isRunning = true;
    }

  }

  stopChronometer() {
    if (this.isRunning) {
      clearInterval(this.intervalId);
      this.isRunning = false;
      this.displayTime='00:00:00';      
    }
  }

  formatTime(milliseconds: number): string {
    const date = new Date(milliseconds);
    return date.toISOString().substring(19,12);
  }

}
