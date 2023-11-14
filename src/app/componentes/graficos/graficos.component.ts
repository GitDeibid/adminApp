import { Component, Input, OnInit } from '@angular/core';
import { multi } from './data';
import { ConfigServiceService } from 'src/app/servicios/config-service.service';
import { count, sort } from 'd3';
import {participante} from '../../models/participante'
import { switchMap } from 'rxjs';
import { Ins } from 'src/app/models/experimento';
import { arrow } from '@popperjs/core';
import { instancia } from '../resultados/resultados.component';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {
  @Input() SelIns:string;
  par:string[]=[]//Participantes (celulares)
  ubicaciones:string[]=[]//Ubicaciones (beacons)
  ins!:any

  multi!:any[];
  view: [number,number] = [1500, 300];
  

  // General options options--
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;

  //Time grafico
  data_t:any=[];
  yAxisLabel: string = 'Participante';
  xAxisLabel: string = 'Tiempo (segundos)';

  //Qty grafico
  data_q:any=[];
  yAxisLabel2: string = 'Rango';
  xAxisLabel2: string = 'N° Visitas';

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };

  constructor( public sdata:ConfigServiceService) {
    Object.assign(this, { multi });


  }

  ngOnInit(): void {
  
    this.par=this.participantesArr();
    this.ubicaciones= this.ubicacionesArr();
    console.log(this.ubicaciones);
  }

  graficar(){
    let endTime="";
    console.log(this.ubicaciones);    
    this.sdata.getOneIns(this.SelIns).subscribe(r=>{
      //console.log(r[0]['fin']);
      endTime=r[0]['fin'];
      this.procesarSeries(this.par,this.SelIns,endTime,1);
      this.procesarSeries(this.par,this.SelIns,endTime,2);
    });
    
  }

  onSelect(data:any) {
    //console.log(data);
  }

  makeChart(){
    
  }

  getTime(time:string){
    let seg=0;
    if(time.split(' ').length>1){
      const [,hora_str] = time.split(' ');
      const [h,m,s] = hora_str.split(':').map(Number);
      seg=h*3600+m*60+s;
    }else{
      const [h,m,s] = time.split(':').map(Number);
      seg=h*3600+m*60+s;
    }
    return seg;
  }

  getSerie(arr:any,opt:number):void{

    var serie=[];
    var name:string;

    if (opt==1) {
      var tiempo_acum=0;
      //Recorrer arreglo y acumular el tiempo que estuvo el dispositivo en cada estación.
      for (let index = 0; index < arr.length-1; index++) {
        let lec_actual = arr[index];
        let lec_siguiente = arr[index+1];
        
        tiempo_acum += lec_siguiente[1]-lec_actual[1];

        if(tiempo_acum>=20){
          //Añadir serie.
          let name = lec_actual[0];
          let value = tiempo_acum;
          serie.push({"name":name,"value":value});
          tiempo_acum = 0//Reestablecer valor del acumulador de tiempo
        }else{
          //Que sucede si estoy menos de 20 seg en una posición.
          
        }                   
      }
      name = arr[0][2];
      this.data_t.push({"name":name,"series":serie});
      this.data_t=[...this.data_t];
    }else if(opt==2){
      let contador=0;
      let ubicacion="";
      for (var u in this.ubicaciones) {
        //const element = arr[index];
        //console.log(this.ubicaciones[u]);
        ubicacion=this.ubicaciones[u];
        for(var i in arr){
          if(ubicacion==arr[i][0]){
            contador+=1;
          }
        }
        if(contador>0){
          serie.push({"name":ubicacion,"value":contador});
        }
        contador=0;      
      }
      name = arr[0][2];
      this.data_q.push({"name":name,"series":serie});
      this.data_q=[...this.data_q];
    }  
    
    
    //return {"name":arr[0][2],"series":serie};
  }

  async procesarSeries(idPar:string[],InsName:string,fin:string,op:number){

    for(var p in idPar){      
      this.sdata.getResultados(idPar[p],InsName).subscribe(ress=>{
        var arr:any=[];
        for (var i in ress) {
          const segundos=this.getTime(ress[i]['Fecha'].toString());      
          arr.push([ress[i]['Nombre'],segundos,ress[i]['Rol']]);
        }
        var last_p = arr.length-1;//Posicion del ultimoelemento de la lista arr.        
        const fin_seg=this.getTime(fin);//Obtener en segundo el final del ensayo.
        if (arr.length >0 && op==1){          
          arr[last_p][1]=fin_seg;//asignar el tiempo final del ensayo al ultimo elemento de lalista de valores arr.
          this.getSerie(arr,1);
          //this.data_g.push(this.getSerie(arr,1));
        }else if(arr.length>0 && op==2){
          this.getSerie(arr,2)
        }
        
      }); 
    }        
    
  }

  participantesArr(){
    let arr:string[]=[]
    this.sdata.getParticipante().subscribe(p=>{
      for(var i in p){
        arr.push(p[i]['MAC'].toString());
      }
    });
    return arr;
  }

  ubicacionesArr(){
    let arr:string[]=[];
    this.sdata.getBeacon().subscribe(b=>{
      for(var i in b){
        arr.push(b[i]['Nombre'].toString());
      }
    })
    return arr;
  }
  
}
