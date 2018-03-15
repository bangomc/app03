import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import * as firebase from 'firebase';

import { Usuario } from './acesso/usuario.model';

@Injectable()
export class Autenticacao {

    token_id: string;

    constructor(private router: Router){}

    cadastrarUsuario(usuario: Usuario): Promise<any>{
        return firebase.auth().createUserWithEmailAndPassword(usuario.email,usuario.senha)
            .then((resposta: any) => {
               this.persistirDetalheUsuario(usuario);
            })
            .catch((erro: Error)=>{
                console.log(erro);
            })
    }

    persistirDetalheUsuario(usuario: Usuario){
        delete usuario.senha;
        firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
            .set(usuario)
    }

    autenticar(email: string, senha: string) {
        firebase.auth().signInWithEmailAndPassword(email,senha)
            .then((resposta: any) => { 
                this.gravarToken()
            })
            .catch((erro: Error) => { console.log(erro)})
    }

    gravarToken(){
        firebase.auth().currentUser.getIdToken()
            .then((idToken: string) => {
                this.token_id = idToken;
                localStorage.setItem('idToken', idToken);
                this.router.navigate(['/home']);
            })
    }

    autenticado(): boolean {
        if(this.token_id === undefined && localStorage.getItem('idToken') != null){
            this.token_id = localStorage.getItem('idToken');
        }
        return this.token_id !== undefined;
    }

    sair() {
        firebase.auth().signOut()
            .then(() => {                
                localStorage.removeItem('idToken');
                this.token_id = undefined;
                this.router.navigate(['/']);
            });
        
    }

    signinGoogle() {
        if(!firebase.auth().currentUser){
            let provider: firebase.auth.GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            firebase.auth().signInWithPopup(provider)
                .then((result) => {
                    const googleUserProfile = result.additionalUserInfo.profile;
                    const usuario: Usuario = new Usuario(
                        googleUserProfile.email,
                        googleUserProfile.name,
                        googleUserProfile.given_name,''
                    );
                    this.persistirDetalheUsuario(usuario);                    
                    console.log(result);
                    this.gravarToken();
                })
                .catch((error) => {
                    console.log(error);
                })
        }else{
            this.sair();
        }
    }

}