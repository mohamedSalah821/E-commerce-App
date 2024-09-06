import { Component, OnInit } from '@angular/core';
import { CheckOutService } from '../../../shared/services/checkOut/check-out.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent implements OnInit{
constructor(private _CheckOutService:CheckOutService , private _ActivatedRoute:ActivatedRoute){}
 
isLoding:boolean=false;
cartId:string=''
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe((res:any)=>{
    // console.log(res.params.cId)
    this.cartId=res.params.cId;
  })
}


checkOutForm:FormGroup=new FormGroup({
  details:new FormControl(null,[Validators.required]),
  phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
  city:new FormControl(null,[Validators.required])
})



checkOutApi(){
  this.isLoding=true;
  this._CheckOutService.checkOut(this.cartId , this.checkOutForm.value).subscribe({
    next:(res)=>{
      console.log(res.session.url)
      window.open(res.session.url, "_self")
      this.isLoding=false;
    },
    error:(err)=>{
      console.log(err)
      this.isLoding=false;
    }
  })
}




}

