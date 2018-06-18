import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  tasksRef: AngularFireList<any>;
  tasks$: Observable<any[]>;

  constructor(db: AngularFireDatabase) { 
    this.tasksRef = db.list('/Tasks');
    this.tasks$ = this.tasksRef.snapshotChanges().pipe(
    map(changes => 
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() })),
    ));
  }

  // Changing name of a task
  nameTask(value, task) {
    console.log("hej",task)
    this.tasksRef.update(task.key, {name: value,
      done: task.done,
      deleted: task.deleted,
      showSubtasks: task.showSubtasks,
      parent: task.parent})
  }

  // toggles subtask view
  showSubtasks($task) {
    console.log($task)
    this.tasksRef.update($task.key, {name: $task.name,
      done: $task.done,
      deleted: $task.deleted,
      showSubtasks: !$task.showSubtasks,
      parent: $task.parent})
  }

  // completes/uncompletes the task
  completeTask($task) {
    console.log($task)
    this.tasksRef.update($task.key, {name: $task.name,
      done: !$task.done,
      deleted: $task.deleted,
      showSubtasks: $task.showSubtasks,
      parent: $task.parent})
  }

  // deletes task
  deleteTask($task) {
    console.log($task)
    this.tasksRef.update($task.key, {name: $task.name,
      done: $task.done,
      deleted: true,
      showSubtasks: false,
      parent: $task.parent})
  }

  // adds subtask
  addSubtask($task){
    console.log($task)
    let newTask = new Task;
    newTask.name = "-";
    newTask.deleted = false;
    newTask.done = false;
    newTask.showSubtasks = true;
    newTask.parent = $task.key;
    
    this.tasksRef.push(newTask);
  }
}
