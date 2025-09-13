import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleMenuService {

  //menu
  public toggleMenuSource = new BehaviorSubject<boolean>(false)
  public toggleMenu$ = this.toggleMenuSource.asObservable()

  //dropdowns
  public closeDropdownSource = new BehaviorSubject<boolean>(false)
  public closeDropdown$ = this.closeDropdownSource.asObservable()

  constructor() { }
}
