import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { CustomerService } from '../../customer-service/customer.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  categories: any = [];
  validateForm: FormGroup;
  size: NzButtonSize = 'large';
  isSpinning: boolean;

  constructor(private service: CustomerService,private fb: FormBuilder){}

  ngOnInit(): void{
    this.validateForm = this.fb.group({
      title: [null,Validators.required]
    })
    this.getAllCategories();
  }

  searchCategory(){
    console.log(this.validateForm.value);
    this.categories= [];
    this.service.getCategoriesByName(this.validateForm.get(['title']).value).subscribe((res)=>{
      console.log(res);
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.categories.push(element);
      });
    })
  }

  getAllCategories(){
    this.categories= [];
    this.service.getAllCategories().subscribe((res) => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.categories.push(element);
      });
    });
  }

}
