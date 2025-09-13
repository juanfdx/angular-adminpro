import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SearchsService } from 'src/app/services/searchs.service';

@Component({
  selector: 'app-search-maint',
  templateUrl: './search-maint.component.html',
  styleUrls: ['./search-maint.component.scss']
})
export class SearchMaintComponent implements OnInit {

  @Input() page : string = 'user'


  constructor(private searchService: SearchsService) { }

  ngOnInit(): void {
  }

  search(term: string): void {
    this.searchService.searchSource.next(term)
  }
}
