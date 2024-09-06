import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  show:boolean=false;
  isCodeForm:boolean=false;
  isResetForm:boolean=false;
  isLoading:boolean=false;
  errorMessage!:string;
  codeMessage!:string;
  statusMessage!:string;


  constructor(private _AuthService:AuthService ,private _Router:Router){}

  emailForm:FormGroup=new FormGroup({
    email:new FormControl(null , [Validators.required ,Validators.email])
  })

  codeForm:FormGroup=new FormGroup({
    resetCode:new FormControl(null , [Validators.required ])
  })

  resetDataForm:FormGroup=new FormGroup({
    email: new FormControl(null,[Validators.required , Validators.email]),
    newPassword:new FormControl(null ,[Validators.required , Validators.pattern(/^\w{6,}$/)])
  })

  sendEmail(){
    this.isLoading=true;
    this._AuthService.sendEmailApi(this.emailForm.value).subscribe({
      next: (res)=>{
        this.isLoading=false;
        console.log(res.message);

        this.codeMessage=res.message
        
        this.errorMessage=''
        if(res.statusMsg =="success"){
          this.isCodeForm=true;

        }
        
      },
      error: (err) => {
        this.isLoading=false
        console.log(err);
        this.errorMessage=err.error.message;
      }
    })
  }

  sendCode(){
    this.isLoading=true;
    this._AuthService.sendcodeApi(this.codeForm.value).subscribe({
      next: (res)=>{
        this.isLoading=false;
        console.log(res.status);
        this.statusMessage=res.status
        
        this.errorMessage=''
        
        if(res.status =="Success"){
          this.isCodeForm=false;
          this.isResetForm=true;
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading=false;
        this.errorMessage=err.error.message;

      }
    })
  }


  resetData(){
    this.isLoading=true;
    this._AuthService.resetDataApi(this.resetDataForm.value).subscribe({
      next: (res)=>{
        this.isLoading=false;
        console.log(res);
        this.errorMessage=''
        
        localStorage.setItem('userToken',res.token)
        this._AuthService.decodeUserData()
        this._Router.navigate(['/home'])
      },
      error: (err) => {
        console.log(err);
        this.isLoading=false;
        this.errorMessage=err.error.message;
      }
    })
  }
}
