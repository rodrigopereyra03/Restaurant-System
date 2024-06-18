import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../customer-service/customer.service';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-view-products-by-category',
  templateUrl: './view-products-by-category.component.html',
  styleUrl: './view-products-by-category.component.scss'
})
export class ViewProductsByCategoryComponent {

    categoryId : number = this.activatedRoute.snapshot.params["categoryId"];
    Products = [];
    isSpinning: boolean;
    validateForm: FormGroup;
    size: NzButtonSize = 'large';

    constructor(private activatedRoute: ActivatedRoute, private service: CustomerService,private fb: FormBuilder){}

    ngOnInit(){
      this.validateForm = this.fb.group({
        title: [null, [Validators.required]],
      });
      this.getProductsByCategory();
    }

    getProductsByCategory(){
      this.service.getProdutsByCategory(this.categoryId).subscribe((res)=>{
        console.log(res);
        res.forEach(element => {
          element.processedImg = "data:image/jpeg;base64," + element.returnedImg;
          this.Products.push(element);
        });
        
      })
    }

    sumbitForm() { 
      this.isSpinning = true;
      this.Products = [];
      this.service.getProductsByCategoryAndTitle(this.categoryId, this.validateForm.get(['title'])!.value)
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
}
function throwError(error: any): any {
  throw new Error('Function not implemented.');
}

