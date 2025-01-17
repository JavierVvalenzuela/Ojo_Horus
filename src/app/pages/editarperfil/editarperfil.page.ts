import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.page.html',
  styleUrls: ['./editarperfil.page.scss'],
  standalone: false,
})
export class EditarperfilPage implements OnInit {
  nombre: string = '';
  email: string = '';
  telefono: string = '';
  direccion: string = '';

  errores: {
    nombre: string | null;
    email: string | null;
    telefono: string | null;
    direccion: string | null;
  } = {
    nombre: null,
    email: null,
    telefono: null,
    direccion: null,
  };

  constructor(
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

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

    // Validación de nombre
    if (this.nombre.length < 3 || this.nombre.length > 25) {
      this.errores.nombre = 'El nombre debe tener entre 3 y 25 caracteres.';
      correcto = false;
    } else {
      this.errores.nombre = null;
    }

    // Validación de email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(this.email)) {
      this.errores.email = 'Ingrese un correo electrónico válido.';
      correcto = false;
    } else {
      this.errores.email = null;
    }
    // Validación de teléfono
    if (!/^\d+$/.test(this.telefono)) {
      this.errores.telefono =
        'El teléfono debe contener solo números enteros positivos.';
      correcto = false;
    } else if (this.telefono.length !== 8) {
      this.errores.telefono = 'El teléfono debe tener exactamente 8 dígitos.';
      correcto = false;
    } else {
      this.errores.telefono = null;
    }

    // Validación de dirección
    if (this.direccion.length < 5) {
      this.errores.direccion = 'La dirección debe tener al menos 5 caracteres.';
      correcto = false;
    } else {
      this.errores.direccion = null;
    }

    // Si todo es correcto
    if (correcto) {
      this.presentAlert(
        'Perfil',
        'Tu perfil ha sido actualizado correctamente.'
      );
      this.router.navigate(['/perfilusuario']);
    }
  }
}
