export class Usuarios {
    id_usuario!: number;            
    nombre_usuario: string = '';   
    nick_usuario: string = '';     
    correo_usuario: string = '';  
    telefono_usuario: string | null = null;  
    contrasena_usuario: string = ''; 
    img_perfil: any |null = null;   
    razon_ban: string | null = null;  
    id_rol: number = 2; 
    id_estado: number = 1;     
}
