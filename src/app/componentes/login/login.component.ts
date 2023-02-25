import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PrincipalServicesService } from 'src/app/servicios/principalServices.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {  
  title = 'adminApp';
  formL:FormGroup;
//inclusion del servicio.     
  constructor(
    private servicio:PrincipalServicesService,
    private router:Router
    ) {
    
    this.formL = new FormGroup({
      correo: new FormControl(),
      pass: new FormControl()
    })
  }

  ngOnInit() {
  }  

  Login(){
    this.servicio.login(this.formL.value)
    .then(resp =>{
      console.log(resp);//Respuesta en caso de ser favorable
      this.router.navigate(['/inicio']);
    })
    .catch(err=>{
      console.log(err);
      console.log("La autenticación ha fallado.")
    })//respuesta en caso de no ser favorable.
  }

}
