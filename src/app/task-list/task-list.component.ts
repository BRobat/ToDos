import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase} from 'angularfire2/database';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  key: string = "subtasks";
  data: any[];
  subscription: Subscription;

  constructor(db: AngularFireDatabase) {
    this.subscription = db.list('/Tasks')
    .valueChanges()
    .subscribe(data => {this.data = data})
  }

  ngOnInit() {
  }


  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
