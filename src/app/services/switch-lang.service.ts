import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwitchLangService {

  public langSource = new BehaviorSubject<string>('es')
  public lang$ = this.langSource.asObservable() 

  constructor() { }
}
