import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  ngOnInit(){
    var config = {
      apiKey: "AIzaSyB7QnKmjGnWgYzaYc9qEh_vcZWST_b60m8",
      authDomain: "instagramclone-api.firebaseapp.com",
      databaseURL: "https://instagramclone-api.firebaseio.com",
      projectId: "instagramclone-api",
      storageBucket: "instagramclone-api.appspot.com",
      messagingSenderId: "621881609237"
    };
    firebase.initializeApp(config);
  }

}
