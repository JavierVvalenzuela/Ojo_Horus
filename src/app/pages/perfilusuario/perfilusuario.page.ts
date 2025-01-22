import { Component, OnInit } from '@angular/core';
import { BdServicioService } from 'src/app/services/bd-servicio.service';
import { ImgdefaultService } from 'src/app/services/imgdefault.service';
import { Usuarios } from 'src/app/services/usuarios';


@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.page.html',
  styleUrls: ['./perfilusuario.page.scss'],
  standalone: false,
})
export class PerfilusuarioPage implements OnInit {
  imgSrc: string = '';  // Variable para la imagen del usuario
  nick_usuario: string = '';  // Almacenará el nick del usuario logueado
  Pusuario: any;

  constructor(private api: ImgdefaultService, private bd: BdServicioService) { }

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

      this.bd.buscarUsuarios();
      this.bd.fetchUsuarios().subscribe(Usuarios =>{
        this.Pusuario = Usuarios;
      })

    }
  }
}
