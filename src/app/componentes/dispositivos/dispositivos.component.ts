import { Component, OnInit } from '@angular/core';
import { ConfigServiceService } from 'src/app/servicios/config-service.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { beacon } from '../../models/beacon';
import { participante } from '../../models/participante';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

export interface ROL {
  Nombre: string;
}

/*const BEACON_DATA: beacon[]={

}*/

/*const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];*/

@Component({
  selector: 'app-dispositivos',
  templateUrl: './dispositivos.component.html',
  styleUrls: ['./dispositivos.component.css']
})
export class DispositivosComponent implements OnInit {

  popUpEdit:any;

  formB!:FormGroup;
  formP!:FormGroup;
  selectedRol!:string;
  Roles:ROL[] = [{Nombre:"-"}];

  //displayedColumns: string[] = ['select', 'MAC', 'Nombre']; descomentar para incluir casillas de selección por fila.
  displayedColumnsB: string[] = [ 'MAC', 'Nombre','Acciones'];
  displayedColumnsP: string[] = [ 'Identificador', 'Rol'];
  //dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  //selection = new SelectionModel<PeriodicElement>(true, []);
  
  balizas!:beacon[];
  dataB!:MatTableDataSource<any>;
  selectionB!:SelectionModel<any>;

  participantes!:participante[];
  dataP!:MatTableDataSource<any>;
  selectionP!:SelectionModel<any>;
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selectionB.selected.length;
    const numRows = this.dataB.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selectionB.clear() :
        this.dataB.data.forEach(row => this.selectionB.select(row));
  }


  constructor(public rdata:ConfigServiceService, popUp:MatDialog) { 

    this.formB = new FormGroup({
      macb: new FormControl(),
      nameb: new FormControl()
    })

    this.formP = new FormGroup({
      macp: new FormControl(),
      rolp: new FormControl()
    })

    this.popUpEdit=popUp;
  }

  ngOnInit() {
    this.rdata.getBeacon().subscribe(bal=>{//Obtiene el valor de la configuración al momento de cambiar en firestore.
      this.balizas = bal;
      //console.log(bal);
      this.dataB= new MatTableDataSource<beacon>(this.balizas);
      this.selectionB = new SelectionModel<beacon>(true, []);
      /*for (let index = 0; index < this.ddlColection.length; index++) {
        this.prueba=this.ddlColection[index];
        console.log(this.prueba.Nombre);
      }*/
    });

    this.rdata.getParticipante().subscribe(par=>{
      this.participantes=par;
      this.dataP= new MatTableDataSource<participante>(this.participantes);
      this.selectionP = new SelectionModel<participante>(true, []);
    });

    this.rdata.getRoles().subscribe(rol=>{
      this.Roles=rol as ROL[];
    })
  }

  addB(){
    this.rdata.setBeacon(this.formB.value);
  }

  addP(){
    console.log(this.formP.value);
    this.rdata.setParticipante(this.formP.value);
  }

  borrarB(id:string){
    console.log(id);
    this.rdata.deleteBeacon(id)
    
  }
  borrarP(id:string){
    console.log(id);
  }

}
