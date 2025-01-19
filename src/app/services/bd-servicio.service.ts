import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuarios } from './usuarios';


@Injectable({
  providedIn: 'root',
})
export class BdServicioService {
  //variable para almacenar la conexion a la base de datos
  public database!: SQLiteObject;

  //Tablas del foro
  //Tabla de roles admin o user
  tablaRol: string = `CREATE TABLE IF NOT EXISTS roles (
    id_rol INTEGER PRIMARY KEY,
    nombre_rol VARCHAR(50) NOT NULL
  );`;
  //tabla de categorias
  tablaCategoria: string = `CREATE TABLE IF NOT EXISTS categoria (
    id_categoria INTEGER PRIMARY KEY,
    nombre_cat VARCHAR(50) NOT NULL
  );`;

  // tabla estado de la cuenta
  tablaEstado: string = `CREATE TABLE IF NOT EXISTS estado (
    id_estado INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_estado VARCHAR(50) NOT NULL
  );`;
  //tabla de preguntas de seguridad para guardar las preguntas
  tablaPregunta: string = `CREATE TABLE IF NOT EXISTS preguntas (
    id_pregunta_seguridad INTEGER PRIMARY KEY,
    nombre_pregunta_seguridad VARCHAR(255) NOT NULL
  );`;
//tabla de usuario donde se contienen los datos de estos
  tablaUsuario: string = `CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, 
    nombre_usuario VARCHAR(50) NOT NULL,
    nick_usuario VARCHAR(50) UNIQUE NOT NULL,
    correo_usuario VARCHAR(50) UNIQUE NOT NULL,
    telefono_usuario VARCHAR(15),
    contrasena_usuario VARCHAR(16) NOT NULL,
    img_perfil BLOB,
    razon_ban TEXT,
    id_rol INTEGER NOT NULL,
    id_estado INTEGER NOT NULL,
    FOREIGN KEY (id_rol) REFERENCES roles (id_rol)
    FOREIGN KEY (id_estado) REFERENCES estado (id_estado)
  );`;
//tabla de comunidades
  tablaComunidad: string = `CREATE TABLE IF NOT EXISTS comunidad (
    id_comunidad INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_comunidad VARCHAR(100) NOT NULL,
    id_usuario INTEGER NOT NULL,  -- Refleja al creador de la comunidad
    descripcion_comunidad VARCHAR(250),
    img_comunidad BLOB,  -- Imagen opcional
    FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario)
  );`;
  //tabla de los post que pueden hacer los usuarios
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
//tabla de los comentarios que se pueden hacer en los post
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
//tabla de los reportes que se hacen a los post, comentarios y comunidad
  tablaReportes: string = `CREATE TABLE IF NOT EXISTS reporte (
    id_reporte INTEGER PRIMARY KEY AUTOINCREMENT,
    motivo TEXT NOT NULL,
    estado_reporte VARCHAR(20) DEFAULT 'Pendiente',
    id_usuario INTEGER NOT NULL, 
    id_post INTEGER, 
    id_comunidad INTEGER,
    id_comentario INTEGER,
    FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
    FOREIGN KEY (id_post) REFERENCES post (id_post),
    FOREIGN KEY (id_comunidad) REFERENCES comunidad (id_comunidad),
    FOREIGN KEY (id_comentario) REFERENCES comentario (id_comentario)
  );`;
  //tabla donde se guarda la respuesta de seguridad y el usuario que respuesta y pregunta tiene
  tablaRespuesta: string = `CREATE TABLE IF NOT EXISTS respuestas_pregunta_seguridad (
    id_respuesta INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    id_pregunta_seguridad INTEGER NOT NULL,
    respuesta TEXT NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
    FOREIGN KEY (id_pregunta_seguridad) REFERENCES preguntas (id_pregunta_seguridad)
  );`;

  //insert into en las tablas Staticas o que no tiene cambios
  registroRoles: string = `INSERT OR IGNORE INTO roles (id_rol, nombre_rol) VALUES (1, 'Admin'), (2, 'Usuario');`;
  registroEstado: string = `INSERT OR IGNORE INTO estado (id_estado, nombre_estado) VALUES (1, 'Cuenta Activa'), (2, 'Cuenta Baneada');`;
  registroPregunta: string = `INSERT OR IGNORE INTO preguntas (id_pregunta_seguridad, nombre_pregunta_seguridad) 
  VALUES(1, '¿Cuál es el nombre de tu primera mascota?'),
  (2, '¿En qué ciudad naciste?'),
  (3, '¿Cuál es tu comida favorita?'),
  (4, '¿Cuál fue el nombre de tu escuela primaria?'),
  (5, '¿Cuál es tu película favorita?');`;

  //aqui ira el insert a las demas tablas
    //tablas usuarios
  registroUsuario: string = `INSERT OR IGNORE INTO usuario (id_usuario, nombre_usuario, nick_usuario, correo_usuario, contrasena_usuario, id_estado, id_rol) VALUES (1, 'Admin', 'Admin', 'Admin@gmail.com' 'Admin.01', 1, 1);`;
  registroDiego: string = `INSERT OR IGNORE INTO usuario (id_usuario, nombre_usuario, nick_usuario, correo_usuario, contrasena_usuario, id_estado, id_rol) VALUES (2, 'Diego', 'Goto', 'Goto@gmail.com' 'Diego.170', 1, 2);`;
  registroJavier: string = `INSERT OR IGNORE INTO usuario (id_usuario, nombre_usuario, nick_usuario, correo_usuario, contrasena_usuario, id_estado, id_rol) VALUES (3, 'Javier', 'Red', 'Red@gmail.com' 'Javier.170', 1, 2);`;

  //tablas post
  post1: string = `INSERT OR IGNORE INTO post (id_post, titulo_post, contenido_post, likes_post, id_usuario, id_estado) VALUES (1, 'Gaming', 'Contenido Gaming', 100, 1, 1);`;
  post2: string = `INSERT OR IGNORE INTO post (id_post, titulo_post, contenido_post, likes_post, id_usuario, id_estado) VALUES (2, 'Gaming2', 'Contenido Gaming2', 1000, 2, 1);`;
  post3: string = `INSERT OR IGNORE INTO post (id_post, titulo_post, contenido_post, likes_post, id_usuario, id_estado) VALUES (3, 'Gaming3', 'Contenido Gaming3', 10000, 3, 1);`;

  //tablas comentarios
  comentario1: string = `INSERT OR IGNORE INTO comentario (id_comentario, contenido_comentario, likes_comentario, id_estado, id_post, id_usuario) VALUES (1, 'Este es el primer comentario', 100, 1, 1, 1);`;
  comentario2: string = `INSERT OR IGNORE INTO comentario (id_comentario, contenido_comentario, likes_comentario, id_estado, id_post, id_usuario) VALUES (2, 'Este es el segundo comentario', 200, 1, 2, 2);`;
  comentario3: string = `INSERT OR IGNORE INTO comentario (id_comentario, contenido_comentario, likes_comentario, id_estado, id_post, id_usuario) VALUES (3, 'Este es el tercer comentario', 300, 1, 3, 3);`;

  //observable para manipular los select de mi BD
  listaUsuarios = new BehaviorSubject<Usuarios[]>([]);

  //observable del status de la BD
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private alertcontroller: AlertController,
    private router: Router
  ) {
    this.crearBD();
  }
  //funciones para poder acceder a cada observable que haya creado
  dbStatus() {
    return this.isDBReady.asObservable();
  }

  fetchUsuarios(): Observable<Usuarios[]>{
    return this.listaUsuarios.asObservable();
  }

  //funcion para crear la base de datos (en sqldeveloper seria crear nueva conexion)
  crearBD(){
    //Verificar si la plataforma esta lista
    this.platform.ready().then(() => {
      //crear una base de datos o abrirla
      this.sqlite.create({
        name: 'foro.db',
        location: 'default',
      }).then((db: SQLiteObject) => {
        this.database = db;
        //crear tablas
        this.crearTablas();
      }).catch(e => {
        this.presentAlert('error crear BD', JSON.stringify(e));
    });
    });
  }
  async crearTablas() {
    try {
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.registroRoles, []);
  
      await this.database.executeSql(this.tablaEstado, []);
      await this.database.executeSql(this.registroEstado, []);
  
      await this.database.executeSql(this.tablaPregunta, []);
      await this.database.executeSql(this.registroPregunta, []);
  
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.registroUsuario, []);
  
      await this.database.executeSql(this.tablaComunidad, []);
      await this.database.executeSql(this.tablaPost, []);
      await this.database.executeSql(this.tablaComentario, []);
      await this.database.executeSql(this.tablaReportes, []);
      await this.database.executeSql(this.tablaRespuesta, []);

      await this.database.executeSql(this.registroRoles, []);
      await this.database.executeSql(this.registroEstado, []);
      await this.database.executeSql(this.registroPregunta, []);

      await this.database.executeSql(this.registroUsuario, []);
      await this.database.executeSql(this.registroDiego, []);
      await this.database.executeSql(this.registroJavier, []);

      await this.database.executeSql(this.post1, []);
      await this.database.executeSql(this.post2, []);
      await this.database.executeSql(this.post3, []);

      await this.database.executeSql(this.comentario1, []);
      await this.database.executeSql(this.comentario2, []);
      await this.database.executeSql(this.comentario3, []);
  
      this.buscarUsuarios(); // Actualizar lista
      this.isDBReady.next(true); // Notificar que la BD está lista
    } catch (e) {
      this.presentAlert('Error', `Error al crear las tablas: ${JSON.stringify(e)}`);
    }
  }

  buscarUsuarios() {
    this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      let items: Usuarios[] = [];
      if (res.rows.length > 0) {
        for (let i = 0; i < res.rows.length; i++) {
          items.push({
            id_usuario: res.rows.item(i).id_usuario,
            nombre_usuario: res.rows.item(i).nombre_usuario,
            nick_usuario: res.rows.item(i).nick_usuario,
            correo_usuario: res.rows.item(i).correo_usuario,
            telefono_usuario: res.rows.item(i).telefono_usuario,
            contrasena_usuario: res.rows.item(i).contrasena_usuario,
            img_perfil: res.rows.item(i).img_perfil,
            id_estado: res.rows.item(i).id_estado,
            razon_ban: res.rows.item(i).razon_ban,
            id_rol: 0
          });
        }
      }
      // Actualizar lista en el BehaviorSubject
      this.listaUsuarios.next(items);
    }).catch(e => {
      this.presentAlert('Error', `Error al buscar usuarios: ${JSON.stringify(e)}`);
    });
  }
  // Función para agregar un usuario (registrar)
  agregarUsuario(usuario: Usuarios): Observable<any> {
    return new Observable(observer => {
      this.database.executeSql(`INSERT INTO usuario (nombre_usuario, correo_usuario, contrasena_usuario) VALUES (?, ?, ?)`, [usuario.nombre_usuario, usuario.correo_usuario, usuario.contrasena_usuario])
        .then((res: any) => {
          observer.next(res);
          observer.complete();
        })
        .catch((error: any) => {
          this.presentAlert('Error', `Error al agregar usuario: ${JSON.stringify(error)}`);
          observer.error(error);
        });
    });
  }

  // Función para actualizar un usuario
  actualizarUsuario(usuario: Usuarios): Observable<any> {
    return new Observable(observer => {
      this.database.executeSql(`UPDATE usuario SET nombre_usuario = ?, correo_usuario = ?, contrasena_usuario = ? WHERE id_usuario = ?`, 
        [usuario.nombre_usuario, usuario.correo_usuario, usuario.contrasena_usuario, usuario.id_usuario])
        .then((res: any) => {
          observer.next(res);
          observer.complete();
        })
        .catch((error: any) => {
          this.presentAlert('Error', `Error al actualizar usuario: ${JSON.stringify(error)}`);
          observer.error(error);
        });
    });
  }

  // Función para eliminar un usuario
  eliminarUsuario(id: number): Observable<any> {
    return new Observable(observer => {
      this.database.executeSql(`DELETE FROM usuario WHERE id_usuario = ?`, [id])
        .then((res: any) => {
          observer.next(res);
          observer.complete();
        })
        .catch((error: any) => {
          this.presentAlert('Error', `Error al eliminar usuario: ${JSON.stringify(error)}`);
          observer.error(error);
        });
    });
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


