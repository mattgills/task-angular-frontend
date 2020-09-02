import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as TaskActions from './store/task.actions';
import * as moment from 'moment';
import { ObjectID } from 'bson';
import { Subscription } from 'rxjs';
import { Task } from '../models/task.model';
import { TaskService } from './task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy {
  // Define the subscription and selectedTask items, which are used to swap between the edit and add modes
  subscription: Subscription;
  selectedTask: Task;

  // Define the form controls for the add and edit portion
  name = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]);
  description = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]);
  dueDate = new FormControl('', [Validators.required]);

  // Define the form controls for the filtering options
  filterDates = new FormControl('none');
  filterValue: string = 'none';

  constructor(private store: Store<fromApp.AppState>, private taskService: TaskService) { }

  ngOnInit(): void {
    // Populate the available tasks by dispatching fetch tasks
    this.store.dispatch(new TaskActions.FetchTasks());

    // Subscribe to the subject of the Task List Componet, which will indicate when a task was selected
    this.subscription = this.taskService.taskSelected.subscribe((task: Task) => {
      // Set the selected task
      this.selectedTask = task;
      this.name.setValue(task.name);
      this.description.setValue(task.description);
      this.dueDate.setValue(new Date(task.dueDate));
    })
  }

  onSubmitTask() {
    if (!this.selectedTask) {
      this.store.dispatch(new TaskActions.AddTask({
        _id: new ObjectID().toHexString(),
        name: this.name.value,
        description: this.description.value,
        dueDate: moment(this.dueDate.value, 'MM/DD/YYYY').startOf('day').format('MM/DD/YYYY'),
        completed: false
      }))
    } else {
      this.store.dispatch(new TaskActions.UpdateTask({
        _id: this.selectedTask._id,
        name: this.name.value,
        description: this.description.value,
        dueDate: moment(this.dueDate.value, 'MM/DD/YYYY').startOf('day').format('MM/DD/YYYY'),
        completed: this.selectedTask.completed
      }))
    }

    // Reset the form once the item has been submitted
    this.resetForm();
  }

  onCancelEdit() {
    this.selectedTask = null;
    this.resetForm();
  }

  resetForm() {
    this.name.reset();
    this.description.reset();
    this.dueDate.reset()
  }

  ngOnDestroy() {
    // Clear the subscription to the selected task
    this.subscription.unsubscribe();
  }
}
