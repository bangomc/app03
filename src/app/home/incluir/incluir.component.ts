import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import * as firebase from 'firebase';

import { Db } from '../../db.service';
import { Progresso } from '../../progresso.service';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-incluir',
  templateUrl: './incluir.component.html',
  styleUrls: ['./incluir.component.css']
})
export class IncluirComponent implements OnInit {

  private formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  });

  public email: string;
  private imagem: any;
  public progressoPublicacao: string = 'pendente';
  public porcentagemUpload: number;

  @Output()
  public atualizarTimeLine: EventEmitter<any> = new EventEmitter();

  constructor(private db: Db, private progresso: Progresso) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    })
  }

  publicar(){
    this.db.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    });

    const acompanhamentoUpload = Observable.interval(1500);
    const continuar = new Subject();
    continuar.next(true);

    acompanhamentoUpload
      .takeUntil(continuar)
      .subscribe(()=>{
        this.progressoPublicacao = 'andamento';

        this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100);

        if(this.progresso.status === 'erro' || this.progresso.status === 'concluido'){
          continuar.next(false);
          this.progressoPublicacao = 'concluido';
          this.atualizarTimeLine.emit();
        }
      });

  }

  prepararUpload(event: Event){
    this.imagem = (<HTMLInputElement>event.target).files;
  }

}
