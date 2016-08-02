import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {Todo} from '../dto/todo';
import {TodoService} from '../../providers/todo-service/todo-service';

@Component({
  templateUrl: 'build/pages/home/home.html',
  pipes: [TranslatePipe],
  providers: [TodoService]
})
export class HomePage implements OnInit {

  todos: Todo[];

  constructor(private nav: NavController, private translate: TranslateService, private todoService: TodoService) {
  }

  ngOnInit () {
    this.todoService.load().then(todos => this.todos = todos);
  }

  changeLocal (lang) {
    this.translate.use(lang);
  }
}
