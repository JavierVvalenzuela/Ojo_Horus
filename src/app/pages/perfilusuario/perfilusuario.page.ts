import { Component, OnInit } from '@angular/core'; 
import { BdServicioService } from 'src/app/services/bd-servicio.service';
import { ImgdefaultService } from 'src/app/services/imgdefault.service';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.page.html',
  styleUrls: ['./perfilusuario.page.scss'],
  standalone: false,
})
export class PerfilusuarioPage implements OnInit {
  imgSrc: string = ''; // Imagen del usuario
  nick_usuario: string = ''; // Nickname del usuario logueado
  Pusuario: any; // Datos del usuario logueado

  constructor(private api: ImgdefaultService, private bd: BdServicioService) {}

  ngOnInit() {
    // Obtener el nick_usuario desde el almacenamiento local
    this.nick_usuario = localStorage.getItem('nick_usuario') || '';

    if (this.nick_usuario) {
      // Obtener imagen de perfil
      this.api.obtenerImg(this.nick_usuario).subscribe(
        (response: any) => {
          this.imgSrc = URL.createObjectURL(response); // Asignar la imagen
        },
        (error) => {
          console.log('Error al obtener la imagen: ', error);
        }
      );

      // Obtener datos del usuario logueado
      this.bd.buscarUsuarios(); // Llamar para actualizar los usuarios en el BehaviorSubject
      this.bd.fetchUsuarios().subscribe((usuarios) => {
        // Filtrar el usuario que coincide con el nick_usuario
        this.Pusuario = usuarios.find((u: any) => u.nick_usuario === this.nick_usuario);
      });
    }
  }

  // Función para cambiar la foto del perfil
  async cambiarFotoPerfil() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });

    const imageUrl = image.webPath;

    // Verificar si image.webPath tiene un valor definido
    if (imageUrl) {
      this.imgSrc = imageUrl; // Actualizar la imagen en el perfil del usuario

      // Llamar a la función para actualizar la imagen en la base de datos
      this.bd.actualizarImagenPerfil(this.nick_usuario, imageUrl).then(() => {
        console.log('Imagen de perfil actualizada');
      }).catch((error) => {
        console.error('Error al actualizar la imagen de perfil:', error);
      });
    } else {
      console.error('No se pudo obtener la URL de la imagen');
    }
  }
}
