import { Task } from './../task';
import { Observable } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent{


  @Input('data') task: Task;
  @Input('key') key: any[];

  @Output() taskName = new EventEmitter<string>();
  @Output() taskEvent = new EventEmitter<string>();
  @Output() showEvent = new EventEmitter<boolean>();
  @Output() doneEvent = new EventEmitter<boolean>();
  @Output() deleteEvent = new EventEmitter<boolean>();
  @Output() addEvent = new EventEmitter<Task>();

  constructor() { 
    console.log(this.task)
  }


  update(value, task) {
    console.log("2")
    this.taskName.emit(value);
    this.taskEvent.emit(task);
  }

 showSubtasks(task) {
  this.showEvent.emit(task)
 }

 addSubtask() {

 }

 finish() {

 }

 delete() {

 }


}
