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

  

  childTask: any[];
  key: string = "subtasks";

  tasksRef: AngularFireList<any>;
  tasks$: Observable<any[]>;


  

  @ViewChild(TaskComponent) child;

  addTask(value) {
      let newTask = new Task;
      newTask.name = value;
      newTask.deleted = false;
      newTask.done = false;
      newTask.showSubtasks = true;
     
      this.tasksRef.push(newTask);
      console.log(newTask)
     }

    updateTaskName($event, task) {
      console.log($event)
      this.tasksRef.update(task.key, {name: $event,
      done: task.done,
      deleted: task.deleted,
      showSubtasks: task.showSubtasks,
      subtasks: task.subtasks})
    }

    showSubtasks(task) {
      this.tasksRef.update(task.key, {name: task.name,
        done: task.done,
        deleted: task.deleted,
        showSubtasks: !task.showSubtasks,
        subtasks: task.subtasks})
    }

    constructor(db: AngularFireDatabase) {
      this.tasksRef = db.list('/Tasks');
      this.tasks$ = this.tasksRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    }



    print(str) {
      console.log(str)
    }
  }
