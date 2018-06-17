import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private db: AngularFireDatabase) { }
  get(): AngularFireList<any[]>{
    return this.db.list('/Tasks');
  }
}
