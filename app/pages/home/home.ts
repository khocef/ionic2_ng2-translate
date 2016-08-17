import {Component, OnInit} from '@angular/core';
import { FormGroup, REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators } from '@angular/forms';
import {NavController, LoadingController} from 'ionic-angular';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
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
  users = [];
  appName = 'Ionic App';

  constructor(private nav: NavController,
    private loadingCtrl: LoadingController,
    private todoService: TodoService,
    private fb: FormBuilder,
    private fire: AngularFire) {
  }

  ngOnInit() {
    /**
     * auto login
     */
    this.fire.auth.subscribe(user => {
      if (user) {
        this.user = user.auth;
      } else {
        this.user = {};
      }
    });

    /**
     * init registration form
     */
    this.registerForm = this.fb.group({
      fname: ['David', [Validators.required, Validators.minLength(5)]],
      lname: ['', Validators.required],
      adress: this.fb.group({
        street: ['', Validators.required],
        zip: ['', [Validators.required, Validators.pattern('[0-9]{5}')]]
      })
    });

    /**
     * loading todo's
     */
  }


  ionViewWillEnter () {
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      content: 'Please wait...'
    });

    this.todoService.load().then(todos => this.todos = todos);
    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }

  save(): void {
    this.users.push(this.registerForm.value);
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