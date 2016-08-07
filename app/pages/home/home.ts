import {Component, OnInit} from '@angular/core';

import { FormGroup, REACTIVE_FORM_DIRECTIVES, FormBuilder, Validators } from '@angular/forms';


import {NavController} from 'ionic-angular';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {Todo} from '../dto/todo';
import {TodoService} from '../../providers/todo-service/todo-service';

@Component({
  templateUrl: 'build/pages/home/home.html',
  pipes: [TranslatePipe],
  providers: [TodoService],
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class HomePage implements OnInit {

  todos: Todo[];
  registerForm: FormGroup;

  constructor(private nav: NavController,
    private translate: TranslateService,
    private todoService: TodoService,
    private fb: FormBuilder) {
  }

  ngOnInit() {
    this.registerForm = this.fb.group({
      fname: ['David', Validators.required],
      lname: ['', Validators.required],
      adress: this.fb.group({
        street: [''],
        zip: ['',[Validators.pattern('[0-9]{5}')]]
      })
    });
    this.todoService.load().then(todos => this.todos = todos);
  }

  changeLocal(lang) {
    this.translate.use(lang);
  }
}
