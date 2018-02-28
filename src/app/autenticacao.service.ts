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
                delete usuario.senha;
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set(usuario)
            })
            .catch((erro: Error)=>{
                console.log(erro);
            })
    }

    autenticar(email: string, senha: string) {
        firebase.auth().signInWithEmailAndPassword(email,senha)
            .then((resposta: any) => { 
                firebase.auth().currentUser.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken;
                        this.router.navigate(['/home']);
                    })
            })
            .catch((erro: Error) => { console.log(erro)})
    }

    autenticado(): boolean {
        return this.token_id !== undefined;
    }

}