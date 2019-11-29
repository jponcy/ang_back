import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Todo } from './todo';

let id = 0;
const gen = (label: string, finished = false) => ({
  id: ++id,
  label,
  finished,
});

const fixtures: Todo[] = [
  gen('Apprendre le Typescript', true),
  gen('Apprendre le SASS', true),
  gen('Faire notre première application Angular', true),
  gen('Ajouter plusieurs composants'),
  gen('Passer un paramètre d\'entré'),
  gen('Utiliser un événement de sortie'),
  gen('Voir rxjs'),
];

@Injectable()
export class TodoService {
  private data = fixtures;

  getAll() {
    return of(this.data)
      .pipe(delay(100));
  }

  createOne(todo: Todo) {
    todo.id = ++id;
    this.data.push(todo);

    return of(todo)
      .pipe(delay(100));
  }

  updateOne(todoId: number, todo: Todo) {
    todo.id = todoId;

    this.data = this.data.filter(d => d.id !== todoId);
    this.data.push(todo);

    return of (todo)
      .pipe(delay(100));
  }

  delete(todoId: number) {
    this.data = this.data.filter(d => d.id !== todoId);

    return of()
      .pipe(delay(100));
  }

  purgeFinished() {
    this.data = this.data.filter(t => !t.finished);

    return of(this.data)
      .pipe(delay(100));
  }
}
