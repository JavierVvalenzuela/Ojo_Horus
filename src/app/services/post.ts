export class Post {
    id_post!: number;
    titulo_post: string = '';
    contenido_post: string = '';
    likes_post?: number;
    img_post: any;
    id_usuario!: number;
    id_estado: number = 1;
}
