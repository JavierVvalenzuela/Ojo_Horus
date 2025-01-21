import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { BdServicioService } from 'src/app/services/bd-servicio.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  nickname: string = "";
  clave: string = "";

  constructor(
    private alertController: AlertController, 
    private router: Router,
    private databaseService: BdServicioService // Inyectamos el servicio de base de datos
  ) { }

  async presentAlert(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  //funcion para la validacion del nick
  validarCampos() {
    let correcto = true;

    // Validación de nickname
    if (this.nickname.length < 3 || this.nickname.length > 25) {
      correcto = false;
    }

    // Validación de clave
    if (
      this.clave.length < 8 || this.clave.length > 20 || // Longitud de la clave
      !/[A-Z]/.test(this.clave) || // que la clave contenga al menos una mayuscula
      !/\d/.test(this.clave) ||    // que la clave contenga al menos un número
      !/[-!@#$%^&*.]/.test(this.clave) // que la clave contenga al menos un carácter especial
    ) {
      correcto = false;
    }

    // Mostrar alerta si algo está mal
    if (!correcto) {
      this.presentAlert("Error", "El nickname o la clave son incorrectos.");
      return;
    }

    // Si los campos son válidos, intentamos hacer login
    this.loginUsuario(this.nickname, this.clave);
  }

  // Función para loguear al usuario
  loginUsuario(nick_usuario: string, contrasena_usuario: string) {
    // Realiza la consulta para buscar al usuario por el nick y la contraseña
    this.databaseService.database.executeSql('SELECT * FROM usuario WHERE nick_usuario = ? AND contrasena_usuario = ?', [nick_usuario, contrasena_usuario]).then(res => {
      if (res.rows.length > 0) {
        // Si el usuario existe, mostramos un mensaje de éxito
        this.presentAlert('Login', 'Usuario logueado correctamente');
        
        // Aquí podrías guardar la información del usuario en un servicio global o en el almacenamiento local
        let navigationextras: NavigationExtras = {
          state: {
            nick: this.nickname
          }
        };

        // Redirigir al usuario a la página principal
        this.router.navigate(['/inicio'], navigationextras);
      } else {
        // Si no se encuentra al usuario, mostramos un mensaje de error
        this.presentAlert('Error', 'Usuario o contraseña incorrectos');
      }
    }).catch(e => {
      this.presentAlert('Error loginUsuario', JSON.stringify(e));
    });
  }

  ngOnInit() {
  }
}
