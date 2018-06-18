import { Task } from './../task';
import { Observable } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent{

  //@ViewChild(TaskComponent) child;


  @Input('data') tasks: Array<Task>;
  @Input('task') task: Task;
  @Input('key') key: any[];

  @Output() taskName = new EventEmitter<string>();
  @Output() taskEvent = new EventEmitter<string>();
  @Output() showEvent = new EventEmitter<boolean>();
  @Output() doneEvent = new EventEmitter<boolean>();
  @Output() deleteEvent = new EventEmitter<boolean>();
  @Output() addEvent = new EventEmitter<string>();

  constructor() { 
  }

  ngOnInit(): void {
    
    
  }


  update(value, task) {
    console.log(value)
    console.log(task)
    this.taskName.emit(value);
    this.taskEvent.emit(task);
  }

 showSubtasks(task) {
  this.showEvent.emit(task);
 }

 addSubtask(task) {
  this.addEvent.emit(task);
 }

 completeTask(task) {
  this.doneEvent.emit(task);
 }

 deleteTask(task) {
  this.deleteEvent.emit(task);
 }

 isEqual(str1, str2) {
  return str1 == str2
}


 print(str) {
   console.log(str);
 }


}
