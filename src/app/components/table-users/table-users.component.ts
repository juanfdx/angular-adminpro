import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalImageService } from 'src/app/services/modal-image.service';
import { SearchsService } from 'src/app/services/searchs.service';
import { UserService } from 'src/app/services/user.service';

import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss']
})
export class TableUsersComponent implements OnInit {

  @Input() loading : boolean = false
  @Output() loaded = new EventEmitter<boolean>()
  
  public users : User[] = []
  public total : number = 0
  public from  : number = 0
  public term  : string = ''
  public pageSize    : number = 5
  public currentPage : number = 1

  private subscription$!: Subscription;

  constructor(private userService: UserService,
              private searchService: SearchsService,
              private modalImageService: ModalImageService) { }

  ngOnInit(): void {
    this.getUsers()

    this.subscription$ = this.searchService.search$.subscribe( res => {
      this.term = res
      this.search(this.term) 
    })
  }

  //GET USERS
  getUsers(): void {
    this.loaded.emit(true) 
    this.userService.getAllUsers(this.from).subscribe({
      next: res => {
        this.users = res.users
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
      this.getUsers()
      return
    }
    this.searchService.search('users', term).subscribe( res => {
      this.users = res.data
      this.total = res.total   
    })
  }

  //CHANGE USER ROLE
  changeUserRole(user: User): void {
    this.userService.changeRoleOrStatus(user).subscribe({
      next: res => res,
      error: err => Swal.fire('Error!!!', err.error.msg, 'error'), 
    })
  }

  //CHANGE USER STATUS
  changeUserStatus(user: User): void {
    (user.status === 'active') ? user.status = 'inactive' : user.status = 'active';   
    this.userService.changeRoleOrStatus(user).subscribe({
      next: res => res,
      error: err => Swal.fire('Error!!!', err.error.msg, 'error'), 
    })
  }

  //DELETE USER
  deleteUser(user: User): void {
    
    if (user._id === this.userService.userId) {
      Swal.fire('Error!!!', 'No puede borrarse a si mismo.', 'error');
    
    } else {
      Swal.fire({
        title: 'Borrar',
        text: `Deseas borrar a ${ user.name } ${ user.lastName }?`,
        showCancelButton: true,
        confirmButtonText: 'Si',
        
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

          this.userService.deleteUser(user._id).subscribe({
            next: res => {
              Swal.fire('Usuario borrado', `${ user.name } ${ user.lastName }`, 'success');
              this.from = 0
              this.getUsers()
            },
            error: err => Swal.fire('Error!!!', err.error.msg, 'error'),

          })
        }
      })
    }
  }

  //OPEN MODAL
  openModal(user: User): void {
    this.modalImageService.modalSource.next({data : user, type : 'users'})
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
    this.getUsers()
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
  
}


