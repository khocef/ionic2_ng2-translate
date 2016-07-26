import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';

@Component({
  templateUrl: 'build/pages/home/home.html',
  pipes: [TranslatePipe]
})
export class HomePage {
  constructor(private nav: NavController, private translate: TranslateService) {
  }

  changeLocal (lang) {
    this.translate.use(lang);
  }
}
