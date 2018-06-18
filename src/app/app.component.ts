import { TaskComponent } from './task/task.component';
import { Task } from './task';
import { Component, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { DataService } from './data.service';
import { Change } from '@firebase/database/dist/src/core/view/Change';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ DataService ]
})
export class AppComponent{


  tasksRef: AngularFireList<any>;
  tasks$: Observable<any[]>;
  currentTask: Task;

  @ViewChild(TaskComponent) child;



  constructor(db: AngularFireDatabase, private data: DataService) {
    this.tasksRef = db.list('/Tasks');
    this.tasks$ = this.tasksRef.snapshotChanges().pipe(
    map(changes => 
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    ));

    this.data.currentTaskSource.subscribe(currentTask => this.currentTask = currentTask)
    console.log(this.currentTask)
    
    
  }



  addTask() {
      let newTask = new Task;
      newTask.name = "new task";
      newTask.deleted = false;
      newTask.done = false;
      newTask.showSubtasks = true;
      newTask.parent = "null";
  
      this.tasksRef.push(newTask);
      console.log(newTask)
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
