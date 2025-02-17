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
    // Realiza la consulta para obtener el id_usuario, id_rol, id_estado y nick_usuario
    this.databaseService.database.executeSql('SELECT id_usuario, nick_usuario, id_rol, id_estado FROM usuario WHERE nick_usuario = ? AND contrasena_usuario = ?', [nick_usuario, contrasena_usuario]).then(res => {
      if (res.rows.length > 0) {
        // Si el usuario existe, obtenemos los datos y los almacenamos
        let usuario = res.rows.item(0);
        let id_usuario = usuario.id_usuario;
        let nick = usuario.nick_usuario;
        let id_rol = usuario.id_rol;  // Obtener el id_rol
        let id_estado = usuario.id_estado;

        // Verifica si el estado del usuario es 2 (baneado)
        if (id_estado === 2) {
          this.presentAlert('Error', 'Esta cuenta está baneada.');
          return;
        }

        // Almacenamos el id_usuario, nick_usuario, id_rol y id_estado en el almacenamiento local
        localStorage.setItem('id_usuario', id_usuario.toString());
        localStorage.setItem('nick_usuario', nick);
        localStorage.setItem('id_rol', id_rol.toString());
        localStorage.setItem('id_estado', id_estado.toString());

        this.presentAlert('Login', 'Usuario logueado correctamente');
        
        // Redirigir al perfil del usuario
        this.router.navigate(['/inicio']);
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
