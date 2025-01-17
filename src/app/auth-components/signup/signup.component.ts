import { Component } from '@angular/core';
import { AuthService } from '../../auth-services/auth-services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  isSpinning: boolean;
  validateForm: FormGroup;

  confirmationValidator = (control:FormControl): { [s:string]: boolean }=>{
    if(!control.value){
      return {required: true};
    }else if(control.value !== this.validateForm.controls['password'].value){
      return { confirm: true, error: true}
    }
    return {};
  }

  constructor(private services: AuthService, private fb:FormBuilder, private notification: NzNotificationService){}

  ngOnInit(){
    this.validateForm = this.fb.group({
      email: ["",Validators.required],
      password: ["",Validators.required],
      checkPassword: ["",[Validators.required, this.confirmationValidator]],
      name: ["",Validators.required]
    })
  }

  register(){
    console.log(this.validateForm.value);
    this.services.signup(this.validateForm.value).subscribe((res) =>{
      console.log(res);
      if (res.id != null){
        this.notification.success("SUCCESS","You´re registered successfully", {nzDuration: 5000});
      }else{
        this.notification.success("ERROR","Something were wrong", {nzDuration: 5000});
      }
    })

  }

}
