import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input('data') tasks: Array<Object>;
  @Input('key') key: string;


  constructor() { }

  ngOnInit() {
  }


}
