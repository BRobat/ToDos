import { Task } from './../task';
import { Observable } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DataService } from '../data.service';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent{

  @Input('data') tasks: Array<Task>;
  @Input('task') task: Task;
  @Input('key') key: any[];



  constructor(private data: DataService) { 
  }

  ngOnInit(): void {
    
  }


  update(value, task) {
    console.log(task)
    this.data.nameTask(value, task);
  }

  showSubtasks(task) {
    this.data.showSubtasks(task);
  }

  addSubtask(task) {
    this.data.addSubtask(task)
  }

  completeTask(task) {
    this.data.completeTask(task)
  }

  deleteTask(task) {
    this.data.deleteTask(task)
  }



 isEqual(str1, str2) {
  return str1 == str2
}


 print(str) {
   console.log(str);
 }


}
