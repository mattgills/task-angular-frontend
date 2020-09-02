import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable()
export class TaskService {
    taskSelected = new Subject<Task>();
    
    constructor() {}

    selectTask(task: Task) {
        this.taskSelected.next({...task});
    }
}