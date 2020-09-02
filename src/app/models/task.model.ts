export class Task {
    public _id: string;
    public name: string;
    public description: string;
    public dueDate: string;
    public completed: Boolean;

    constructor(_id: string, name: string, description: string, dueDate: string, completed: Boolean) {
        this._id = _id;
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = completed;
    }
}