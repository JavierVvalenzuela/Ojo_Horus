import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
@Component({
  selector: 'app-editar-com',
  templateUrl: './editar-com.page.html',
  styleUrls: ['./editar-com.page.scss'],
  standalone: false,
})
export class EditarComPage implements OnInit {
  nombreComunidad: string = 'Los Pepitos';
  descripcionComunidad: string = 'Somos una comunidad de jugadores de Ark apasionados por el diseño de bases, defensas y estrategias.';
  fotografia: any;

  constructor() { }
  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
  
    var imageUrl = image.webPath;
  
    // Can be set to the src of an image now
    this.fotografia = imageUrl;
  };


  ngOnInit() { }
}