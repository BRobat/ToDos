import { Task } from './../task';
import { Observable } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent{


  @Input('data') tasks: [Task];
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

 print(str) {
   console.log(str);
 }


}
