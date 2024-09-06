import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  showPass:boolean=false;
  showrePass:boolean=false;
  errorMessage!:string;
  isLoading:boolean=false;

  constructor(private _AuthService:AuthService , private _Router:Router){}

  registerForm:FormGroup=new FormGroup({
    name: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
    rePassword: new FormControl(null),
  },this.checkPasswordData)

  sendData():void
  {
    this.isLoading=true;
    //call API
    this._AuthService.sendRrgister(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        this.errorMessage=''
        this._Router.navigate(['/login'])
        this.isLoading=false;
      },
      error:(err)=>{
        console.log(err.error.message);
        this.errorMessage=err.error.message
        this.isLoading=false;
        
      }
    })
  }

  checkPasswordData(form:AbstractControl)
  {
    if(form.get('password')?.value === form.get('rePassword')?.value)
    {
      return null
    }
    else
    {
      return {mismatch : true}
    }
  }
}
