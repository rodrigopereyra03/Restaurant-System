import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzButtonSize } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  categories: any = [];
  validateForm!: FormGroup;
  size: NzButtonSize = 'large';
  isSpinning: boolean;

  constructor(private service: AdminService, private fb: FormBuilder){}

  ngOnInit(): void{
    this.validateForm = this.fb.group({
      title: [null,[Validators.required]],
    })
    this.getAllCategories();
  }

  sumbitForm(){ 
    this.isSpinning = true;
    this.categories = [];
    this.service.getAllCategoriesByTitle(this.validateForm.get(['title'])!.value).subscribe((res)=>{
      console.log(res);
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
        this.categories.push(element);
        this.isSpinning = false;
      });
    });
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
