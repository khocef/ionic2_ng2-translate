import {Component, OnInit} from '@angular/core';
import { FormGroup, REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators } from '@angular/forms';
import {NavController} from 'ionic-angular';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {Todo} from '../dto/todo';
import {TodoService} from '../../providers/todo-service/todo-service';
import { AngularFire, AuthProviders } from 'angularfire2';

@Component({
  templateUrl: 'build/pages/home/home.html',
  pipes: [TranslatePipe],
  providers: [TodoService],
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class HomePage implements OnInit {

  todos: Todo[];
  registerForm: FormGroup;
  user = {};
  appName = 'Ionic App';

  constructor(private nav: NavController,
    private translate: TranslateService,
    private todoService: TodoService,
    private fb: FormBuilder,
    private fire: AngularFire) {
  }

  ngOnInit() {

    this.fire.auth.subscribe(user => {
      if (user) {
        this.user = user.auth;
      } else {
        this.user = {};
      }
    });

    this.registerForm = this.fb.group({
      fname: ['David',[Validators.required, Validators.minLength(5)]],
      lname: ['', Validators.required],
      adress: this.fb.group({
        street: ['', Validators.required],
        zip: ['', [Validators.required, Validators.pattern('[0-9]{5}')]]
      })
    });
    this.todoService.load().then(todos => this.todos = todos);
  }

  changeLocal(lang) {
    this.translate.use(lang);
  }

  login() {
    this.fire.auth.login({
      provider: AuthProviders.Facebook
    });
  }

  logout() {
    this.fire.auth.logout();
  }
}
