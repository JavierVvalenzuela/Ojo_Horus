import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { BdServicioService } from 'src/app/services/bd-servicio.service';
import { Usuarios } from 'src/app/services/usuarios';

@Component({
  selector: 'app-modcontra',
  templateUrl: './modcontra.page.html',
  styleUrls: ['./modcontra.page.scss'],
})
export class ModcontraPage implements OnInit {
  contrasenaActual: string = '';
  contrasena_usuario: string = '';
  nuevaClave: string = '';
  confirmarClave: string = '';
  idUsuario: number = 0;
  usuarios: Usuarios[] = [];

  errores: {
    contrasenaActual: string | null;
    nuevaClave: string | null;
    confirmarClave: string | null;
  } = {
    contrasenaActual: null,
    nuevaClave: null,
    confirmarClave: null,
  };

  constructor(
    private router: Router,
    private alertController: AlertController,
    private bdServicio: BdServicioService,
    private navCtrl: NavController
  ) {}

  cancelar(): void {
    // Regresar a la página anterior al cancelar la operación
    this.navCtrl.back();
  }

  ngOnInit() {
     // Obtener el idUsuario desde el localStorage
     const storedIdUsuario = localStorage.getItem('id_usuario');
     if (storedIdUsuario) {
       this.idUsuario = parseInt(storedIdUsuario, 10);
     }
 
     // Suscribirse a la lista de usuarios
     this.bdServicio.fetchUsuarios().subscribe((usuarios) => {
       this.usuarios = usuarios;  // Almacenar la lista de usuarios
       console.log('Usuarios:', this.usuarios);  // Solo para verificar
     });
 
     // Llamar a buscarUsuarios() para obtener los usuarios
     this.bdServicio.buscarUsuarios();
   }

  validarCampos(): boolean {
    let valido = true;

    // Validar contraseña actual
    if (!this.contrasenaActual.trim()) {
      this.errores.contrasenaActual = 'Debe ingresar su contraseña actual.';
      valido = false;
    } else {
      this.errores.contrasenaActual = null;
    }

    // Validar nueva contraseña
    if (
      this.nuevaClave.length < 8 ||
      !/[A-Z]/.test(this.nuevaClave) ||
      !/\d/.test(this.nuevaClave) ||
      !/[-!@#$%^&*.]/.test(this.nuevaClave)
    ) {
      this.errores.nuevaClave =
        'La nueva contraseña debe tener al menos 8 caracteres, incluir una mayúscula, un número y un carácter especial.';
      valido = false;
    } else {
      this.errores.nuevaClave = null;
    }

    // Validar confirmación de contraseña
    if (this.nuevaClave !== this.confirmarClave) {
      this.errores.confirmarClave = 'Las contraseñas no coinciden.';
      valido = false;
    } else {
      this.errores.confirmarClave = null;
    }

    return valido;
  }

  async cambiarContrasena() {
    if (!this.idUsuario) {
      console.error('Error: idUsuario no definido.');
      return;
    }
  
    if (this.validarCampos()) {
      try {
        const contrasenaExistente = await this.bdServicio.verificarContrasena(
          this.idUsuario,  
          this.contrasena_usuario  
        );
  
        if (contrasenaExistente) {
          // Si ya tiene una contraseña, validarla
          const esValida = await this.bdServicio.verificarContrasena(
            this.idUsuario,  
            this.contrasena_usuario  
          );
  
          if (esValida) {
            await this.bdServicio.modificarcontra(this.idUsuario, this.nuevaClave);
  
            this.mostrarAlerta('Éxito', 'La contraseña se ha actualizado correctamente.');
            this.router.navigate(['/login']);
          } else {
            this.errores.contrasenaActual = 'La contraseña actual no es correcta.';
          }
        } else {
          await this.bdServicio.modificarcontra(this.idUsuario, this.nuevaClave);
  
          this.mostrarAlerta('Éxito', 'La contraseña se ha establecido correctamente.');
          this.router.navigate(['/login']);
        }
      } catch (error) {
        console.error('Error al cambiar la contraseña:', error);
        this.mostrarAlerta('Error', 'Ocurrió un problema al cambiar la contraseña.');
      }
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }
}
