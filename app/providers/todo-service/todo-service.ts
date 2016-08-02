import { Injectable } from '@angular/core';
import {Todo} from '../../pages/dto/todo';
import {TODOS} from './mock-todos';

/*
  Generated class for the TodoService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TodoService {

  constructor() {
  }

  load() {
    return Promise.resolve(TODOS);
  }
}