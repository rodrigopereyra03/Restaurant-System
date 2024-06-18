import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-get-reservations',
  templateUrl: './get-reservations.component.html',
  styleUrl: './get-reservations.component.scss'
})
export class GetReservationsComponent {
  isSpinning : boolean = false;
  reservations : any;

  constructor(private service: AdminService, private mesagge : NzMessageService){}

  ngOnInit(){
    this.getReservationsByUser();
  }

  getReservationsByUser(){
    this.service.getReservations().subscribe((res)=>{
      console.log(res);
      this.reservations = res;
    })
  }
  
  changeReservationStatus(reservationId: number, status:string){
    console.log(reservationId);
    console.log(status);
    this.service.changeReservationStatus(reservationId,status).subscribe((res)=>{
      console.log(res);
      if(res.id != null){
        this.getReservationsByUser();
        this.mesagge.success("Reservation status changed successfully", {nzDuration:5000})
      }else{
        this.mesagge.success("Something went wrong", {nzDuration:5000})
      }
    })

  }
}
