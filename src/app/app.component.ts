import { TaskComponent } from './task/task.component';
import { Task } from './task';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  message:string = "";
  key: string = "subtasks";
  tasks$: AngularFireList<Task>;
  tasks: Observable<any[]>;

  @ViewChild(TaskComponent) child;

  addTask(value) {
      let newTask = new Task;
      newTask.name = value;
      newTask.deleted = false;
      newTask.done = false;
      newTask.showSubtasks = true;
     
      this.tasks$.push(newTask);
      console.log(newTask)
      
     }

  constructor(private tasksDb: AngularFireDatabase) {
    this.tasks$ = tasksDb.list('/Tasks')
    this.tasks = this.tasks$.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val()})))
    );
  }

  ngAfterViewInit() {
    // this.message = this.child.messegeEvent;
  }

  recieveMessage($event) {
    this.message = $event
  }

  update(value){
   

  }



}
