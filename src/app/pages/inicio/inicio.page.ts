import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false,
})
export class InicioPage implements OnInit {
  nickname:string = "";

  constructor(private router: Router, private activedroute: ActivatedRoute) {
    this.activedroute.queryParams.subscribe(param =>{
      if(this.router.getCurrentNavigation()?.extras.state){
        this.nickname = this.router.getCurrentNavigation()?.extras?.state?.['nick'];
      }
    })
   }

  ngOnInit() {
  }

}
