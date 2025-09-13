import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-maint',
  templateUrl: './loading-maint.component.html',
  styleUrls: ['./loading-maint.component.scss']
})
export class LoadingMaintComponent implements OnInit {

  @Input() loading : boolean = true

  constructor() { }

  ngOnInit(): void {
  }

}
