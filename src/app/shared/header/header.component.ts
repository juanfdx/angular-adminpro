import { Component, OnInit } from '@angular/core';
import { ThemesService } from 'src/app/services/themes.service';
import { ToggleMenuService } from 'src/app/services/toggle-menu.service';
import { SwitchLangService } from 'src/app/services/switch-lang.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription, delay } from 'rxjs';
//interfaces
import { Theme } from 'src/app/interfaces/theme.interface';
import { User } from 'src/app/interfaces/user.interface';
import { ModalImageService } from 'src/app/services/modal-image.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public active      : boolean = false
  public dropProfile : boolean = false
  public dropLang    : boolean = false
  public searchForm  : boolean = false
  public screenWidth : number = 0
  public theme       : any
  public user        : any
  public langActive  : string = localStorage.getItem('currentLang') || 'es'

  public listObservers$: Subscription[] = [];


  constructor(private toggleMenuService: ToggleMenuService,
              private themesService: ThemesService,
              private userService: UserService,
              private switchLangService: SwitchLangService,
              private modalImageService: ModalImageService) { }


  ngOnInit(): void {
    this.setTheme()
    this.setLangActive()
    this.toggleMenu()
    this.closeDropdowns()
    this.modalImageUploaded()
    this.getUser()
    this.screenWidth = window.innerWidth
    if (this.screenWidth >= 1170) { this.active = true }

  }
  
  getUser(): void {
    const observer4$ = this.userService.user$.subscribe( (res: User) => {
      this.user = res    
     })
    this.listObservers$.push(observer4$)  
  }

  modalImageUploaded(): void {
    const observer6$ = this.modalImageService.newImageEvent.subscribe({
      next: (image: string) => {
        this.user.image = image
        this.getUser()       
      }
    })
    this.listObservers$.push(observer6$)  
  }

  setLangActive(): void {
    const observer5$ = this.switchLangService.lang$.subscribe( lang => {
      setTimeout(() => {    
        this.langActive = lang
      }, 100);
    })
    this.listObservers$.push(observer5$)  
  }

  toggleMenu(): void {
    const observer1$ = this.toggleMenuService.toggleMenu$.subscribe((res: boolean) => {
      this.active = res   
    })
    this.listObservers$.push(observer1$)
  }

  setActiveMenu(): void {
    this.active = !this.active
    this.toggleMenuService.toggleMenuSource.next(this.active)
    // this.dropProfile = false
    // this.dropLang = false
  }

  dropdownProfile(): void {
    this.dropProfile = !this.dropProfile
    this.dropLang = false
  }

  dropdownLang(): void {
    this.dropLang = !this.dropLang
    this.dropProfile = false
  }

  closeDropdowns(): void {
    const observer2$ = this.toggleMenuService.closeDropdown$.subscribe((res: boolean) => {
      this.dropLang = false
      this.dropProfile = false 
    }) 
    this.listObservers$.push(observer2$)
  }

  showSearchForm(): void {
    this.searchForm = !this.searchForm
  }

  setTheme(): void {
    const observer3$ = this.themesService.theme$.subscribe((res: Theme) => {
      this.theme = res
    })
    this.listObservers$.push(observer3$)
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
  }

}
