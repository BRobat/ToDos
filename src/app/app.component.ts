import { TaskComponent } from './task/task.component';
import { Task } from './task';
import { Component, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ DataService ]
})
export class AppComponent{


  tasksRef: AngularFireList<any>;
  tasks$: Observable<any[]>;

  @ViewChild(TaskComponent) child;

  constructor(db: AngularFireDatabase) {
    this.tasksRef = db.list('/Tasks');
    this.tasks$ = this.tasksRef.snapshotChanges().pipe(
    map(changes => 
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    ));
  }

  addTask() {
      let newTask = new Task;
      newTask.name = "-";
      newTask.deleted = false;
      newTask.done = false;
      newTask.showSubtasks = true;
      newTask.parent = "null";
  
      this.tasksRef.push(newTask);
      console.log(newTask)
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
