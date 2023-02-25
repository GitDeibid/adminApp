import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrincipalServicesService {

  constructor(private auth:Auth, private fs:AngularFirestore) { }

  register({correo, pass}:any){
    //console.log('Email y usuario: ',correo,pass);
    return createUserWithEmailAndPassword(this.auth,correo,pass);
  }

  login({correo,pass}:any){
    //console.log('Email y usuario: ',correo,pass);
    return signInWithEmailAndPassword(this.auth,correo,pass);
  }

  logout(){
    return signOut(this.auth);
  }

  runEscaner(){
    return this.fs.collection('escaner').doc('estado').set({iniciado:true});
  }

  stopEscaner(){
    return this.fs.collection('escaner').doc('estado').set({iniciado:false});
  }

  getTiming(){
    return this.fs.doc('configuracion/general').valueChanges();
  }

}
