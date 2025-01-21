import { Component, OnInit } from '@angular/core';
import { ImgdefaultService } from 'src/app/services/imgdefault.service';

@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.page.html',
  styleUrls: ['./perfilusuario.page.scss'],
  standalone: false,
})
export class PerfilusuarioPage implements OnInit {

  constructor(private api: ImgdefaultService) { }

  ngOnInit() {
    //this.api.obtenerImg("nombre usuario cuando se termine la bd")
  }


}
