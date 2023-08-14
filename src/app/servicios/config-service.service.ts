import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Ins } from '../models/experimento';


@Injectable({
  providedIn: 'root'
})
export class ConfigServiceService {

  Ins:Observable<any>;
  beacon:Observable<any>;
  participante:Observable<any>;
  MAC!:string;
  constructor(private fs:AngularFirestore) { 
     this.Ins = this.fs.collection('instancias').valueChanges();
     this.beacon=this.fs.collection('beacons').valueChanges();
     this.participante=this.fs.collection('participantes').valueChanges();
  }


  
  getConfig():Observable<any>{
    return this.fs.collection('configuracion').doc('general').snapshotChanges();
  }
  setConfig(duracion:String,freq:String,name:String,dins:String){
    return this.fs.collection('configuracion').doc('general').set({duracionScaner:duracion,frequency:freq,nombre:name,duracionIns:dins});
  }
  
  getIns():Observable<Ins[]>{

    return this.Ins;
  }

  setIns(nombre:String){
    return this.fs.collection('instancias').doc(undefined).set({Nombre:nombre});
  }

  getBeacon(){
    return this.beacon;
  }

  setBeacon({macb,nameb}:any){
    this.MAC=macb;
    return this.fs.collection('beacons').doc(this.MAC).set({MAC:macb,Nombre:nameb});
  }

  getParticipante(){
    return this.participante;
  }

  setParticipante({macp,rolp}:any){
    this.MAC=macp;
    return this.fs.collection('participantes').doc(this.MAC).set({MAC:macp,Rol:rolp});
  }

  getResultados(dispositivo:string,instancia:string){
    return this.fs.collection('registros').doc(dispositivo).collection(instancia).valueChanges();
  }

  getRoles(){
    return this.fs.collection('roles').valueChanges();
  }

  setRoles(nombre:String){
    return this.fs.collection('roles').doc(undefined).set({Nombre:nombre});
  }

  deleteRol(id:string){
    let docId="";
    return this.fs.collection('roles', ref=>ref.where('Nombre','==',id)).get().subscribe(qS=>{
      qS.forEach(doc=>{
        docId=doc.id;
        //console.log(docId);
        this.fs.collection('roles').doc(docId).delete().then(()=>{
          console.log("Elemto eliminado");
        }).catch((err)=>{
          console.error('Error al borrar', err);
        })
      })
    })
    
     
  }

}
