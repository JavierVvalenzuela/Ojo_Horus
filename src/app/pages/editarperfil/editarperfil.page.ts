import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ImgdefaultService } from 'src/app/services/imgdefault.service';
import { BdServicioService } from 'src/app/services/bd-servicio.service';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.page.html',
  styleUrls: ['./editarperfil.page.scss'],
  standalone: false,
})
export class EditarperfilPage implements OnInit {
  nick_usuario: string = '';
  id_usuario: number = 0;
  nombre: string = '';
  email: string = '';
  telefono: string = '';
  Pusuario: any; // Datos del usuario logueado

  errores: {
    nombre: string | null;
    email: string | null;
    telefono: string | null;
  } = {
    nombre: null,
    email: null,
    telefono: null,
  };

  // Variable para foto
  fotografia: any;
  imgSrc: string = '';

  constructor(
    private alertController: AlertController,
    private router: Router,
    private api: ImgdefaultService,
    private bd: BdServicioService
  ) {}

  ngOnInit() {
    // Obtener datos del almacenamiento local
    this.nick_usuario = localStorage.getItem('nick_usuario') || '';
    this.id_usuario = Number(localStorage.getItem('id_usuario')) || 0;

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
        if (this.Pusuario) {
          this.nombre = this.Pusuario.nombre_usuario;
          this.email = this.Pusuario.correo_usuario;
          this.telefono = this.Pusuario.telefono_usuario;
        }
      });
    }
  }

  async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  guardarPerfil() {
    let correcto = true;

    // Validaciones
    if (this.nombre.length < 3 || this.nombre.length > 25) {
      this.errores.nombre = 'El nombre debe tener entre 3 y 25 caracteres.';
      correcto = false;
    } else {
      this.errores.nombre = null;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(this.email)) {
      this.errores.email = 'Ingrese un correo electrónico válido.';
      correcto = false;
    } else {
      this.errores.email = null;
    }

    if (!/^\d+$/.test(this.telefono)) {
      this.errores.telefono = 'El teléfono debe contener solo números.';
      correcto = false;
    } else if (this.telefono.length !== 9) {
      this.errores.telefono = 'El teléfono debe tener exactamente 9 dígitos.';
      correcto = false;
    } else {
      this.errores.telefono = null;
    }

    // Si las validaciones son correctas
    if (correcto) {
      // Obtener `id_usuario` desde localStorage
      const id_usuario = parseInt(localStorage.getItem('id_usuario') || '0', 10);

      if (id_usuario) {
        // Si hay una nueva imagen, actualizamos la imagen del usuario
        const imagen = this.fotografia || null;

        // Modificar usuario
        this.bd.modificarUsuario(id_usuario, this.nombre, this.email, this.telefono, imagen).then(() => {
          // Actualizar los usuarios en el BehaviorSubject
          this.bd.buscarUsuarios();

          // Mostrar mensaje de éxito y redirigir
          this.presentAlert('Perfil', 'Tu perfil ha sido actualizado correctamente.');
          this.router.navigate(['/perfilusuario']);
        }).catch((error: any) => {
          this.presentAlert('Error', 'No se pudo actualizar el perfil. Inténtalo nuevamente.');
          console.error('Error al modificar el perfil:', error);
        });
      } else {
        this.presentAlert('Error', 'No se encontró el ID del usuario.');
      }
    }
  }

  takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });
  
    const imageUrl = image.webPath;
  
    // Verificar si image.webPath tiene un valor definido
    if (imageUrl) {
      // Asignar la imagen solo si imageUrl no es undefined
      this.fotografia = imageUrl;
      this.imgSrc = imageUrl; // Actualizamos la vista con la nueva imagen
    } else {
      console.error('No se pudo obtener la URL de la imagen');
    }
  };
}
