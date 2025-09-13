import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { capitalize } from '../helpers/capitalize';
//helpers
import { imageUrl } from '../helpers/imageurl';
//interfaces
import { LoginForm } from '../interfaces/login-form.interface';
import { ProfileForm } from '../interfaces/profile-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { User } from '../interfaces/user.interface';

// const base_url = environment.base_url

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private base_url : string = environment.base_url
  public user!     : User

  public userSource = new BehaviorSubject<User>(
    {
      _id      : '',
      name     : '',
      lastName : '',
      email    : '',
      image    : '',
      role     : 'USER_ROLE',
      status   : 'active'
    }
  ) 
  public user$ = this.userSource.asObservable()  


  constructor(private http: HttpClient,
              private router: Router) { }


  //GETTERS:
  //usuario que esta logueado
  public get userId() : string {
    return this.user._id || ''
  }

  public get role() : "ADMIN_ROLE" | "USER_ROLE" {
    return this.user.role!
  }

  public get status() : "active" | "inactive" {
    return this.user.status!
  }

  public get token(): string {
    return localStorage.getItem('token') || ''
  }

  public get headers() : object {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  /*===========================================================
    SAVE LOCALSTORAGE
  ============================================================*/
  saveLocalStorage( token: string, menu: any ) {
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));
  }

  /*===========================================================
    RENEW TOKEN
  ============================================================*/
  validateToken(): Observable<boolean> {
    //en this.headers mandamos el x-token
    return this.http.get(`${this.base_url}/login/renew`, this.headers)
                .pipe(
                  map((res:any) => {

                    this.user = res.user
                    //si no tiene imagen asignamos una por defecto
                    this.user.image = imageUrl(this.base_url, res.user.image, 'users')
                    //mandamos el user como observable a toda la app
                    this.userSource.next(this.user)

                    this.saveLocalStorage(res.token, res.menu);
        
                    return true;
                  }),
                  catchError( error => of(false))
                )
  }

  /*===========================================================
    CREATE USER - user register
  ============================================================*/
  createUser(formData: RegisterForm): Observable<any> {  
    //capitalizamos name y lastName
    const data = {
      ...formData,
      name     : capitalize(formData.name),
      lastName : capitalize(formData.lastName),
    }

    return this.http.post(`${this.base_url}/users`, data)
                .pipe(
                  tap((res: any) => this.saveLocalStorage(res.token, res.menu)))
  }  

  /*===========================================================
    UPDATE USER
  ============================================================*/
  updateUser(formData: ProfileForm, userId: string): Observable<any> {
    
    //agregamos el role al formData y capitalizamos
    const data = {
      ...formData,
      name     : capitalize(formData.name),
      lastName : capitalize(formData.lastName),
      role     : this.user.role,
    }

    return this.http.put(`${this.base_url}/users/${userId}`, data, this.headers)
                .pipe(
                  map((res:any) => {
                    this.user = res.user
                    //si no tiene imagen asignamos una por defecto e incluimos el path
                    this.user.image = imageUrl(this.base_url, res.user.image, 'users')
                    //mandamos el user como observable a toda la app
                    this.userSource.next(this.user)
                    
                    return res
                  })
                )
  }

  /*===========================================================
    CHANGE USER_ROLE OR STATUS
  ============================================================*/
  changeRoleOrStatus(user: any): Observable<any> {
    //quitamos la imagen del user, pq viene con un path incluido
    const {image, ...data} = user
    
    return this.http.put(`${this.base_url}/users/${user._id}`, data, this.headers)
  }

  /*=====================================================================
   GET ALL USERS 
  =====================================================================*/
  getAllUsers( from: number = 0): Observable<any> {
    return this.http.get(`${this.base_url}/users/?from=${from}`, this.headers)
            .pipe(
              map((res: any) => {
                //agregamos el path http://localhost:3000/api de la api a cada imagen
                res.users.forEach((user: any) => {
                  user.image =  imageUrl(this.base_url, user.image, 'users')     
                })
                return res
              })
            )
  }

  /*===========================================================
    DELETE USER
  ============================================================*/
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.base_url}/users/${id}`, this.headers)
  }

  /*===========================================================
    LOGIN
  ============================================================*/
  login(formData: LoginForm): Observable<any> {
    return this.http.post<LoginForm>(`${this.base_url}/login`, formData)
                .pipe(
                  tap((res: any) => this.saveLocalStorage(res.token, res.menu)))
  }

  /*===========================================================
    LOGOUT
  ============================================================*/
  logout() {

    localStorage.removeItem('token')
    localStorage.removeItem('menu')
    localStorage.removeItem('currentLang')

    this.router.navigateByUrl('/login')
  }

}
