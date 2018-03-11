import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Progresso } from './progresso.service';
import { Promise } from 'q';

@Injectable()
export class Db {

    constructor(private progresso: Progresso){}

    publicar(publicacao: any){
        console.log('publicando',publicacao);

        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({
                titulo: publicacao.titulo
            })
            .then((resposta)=>{
                const nomeImagem = resposta.key;

                firebase.storage().ref().child(`imagens/${nomeImagem}`)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        (snapshot: any)=>{
                            this.progresso.status = 'andamento';
                            this.progresso.estado = snapshot;
                        },
                        (error)=>{
                            this.progresso.status = 'erro';
                            console.log(error);
                        },
                        ()=>{
                            this.progresso.status = 'concluido';
                            console.log('upload concluido');
                        }
                    )
                    
            })

    }

    recuperarPublicacoes(email: string): Promise<any> {
        return Promise((resolve,reject)=>{
            firebase.database().ref(`publicacoes/${btoa(email)}`)
            .orderByKey()
            .once('value')
            .then((snapshot)=>{

                let publicacoes = [];

                snapshot.forEach((childSnapshot)=>{
                    
                    let publicacao = childSnapshot.val();
                    publicacao.key = childSnapshot.key;
                    publicacoes.push(publicacao);

                    
                })
                return publicacoes.reverse();
            })
            .then((publicacoes)=>{
                publicacoes.forEach((publicacao)=>{
                    firebase.storage()
                    .ref()
                    .child(`imagens/${publicacao.key}`)
                    .getDownloadURL()
                    .then((url)=>{
                        firebase.database().ref(`usuario_detalhe/${btoa(email)}`)
                            .once('value')
                            .then((snapshot)=>{
                                publicacao.nome_usuario = snapshot.val().nome_usuario;
                                publicacao.url_imagem = url;
                            })
                    })
                })
                resolve(publicacoes);
            })
        });
    }
}


/**
 *  return Promise((resolve,reject)=>{
            firebase.database().ref(`publicacoes/${btoa(email)}`)
            .orderByKey()
            .once('value')
            .then((snapshot)=>{

                let publicacoes = [];

                snapshot.forEach((childSnapshot)=>{
                    
                    let publicacao = childSnapshot.val();

                    firebase.storage()
                        .ref()
                        .child(`imagens/${childSnapshot.key}`)
                        .getDownloadURL()
                        .then((url)=>{
                            firebase.database().ref(`usuario_detalhe/${btoa(email)}`)
                                .once('value')
                                .then((snapshot)=>{
                                    publicacao.nome_usuario = snapshot.val().nome_usuario;
                                    publicacao.url_imagem = url;
                                    publicacoes.push(publicacao);
                                })
                        })
                })
                resolve(publicacoes);
            })           
        });
 */