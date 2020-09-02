import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import * as moment from 'moment';

import * as fromApp from '../../store/app.reducer';
import * as TaskActions from './task.actions';
import { Task } from '../../models/task.model';
@Injectable()
export class TaskEffects {
    @Effect({ dispatch: false })
    addTask = this.actions$.pipe(
        ofType(TaskActions.ADD_TASK),
        switchMap((taskData: TaskActions.AddTask)  => {
            return this.http
                .post(
                    'http://localhost:3000/tasks',
                    {
                        _id: taskData.payload._id,
                        name: taskData.payload.name,
                        description: taskData.payload.description,
                        dueDate: taskData.payload.dueDate,
                        completed: taskData.payload.completed
                    }
                )
        }),
    )

    @Effect()
    fetchTasks = this.actions$.pipe(
        ofType(TaskActions.FETCH_TASKS),
        switchMap(() => {
            return this.http
                .get<Task[]>(
                    'http://localhost:3000/tasks'
                )
        }),
        map(tasks => {
            return tasks.map(task => {
                return {...task, dueDate: moment(task.dueDate).startOf('day').format('MM/DD/YYYY')};
            })
        }),
        map(tasks => {
            return new TaskActions.SetTasks(tasks);
        })
    )

    @Effect({ dispatch: false })
    deleteTask = this.actions$.pipe(
        ofType(TaskActions.DELETE_TASK),
        switchMap((taskData: TaskActions.AddTask) => {
            return this.http
                .delete(
                    `http://localhost:3000/tasks/${taskData.payload}`
                )
        })
    )

    @Effect({ dispatch: false })
    updateTaske = this.actions$.pipe(
        ofType(TaskActions.UPDATE_TASK),
        switchMap((taskData: TaskActions.AddTask) => {
            return this.http
                .put(
                    `http://localhost:3000/tasks/${taskData.payload._id}`,
                    {
                        _id: taskData.payload._id,
                        name: taskData.payload.name,
                        description: taskData.payload.description,
                        dueDate: taskData.payload.dueDate,
                        completed: taskData.payload.completed
                    }
                )
        })
    )

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) {}
}