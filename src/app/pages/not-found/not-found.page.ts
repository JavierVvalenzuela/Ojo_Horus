import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.page.html',
  styleUrls: ['./not-found.page.scss'],
  standalone: false,
})
export class NotFoundPage implements OnInit {


  constructor(private menuCtrl: MenuController) { }

  ionViewWillEnter(){
    //para desabilitar el menu deslizable
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave(){
    //para habilitar el menu cuando salgamos del not found
    this.menuCtrl.enable(true);
  }
  ngOnInit() {
  }

}
