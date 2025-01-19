import { Component, OnInit } from '@angular/core';
import { ShareService } from '../services/share.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss'],
})
export class ShareComponent  implements OnInit {

  constructor(private shareService: ShareService) { }

  async share() {
    await this.shareService.shareContent(
      'Increíble Mira esto',
      '¡Mira este increíble Foto!',
      'https://example.com'
    );
  }

  ngOnInit() {}

}
