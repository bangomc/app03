import { Component, OnInit, trigger, state, style, transition, animate } from '@angular/core';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css'],
  animations: [ 
    trigger('animacao-banner',[
      state('criado',style({
        opacity: 1
      })),
      transition('void => criado',[
        style({
          opacity: 0,
          transform: 'translate(-50px,0)'
        }),
        animate('500ms 1s ease-in-out')
      ])
    ]),
    trigger('animacao-painel',[
      state('criado',style({
        opacity: 1
      })),
      transition('void => criado',[
        style({
          opacity: 0,
          transform: 'translate(50px,0)'
        }),
        animate('500ms 1s ease-in-out')
      ])
    ])
  ]
  
})
export class AcessoComponent implements OnInit {

  public estadoBanner: string = 'criado';
  public estadoPainel: string = 'criado';

  public cadastro: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  exibirPainel(event: string){
    this.cadastro = event === 'cadastro' ? true : false;
  }

}
