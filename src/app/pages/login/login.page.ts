import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  nickname: string = "";
  clave: string = "";

  constructor(private alertController: AlertController, private router: Router) { }

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

    // Si todo es correcto
    this.presentAlert("Correcto", "Inicio de sesión correctamente.");

    // Creando un diccionario de datos para enviar a inicio
    let navigationextras: NavigationExtras = {
      state: {
        nick: this.nickname
      }
    };

    // Redireccionar
    this.router.navigate(['/inicio'], navigationextras);
  }

  ngOnInit() {
  }
}
