import { Component, OnInit } from '@angular/core';
import { ImgdefaultService } from 'src/app/services/imgdefault.service';


@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.page.html',
  styleUrls: ['./perfilusuario.page.scss'],
  standalone: false,
})
export class PerfilusuarioPage implements OnInit {
  imgSrc: string = '';  // Variable para la imagen del usuario
  nick_usuario: string = '';  // Almacenará el nick del usuario logueado

  constructor(private api: ImgdefaultService) { }

  ngOnInit() {
    // Obtener el nick_usuario desde el almacenamiento local
    this.nick_usuario = localStorage.getItem('nick_usuario') || '';

    if (this.nick_usuario) {
      // Llamamos a la API para obtener la imagen de usuario utilizando el nick
      this.api.obtenerImg(this.nick_usuario).subscribe(
        (response: any) => {
          // Asignamos la imagen a imgSrc
          this.imgSrc = URL.createObjectURL(response);
        },
        (error) => {
          console.log("Error al obtener la imagen: ", error);
        }
      );
    }
  }
}
