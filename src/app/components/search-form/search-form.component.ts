import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {

  @Input() searchForm   : boolean = false
  @Output() closeSearch = new EventEmitter<boolean>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  searchAll(term: string): void {
    if (term.length === 0) { return }
    this.router.navigateByUrl(`/dashboard/search/${term}`)
  }

  hideSearchForm(): void {
    this.closeSearch.emit(false)
  }
}
