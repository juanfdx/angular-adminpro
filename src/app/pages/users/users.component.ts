import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public page    : string = 'user'
  public loading : boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  loaded(event: boolean): void {
    this.loading = event
  }

}
