export class Usuarios {
    id_usuario!: number;
    nombre_usuario: string = '';
    nick_usuario: string = '';
    correo_usuario: string = '';
    telefono_usuario?: string ;
    contrasena_usuario: string = ''; 
    img_perfil?: any;
    razon_ban?: string ;
    id_rol: number = 2; 
    id_estado: number = 1;
}