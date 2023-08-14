import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfigServiceService } from 'src/app/servicios/config-service.service';


@Component({
  selector: 'app-add-rol',
  templateUrl: './add-rol.component.html',
  styleUrls: ['./add-rol.component.css']
})
export class AddRolComponent implements OnInit {
  formRol:FormGroup;
  ffNombre_rol!:String;  
  dia!:any;
  
  constructor(public config:ConfigServiceService, dialog:MatDialog) { 
    this.formRol=new FormGroup({
      nombre_rol: new FormControl()
      //Agregar acá los componentes del formulario que se van creando como checkbox, listas, botones, etc.
    })
    this.dia=dialog;
  }

  ngOnInit() {
  }

  save_rol(){
    
    this.ffNombre_rol=this.formRol.value.nombre_rol;
    if(this.ffNombre_rol!= null){
      this.config.setRoles(this.ffNombre_rol).then(()=>{
        return true;
      }).catch(err=>console.log(false));   
    }         
  }

}
