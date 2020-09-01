import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() completed: Boolean;

  constructor() { }

  ngOnInit(): void {
  }

  onAdd(e: Event) {
    console.log('adding', e)
    e.preventDefault();
    e.stopImmediatePropagation();
  }

  onRemove(e: Event) {
    console.log('removing', e)
    e.preventDefault();
    e.stopImmediatePropagation();
  }

}
