import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

import { Autenticacao } from './autenticacao.service';
import { AutenticacaoGuard } from './autenticacao-guard.service';
import { Db } from './db.service';
import { Progresso } from './progresso.service';

import { AppComponent } from './app.component';
import { AcessoComponent } from './acesso/acesso.component';
import { BannerComponent } from './acesso/banner/banner.component';
import { LoginComponent } from './acesso/login/login.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { PublicacoesComponent } from './home/publicacoes/publicacoes.component';
import { IncluirComponent } from './home/incluir/incluir.component';


@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    BannerComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    PublicacoesComponent,
    IncluirComponent
  ],
  imports: [
    BrowserModule,    
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [Autenticacao,AutenticacaoGuard,Db,Progresso],
  bootstrap: [AppComponent]
})
export class AppModule { }
