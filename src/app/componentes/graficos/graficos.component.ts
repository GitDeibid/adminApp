import { Component, OnInit } from '@angular/core';
import { multi } from './data';
import { ConfigServiceService } from 'src/app/servicios/config-service.service';
import { count, sort } from 'd3';
import {participante} from '../../models/participante'
import { switchMap } from 'rxjs';
import { Ins } from 'src/app/models/experimento';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  par!:participante[]
  ins!:any

  multi!:any[];
  view: [number,number] = [1200, 100];
  data_g:any=[];
  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };

  constructor( public sdata:ConfigServiceService) {
    Object.assign(this, { multi });


  }

  ngOnInit(): void {
    
    this.sdata.getIns().subscribe(d=>{
      console.log("Instancias: ");
      console.log(d);
      this.ins=d;
    })
/* 
    this.sdata.getParticipante().subscribe(p=>{
      console.log("Participantes: ");
      console.log(p);
      this.par=p;
    }) */

    this.sdata.getIns().pipe(
      switchMap(insRes => {
        console.log(insRes)
        this.ins=insRes;
        return this.sdata.getParticipante();
      })
    ).subscribe(par=>{

      this.getData(par, this.ins[4]);//Una instancia en particular.
    })

    //this.getData(this.par,this.ins);
    this.sdata.getResultados('7e2f4e31bb6da08b','PruebaSprint2-DIICC200623').subscribe(r=>{
      console.log(r[0]);
      var arr=[];
      
      var serie=[];
      var tiempo_acum=0;      

      function parseDatetime(datetimeString:string) {
        const [datePart, timePart] = datetimeString.split(' ');
        const [day, month, year] = datePart.split('/');
        const [hours, minutes, seconds] = timePart.split(':');
        
        // Month is 0-based in JavaScript's Date, so subtract 1 from the month
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes), parseInt(seconds));
      }

      
      for (var i in r) {    
        var dt:Date = parseDatetime(r[i]['Fecha']);
        var h:number=dt.getHours();
        var m:number=dt.getMinutes();
        var s:number=dt.getSeconds();
        var totalsec = (h*3600+m*60+s);

        arr.push([r[i]['Nombre'],totalsec,r[i]['Rol']]);

      }

      arr.sort((a,b)=>{//Orden de menor a mayor de tiempo en segundos.
        var dtA:number=a[1];
        var dtB:number=b[1];
        return dtA-dtB;
      });

      console.log(arr);
      //Recorrer arreglo y acumular el tiempo que estuvo el dispositivo en cada estación.
      for (let index = 0; index < arr.length-1; index++) {
        let lec_actual = arr[index];
        let lec_siguiente = arr[index+1];
        
        tiempo_acum += lec_siguiente[1]-lec_actual[1];
        if (lec_actual[0] != lec_siguiente[0]){
          if(tiempo_acum>=20){
              //Añadir serie.
            let name = lec_actual[0];
            let value = tiempo_acum;
            serie.push({"name":name,"value":value});
            tiempo_acum = 0//Reestablecer valor del acumulador de tiempo
          }
          tiempo_acum = 0//Reestablecer valor del acumulador de tiempo          
        }
      }
      //Crear data:
      this.data_g.push({"name":arr[0][2],"series":serie});
      this.data_g=[...this.data_g];
      console.log(this.data_g);
    });//agregar manualmente los parámetros. */
    
  }

  onSelect(data:any) {
    //console.log(data);
  }

  makeChart(){
    
  }

  getData(participantes:participante[],instancia:Ins){
    //console.log(participantes);
    console.log(instancia);
    for (const participante of participantes) {
      this.sdata.getResultados(participante.MAC!!,instancia.Nombre!!.toString()).subscribe(async r=>{
        console.log(r[0]);
      })
      
    }
  }

  
}
