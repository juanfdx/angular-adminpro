import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
//helpers
import { imageUrl } from '../helpers/imageurl';


@Injectable({
  providedIn: 'root'
})
export class SearchsService {

  public base_url: string = environment.base_url;

  //SEARCH TERM SERVICE
  public searchSource = new BehaviorSubject<string>('')
  public search$ = this.searchSource.asObservable()  

  constructor(private http: HttpClient) { }


  //GETTERS:
  public get token(): string {
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
    GLOBAL SEARCH
  ============================================================*/
  globalSearch(term: string, from: number = 0): Observable<any> {
  //no tratamos las img con imageUrl() para poder usar el pipe image en este caso
    return this.http.get(`${this.base_url}/all/${term}?from=${from}`, this.headers)
  }

  /*===========================================================
    SEARCH - by type
  ============================================================*/
  search( type: string, term: string, from: number = 0): Observable<any> {
    
    return this.http.get(`${this.base_url}/all/collection/${type}/${term}?from=${from}`, this.headers)
                .pipe(
                  map((res: any) => {
                    //agregamos el path http://localhost:3000/api de la api a cada imagen
                    res.data.forEach((user: any) => {
                      user.image =  imageUrl(this.base_url, user.image, type)     
                    })
                    return res
                  })
                )
  }
}
