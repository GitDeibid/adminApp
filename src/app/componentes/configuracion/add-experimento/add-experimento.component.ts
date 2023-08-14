import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfigServiceService } from 'src/app/servicios/config-service.service';

@Component({
  selector: 'app-add-experimento',
  templateUrl: './add-experimento.component.html',
  styleUrls: ['./add-experimento.component.css']
})
export class AddExperimentoComponent implements OnInit {
  formExp:FormGroup;
  ffNombre!:String;  
  dia!:any;
  constructor(public config:ConfigServiceService, dialog:MatDialog) { 
    this.formExp=new FormGroup({
      nombre_exp: new FormControl()
      //Agregar acá los componentes del formulario que se van creando como checkbox, listas, botones, etc.
    })
    this.dia=dialog;
  }

  ngOnInit() {
  }
  save_exp(){
    this.ffNombre=this.formExp.value.nombre_exp;
    if(this.ffNombre!= null){
      this.config.setIns(this.ffNombre).then(()=>{
        return true;
      }).catch(err=>console.log(false));   
    }         
  }
}
