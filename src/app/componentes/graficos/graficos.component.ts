import { Component, OnInit } from '@angular/core';
import { multi } from './data';
import { ConfigServiceService } from 'src/app/servicios/config-service.service';
import { sort } from 'd3';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  multi!:any[];
  view: [number,number] = [1200, 600];

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
    
    this.sdata.getResultados('7e2f4e31bb6da08b','PruebaSprint2-DIICC200623').subscribe(r=>{
      console.log(r[0]);
      var arr=[];
      var sort_arr=[];

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

      /* arr.sort((a,b)=>{
        var dtA:any=parseDatetime(a[1]);
        var dtB:any=parseDatetime(b[1]);
        return dtA-dtB;
      }); */
      arr.sort((a,b)=>{//Orden de menor a mayor de tiempo en segundos.
        var dtA:number=a[1];
        var dtB:number=b[1];
        return dtA-dtB;
      });
      console.log(arr);
    });//agregar manualmente los parámetros.
    
  }

  onSelect(data:any) {
    console.log(data);
  }

  
}
