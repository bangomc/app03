import { Component, OnInit } from '@angular/core';
import { Db } from '../../db.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  private email: string;
  public publicacoes: any;

  constructor(private db: Db) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user)=>{
      this.email = user.email;
      this.recuperarPublicacoes();
    });
  }

  recuperarPublicacoes(){
    this.db.recuperarPublicacoes(this.email)
      .then((publicacoes)=>{
        this.publicacoes = publicacoes;
        console.log(this.publicacoes);
      })
  }

}
