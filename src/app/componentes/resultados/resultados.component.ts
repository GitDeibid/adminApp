import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigServiceService } from 'src/app/servicios/config-service.service';
import { resultado } from '../../models/resultados';
import { participante } from '../../models/participante'

/*export interface participante{
  Nombre:string;
}*/

export interface instancia{
  Nombre:string;
}

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {

  selectRol!:string;
  selectIns!:string;
  roles!:participante[];
  instancias!:instancia[];

  displayedColumns: string[] = ['fecha', 'nombre', 'rol', 'rssi'];

  results!:any[];
  dataR!:MatTableDataSource<any>;


  formSearch!:FormGroup;
  /*roles=[{value:'1', viewValue:'a'},
          {value:'2', viewValue:'b'},
          {value:'3', viewValue:'c'}
        ];

  instancias=[ {value:'1', viewValue:'a'},
          {value:'2', viewValue:'b'},
          {value:'3', viewValue:'c'}
  ];*/
  constructor(public rdata:ConfigServiceService) { 

    this.formSearch= new FormGroup({
      rol: new FormControl(),
      instancia: new FormControl()

    });
  }

  ngOnInit() {
    this.rdata.getParticipante().subscribe(r=>{//Obtiene el valor de la configuración al momento de cambiar en firestore.
      //console.log(typeof(r));
      this.roles=r as participante[];
      //console.log(this.roles[0]);
      /*for (let index = 0; index < this.ddlColection.length; index++) {
        this.prueba=this.ddlColection[index];
        console.log(this.prueba.Nombre);
      }*/
    })
    this.rdata.getIns().subscribe(i=>{//Obtiene el valor de la configuración al momento de cambiar en firestore.
      //console.log(typeof(i));
      this.instancias=i as instancia[];
      //console.log(this.instancias[0]);
      /*for (let index = 0; index < this.ddlColection.length; index++) {
        this.prueba=this.ddlColection[index];
        console.log(this.prueba.Nombre);
      }*/
    })
  }

  Buscar(){
    console.log(this.selectRol,this.selectIns);
    this.rdata.getParticipante
    this.rdata.getResultados(this.selectRol,this.selectIns).subscribe(res=>{
      console.log(res[0]);
      this.results=res;
      this.dataR= new MatTableDataSource<resultado>(this.results);      
      
    })
  }

}
