import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import * as moment from 'moment';
import * as fromApp from '../../store/app.reducer';
import * as TaskActions from './task.actions';
import { Task } from '../../models/task.model';
@Injectable()
export class TaskEffects {
    // This effect is used to add a document after an item has been added
    // There is no additional action to dispatch, therefore dispatch: false is necessary
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

    // This effect is used to obtain all documents
    // Upon successful retrieval, all items dispatched via SetTasks
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

    // This effect is used to delete the document after an item has been delete
    // There is no additional action to dispatch, therefore dispatch: false is necessary
    @Effect({ dispatch: false })
    deleteTask = this.actions$.pipe(
        ofType(TaskActions.DELETE_TASK),
        switchMap((taskData: TaskActions.DeleteTask) => {
            return this.http
                .delete(
                    `http://localhost:3000/tasks/${taskData.payload}`
                )
        })
    )

    // This effect is used to update the document after an item has been edited
    // There is no additional action to dispatch, therefore dispatch: false is necessary
    @Effect({ dispatch: false })
    updateTask = this.actions$.pipe(
        ofType(TaskActions.UPDATE_TASK),
        switchMap((taskData: TaskActions.UpdateTask) => {
            return this.http
                .put(
                    `http://localhost:3000/tasks/${taskData.payload._id}`,
                    {
                        //_id: taskData.payload._id,
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