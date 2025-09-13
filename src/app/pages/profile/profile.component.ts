import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profileForm! : FormGroup
  public user         : any
  public uploadImage! : File
  public imageTemp    : any

  public listObservers$ : Subscription[] = [];


  constructor(private fb: FormBuilder,
              private userService: UserService,
              private fileUploadService: FileUploadService) {

    const observer1$ = this.userService.user$.subscribe( (res: User) => {
      this.user = res       
     })
    this.listObservers$.push(observer1$) 
  }


  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name:     [this.user.name, [ Validators.required, Validators.minLength(3) ]],
      lastName: [this.user.lastName, [ Validators.required, Validators.minLength(3) ]],
      email:    [this.user.email, [ Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$") ]],
    })
  }


  updateProfile(): void {
    this.userService.updateUser(this.profileForm.value, this.user._id).subscribe({
      next: res => Swal.fire('Success!!!', 'Usuario actualizado!', 'success'),
      error: err => Swal.fire('Error!!!', err.error.msg, 'error')
    })
  }

  changeImage(event: any): void {
    //al detectar el cambio en el input obtiene la imagen seleccionada
    this.uploadImage = event.target.files[0];

    //PARA VER INSTANTANEAMENTE LA IMAGEN QUE VAMOS A GUARDAR
    
    //si cancelamos la imagen nueva, para que muestre la anterior al momento
    if(!this.uploadImage) {
      this.imageTemp = null;

    } else {
      //para construir la imagen de vista previa
      const reader = new FileReader();
      reader.readAsDataURL(this.uploadImage);
      reader.onloadend = () => {
      this.imageTemp = reader.result;
      }
    } 
  }

  updateImage(): void {
    this.fileUploadService.uploadImage('users', this.user._id, this.uploadImage)
          .subscribe({
            next: res => {          
              this.user.image = res.fileName
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Imagen actualizada!',
                showConfirmButton: false,
                timer: 2000
              })        
            },
            error: err => Swal.fire('Error!!!', err.error.msg, 'error') 
          })
  }

  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
  }

}
