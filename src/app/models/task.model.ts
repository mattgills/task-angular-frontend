export class Task {
    public id: string;
    public name: string;
    public description: string;
    public dueDate: string;
    public completed: Boolean;

    constructor(id: string, name: string, description: string, dueDate: string, completed: Boolean) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = completed;
    }
}