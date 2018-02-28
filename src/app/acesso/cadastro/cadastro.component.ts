import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Autenticacao } from '../../autenticacao.service';

import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output()
  public exibirPainel: EventEmitter<string> = new EventEmitter();

  public frm: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'nome_completo': new FormControl(null),
    'nome_usuario': new FormControl(null),
    'senha': new FormControl(null)
  });

  constructor(private autenticacao: Autenticacao) { }

  ngOnInit() {
  }

  exibirPainelLogin() {
    this.exibirPainel.emit('login');
  }

  cadastrarUsuario(){
    const usuario: Usuario = new Usuario(
      this.frm.value.email,
      this.frm.value.nome_completo,
      this.frm.value.nome_usuario,
      this.frm.value.senha
    );

    this.autenticacao.cadastrarUsuario(usuario)
      .then(() => this.exibirPainelLogin());
  }

}
