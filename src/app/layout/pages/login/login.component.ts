import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ,RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  show:boolean=false;
  errorMessage!:string;
  isLoading:boolean=false;

  constructor(private _AuthService:AuthService , private _Router:Router ){}

  loginForm:FormGroup=new FormGroup({
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
  })

  sendData():void
  {
    this.isLoading=true;
    //call API
    this._AuthService.sendLogin(this.loginForm.value).subscribe({
      next:(res)=>{
        console.log(res)


        this._Router.navigate(['/home'])
        this.isLoading=false;

        
        localStorage.setItem('userToken',res.token);
        this._AuthService.decodeUserData();
        
        this.errorMessage=''
        
      },
      error:(err)=>{
        console.log(err.error.message);
        this.errorMessage=err.error.message
        this.isLoading=false;
        
      }
    })
  }


}
