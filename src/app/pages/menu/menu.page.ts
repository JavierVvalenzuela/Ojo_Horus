import { Component, OnInit } from '@angular/core';
import { BdServicioService } from 'src/app/services/bd-servicio.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: false,
})
export class MenuPage implements OnInit {
  arreglopost: any = [
    {
      idpost : 0,
      titulo: '',
      contenido: '',
      imgpost: '',
    }
  ];

  constructor(private bd :BdServicioService) {
   }


  logout() {
    console.log('Cerrar sesión');
  }

  ngOnInit() {
    this.bd.fetchPost().subscribe(posts => {
      this.arreglopost = posts;
    });

    this.bd.buscarPost();
  }

}