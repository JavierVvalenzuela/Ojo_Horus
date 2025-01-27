export class Cargarreporte {
    id_reporte!: number;
    estado_reporte!: string;
    id_usuario!: number;
    nick_usuario!: string;
    id_post?: number;  
    titulo_post: string = '';  
    contenido_post: string = '';  
    id_comunidad?: number;  
    id_comentario?: number;  
    contenido_comentario: string = '';  
    likes_comentario?: number;  
    id_motivo: number = 0;
    descripcion_motivo: string = '';  
}
