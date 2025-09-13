import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {

  //este se activa siempre y manda el valor inicial
  public modalSource = new BehaviorSubject<any>({})
  public modal$ = this.modalSource.asObservable() 

  //de tipo event pq solo se activa al ser llamado aunque este en el onInit()
  //se usa en modal.image.component.ts 82
  public newImageEvent = new EventEmitter<string>();

  constructor() { }

}
