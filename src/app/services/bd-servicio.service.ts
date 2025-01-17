import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BdServicioService {

  //variable para almacenar la conexion a la base de datos
  public database!: SQLiteObject;

  //Tablas del foro
  tablaRol: string = `CREATE TABLE IF NOT EXISTS roles (
    id_rol INTEGER PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL
  );`;
  
  tablaCategoria: string = `CREATE TABLE IF NOT EXISTS categoria (
    id_categoria INTEGER PRIMARY KEY,
    nombre_cat VARCHAR(50) NOT NULL
  );`;
  
  tablaEstado: string = `CREATE TABLE IF NOT EXISTS estado (
    id_estado INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_estado VARCHAR(50) NOT NULL
  );`;
  
  tablaPregunta: string = `CREATE TABLE IF NOT EXISTS preguntas (
    id_pregunta_seguridad INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_pregunta_seguridad VARCHAR(255) NOT NULL
  );`;
  
  tablaUsuario: string = `CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_usuario VARCHAR(50) NOT NULL,
    nick_usuario VARCHAR(50) NOT NULL,
    correo_usuario VARCHAR(50) NOT NULL UNIQUE,
    telefono_usuario VARCHAR(15),
    contraseña_usuario VARCHAR(16) NOT NULL,
    img_perfil BLOB,
    estado_cuenta INTEGER NOT NULL,
    razon_ban TEXT,
    id_rol INTEGER NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES roles (id_rol)
  );`;

  tablaComunidad: string = `CREATE TABLE IF NOT EXISTS comunidad (
    id_comunidad INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_comunidad VARCHAR(100) NOT NULL,
    id_usuario INTEGER NOT NULL,  -- Refleja al creador de la comunidad
    descripcion_comunidad VARCHAR(250),
    img_comunidad BLOB,  -- Imagen opcional
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,  -- Fecha de creación de la comunidad
    FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario)
  );`;
  
  tablaPost: string = `CREATE TABLE IF NOT EXISTS post (
    id_post INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo_post VARCHAR(255) NOT NULL,
    contenido_post TEXT NOT NULL,
    likes_post INTEGER DEFAULT 0,
    img_post BLOB,
    id_usuario INTEGER NOT NULL,
    id_estado INTEGER NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
    FOREIGN KEY (id_estado) REFERENCES estado (id_estado)
  );`;
  
  tablaComentario: string = `CREATE TABLE IF NOT EXISTS comentario (
    id_comentario INTEGER PRIMARY KEY AUTOINCREMENT,
    contenido_comentario TEXT NOT NULL,
    likes_comentario INTEGER DEFAULT 0,
    img_comentario BLOB,
    id_estado INTEGER NOT NULL,
    id_post INTEGER NOT NULL,
    id_usuario INTEGER NOT NULL,
    FOREIGN KEY (id_estado) REFERENCES estado (id_estado),
    FOREIGN KEY (id_post) REFERENCES post (id_post),
    FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario)
  );`;

  tablaReportes:string= `CREATE TABLE IF NOT EXISTS reporte (
    id_reporte INTEGER PRIMARY KEY AUTOINCREMENT,
    motivo TEXT NOT NULL,
    fecha_reporte DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado_reporte VARCHAR(20) DEFAULT 'Pendiente',
    id_usuario INTEGER NOT NULL, 
    id_post INTEGER, 
    id_comunidad INTEGER,
    id_comentario INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES usuario (idusuario),
    FOREIGN KEY (id_post) REFERENCES post (id_post),
    FOREIGN KEY (id_comunidad) REFERENCES comunidad (id_comunidad),
    FOREIGN KEY (id_comentario) REFERENCES comentario (id_comentario)
  );`;
  tablaRespuesta: string = `CREATE TABLE IF NOT EXISTS respuestas_pregunta_seguridad (
    id_respuesta INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    id_pregunta_seguridad INTEGER NOT NULL,
    respuesta TEXT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
    FOREIGN KEY (id_pregunta_seguridad) REFERENCES preguntas (id_pregunta_seguridad)
  );`;

  //insert into en las tablas
  registroRoles: string = `INSERT OR IGNORE INTO roles (id_rol, nombre_rol) VALUES (1, 'Admin'), (2, 'Usuario');`;
  registroEstado: string = `INSERT OR IGNORE INTO estado (id_estado, nombre_estado) VALUES (1, 'Cuenta Activa'), (2, 'Cuenta Baneada');`;
  registroPregunta: string = `INSERT OR IGNORE INTO preguntas (id_pregunta_seguridad, nombre_pregunta_seguridad) 
  VALUES(1, '¿Cuál es el nombre de tu primera mascota?'),
  (2, '¿En qué ciudad naciste?'),
  (3, '¿Cuál es tu comida favorita?'),
  (4, '¿Cuál fue el nombre de tu escuela primaria?'),
  (5, '¿Cuál es tu película favorita?');`;


    //observable del status de la BD
    private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private alertcontroller: AlertController) { 
  }
  //funciones para poder acceder a cada observable que haya creado
  dbStatus(){
    return this.isDBReady.asObservable();
   }
   //alertas
   async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertcontroller.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
