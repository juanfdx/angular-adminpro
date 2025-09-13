import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital.service';
import { SearchsService } from 'src/app/services/searchs.service';
import { ModalImageService } from 'src/app/services/modal-image.service';

import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Hospital } from 'src/app/interfaces/hospital.interface';
import { capitalize } from 'src/app/helpers/capitalize';

@Component({
  selector: 'app-table-hospitals',
  templateUrl: './table-hospitals.component.html',
  styleUrls: ['./table-hospitals.component.scss']
})
export class TableHospitalsComponent implements OnInit {

  @Input() loading : boolean = false
  @Output() loaded = new EventEmitter<boolean>()

  public hospitals    : Hospital[] = []
  public total        : number = 0
  public from         : number = 0
  public term         : string = ''
  public hospitalName : string = ''
  public pageSize     : number = 5
  public currentPage  : number = 1

  private subscription$!: Subscription


  constructor(private hospitalService: HospitalService,
              private searchService: SearchsService,
              private modalImageService: ModalImageService) { }


  ngOnInit(): void {
    this.getHospitals()

    this.subscription$ = this.searchService.search$.subscribe( res => {
      this.term = res
      this.search(this.term) 
    })
  }

  //GET HOSPITALS
  getHospitals(): void {
    this.loaded.emit(true) 
    this.hospitalService.getAllHospitals(this.from).subscribe({
      next: res => {
        this.hospitals = res.hospitals
        this.total = res.total
        this.setCurrentPage(this.from)       
        this.loaded.emit(false)
      },
      error: err => Swal.fire('Error!!!', 'Error inesperado!', 'error') 
    })
  }

  //SEARCH
  search(term: string): void {
    if (term.length === 0) {
      this.getHospitals()
      return
    }
    this.searchService.search('hospitals', term).subscribe( res => {
      this.hospitals = res.data
      this.total     = res.total   
    })
  }

  //CREATE HOSPITAL - usamos un sweetalert para crear un hospital
  async createHospital() {
    
    const { value } = await Swal.fire<string>({
      input: 'text',
      title: 'Enter hospital name:',
      inputPlaceholder: 'Hospital name...',
      showCancelButton: true,
    })
    
    if (value !== undefined) { 
      //verificar si value tiene contenido   
      if (value.trim().length > 0) {
        //ponemos en mayusculas la primera letra de cada palabra del string
        const valueCapitalized = capitalize(value);

        this.hospitalService.createHospital(valueCapitalized!).subscribe({
          next: res => {
            
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Hospital creado!',
              showConfirmButton: false,
              timer: 2000
            }),
            this.getHospitals()
          },
  
          error: err => Swal.fire('Error!!!', 'No se pudo crear el hospital!', 'error') 
          
        })
      }  
    }
  }

  //UPDATE HOSPITAL
  updateHospital(hospital : any): void {

    this.hospitalService.updateHospital(hospital._id, hospital.name).subscribe({
      next: res => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Hospital actualizado!',
          showConfirmButton: false,
          timer: 2000
        })
      },
      error: err => {
        Swal.fire('Error!!!', err.error.msg, 'error'),
        this.getHospitals()
      }
    }) 
  }

  //DELETE HOSPITAL
  deleteHospital(hospital : any): void {

    Swal.fire({
      title: 'Borrar',
      text: `Deseas borrar a ${ hospital.name }?`,
      showCancelButton: true,
      confirmButtonText: 'Si',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        this.hospitalService.deleteHospital(hospital._id).subscribe({

          next: res => {          
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Hospital borrado!',
              showConfirmButton: false,
              timer: 2000
            })
            this.from = 0
            this.getHospitals();
          },             
          error: err => Swal.fire('Error!!!', err.error.msg, 'error')
                        
        });
      }
    })
  }

  //OPEN MODAL
  openModal(hospital: any): void {
    this.modalImageService.modalSource.next({data : hospital, type : 'hospitals'})
  }

  //TOTAL DE PAGINAS
  setTotalPages(): number {
    return Math.ceil(this.total / this.pageSize)
  }

  //CURRENT PAGE
  setCurrentPage(from: number): void {
    if (from < this.pageSize) {
      this.currentPage = 1  
    } else {
      this.currentPage = Math.ceil(from / this.pageSize) + 1
    }
  }

  //PAGINATION
  pagination( value: number): void {
    this.from += value;
    if (this.from <  0) { 
      this.from = 0 
      return
    } 
    if (this.from >= this.total) { 
      this.from -= value 
      return
    }
    this.getHospitals()
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
