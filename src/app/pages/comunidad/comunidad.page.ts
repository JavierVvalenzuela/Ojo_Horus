import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-comunidad',
  templateUrl: './comunidad.page.html',
  styleUrls: ['./comunidad.page.scss'],
  standalone: false,
})
export class ComunidadPage implements OnInit {

  constructor(private navController: NavController) { }

  redirectToPage() {
    console.log('Botón para editar comunidad presionado');
    this.navController.navigateForward('/editar-com');
  }

  ngOnInit() {
  }

}
