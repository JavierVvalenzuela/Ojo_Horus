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
      // Obtener datos del usuario logueado
      this.bd.buscarUsuarios(); // Llamar para actualizar los usuarios en el BehaviorSubject
      this.bd.fetchUsuarios().subscribe((usuarios) => {
        // Filtrar el usuario que coincide con el nick_usuario
        this.Pusuario = usuarios.find((u: any) => u.nick_usuario === this.nick_usuario);
        
        // Asignar la imagen de perfil desde los datos del usuario
        if (this.Pusuario?.img_perfil) {
          this.imgSrc = this.Pusuario.img_perfil; // Asignar la imagen desde la base de datos
        } else {
          // Imagen predeterminada si no hay imagen en la base de datos
          this.imgSrc = 'assets/default-image.png'; // Puedes ajustar esta ruta según sea necesario
        }
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
        
        // Emitir el cambio de imagen a través del BehaviorSubject
        this.bd.img$.next(imageUrl); // Emitir la nueva imagen para otros componentes

      }).catch((error) => {
        console.error('Error al actualizar la imagen de perfil:', error);
      });
    } else {
      console.error('No se pudo obtener la URL de la imagen');
    }
  }
}
