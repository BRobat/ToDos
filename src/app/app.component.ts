import { TaskComponent } from './task/task.component';
import { Task } from './task';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{

  key: string = "subtasks";

  tasksRef: AngularFireList<any>;
  tasks$: Observable<any[]>;

  @ViewChild(TaskComponent) child;

  addTask() {
      let newTask = new Task;
      newTask.name = "new task";
      newTask.deleted = false;
      newTask.done = false;
      newTask.showSubtasks = true;
      newTask.parent = ""
      newTask.level = "- "
      newTask.subtasks = ["x"]
     
      this.tasksRef.push(newTask);
      console.log(newTask)
     }

    updateTaskName($event, task) {
      console.log(task)
      
        this.tasksRef.update(task.key, {name: $event,
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
      newTask.level = $task.level + "- "
      this.tasksRef.push(newTask);

console.log(newTask[this.key])
      this.tasksRef.update($task.key, {name: $task.name,
        done: true,
        deleted: $task.deleted,
        showSubtasks: $task.showSubtasks,
        parent: $task.parent,
      subtasks: +newTask[this.key]})
    }

    constructor(db: AngularFireDatabase) {
      this.tasksRef = db.list('/Tasks');
      this.tasks$ = this.tasksRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      ));
    }

    isString(str) {
      return typeof str === 'string';
    }

    isLong(str) {
      return str.length > 10;
    }

    isEqual(str1, str2) {
      return str1 == str2
    }

    print(str) {
      console.log(str);
    }
  }
