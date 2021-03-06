import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskComponent, TaskFormComponent, TaskListComponent } from './components';
import { TasksServicesModule } from './tasks-services.module';
import { tasksReducer } from './../core/+store';

@NgModule({
  declarations: [TaskListComponent, TaskFormComponent, TaskComponent],
  imports: [
    CommonModule,
    FormsModule,
    TasksRoutingModule,
    TasksServicesModule,
    StoreModule.forFeature('tasks', tasksReducer)
  ],
  providers: []
})
export class TasksModule {}
