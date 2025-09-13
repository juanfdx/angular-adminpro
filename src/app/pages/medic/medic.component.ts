import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { capitalize } from 'src/app/helpers/capitalize';
import { Hospital } from 'src/app/interfaces/hospital.interface';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicService } from 'src/app/services/medic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styleUrls: ['./medic.component.scss']
})

export class MedicComponent implements OnInit {

  public medicForm!        : FormGroup
  public hospitals         : any[] = []
  public selectedHospital? : Hospital
  public selectedMedic     : any


  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicService: MedicService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { 
  }


  ngOnInit(): void {
    //obtenemos el id del medico que viene por la url
    this.activatedRoute.params.subscribe({
      next: ({ id }) => this.getMedic( id )    
    })

    this.medicForm = this.fb.group({
      name     : ['', [ Validators.required ]],
      lastName : ['', [ Validators.required ]],
      hospital : ['', [ Validators.required ]],
    })

    this.getHospitals()

    //nos podemos subscribir un valor de un input del form y obtener su valor
    this.medicForm.get('hospital')?.valueChanges.subscribe({
      next: hospital_Id => {
        this.selectedHospital = this.hospitals.find(h => h._id === hospital_Id)
      }
    })
  }


  getMedic(id: string): void {
    //si le dio al boton create, no manda un id valido sino la palabra "new"
    if (id === 'new') { return }

    this.medicService.getMedic(id)
          //delay para que de tiempo a cargar el form antes que la imagen de hospital
          .pipe(delay(200))
          .subscribe({

      next: res => {

        //si no existe o es un id invalido, me manda a la pagina de medicos
        if (!res.medic) { 
          this.router.navigateByUrl(`/dashboard/medics`);

        } else {

          this.selectedMedic = res.medic

          if (!this.selectedMedic.hospital) {
            //llenamos el formulario con los valores de selectedMedic
            this.medicForm.patchValue(
              { name     : this.selectedMedic!.name, 
                lastName : this.selectedMedic!.lastName,
                hospital : '' //si hospital null, entonces select dira "Seleccionar hospital"
              })

          } else {
            this.medicForm.patchValue(
              { name: this.selectedMedic!.name, 
                lastName: this.selectedMedic!.lastName,
                hospital: this.selectedMedic!.hospital?._id
              })
          }
        }  
      },

      error: res => {this.router.navigateByUrl(`/dashboard/medics`)}

    })
  }

  saveMedic(): void {
    //si existe selectedMedic es que estamos actualizando
    if (this.selectedMedic) {

      this.medicService.updateMedic(this.selectedMedic._id, this.medicForm.value)
          .subscribe({
            next: res => {
          
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Médico actualizado!',
                showConfirmButton: false,
                timer: 2000
              });
      
              this.router.navigateByUrl(`/dashboard/medic/${res.medic._id}`);
            },
            
            error: err => Swal.fire('Error!!!', err.error.msg, 'error')        
            
          });

    //si no existe selectedMedic es que estamos creando un nuevo medico  
    } else {

      this.medicService.createMedic(this.medicForm.value).subscribe({
        next: res => {
          
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Médico creado!',
            showConfirmButton: false,
            timer: 2000
          });
  
          this.router.navigateByUrl(`/dashboard/medics`);
        },
        
        error: err => Swal.fire('Error!!!', err.error.msg, 'error')        
        
      });    
    }
  }

  getHospitals(): void {
    this.hospitalService.getAllHospitals().subscribe( res => {
      this.hospitals = res.hospitals  
    })
  }

}
