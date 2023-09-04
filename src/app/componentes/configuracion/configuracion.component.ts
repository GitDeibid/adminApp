import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigServiceService } from 'src/app/servicios/config-service.service';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { Ins } from '../../models/experimento';
import { MatDialog } from '@angular/material/dialog';
import { AddExperimentoComponent } from './add-experimento/add-experimento.component';
import { AddRolComponent } from './add-rol/add-rol.component';
import { MatTableDataSource } from '@angular/material/table';

export interface rol{
  Nombre:string;
}


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css'],
  
})


export class ConfiguracionComponent implements OnInit {
  formSetting:FormGroup;
  tEscaner!: string;
  fEscaner!: string;
  ffNombre!:String;
  dIns!:String;
  selecColeccion!:string;
  tEscanerOptions:string[] = ['10','30','50','90']//Parámetros entregados en segundos multiplicado spor 1000 en la app.
  fEscanerOptions:string[] = ['1','2','3','4','5']
  dInsOptions:string[] = ['5','10','15','20']
  ddlColection!:Ins[]
  prueba!:Ins
  faIcon1=faSquarePlus;
  dia: any;

  //confgi actual
  dur_escan_conf!:string;
  frec_conf!:string;
  coleccion_conf!:string;
  duracion_conf!:string;
  //
  displayedColumnsRol: string[] = ['Nombre','Acciones'];
  displayedColumnsIns: string[] = ['Nombre','Acciones'];

  dataR!:MatTableDataSource<any>;
  dataI!:MatTableDataSource<any>;

  constructor(
    public config:ConfigServiceService, dialog:MatDialog
  ) {
    this.formSetting = new FormGroup({
      tiempoEscaner: new FormControl(),
      frecEscaner: new FormControl(),
      Coleccion: new FormControl(),
      duracionIns: new FormControl()

    })
    this.dia=dialog;
  }
  ngOnInit() {

    this.config.getIns().subscribe(inst=>{//Obtiene el valor de la configuración al momento de cambiar en firestore.
      console.log(inst);
      this.ddlColection = inst;
      /*for (let index = 0; index < this.ddlColection.length; index++) {
        this.prueba=this.ddlColection[index];
        console.log(this.prueba.Nombre);
      }*/
    })

    this.config.getRoles().subscribe(r=>{
      //console.log(r as participante[]);
      this.dataR= new MatTableDataSource<rol>(r as rol[]);      
    })

    this.config.getIns().subscribe(b=>{
      this.dataI= new MatTableDataSource<Ins>(b);      
      
    })

    this.config.getConfig().subscribe(c=>{
      this.dur_escan_conf=c.payload.data()['duracionScaner'];
      this.frec_conf=c.payload.data()['frequency'];
      this.coleccion_conf=c.payload.data()['nombre'];
      this.duracion_conf=c.payload.data()['duracionIns'];

      console.log(c.payload.data()['duracionScaner']);
    })   
  }

  Actualizar(){
    //console.log(this.tEscaner,this.fEscaner, this.selecColeccion);
    this.config.setConfig(this.tEscaner,this.fEscaner, this.selecColeccion,this.dIns);
    this.config.getConfig().subscribe(data=>{//Obtiene el valor de la configuración al momento de cambiar en firestore.
      //console.log(data.payload.data()['duracionScaner']);
    })
    
  }

  choceExp(){
    //console.log("Boton presionado...");
    this.dia.open(AddExperimentoComponent);
  }

  choseRol(){
    this.dia.open(AddRolComponent);
  }

  BorrarRol(ID:string){
    if(confirm("¿Desea borar este rol? Su información será borrada y no podrá consultar por sus datos.")){
      this.config.deleteRol(ID);
      this.config.deleteParticipante(ID);
    }

    
  }
  BorrarIns(ID:string){
    if(confirm("¿Desea borrar la instancia?")){
      this.config.deleteIns(ID);
    }
    
  }
}
