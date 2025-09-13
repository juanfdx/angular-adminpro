import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Input() page : string = ''
  public year: number = new Date().getFullYear();
  
  constructor() { }

  ngOnInit(): void {
  }

}
