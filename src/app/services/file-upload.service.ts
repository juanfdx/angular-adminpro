import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { imageUrl } from '../helpers/imageurl';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private base_url  : string = environment.base_url


  constructor(private http: HttpClient) { }


  //GETTERS:
  public get token() : string {
    return localStorage.getItem('token') || '';
  }

  public get headers() : object {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


/*===========================================================
  UPLOAD IMAGE
============================================================*/

  uploadImage(type: string, id: string, image: any): Observable<any> {

    //tratamos la imagen a subir es siempre asi
    const data = new FormData();
    data.append('image', image);

    return this.http.put(`${this.base_url}/upload/${type}/${id}`, data, this.headers)
                  .pipe(
                    map( (res: any) => {
                      let { fileName } = res
                      //agregamos la ruta completa a la imagen
                      res.fileName = imageUrl(this.base_url, fileName, type)
                      return res
                    })
                    
                  )
  }



}
