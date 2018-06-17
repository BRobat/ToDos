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
export class AppComponent implements AfterViewInit {

  childTask: any[];
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

     addSubtask(task) {
      console.log(task)
      let newSubtask = new Task;
      newSubtask.name = '';
      newSubtask.deleted = false;
      newSubtask.done = false;
      newSubtask.showSubtasks = true;

      if (task.subtasks == null) {
        this.tasks$.update(task.key, {name: task.name,
          done: task.done,
          deleted: task.deleted,
          showSubtasks: task.showSubtasks,
          subtasks: [newSubtask]}) 
      } else {
        this.tasks$.update(task.key, {name: task.name,
          done: task.done,
          deleted: task.deleted,
          showSubtasks: task.showSubtasks,
          subtasks: [newSubtask, task.subtasks]})
      }
      
    }

  constructor(private tasksDb: AngularFireDatabase) {
    this.tasks$ = tasksDb.list('/Tasks')
    this.tasks = this.tasks$.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val()})))
    );
  }

  ngAfterViewInit() {
    this.childTask = this.child.messegeEvent;
    console.log(this.childTask)
  }

  recieveMessage($event) {
    $event
    console.log($event)
    this.tasks$.update($event.key, {name: $event,
    done: $event.done,
    deleted: $event.deleted,
    showSubtasks: $event.showSubtasks,
    subtasks: $event.subtasks})
  }

  updateName(value, task){
    console.log(task)
    this.tasks$.update(task.key, {name: value,
    done: task.done,
    deleted: task.deleted,
    showSubtasks: task.showSubtasks,
    subtasks: task.subtasks
  }) 

  }
}
