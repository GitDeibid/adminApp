import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfigServiceService } from 'src/app/servicios/config-service.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { Ins } from '../../models/experimento';
import { participante } from '../../models/participante'
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
  tEscanerOptions:string[] = ['10','15','20','25','30']
  fEscanerOptions:string[] = ['1','2','3','4','5']
  dInsOptions:string[] = ['5','10','15','20']
  ddlColection!:Ins[]
  prueba!:Ins
  faIcon1=faSquarePlus;
  dia: any;

  displayedColumnsRol: string[] = ['Nombre'];
  displayedColumnsIns: string[] = ['Nombre'];

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
      //console.log(inst);
      this.ddlColection = inst;
      /*for (let index = 0; index < this.ddlColection.length; index++) {
        this.prueba=this.ddlColection[index];
        console.log(this.prueba.Nombre);
      }*/
    })

    this.config.getRoles().subscribe(r=>{
      console.log(r as participante[]);
      this.dataR= new MatTableDataSource<rol>(r as rol[]);      
    })

    this.config.getIns().subscribe(b=>{
      this.dataI= new MatTableDataSource<Ins>(b);      
      
    })
  }

  Actualizar(){
    console.log(this.tEscaner,this.fEscaner, this.selecColeccion);
    this.config.setConfig(this.tEscaner,this.fEscaner, this.selecColeccion,this.dIns);
    this.config.getConfig().subscribe(data=>{//Obtiene el valor de la configuración al momento de cambiar en firestore.
      console.log(data.payload.data()['duracionScaner']);
    })
    
  }

  choceExp(){
    //console.log("Boton presionado...");
    this.dia.open(AddExperimentoComponent);
  }

  choseRol(){
    this.dia.open(AddRolComponent);
  }
}
