import { Component, OnInit } from '@angular/core';
import { multi } from './data';
import { ConfigServiceService } from 'src/app/servicios/config-service.service';

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
    });//agregar manualmente los parámetros.
    
  }

  onSelect(data:any) {
    console.log(data);
  }

}
