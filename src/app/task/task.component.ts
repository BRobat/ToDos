import { Task } from './../task';
import { AngularFireList } from "angularfire2/database";
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {


  @Input('data') tasks$: any[];
  @Input('key') key = "subtasks";

  @Output() messageEvent = new EventEmitter<string>()

  constructor() { 
    console.log(this.key)
  }

  ngOnInit() {
  }

  update(value, task) {
    console.log(task)
    this.messageEvent.emit(task.key)
  }
}
