import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output()
  exibirPainel: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  exibirPainelCadastro(){
    this.exibirPainel.emit('cadastro');
  }

}
