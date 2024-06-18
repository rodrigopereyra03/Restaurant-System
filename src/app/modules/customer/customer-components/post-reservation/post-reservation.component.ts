import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../customer-service/customer.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-post-reservation',
  templateUrl: './post-reservation.component.html',
  styleUrl: './post-reservation.component.scss'
})
export class PostReservationComponent {

  isSpinning: boolean = false;
  validateForm: FormGroup;

  TableType : string[] = [
    "Standard Table",
    "Booth",
    "Communal Table",
    "Bar Table",
    "Outdoor Table",
    "High-top Table",
    "Banquette",
    "Chef´s Table",
    "Convertible Table",
    "Corner Table",
    "Family-Style Table",
    "Private Dining Table",
    "Lounge Table",
    "Round Table",
    "Custom Table",
  ]

  constructor(private fb: FormBuilder, private service: CustomerService, private message: NzMessageService){}

  ngOnInit(){
    this.validateForm = this.fb.group({
      tableType:[null,Validators.required],
      dateTime:[null,Validators.required],
      description:[null,Validators.required],
    })
  }

  postReservation(){
    console.log(this.validateForm.value);
    this.service.postReservation(this.validateForm.value).subscribe((res)=>{
      console.log(res);
      if(res.id !=  null){
        this.message.success("Reservation Posted Successfully", {nzDuration:5000});
      }else if (res.id == null){
        this.message.success("Something went wrong", {nzDuration:5000});

      }
    })
  }
}
