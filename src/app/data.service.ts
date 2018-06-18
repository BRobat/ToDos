import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  tasksRef: AngularFireList<any>;
  tasks$: Observable<any[]>;

  private taskSource = new BehaviorSubject<Task>("");
  currentTaskSource = this.taskSource.asObservable();



  constructor(db: AngularFireDatabase) { 
    this.tasksRef = db.list('/Tasks');
    this.tasks$ = this.tasksRef.snapshotChanges().pipe(
    map(changes => 
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    ));
  }

  nameTask(value, task) {
    console.log("hej",task)
    this.tasksRef.update(task.key, {name: value,
      done: task.done,
      deleted: task.deleted,
      showSubtasks: task.showSubtasks,
      parent: task.parent})
  }

  showSubtasks($task) {
    console.log($task)
    this.tasksRef.update($task.key, {name: $task.name,
      done: $task.done,
      deleted: $task.deleted,
      showSubtasks: !$task.showSubtasks,
      parent: $task.parent})
  }

  completeTask($task) {
    console.log($task)
    this.tasksRef.update($task.key, {name: $task.name,
      done: true,
      deleted: $task.deleted,
      showSubtasks: $task.showSubtasks,
      parent: $task.parent})
  }

  deleteTask($task) {
    console.log($task)
    this.tasksRef.update($task.key, {name: $task.name,
      done: $task.done,
      deleted: true,
      showSubtasks: false,
      parent: $task.parent})
  }

  addSubtask($task){
    console.log($task)
    let newTask = new Task;
    newTask.name = "new task";
    newTask.deleted = false;
    newTask.done = false;
    newTask.showSubtasks = true;
    newTask.parent = $task.key;
    
    this.tasksRef.push(newTask);
  }
  

}
