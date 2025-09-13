import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//pipes
import { ImagePipe } from './image.pipe';



@NgModule({
  declarations: [
    ImagePipe
  ],
  exports: [
    ImagePipe
  ],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
