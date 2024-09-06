
import { Component, Renderer2 } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { Categories } from '../../../shared/interfaces/categories';
import { ProductsService } from '../../../shared/services/products/products.service';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Products } from '../../../shared/interfaces/products';
import { CurrencyPipe, DatePipe, NgClass, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { WishListService } from '../../../shared/services/wishList/wish-list.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule ,CurrencyPipe,UpperCasePipe,RouterLink,TranslateModule,NgClass,DatePipe ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  catImage:Categories[]=[]
  productList:Products[]=[]
  isLoading:boolean=false;
  date = new Date();
  wishListProducts: string[] = [];

  constructor(private _CategoriesService:CategoriesService,private _WishListService:WishListService,private renderer :Renderer2 ,private _ProductsService:ProductsService,private _CartService:CartService,private toastr: ToastrService){}

  customOptionsTop: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true,
    rtl:true
  };

 
customOptionsBottom: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: false,
  pullDrag: false,
  autoplay: true, 
    autoplayTimeout: 2500, 
    autoplayHoverPause: true, 
  dots: false,
  navSpeed: 700,
  navText: ['<', '>'],
  responsive: {
    0: {
      items: 2
    },
    400: {
      items: 2
    },
    740: {
      items: 4
    },
    940: {
      items: 6
    }
  },
  nav: true,
  rtl:true
};

  ngOnInit(){

    this.loadWishList()

    if(typeof localStorage !== "undefined"){
      localStorage.setItem('currentPage','/home')
    }

    this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.catImage=res.data

      },
      error: (err) => {
      }
    })

    this._ProductsService.getSomeproducts().subscribe({
      next: (res) => {
        this.productList=res.data;
      },
      error: (err) => {
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

  loadWishList() {
    this._WishListService.getWishList().subscribe({
      next: (res) => {
        this.wishListProducts = res.data.map((product:any) => product._id); // احتفظ بمنتجات الـ wish list
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addToWishList(pId: string, wishIcon: HTMLElement) {
    if (this.isInWishList(pId)) {
      // إذا المنتج موجود بالفعل، قم بإزالته
      this._WishListService.removeProductFromWishList(pId).subscribe({
        next: (res) => {
          this.toastr.warning(res.message + ` 🖤`);
          this._WishListService.wishNum.next(res.data.length)

          this.renderer.setStyle(wishIcon, 'color', ''); // إرجاع اللون للوضع الافتراضي
          this.wishListProducts = this.wishListProducts.filter(id => id !== pId); // إزالة المنتج من القائمة المحلية
        },
        error: (err) => {
          console.log(err);
        }
      });
    } else {
      // إذا المنتج غير موجود، قم بإضافته
      this._WishListService.addProductToWishList(pId).subscribe({
        next: (res) => {
          this.toastr.success(res.message + ` ❤️`);
          this._WishListService.wishNum.next(res.data.length)

          this.renderer.setStyle(wishIcon, 'color', 'red'); // غيّر اللون للأحمر
          this.wishListProducts.push(pId); // أضف المنتج للقائمة المحلية
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
  

  // دالة للتحقق إذا المنتج موجود في الـ wish list وتغيير لون الأيقونة بناءً على ذلك
  isInWishList(pId: string): boolean {
    return this.wishListProducts.includes(pId);
  }



  
}
