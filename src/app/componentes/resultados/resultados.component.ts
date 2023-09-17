import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup , FormControl} from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ConfigServiceService } from 'src/app/servicios/config-service.service';
import { resultado } from '../../models/resultados';
import { participante } from '../../models/participante'
import * as XLSX from 'xlsx';
import { MatPaginator } from '@angular/material/paginator';
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
export class ResultadosComponent implements OnInit,AfterViewInit {

  selectRol!:string;
  selectIns!:string;
  roles!:participante[];
  instancias!:instancia[];

  displayedColumns: string[] = ['fecha', 'nombre', 'rol', 'rssi'];

 
  results!:any[];
  //dataR!:MatTableDataSource<any>;
  dataR = new MatTableDataSource<resultado>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(){
    this.dataR.paginator=this.paginator;
  }
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
      console.log(this.roles[0]);
      /*for (let index = 0; index < this.ddlColection.length; index++) {
        this.prueba=this.ddlColection[index];
        console.log(this.prueba.Nombre);
      }*/
    })
    this.rdata.getIns().subscribe(i=>{//Obtiene el valor de la configuración al momento de cambiar en firestore.
      //console.log(typeof(i));
      this.instancias=i as instancia[];
      console.log(this.instancias[0]);
      /*for (let index = 0; index < this.ddlColection.length; index++) {
        this.prueba=this.ddlColection[index];
        console.log(this.prueba.Nombre);
      }*/
    })
    this.rdata.getRoles().subscribe(j=>{
      console.log(j);
    })
  }

  Buscar(){
    
    console.log(this.selectRol,this.selectIns);
    /* this.rdata.getParticipante
    this.rdata.getResultados(this.selectRol,this.selectIns).subscribe(res=>{
      console.log(res[0]);
      this.results=res;
      this.dataR= new MatTableDataSource<resultado>(this.results);
      this.dataR.paginator=this.paginator;  
      
    }) */
    
  }

  exportToExcel(){
    //Obtener resultados.
    this.rdata.getResultados(this.selectRol,this.selectIns).subscribe(res=>{
      console.log(res[0]);
      this.results=res;
      //this.dataR= new MatTableDataSource<resultado>(this.results);
      //this.dataR.paginator=this.paginator;  
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.results);
      const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, this.selectIns+'_'+this.selectRol);
    })
    
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    const downloadLink: HTMLAnchorElement = document.createElement('a');
    const url: string = URL.createObjectURL(data);
    downloadLink.href = url;
    downloadLink.download = `${fileName}.xlsx`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

}
