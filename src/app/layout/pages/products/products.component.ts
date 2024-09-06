import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Products } from '../../../shared/interfaces/products';
import { ProductsService } from './../../../shared/services/products/products.service';
import { Component, OnDestroy, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe, NgClass, UpperCasePipe } from '@angular/common';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';

import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { WishListService } from '../../../shared/services/wishList/wish-list.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CarouselModule,RouterLink,UpperCasePipe,CurrencyPipe ,FilterPipe ,FormsModule,TranslateModule,NgClass ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnDestroy {

  productSub!:Subscription
  searchTerm:string=''
  isLoading:boolean=false;
  show:boolean=false;
  wishListProducts: string[] = [];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    autoplay: true, 
    autoplayTimeout: 2500, 
    autoplayHoverPause: true, 
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true,
    rtl:true
  }


  productList:Products[]=[]

  constructor(private _ProductsService:ProductsService ,private _CartService:CartService,private toastr: ToastrService,
    private renderer: Renderer2 
    ,private _WishListService:WishListService){}
 

  ngOnInit(){
    this.loadWishList()

    if(typeof localStorage !== "undefined"){
      localStorage.setItem('currentPage','/product')

    }

   this.productSub= this._ProductsService.getproducts().subscribe({
      next:(res)=>{
        
        this.productList=res.data

        
        
      },
      error:(err)=>{
    
      }
    })


  }

 


  addProduct(pId:string){
    this.isLoading=true;
    this._CartService.addProductToCart(pId).subscribe({
      next:(res)=>{
        this.isLoading=false;
        this.toastr.success(res.message+` 🛒`);
        this._CartService.cartNum.next(res.numOfCartItems)
        

      },
      error:(err)=>{
        this.isLoading=false;
      }
    })
  }


  ngOnDestroy(): void {
    this.productSub?.unsubscribe()
  }




  loadWishList() {
    this._WishListService.getWishList().subscribe({
      next: (res) => {
        this.wishListProducts = res.data.map((product:any) => product._id); // احتفظ بمنتجات الـ wish list
      },
      error: (err) => {
      }
    });
  }

  addToWishList(pId: string, wishIcon: HTMLElement) {
    if (this.isInWishList(pId)) {
      // إذا المنتج موجود بالفعل، قم بإزالته
      this._WishListService.removeProductFromWishList(pId).subscribe({
        next: (res) => {
          
          this._WishListService.wishNum.next(res.data.length)

          this.toastr.warning(res.message + ` 🖤`);
          this.renderer.setStyle(wishIcon, 'color', ''); // إرجاع اللون للوضع الافتراضي
          this.wishListProducts = this.wishListProducts.filter(id => id !== pId); // إزالة المنتج من القائمة المحلية
        },
        error: (err) => {
        }
      });
    } else {
      // إذا المنتج غير موجود، قم بإضافته
      this._WishListService.addProductToWishList(pId).subscribe({
        next: (res) => {
          this._WishListService.wishNum.next(res.data.length)

          this.toastr.success(res.message + ` ❤️`);
          this.renderer.setStyle(wishIcon, 'color', 'red'); // غيّر اللون للأحمر
          this.wishListProducts.push(pId); // أضف المنتج للقائمة المحلية
        },
        error: (err) => {
        }
      });
    }
  }
  

  // دالة للتحقق إذا المنتج موجود في الـ wish list وتغيير لون الأيقونة بناءً على ذلك
  isInWishList(pId: string): boolean {
    return this.wishListProducts.includes(pId);
  }


}
