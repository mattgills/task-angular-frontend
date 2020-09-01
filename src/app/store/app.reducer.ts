import { ActionReducerMap } from '@ngrx/store';
import * as fromTasks from '../task/store/task.reducer';

// Setup interface for app state
// Each sub state (e.g. tasks) can be separately defined and added to the overall app state
export interface AppState {
    tasks: fromTasks.State
}

// Define and export and overall app reducer
// This will be used to to define the overall store module and app reducer
export const appReducer: ActionReducerMap<AppState> = {
    tasks: fromTasks.taskReducer
}