import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { AppState, TasksState } from './../../../core/+store';
import { Observable } from 'rxjs';

import { TaskModel } from './../../models/task.model';
import { TaskPromiseService } from './../../services';
import * as TasksActions from './../../../core/+store/tasks/tasks.actions';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Promise<Array<TaskModel>>;
  tasksState$: Observable<TasksState>;

  constructor(
    private router: Router,
    private taskPromiseService: TaskPromiseService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.tasksState$ = this.store.pipe(select('tasks'));
    console.log('We have a store! ', this.store);
  }

  onCreateTask() {
    const link = ['/add'];
    this.router.navigate(link);
  }

  onCompleteTask(task: TaskModel): void {
    this.store.dispatch(new TasksActions.DoneTask(task));
  }

  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.router.navigate(link);
  }

  onDeleteTask(task: TaskModel) {
    this.taskPromiseService
      .deleteTask(task)
      .then(() => (this.tasks = this.taskPromiseService.getTasks()))
      .catch(err => console.log(err));
  }
}
