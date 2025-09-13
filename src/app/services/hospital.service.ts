import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { imageUrl } from '../helpers/imageurl';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  private base_url : string = environment.base_url

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


  /*=====================================================================
   GET ALL HOSPITALS 
  =====================================================================*/
  getAllHospitals(from: number = 0): Observable<any> {
    return this.http.get(`${this.base_url}/hospitals?from=${from}`, this.headers)
                .pipe(
                  map((res: any) => {
                    //agregamos el path http://localhost:3000/api de la api a cada imagen
                    res.hospitals.forEach((hp: any) => {
                      hp.image =  imageUrl(this.base_url, hp.image, 'hospitals')     
                    })
                    return res
                  })
                )
  }

  /*===========================================================
    CREATE HOSPITAL
  ============================================================*/
  createHospital(name: string): Observable<any> {
    return this.http.post(`${this.base_url}/hospitals`, {name}, this.headers) 
  }

  /*===========================================================
    UPDATE HOSPITAL
  ============================================================*/
  updateHospital(id: string, name: string): Observable<any> {
    return this.http.put(`${this.base_url}/hospitals/${id}`, {name}, this.headers)
  }

  /*===========================================================
    DELETE HOSPITAL
  ============================================================*/
  deleteHospital(id: string): Observable<any> {
    return this.http.delete(`${this.base_url}/hospitals/${id}`, this.headers)
  }

}
