import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//directives
import { ClickInsideDirective } from './click-inside.directive';
import { StopPropagationDirective } from './stop-propagation.directive';



@NgModule({
  declarations: [
    ClickInsideDirective,
    StopPropagationDirective
  ],
  exports: [
    ClickInsideDirective,
    StopPropagationDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DirectivesModule { }
