import { Component } from '@angular/core';
import { CustomerService } from '../../customer-service/customer.service';

@Component({
  selector: 'app-get-all-reservations',
  templateUrl: './get-all-reservations.component.html',
  styleUrl: './get-all-reservations.component.scss'
})
export class GetAllReservationsComponent {

  isSpinning : boolean = false;
  reservations : any;

  constructor(private service: CustomerService){}

  ngOnInit(){
    this.getReservationsByUser();
  }

  getReservationsByUser(){
    this.service.getReservationsByUser().subscribe((res)=>{
      console.log(res);
      this.reservations = res;
    })
  }

}
