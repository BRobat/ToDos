import { Task } from './../task';
import { Observable } from 'rxjs';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {


  @Input('data') task: Task;
  @Input('key') key: any[];

  @Output() messageEvent = new EventEmitter<string>()

  constructor() { 
    console.log(this.task)
  }

  ngOnInit() {
  }

  update(value, task) {
    console.log(task)
    this.messageEvent.emit(value)
  }

  newSubtask(value, task) {
    console.log(task)

  }

  print(str) {
    console.log(str)
  }



}
