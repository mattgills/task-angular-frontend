import { Task } from '../../models/task.model';
import * as TaskActions from './task.actions';

export interface State {
    tasks: Task[];
}

const initialState: State = {
    tasks: [
        new Task('5f4e71e036d62165d07ac475', 'Create Frontend', 'Using Angular', new Date('09-01-2020'), false),
        new Task('5f4e812a0b9f25470c97819a', 'Create Backend', 'Using Nest.js', new Date('09-01-2020'), false),
        new Task('5f4e812a0b9f25470c97819b', 'Create Database', 'Using Mongo', new Date('09-01-2020'), true)
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
            return {
                ...state
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