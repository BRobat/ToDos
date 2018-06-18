export class Task {
    name: string;
    done: boolean;
    deleted: boolean;
    showSubtasks: boolean;
    subtasks: [string];
    parent: string;
}
