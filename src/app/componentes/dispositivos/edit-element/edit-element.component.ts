import { ConfigurableFocusTrapConfig } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfigServiceService } from 'src/app/servicios/config-service.service';

@Component({
  selector: 'app-edit-element',
  templateUrl: './edit-element.component.html',
  styleUrls: ['./edit-element.component.css']
})
export class EditElementComponent implements OnInit {
  formEdit:FormGroup;
  editMac!:String;//Editar MAC del beacon
  editNombre!:String;//Editar nombre asignado al beacon.
  dia!:any;

  constructor(public config:ConfigServiceService, dialog:MatDialog) { 
    this.formEdit=new FormGroup({
      serie: new FormControl(),
      nombre: new FormControl()

      //Agregar acá los componentes del formulario que se van creando como checkbox, listas, botones, etc.
    })
    this.dia=dialog;
  }

  ngOnInit() {
    
  }

  save_changes(){
    this.editMac=this.formEdit.value.nombre;
    this.editNombre = this.formEdit.value.serie;
    if(this.editMac!= null){
      this.config.setIns(this.editMac).then(()=>{
        return true;
      }).catch(err=>console.log(false));   
    }         
  }

}
