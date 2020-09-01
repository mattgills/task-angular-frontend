export class Task {
    public name: string;
    public description: string;
    public dueDate: Date;
    public completed: Boolean;

    constructor(name: string, description: string, dueDate: Date, completed: Boolean) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = completed;
    }
}