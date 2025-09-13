import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { imageUrl } from '../helpers/imageurl';
import { MedicForm } from '../interfaces/medic-form.interface';
import { capitalize } from '../helpers/capitalize';


@Injectable({
  providedIn: 'root'
})
export class MedicService {

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
    GET ALL MEDICS 
  =====================================================================*/
  getAllMedics(from: number = 0): Observable<any> {
    return this.http.get(`${this.base_url}/medics?from=${from}`, this.headers)
                .pipe(
                  map((res: any) => {

                    res.medics.forEach((medic: any) => {
                      medic.image = imageUrl(this.base_url, medic.image, 'medics')
                    });

                    return res
                  })
                )
  }

  /*===========================================================
    GET ONE MEDIC - by id 
  ============================================================*/
  //no tratamos las img con imageUrl() para poder usar el pipe image en este caso
  getMedic(id: string): Observable<any> {
    return this.http.get(`${this.base_url}/medics/${id}`, this.headers)
  }

  /*===========================================================
    CREATE MEDIC
  ============================================================*/
  createMedic(formData: MedicForm): Observable<any> {

    const data = {
      ...formData,
      name     : capitalize(formData.name),
      lastName : capitalize(formData.lastName),
    }

    return this.http.post(`${this.base_url}/medics`, data, this.headers)
  }

  /*===========================================================
    UPDATE MEDIC
  ============================================================*/
  updateMedic(id: string, formData: MedicForm): Observable<any> {

    //capitalizamos los campos name y lastName
    const data = {
      ...formData,
      name     : capitalize(formData.name),
      lastName : capitalize(formData.lastName),
    }
    
    return this.http.put(`${this.base_url}/medics/${id}`, data, this.headers)
  }

  /*===========================================================
    DELETE MEDIC
  ============================================================*/
  deleteMedic(id: string): Observable<any> {
    return this.http.delete(`${this.base_url}/medics/${id}`, this.headers)
  }
}
