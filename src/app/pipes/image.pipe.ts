import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;


@Pipe({
  name: 'image'
})

//hace lo mismo que el helper imageUrl(), pero solo de forma visual
export class ImagePipe implements PipeTransform {

  transform(image: string | undefined, type: string): string {

    if (image) {
      return `${ base_url }/upload/${ type }/${ image }`
    } else {
      return `${ base_url }/upload/${ type }/no-image`
    }
  }

}
