import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import {TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {Http, HTTP_PROVIDERS} from '@angular/http';

import {FIREBASE_PROVIDERS,
  defaultFirebase,
  AngularFire,
  AuthProviders,
  firebaseAuthConfig, AuthMethods} from 'angularfire2';

@Component({
  templateUrl: 'build/app.html',
  pipes: [TranslatePipe],
  providers: [TranslateService]
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(private platform: Platform, private translate: TranslateService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      let userLang = navigator.language.split('-')[0];
      userLang = /(fr|en)/gi.test(userLang) ? userLang : 'en';

      translate.setDefaultLang('en');

      translate.use(userLang);
    });
  }

    changeLocal(lang) {
    this.translate.use(lang);
  }

}

ionicBootstrap(MyApp, [
  HTTP_PROVIDERS,
  {
    provide: TranslateLoader,
    useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
    deps: [Http]
  },
  // use TranslateService here, and not TRANSLATE_PROVIDERS (which will define a default TranslateStaticLoader)
  TranslateService,
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: "AIzaSyAQoLNWdtIhc73oYIAhDpEXgoEuw2ps0G4",
    authDomain: "ionic-starter-98156.firebaseapp.com",
    databaseURL: "https://ionic-starter-98156.firebaseio.com",
    storageBucket: "ionic-starter-98156.appspot.com"
  }),
  firebaseAuthConfig({
    method: AuthMethods.Popup
  })
]);
