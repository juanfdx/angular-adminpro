import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})
export class HospitalsComponent implements OnInit {

  public page    : string = 'hospital'
  public loading : boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  loaded(event: boolean): void {
    this.loading = event
  }
}
