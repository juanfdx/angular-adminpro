import { Component, OnInit } from '@angular/core';
import { Theme } from 'src/app/interfaces/theme.interface';
import { ThemesService } from 'src/app/services/themes.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  public darkThemes  : Theme[] = []
  public appTheme : string = 'purple-dark'


  constructor(private themesService: ThemesService) { }

  ngOnInit(): void {
    this.getThemes()
  }

  getThemes(): void {
    this.themesService.getThemes().subscribe((res: Theme[]) => {
      this.darkThemes = res
    })
  }

  setTheme(theme: Theme): void {
    const {color} = theme
    this.appTheme = color
    this.themesService.themeSource.next(theme)
  }

}
