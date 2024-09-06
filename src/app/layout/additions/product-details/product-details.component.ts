import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../shared/services/products/products.service';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../../shared/interfaces/products';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  isLoading:boolean=false;
  myProduct!:Products


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    autoplay: true, 
    autoplayTimeout: 1500, 
    autoplayHoverPause: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }



  constructor(private _ProductsService:ProductsService , private _ActivatedRoute:ActivatedRoute, private toastr: ToastrService,private _CartService:CartService){}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe((res:any)=>{
      // console.log(res.params.pId)

      this._ProductsService.getSpeProudct(res.params.pId).subscribe({
        next:(res)=>{
          console.log(res)
          this.myProduct=res.data
        },
        error:(err)=>{
          console.log(err)
        }
      })
    })

    

  }

  addToCart(pId:string){
    this.isLoading=true;
    this._CartService.addProductToCart(pId).subscribe({
      next:(res)=>{
        console.log(res)
        this.toastr.success(res.message+' 🛒');
        this.isLoading=false;
        this._CartService.cartNum.next(res.numOfCartItems)


      },
      error:(err)=>{
        console.log(err)
        this.isLoading=false;
      }
    })

  }

}
