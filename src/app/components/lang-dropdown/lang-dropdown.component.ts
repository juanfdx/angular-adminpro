import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SwitchLangService } from 'src/app/services/switch-lang.service';


@Component({
  selector: 'app-lang-dropdown',
  templateUrl: './lang-dropdown.component.html',
  styleUrls: ['./lang-dropdown.component.scss']
})
export class LangDropdownComponent implements OnInit {

  @Input() dropLang : boolean = false
  @Output() close = new EventEmitter<boolean>();
  
  public currentLang: string = localStorage.getItem('currentLang') || 'es'


  constructor(private translateService: TranslateService,
              private switchLangService: SwitchLangService) { 

    translateService.use(this.currentLang);
  }

  ngOnInit(): void {
    this.switchLangService.langSource.next(this.currentLang)
  }

  selectLanguage(lang:string) {
    this.currentLang = lang
    this.translateService.use(this.currentLang)
    this.switchLangService.langSource.next(lang)
    //guardamos el lenguaje en el localstorage
    localStorage.setItem('currentLang', lang)
  }

  clickClose(): void {
    this.dropLang = false
    this.close.emit(false)
  }

}
