import { Task } from '../../models/task.model';
import * as TaskActions from './task.actions';
import * as moment from 'moment';

export interface State {
    tasks: Task[];
}

// Set an initial state
// Typically this should be empty, but has been useful for testing without the backend attached
// This array will be immediately overwritten if the backend is successfully connected and running
const initialState: State = {
    tasks: [
        new Task('5f4e71e036d62165d07ac475', 'Create Frontend', 'Using Angular', moment().subtract(1, 'day').format('MM/DD/YYYY'), false),
        new Task('5f4e812a0b9f25470c97819a', 'Create Backend', 'Using Nest.js', moment().format('MM/DD/YYYY'), false),
        new Task('5f4e812a0b9f25470c97819b', 'Create Database', 'Using Mongo', moment().add(1, 'day').format('MM/DD/YYYY'), true)
    ]
}

export function taskReducer(state = initialState, action: TaskActions.TaskActions) {
    // Switch case to determine which action type has come through
    switch (action.type) {
        case TaskActions.SET_TASKS:
            // Return the original state and overwrite the tasks with the Task[] payload
            return {
                ...state,
                tasks: [...action.payload]
            }
        case TaskActions.ADD_TASK:
            // Return the orignial state and add the new Task payload to the tasks array
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        case TaskActions.UPDATE_TASK:
            // Set the updated task to the original task, with overwritten properties
            const updatedTask = {
                ...state.tasks.find(task => task._id === action.payload._id),
                ...action.payload
            }
            // Set the updated tasks list to be the original tasks list
            let updatedTasks = [...state.tasks];
            // Loop through the tasks list and update the task of interest
            // This should be re-evaluated since we only care about one element
            updatedTasks = updatedTasks.map(task => {
                if (task._id === action.payload._id) {
                    task = {
                        ...updatedTask
                    }
                }
                return task;
            });
            // Return the overall state with the tasks overwritten
            return {
                ...state,
                tasks: updatedTasks
            }
        case TaskActions.DELETE_TASK:
            // Return the original state, with the tasks array overwritten
            // Use the Array.filter method (returns new array) to remove the deleted task
            return {
                ...state,
                tasks: state.tasks.filter(task => {
                    return task._id !== action.payload;
                })
            }
        default:
            // If none of above are caught, then return the original state
            // This will happen for the original FETCH_TASKS action
            // The FETCH_TASKS action dispatches the SET_TASKS action (on success) in order to change the state
            return state;
    }
}