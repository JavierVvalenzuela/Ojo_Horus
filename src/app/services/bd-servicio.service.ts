import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuarios } from './usuarios';
import { Post } from './post';
import { Comentarios } from './comentarios';
import { ImgdefaultService } from './imgdefault.service';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class BdServicioService {
  [x: string]: any;
  //variable para almacenar la conexion a la base de datos
  public database!: SQLiteObject;

  //droptablausuario: string = `DROP TABLE IF EXISTS usuario;`;


  //Tablas del foro
  //Tabla de roles admin o user
  tablaRol: string = `CREATE TABLE IF NOT EXISTS roles (
    id_rol INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_rol VARCHAR(50) NOT NULL
  );`;
  //tabla de categorias
  tablaCategoria: string = `CREATE TABLE IF NOT EXISTS categoria (
    id_categoria INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_cat VARCHAR(50) NOT NULL
  );`;

  // tabla estado de la cuenta
  tablaEstado: string = `CREATE TABLE IF NOT EXISTS estado (
    id_estado INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_estado VARCHAR(50) NOT NULL
  );`;
  //tabla de preguntas de seguridad para guardar las preguntas
  tablaPregunta: string = `CREATE TABLE IF NOT EXISTS preguntas (
    id_pregunta_seguridad INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre_pregunta_seguridad VARCHAR(255) NOT NULL
  );`;
  //tabla que guarda el motivo del reporte
  tablaMotivo: string = `CREATE TABLE IF NOT EXISTS motivo (
    id_motivo INTEGER PRIMARY KEY AUTOINCREMENT,
    descripcion_motivo VARCHAR(255) NOT NULL
  );`;

  //tabla de usuario donde se contienen los datos de estos
  tablaUsuario: string = `CREATE TABLE IF NOT EXISTS usuario (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE, 
    nombre_usuario VARCHAR(50),
    nick_usuario VARCHAR(50) UNIQUE NOT NULL,
    correo_usuario VARCHAR(50) UNIQUE NOT NULL,
    telefono_usuario VARCHAR(9),
    contrasena_usuario VARCHAR(25) NOT NULL,
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
    descripcion_comunidad VARCHAR(250),
    img_comunidad BLOB,  -- Imagen opcional
    id_usuario INTEGER NOT NULL,  -- Refleja al creador de la comunidad
    FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario)
  );`;
  //tabla de los post que pueden hacer los usuarios
  tablaPost: string = `CREATE TABLE IF NOT EXISTS post (
    id_post INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo_post VARCHAR(55) NOT NULL,
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
    estado_reporte VARCHAR(20) DEFAULT 'Pendiente',
    id_usuario INTEGER NOT NULL, 
    id_post INTEGER, 
    id_comunidad INTEGER,
    id_comentario INTEGER,
    id_motivo INTEGER NOT NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario),
    FOREIGN KEY (id_post) REFERENCES post (id_post),
    FOREIGN KEY (id_comunidad) REFERENCES comunidad (id_comunidad),
    FOREIGN KEY (id_comentario) REFERENCES comentario (id_comentario),
    FOREIGN KEY (id_motivo) REFERENCES motivo (id_motivo)
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
  //registro de roles
  registroRoles: string = `INSERT OR IGNORE INTO roles (id_rol, nombre_rol) VALUES (1, 'Admin'), (2, 'Usuario');`;
  //registro de estados
  registroEstado: string = `INSERT OR IGNORE INTO estado (id_estado, nombre_estado) VALUES (1, 'Cuenta Activa'), (2, 'Cuenta Baneada');`;
  //registro de preguntas de seguridad
  registroPregunta: string = `INSERT OR IGNORE INTO preguntas (id_pregunta_seguridad, nombre_pregunta_seguridad) 
  VALUES(1, '¿Cuál es el nombre de tu primera mascota?'),
  (2, '¿En qué ciudad naciste?'),
  (3, '¿Cuál es tu comida favorita?'),
  (4, '¿Cuál fue el nombre de tu escuela primaria?'),
  (5, '¿Cuál es tu película favorita?');`;
  //registro de motivos de reporte
  registroMotivo: string = `INSERT OR IGNORE INTO motivo (id_motivo, descripcion_motivo) VALUES (1, 'Contenido ofensivo'),
  (2, 'Spam'),(3, 'Contenido engañoso'),(4, 'Violación de derechos de autor'),(5, 'Incitación al odio'),
  (6, 'Desinformación'),(7, 'Lenguaje inapropiado'),(8, 'Violencia gráfica'),(9, 'Contenido sexual explícito'),
  (10, 'Acoso o intimidación'),(11, 'Contenido ilegal'),(12, 'Infracción de normas de la comunidad');`;

  //aqui ira el insert a las demas tablas
  //tablas usuarios
  registroUsuario: string = `INSERT OR IGNORE INTO usuario (id_usuario, nombre_usuario, nick_usuario, correo_usuario, contrasena_usuario, id_estado, id_rol) VALUES 
  (1, 'Administrador', 'Admin', 'Admin@gmail.com', 'Admin.01', 1, 1),
  (2, 'Usuario Goto', 'Goto', 'Goto@gmail.com', 'Diego.170', 1, 2),
  (3, 'Usuario Red', 'Red', 'Red@gmail.com', 'Javier.170', 1, 2);`;

  //tablas post
  registroPost: string = `
  INSERT OR IGNORE INTO post (id_post, titulo_post, contenido_post, likes_post, id_usuario, id_estado) 
  VALUES 
    (1, 'Gaming', 'Contenido Gaming', 100, 1, 1),
    (2, 'Gaming2', 'Contenido Gaming2', 1000, 2, 1),
    (3, 'Gaming3', 'Contenido Gaming3', 10000, 3, 1);`;

  //tablas comentarios
  registroComentario: string = `
  INSERT OR IGNORE INTO comentario (id_comentario, contenido_comentario, likes_comentario, id_estado, id_post, id_usuario) 
  VALUES 
    (1, 'Este es el primer comentario', 100, 1, 1, 1),
    (2, 'Este es el segundo comentario', 200, 1, 2, 2),
    (3, 'Este es el tercer comentario', 300, 1, 3, 3);`;

  //observable para manipular los select de mi BD
  listaUsuarios = new BehaviorSubject<Usuarios[]>([]);
  listaPost = new BehaviorSubject<any[]>([]);
  listaCOmentarios = new BehaviorSubject<any[]>([]);
  //observable del status de la BD
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  // Variables para almacenar los datos de la BD
  public Post: Post[] = [];
  public Usuarios: Usuarios[] = [];
  public Comentarios: any[] = [];

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private alertcontroller: AlertController,
    private router: Router,
    private api: ImgdefaultService
  ) {
    this.crearBD();
  }
  //funciones para poder acceder a cada observable que haya creado
  dbStatus() {
    return this.isDBReady.asObservable();
  }

  fetchUsuarios(): Observable<Usuarios[]> {
    return this.listaUsuarios.asObservable();
  }

  fetchPost(): Observable<any[]> {
    return this.listaPost.asObservable();
  }

  fetchComentarios(): Observable<any[]> {
    return this.listaCOmentarios.asObservable();
  }

  //funcion para crear la base de datos (en sqldeveloper seria crear nueva conexion)
  crearBD() {
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
      //await this.database.executeSql(this.droptablausuario, []);

      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.registroRoles, []);

      await this.database.executeSql(this.tablaEstado, []);
      await this.database.executeSql(this.registroEstado, []);

      await this.database.executeSql(this.tablaPregunta, []);
      await this.database.executeSql(this.registroPregunta, []);

      await this.database.executeSql(this.tablaMotivo, []);
      await this.database.executeSql(this.registroMotivo, []);

      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.registroUsuario, []);

      await this.database.executeSql(this.tablaComunidad, []);
      await this.database.executeSql(this.tablaPost, []);
      await this.database.executeSql(this.tablaComentario, []);
      await this.database.executeSql(this.tablaReportes, []);
      await this.database.executeSql(this.tablaRespuesta, []);

      await this.database.executeSql(this.registroComentario, []);
      await this.database.executeSql(this.registroPost, []);

      this.buscarUsuarios(); // Actualizar lista
      this.buscarPost(); // Actualizar lista
      this.buscarComentarios(); // Actualizar lista
      this.isDBReady.next(true); // Notificar que la BD está lista
    } catch (e) {
      this.presentAlert('Error', `Error al crear las tablas: ${JSON.stringify(e)}`);
    }
  }

  buscarUsuarios() {
    this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      let items: Usuarios[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
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
            id_rol: res.rows.item(i).id_rol
          });
        }
      }
      // Actualizar lista en el BehaviorSubject
      this.listaUsuarios.next(items as any);
      this.Usuarios = items;
    }).catch(e => {
      this.presentAlert('Error', `Error al buscar usuarios: ${JSON.stringify(e)}`);
    })
  }

  //funcion para buscar los post
  buscarPost() {
    this.database.executeSql('SELECT * FROM post', []).then(res => {
      let items: Post[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_post: res.rows.item(i).id_post,
            titulo_post: res.rows.item(i).titulo_post,
            contenido_post: res.rows.item(i).contenido_post,
            likes_post: res.rows.item(i).likes_post,
            img_post: res.rows.item(i).img_post,
            id_usuario: res.rows.item(i).id_usuario,
            id_estado: res.rows.item(i).id_estado
          });
        }
      }
      this.Post = items;
      this.listaPost.next(items as any);
    }).catch(e => {
      this.presentAlert('Error al buscar posts', `Error: ${JSON.stringify(e)}`);
    });
  }
  //funcion para buscar los comentarios
  buscarComentarios() {
    this.database.executeSql('SELECT * FROM comentario', []).then(res =>{
      let items: Comentarios[] = [];
      if (res.rows.length > 0){
        for (var i = 0; i < res.rows.length; i++){
          items.push({
            id_comentario: res.rows.item(i).id_comentario,
            contenido_comentario: res.rows.item(i).contenido_comentario,
            likes_comentario: res.rows.item(i).likes_comentario,
            img_comentario: res.rows.item(i).img_comentario,
            id_estado: res.rows.item(i).id_estado,
            id_post: res.rows.item(i).id_post,
            id_usuario: res.rows.item(i).id_usuario
          });
        }
      }
      this.Comentarios = items;
      this.listaCOmentarios.next(items as any);
    }).catch(e =>{
      this.presentAlert('Error al buscar comentarios', `Error: ${JSON.stringify(e)}`);
    })
  }

  // Función para agregar un usuario (registrar)
  agregarUsuario(nick_usuario: string, correo_usuario: string, contrasena_usuario: string) {
    // Primero, comprobar si el usuario ya existe
    this.database.executeSql('SELECT * FROM usuario WHERE nick_usuario = ? OR correo_usuario = ?', [nick_usuario, correo_usuario]).then(res => {
      if (res.rows.length > 0) {
        // Si el usuario ya existe, mostrar un mensaje de error
        this.presentAlert('Error', 'Error al crear usuario, este usuario ya existe');
      } else {
        // Si no existe, agregar el nuevo usuario
        this.database.executeSql('INSERT INTO usuario(nick_usuario, correo_usuario, contrasena_usuario, id_rol, id_estado, img_perfil) VALUES(?,?,?,?,?,?)', [nick_usuario, correo_usuario, contrasena_usuario, 2, 1, this.api.obtenerImg(nick_usuario)]).then(res => {
          this.presentAlert('Registro', 'Usuario registrado correctamente');
          this.buscarUsuarios();
          this.router.navigate(['/login']);
        }).catch(e => {
          this.presentAlert('Error agregarUsuario', JSON.stringify(e));
        });
      }
    }).catch(e => {
      this.presentAlert('Error al comprobar usuario', JSON.stringify(e));
    });
  }

  //funcion para agregar un post
  agregarPost(titulo_post: string, contenido_post: string, img_post: any, id_usuario: number) {
    this.database.executeSql('INSERT INTO post(titulo_post, contenido_post, img_post, id_usuario, id_estado) VALUES(?,?,?,?,?)', [titulo_post, contenido_post, img_post, id_usuario, 1]).then(res => {
      this.presentAlert('Registro', 'Post registrado correctamente');
      this.buscarPost(); // Actualiza la lista de posts
    }).catch((e: any) => {
      this.presentAlert('Error al agregar post', JSON.stringify(e));
    });
  }

  //funcion para agregar un comentario
  agregarComentario(contenido_comentario: string, img_comentario: any , id_estado: number, id_post: number, id_usuario: number){
    this.database.executeSql('INSERT INTO comentario(contenido_comentario, img_comentario, id_estado, id_post, id_usuario) VALUES(?,?,?,?,?)', [contenido_comentario, img_comentario, id_estado, id_post, id_usuario]).then(res=>{
      this.presentAlert('Registro', 'Comentario registrado correctamente');
      this.buscarComentarios(); // Actualiza la lista de comentarios
    }).catch((e: any)=>{
      this.presentAlert('Error al agregar comentario', JSON.stringify(e));
    })
  }

  //funcion para loguear usuario
  loginUsuario(nick_usuario: string, contrasena_usuario: string) {
    // Realiza la consulta para buscar al usuario por el nick y la contraseña
    this.database.executeSql('SELECT * FROM usuario WHERE nick_usuario = ? AND contrasena_usuario = ?', [nick_usuario, contrasena_usuario]).then(res => {
      if (res.rows.length > 0) {
        // Si el usuario existe, mostramos un mensaje de éxito
        this.presentAlert('Login', 'Usuario logueado correctamente');
        // Aquí podrías guardar la información del usuario en un servicio global o en el almacenamiento local
        this.router.navigate(['/inicio']); // Redirigir al usuario a la página principal
      } else {
        // Si no se encuentra al usuario, mostramos un mensaje de error
        this.presentAlert('Error', 'Usuario o contraseña incorrectos');
      }
    }).catch(e => {
      this.presentAlert('Error loginUsuario', JSON.stringify(e));
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

  //alertas
  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertcontroller.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }

  // Función para guardar la respuesta de la pregunta de seguridad en la base de datos
  guardarRespuestaSeguridad(id_usuario: number, id_pregunta_seguridad: number, respuesta: string): Observable<any> {
    return new Observable((observer) => {
      // Verificar si el usuario ya tiene una respuesta registrada
      this.database.executeSql(
        'SELECT id_respuesta FROM respuestas_pregunta_seguridad WHERE id_usuario = ?',
        [id_usuario]
      ).then((res) => {
        // Si la consulta devuelve un resultado, significa que ya hay una respuesta registrada
        if (res.rows.length > 0) {
          const id_respuesta = res.rows.item(0).id_respuesta;
          // Actualizar la respuesta y la pregunta de seguridad
          this.database.executeSql(
            'UPDATE respuestas_pregunta_seguridad SET id_pregunta_seguridad = ?, respuesta = ? WHERE id_respuesta = ?',
            [id_pregunta_seguridad, respuesta, id_respuesta]
          ).then(() => {
            observer.next({ mensaje: 'Pregunta de seguridad y respuesta actualizadas correctamente' });
            observer.complete();
          }).catch((error) => {
            observer.error({ error: 'Error al actualizar la respuesta: ' + error });
          });
        } else {
          // Si no existe la respuesta, insertamos una nueva
          this.database.executeSql(
            'INSERT INTO respuestas_pregunta_seguridad (id_usuario, id_pregunta_seguridad, respuesta) VALUES (?, ?, ?)',
            [id_usuario, id_pregunta_seguridad, respuesta]
          ).then(() => {
            observer.next({ mensaje: 'Respuesta guardada correctamente' });
            observer.complete();
          }).catch((error) => {
            observer.error({ error: 'Error al guardar la respuesta: ' + error });
          });
        }
      }).catch((error) => {
        observer.error({ error: 'Error al verificar la respuesta: ' + error });
      });
    });
  }

  // Función para obtener las preguntas de seguridad disponibles
  obtenerPreguntasSeguridad(): Observable<any> {
    return new Observable(observer => {
      this.database.executeSql('SELECT * FROM preguntas', []).then(res => {
        let preguntas = [];
        for (let i = 0; i < res.rows.length; i++) {
          preguntas.push(res.rows.item(i));
        }
        observer.next(preguntas);
        observer.complete();
      }).catch(e => {
        observer.error('Error al obtener las preguntas: ' + JSON.stringify(e));
      });
    });
  }

  verificarPreguntaRespuesta(nickname: string, idPregunta: number, respuesta: string): Observable<boolean> {
    const query = `SELECT * FROM usuarios u 
                     INNER JOIN respuestas r ON u.id_usuario = r.id_usuario 
                     WHERE u.nickname = ? AND r.id_pregunta_seguridad = ? AND r.respuesta = ?`;
    console.log('Ejecutando consulta:', query, nickname, idPregunta, respuesta); // Agregar log para depuración

    return from(
      this.database.executeSql(query, [nickname, idPregunta, respuesta])
        .then((res) => {
          console.log('Resultado de la consulta:', res.rows.length); // Verificar la longitud de los resultados
          return res.rows.length > 0;
        })
        .catch((error) => {
          console.error('Error al ejecutar consulta:', error);
          throw error;
        })
    );
  }

  actualizarContrasena(nickname: string, nuevaClave: string): Observable<void> {
    const query = `UPDATE usuarios SET contrasena_usuario = ? WHERE nickname = ?`;

    return from(
      this.database.executeSql(query, [nuevaClave, nickname])
        .then(() => {
          console.log('Contraseña actualizada correctamente');
        })
        .catch((error) => {
          console.error('Error al actualizar contraseña:', error);  //quitar return, y que contenga then , catch 
          throw error;
        })
    );
  }

}


