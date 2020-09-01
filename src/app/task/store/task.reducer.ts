import { Task } from '../../models/task.model';
import * as TaskActions from './task.actions';
import * as moment from 'moment';

export interface State {
    tasks: Task[];
}

const initialState: State = {
    tasks: [
        new Task('5f4e71e036d62165d07ac475', 'Create Frontend', 'Using Angular', moment().subtract(1, 'day').format('MM/DD/YYYY'), false),
        new Task('5f4e812a0b9f25470c97819a', 'Create Backend', 'Using Nest.js', moment().format('MM/DD/YYYY'), false),
        new Task('5f4e812a0b9f25470c97819b', 'Create Database', 'Using Mongo', moment().add(1, 'day').format('MM/DD/YYYY'), true)
    ]
}

export function taskReducer(state = initialState, action: TaskActions.TaskActions) {
    switch (action.type) {
        case TaskActions.SET_TASKS:
            return {
                ...state,
                tasks: [...action.payload]
            }
        case TaskActions.ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        case TaskActions.UPDATE_TASK:
            console.log('in reducer', action.payload)
            // Set the updated task to the original task, with overwritten properties
            const updatedTask = {
                ...state.tasks.find(task => task.id === action.payload.id),
                ...action.payload
            }
            console.log('updated task', updatedTask)
            // Set the updated tasks list to be the original tasks list
            let updatedTasks = [...state.tasks];
            // Loop through the tasks list and update the task of interest
            // This should be re-evaluated since we only care about one element
            updatedTasks = updatedTasks.map(task => {
                if (task.id === action.payload.id) {
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
            return {
                ...state,
                tasks: state.tasks.filter(task => {
                    return task.id !== action.payload;
                })
            }
        default:
            return state;
    }
}