import { Directive, ElementRef, HostListener } from '@angular/core';
import { ToggleMenuService } from '../services/toggle-menu.service';

@Directive({
  selector: '[appClickInside]'
})
export class ClickInsideDirective {

  constructor(private toggleMenuService: ToggleMenuService, 
              private eRef: ElementRef) { }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(this.eRef.nativeElement.contains(event.target)) {
      this.toggleMenuService.closeDropdownSource.next(true)  
    }
  }
}
