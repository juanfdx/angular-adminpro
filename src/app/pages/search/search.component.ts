import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchsService } from 'src/app/services/searchs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public users     : any[] = []
  public medics    : any[] = []
  public hospitals : any[] = []

  constructor(private activatedRoute: ActivatedRoute,
              private searchService: SearchsService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({term}) => {
      this.globalSearch(term)    
    })
  }

  globalSearch(term: string): void {
    this.searchService.globalSearch(term).subscribe( res => {
      this.users     = res.users
      this.medics    = res.medics
      this.hospitals = res.hospitals
    })
  }

  openMedic(medic: any): void {
    this.router.navigateByUrl(`/dashboard/medic/${medic._id}`)
  }

}
