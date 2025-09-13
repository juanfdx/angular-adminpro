import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/login-form.interface';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public active : boolean = false
  public loginForm : FormGroup
  public formSubmitted = false;

  constructor(private fb: FormBuilder, 
              private userService: UserService, 
              private router: Router) { 

    this.loginForm = this.fb.group({
      email:     [ localStorage.getItem('email') || '', [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]],
      password:  ['', [ Validators.required, Validators.minLength(6) ]],
      remember: [false ]
    })
  }

  ngOnInit(): void {
  }

  setActive(): void {
    this.active = !this.active
    this.loginForm.controls['remember'].setValue(this.active);
    // console.log((this.loginForm.get('remember')?.value))
  }

  login(): void {
    this.formSubmitted = true;

    if (this.loginForm.invalid) { return } 

    this.userService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        //si el usuario quiere ser recordado
        if (this.loginForm.get('remember')?.value) {
          localStorage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          localStorage.removeItem('email');
        }

        this.router.navigateByUrl('/')
      },

      error: err => Swal.fire('Error', err.error.msg, 'error')
      
    })  
  }

  //ERRORS METHODS:
  isRequired(field: string): boolean {
    if (this.loginForm.controls[field].getError('required') && this.formSubmitted) {
      return true
    }
    return false
  }

  minLength(field: string): boolean {
    return this.loginForm.controls[field].getError('minlength')
  }

  isEmail(): boolean {
    if (this.loginForm.controls['email'].getError('pattern')) {
      return true
    }
    return false
  }

}
