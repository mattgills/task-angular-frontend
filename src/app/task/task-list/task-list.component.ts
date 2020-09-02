import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as TaskActions from '../store/task.actions';
import * as moment from 'moment';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Observable<{ tasks: Task[] }>;
  @Input() completed: Boolean;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.tasks = this.store.select('tasks');
  }

  onChangeStatus(task: Task) {
    // Update the task to simply toggle the completed flag
    const updatedTask = {
      ...task,
      completed: !task.completed
    }
    // Dispatch the update task action
    this.store.dispatch(new TaskActions.UpdateTask(updatedTask));
  }

  onRemove(id: string) {
    // Dispatch the delete task action
    this.store.dispatch(new TaskActions.DeleteTask(id));
  }

  setStyleColor(task: Task) {
    if (!task.completed) {
      const dueDate = moment(task.dueDate, 'MM/DD/YYYY').startOf('day');
      const startOfOverdue = moment().startOf('day');
      const startOfUpcoming = moment().startOf('day').add(2, 'day');
      if (dueDate.isBefore(startOfOverdue)) {
        return 'red';
      } else if (dueDate.isBefore(startOfUpcoming)) {
        return 'orange';
      }
    }
    return 'black';
  }
}
