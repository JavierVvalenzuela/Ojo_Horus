import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editar-com',
  templateUrl: './editar-com.page.html',
  styleUrls: ['./editar-com.page.scss'],
  standalone: false,
})
export class EditarComPage implements OnInit {
  nombreComunidad: string = 'Los Pepitos';
  descripcionComunidad: string = 'Somos una comunidad de jugadores de Ark apasionados por el diseño de bases, defensas y estrategias.';
  imagenSeleccionada: string | null = 'assets/img/ArkLogo.jpg';

  constructor() { }


  seleccionarImagen() {
    this.imagenSeleccionada = 'assets/img/ArkLogo.jpg';  
  } 

  ngOnInit() { }
}