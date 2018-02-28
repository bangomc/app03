import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Autenticacao } from '../../autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output()
  exibirPainel: EventEmitter<string> = new EventEmitter();

  public frm: FormGroup = new FormGroup({
    'email': new FormControl(),
    'senha': new FormControl()
  });

  constructor(private autenticacao: Autenticacao) { }

  ngOnInit() {
  }

  exibirPainelCadastro(){
    this.exibirPainel.emit('cadastro');
  }

  autenticar() {
    this.autenticacao.autenticar(
      this.frm.value.email,
      this.frm.value.senha
    );
  }

}
