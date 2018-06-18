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

  addSubtask(task) {
    let newSubtask = new Task;
    newSubtask.name = "";
    newSubtask.deleted = false;
      newSubtask.done = false;
      newSubtask.showSubtasks = true;
    }

    recieveMessage($event) {
      console.log($event.key)
      this.tasksRef.update($event.key, {name: $event,
      done: $event.done,
      deleted: $event.deleted,
      showSubtasks: $event.showSubtasks,
      subtasks: $event.subtasks})
    }

    constructor(db: AngularFireDatabase) {
      this.tasksRef = db.list('/Tasks');
      this.tasks$ = this.tasksRef.snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    }

    ngOnInit() {
      
    }



    print(str) {
      console.log(str)
    }
  }
