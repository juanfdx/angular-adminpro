import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medics',
  templateUrl: './medics.component.html',
  styleUrls: ['./medics.component.scss']
})
export class MedicsComponent implements OnInit {

  public page    : string = 'medic'
  public loading : boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  loaded(event: boolean): void {
    this.loading = event
  }
}
