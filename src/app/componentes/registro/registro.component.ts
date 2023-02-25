import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PrincipalServicesService } from 'src/app/servicios/principalServices.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {
  title = 'adminApp';
  formR:FormGroup;
  constructor(
    private servicio:PrincipalServicesService,
    private router:Router
    ) {
    
    this.formR = new FormGroup({
      correo: new FormControl(),
      pass: new FormControl(),
      pass2: new FormControl()
    })
  }

  ngOnInit() {
    
  }

  Registrar(){      
    this.servicio.register(this.formR.value)
    .then(resp =>{
      console.log(resp);//Respuesta en caso de ser favorable
      console.log("Se ha registrado el usuario con exito.");
      //this.router.navigate(['/login']);
    })
    .catch(err=>console.log(err));//respuesta en caso de no ser favorable.  
  }

}
