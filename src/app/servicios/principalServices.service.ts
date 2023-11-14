import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,GoogleAuthProvider,signInWithPopup } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrincipalServicesService {
  isLogIn=true;
  startTime:String="";
  endTime:String="";
  constructor(private auth:Auth, private fs:AngularFirestore) { }

  register({correo, pass}:any){
    //console.log('Email y usuario: ',correo,pass);
    return createUserWithEmailAndPassword(this.auth,correo,pass);
  }

  login({correo,pass}:any){
    //console.log('Email y usuario: ',correo,pass);
    this.isLogIn=true;
    console.log(this.isLogIn);
    return signInWithEmailAndPassword(this.auth,correo,pass);
  }

  logGoogle(){
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout(){
    this.isLogIn=false;
    console.log(this.isLogIn);
    return signOut(this.auth);
  }

  runEscaner(insId:string){
    let docID ="";
    let time="";
    this.startTime=this.getActualTime();
    this.fs.collection('instancias',ref=>ref.where('Nombre','==',insId)).get().subscribe(dI=>{
      dI.forEach(d=>{
        docID=d.id;       
        time = d.get('inicio');
        if(time==""){
          this.fs.collection('instancias').doc(docID).update({inicio:this.startTime});//Actualizar el tiempo de inicio del experimento
        } 
        //this.fs.collection('instancias').doc(docID).update({inicio:this.startTime});//Actualizar el tiempo de inicio del experimento
      });
    });
    
    return this.fs.collection('escaner').doc('estado').set({iniciado:true});
  }

  stopEscaner(insId:string){
    let docID ="";
    let time="";
    this.endTime=this.getActualTime();
    this.fs.collection('instancias',ref=>ref.where('Nombre','==',insId)).get().subscribe(dI=>{
      dI.forEach(d=>{
        docID=d.id;
        time = d.get('inicio');
        if(time==""){
          this.fs.collection('instancias').doc(docID).update({fin:this.endTime});
        }
          //Actualizar el tiempo de inicio del experimento
      });
    });
    return this.fs.collection('escaner').doc('estado').set({iniciado:false});
  }

  getTiming(){
    return this.fs.doc('configuracion/general').valueChanges();
  }

  isAuthenticated() {
    console.log(this.isLogIn);
    return this.isLogIn;
  }

  getActualTime():String{
    // Obtener la fecha y hora actual
    const fechaHoraActual: Date = new Date();

    // Obtener la hora, minuto y segundo
    const hora: number = fechaHoraActual.getHours();
    const minuto: number = fechaHoraActual.getMinutes();
    const segundo: number = fechaHoraActual.getSeconds();

    // Formatear la hora, minuto y segundo a dos dígitos
    const hh: string = hora.toString().padStart(2, '0');
    const mm: string = minuto.toString().padStart(2, '0');
    const ss: string = segundo.toString().padStart(2, '0');

    // Crear una cadena en formato "hh:mm:ss"
    const horaActual: string = `${hh}:${mm}:${ss}`;

    //console.log(horaActual);
    return horaActual;

  }

}
