import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as TaskActions from './store/task.actions';
import * as moment from 'moment';
import { ObjectID } from 'bson';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  name = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]);
  description = new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]);
  dueDate = new FormControl('', [Validators.required]);

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new TaskActions.FetchTasks());
  }

  onAddTask() {
    
    this.store.dispatch(new TaskActions.AddTask({
       _id: new ObjectID().toHexString(),
      name: this.name.value,
      description: this.description.value,
      dueDate: moment(this.dueDate.value, 'MM/DD/YYYY').startOf('day').format('MM/DD/YYYY'),
      completed: false
    }))

    this.name.reset();
    this.description.reset();
    this.dueDate.reset();
  }

}
