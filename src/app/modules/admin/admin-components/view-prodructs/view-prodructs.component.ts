import { Component } from '@angular/core';
import { AdminService } from '../../admin-services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { catchError, throwError } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'app-view-prodructs',
  templateUrl: './view-prodructs.component.html',
  styleUrl: './view-prodructs.component.scss'
})
export class ViewProdructsComponent {

  categoryId: any = this.activatedroute.snapshot.params['categoryId'];
  Products: any = [];
  isSpinning: boolean;
  validateForm: FormGroup;
  size: NzButtonSize = 'large';

  constructor(private adminService: AdminService, private activatedroute: ActivatedRoute, private fb: FormBuilder, private message: NzMessageService){}

  ngOnInit():void{
    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
    });
    this.getProductsByCategory();
  }

  sumbitForm() { 
    this.isSpinning = true;
    this.Products = [];
    this.adminService.getProductsByCategoryAndTitle(this.categoryId, this.validateForm.get(['title'])!.value)
      .pipe(
        catchError(error => {
          console.error('Error al obtener productos:', error);
          return throwError(error);
        })
      )
      .subscribe((res) => {
        console.log(res);
        res.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
          this.Products.push(element);
          this.isSpinning = false;
        });
      });
  }
  

  getProductsByCategory(){
    this.Products= [];
    this.adminService.getProductsByCategory(this.categoryId).subscribe((res) => {
      res.forEach(element => {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
          this.Products.push(element);
      });
    })
  }

  deleteProduct(productId: any){
    this.adminService.deleteProduct(productId).subscribe((res) => {
      if(res == null){
        this.getProductsByCategory();
        this.message.success('Product Deleted Successfully',{nzDuration: 5000});
      }else{
        this.message.error('Something went wrong', {nzDuration: 5000});
      }

    })
  }
}
