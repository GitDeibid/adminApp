import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrincipalServicesService } from './servicios/principalServices.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'adminApp';
  navAbierto = false;
  faBars=faBars;
  constructor(private service:PrincipalServicesService, private router:Router){

  }
  Logout(){
    this.service.logout().then(()=>{
      this.router.navigate(['/login']);
    }).catch(err=>console.log(err));
  }
}
